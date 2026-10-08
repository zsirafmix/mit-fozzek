import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, CheckSquare, Square, ChefHat, Info } from 'lucide-react';
import { Ingredient } from '../types';
import { IngredientTile } from './IngredientTile';

interface ScreenFridgeProps {
  allIngredients: Ingredient[];
  selectedIngredientIds: Set<string>;
  perishableIngredientIds: Set<string>;
  pantryEnabled: boolean;
  onToggleSelect: (id: string) => void;
  onTogglePerishable: (id: string) => void;
  onTogglePantry: () => void;
  onAddNewIngredient: (name: string) => void;
  onFindRecipe: () => void;
  onSelectPresetScenario?: (scenarioName: string) => void;
}

export const ScreenFridge: React.FC<ScreenFridgeProps> = ({
  allIngredients,
  selectedIngredientIds,
  perishableIngredientIds,
  pantryEnabled,
  onToggleSelect,
  onTogglePerishable,
  onTogglePantry,
  onAddNewIngredient,
  onFindRecipe,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter ingredients based on search query
  const filteredIngredients = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return allIngredients;
    return allIngredients.filter(
      (ing) =>
        ing.name.toLowerCase().includes(query) ||
        ing.displayName.toLowerCase().includes(query) ||
        ing.aliases?.some((a) => a.toLowerCase().includes(query))
    );
  }, [allIngredients, searchQuery]);

  // Split into Perishables (on top) and Others (below)
  const { perishables, standardIngredients } = useMemo(() => {
    const perishableList: Ingredient[] = [];
    const othersList: Ingredient[] = [];

    filteredIngredients.forEach((ing) => {
      if (selectedIngredientIds.has(ing.id) && perishableIngredientIds.has(ing.id)) {
        perishableList.push(ing);
      } else {
        othersList.push(ing);
      }
    });

    return {
      perishables: perishableList,
      standardIngredients: othersList,
    };
  }, [filteredIngredients, selectedIngredientIds, perishableIngredientIds]);

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onAddNewIngredient(searchQuery.trim());
    setSearchQuery('');
  };

  const selectedCount = selectedIngredientIds.size;
  const perishableCount = perishableIngredientIds.size;

  return (
    <div className="min-h-screen pb-32 pt-4 px-4 max-w-md mx-auto relative bg-[#FAF7F2]">
      {/* Header Banner */}
      <header className="mb-5 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-xs font-bold tracking-wider uppercase mb-2">
          <ChefHat className="w-4 h-4" />
          <span>Mit főzzek ma?</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#2D2420] tracking-tight">
          Mi van otthon?
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-xs mx-auto">
          Pipáld be az alapanyagokat, és jelöld meg, ami hamar lejár!
        </p>
      </header>

      {/* Alapszekrény (Pantry) Switch */}
      <div className="mb-5 bg-white rounded-2xl p-3.5 border border-stone-200/80 shadow-soft">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={onTogglePantry}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center font-bold text-sm">
              🧂
            </div>
            <div>
              <div className="font-semibold text-sm text-stone-900">
                Alapszekrény feltételezése
              </div>
              <div className="text-xs text-stone-500">
                Olaj, só, bors, cukor, liszt, ecet, víz megvan
              </div>
            </div>
          </div>
          <button
            type="button"
            className={`w-12 h-7 rounded-full transition-colors relative p-0.5 focus:outline-none ${
              pantryEnabled ? 'bg-[#C85A32]' : 'bg-stone-300'
            }`}
            aria-label="Alapszekrény kapcsoló"
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                pantryEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Keresőmező: "Írd be" */}
      <form onSubmit={handleAddCustom} className="mb-6 relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-stone-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Írd be... (pl. csirkemell, tejföl)"
            className="w-full pl-10 pr-24 py-3 rounded-2xl bg-white border border-stone-200 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] shadow-soft transition-all"
          />
          {searchQuery.trim() && (
            <button
              type="submit"
              className="absolute right-2 px-3 py-1.5 bg-[#C85A32] text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm hover:bg-[#B34B25] transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Hozzáadás</span>
            </button>
          )}
        </div>
      </form>

      {/* Perishables Section (TOP) with Red Banner */}
      {perishables.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 tracking-wider uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block" />
              <span>Romlandó alapanyagok ({perishables.length})</span>
            </div>
            <span className="text-[11px] text-stone-500 font-medium">
              Ezeket használjuk fel először!
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {perishables.map((ing) => (
              <IngredientTile
                key={ing.id}
                ingredient={ing}
                isSelected={selectedIngredientIds.has(ing.id)}
                isPerishable={perishableIngredientIds.has(ing.id)}
                onToggleSelect={onToggleSelect}
                onTogglePerishable={onTogglePerishable}
              />
            ))}
          </div>
        </section>
      )}

      {/* Standard Ingredients Grid */}
      <section>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h2 className="text-xs font-bold text-stone-600 tracking-wider uppercase">
            {perishables.length > 0 ? 'További alapanyagok' : 'Alapanyagok a kamrában / hűtőben'}
          </h2>
          <span className="text-xs text-stone-500">
            {selectedCount} bepipálva
          </span>
        </div>

        {standardIngredients.length === 0 && perishables.length === 0 ? (
          <div className="text-center py-10 bg-white/60 rounded-2xl border border-dashed border-stone-300 p-6">
            <p className="text-stone-600 font-medium text-sm mb-2">
              Nincs találat erre: „{searchQuery}”
            </p>
            <button
              onClick={handleAddCustom}
              className="px-4 py-2 bg-[#C85A32] text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Hozzáadás új alapanyagként</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {standardIngredients.map((ing) => (
              <IngredientTile
                key={ing.id}
                ingredient={ing}
                isSelected={selectedIngredientIds.has(ing.id)}
                isPerishable={perishableIngredientIds.has(ing.id)}
                onToggleSelect={onToggleSelect}
                onTogglePerishable={onTogglePerishable}
              />
            ))}
          </div>
        )}
      </section>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/95 to-transparent backdrop-blur-md z-40">
        <div className="max-w-md mx-auto">
          <button
            type="button"
            onClick={onFindRecipe}
            disabled={selectedCount === 0}
            className={`w-full py-4 px-6 rounded-2xl font-extrabold text-base tracking-wider flex items-center justify-center gap-3 shadow-floating transition-all duration-200 ${
              selectedCount > 0
                ? 'bg-[#C85A32] hover:bg-[#B34B25] text-white cursor-pointer touch-press active:scale-[0.98]'
                : 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
            }`}
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>MIT FŐZZEK?</span>
            {selectedCount > 0 && (
              <span className="bg-black/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {selectedCount} db
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Users,
  Flame,
  Shuffle,
  ShoppingCart,
  RefreshCw,
  Play,
  CheckCircle2,
  AlertTriangle,
  Minus,
  Plus,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { MatchResult, Ingredient } from '../types';
import { formatIngredientDisplay, calculateScaledAmount } from '../utils/scaling';

interface ScreenResultProps {
  matchResult: MatchResult;
  allMatchesCount: number;
  currentMatchIndex: number;
  allIngredients: Ingredient[];
  perishableIngredientIds: Set<string>;
  activeSubstitutions: Record<string, boolean>; // for current recipe
  isFallback?: boolean;
  noMatchReason?: string;
  onNextRecipe: () => void;
  onBackToFridge: () => void;
  onStartCooking: (servings: number) => void;
  onToggleSubstitution: (recipeId: string, originalId: string) => void;
}

export const ScreenResult: React.FC<ScreenResultProps> = ({
  matchResult,
  allMatchesCount,
  currentMatchIndex,
  allIngredients,
  perishableIngredientIds,
  activeSubstitutions,
  isFallback,
  noMatchReason,
  onNextRecipe,
  onBackToFridge,
  onStartCooking,
  onToggleSubstitution,
}) => {
  const [servings, setServings] = useState<number>(4);
  const [boughtItems, setBoughtItems] = useState<Set<string>>(new Set());

  const { recipe, missingIngredients, usedPerishables } = matchResult;
  const ingredientMap = new Map(allIngredients.map((i) => [i.id, i]));

  const handleServingChange = (delta: number) => {
    setServings((prev) => {
      const next = prev + delta;
      return Math.max(1, Math.min(100, next));
    });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      setServings(Math.max(1, Math.min(100, val)));
    }
  };

  const toggleBought = (ingId: string) => {
    setBoughtItems((prev) => {
      const next = new Set(prev);
      if (next.has(ingId)) next.delete(ingId);
      else next.add(ingId);
      return next;
    });
  };

  // Build match summary row
  const matchRowText = (() => {
    const parts: string[] = [];
    if (usedPerishables.length > 0) {
      parts.push(`Felhasználja a ${usedPerishables.join(' és ')} romlandót.`);
    } else {
      parts.push(`Felhasználja a rendelkezésre álló alapanyagokat.`);
    }

    const effectiveMissing = missingIngredients.filter(
      (m) => !boughtItems.has(m.ingredientId)
    );

    if (effectiveMissing.length > 0) {
      const missingNames = effectiveMissing.map((m) => m.name).join(', ');
      parts.push(`Hiányzik: ${missingNames}.`);
    } else {
      parts.push(`Minden hozzávaló megvan!`);
    }
    return parts.join(' ');
  })();

  return (
    <div className="min-h-screen pb-32 bg-[#FAF7F2] text-[#2D2420] max-w-md mx-auto relative">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-stone-200/60">
        <button
          onClick={onBackToFridge}
          className="flex items-center gap-1.5 text-stone-700 font-semibold text-sm hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Mi van otthon</span>
        </button>

        {allMatchesCount > 1 && (
          <button
            onClick={onNextRecipe}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-all"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Másikat kérek ({currentMatchIndex + 1}/{allMatchesCount})</span>
          </button>
        )}
      </div>

      {/* Fallback / No exact match notice */}
      {isFallback && noMatchReason && (
        <div className="mx-4 mt-3 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Őszinte konyhai infó:</span>
            {noMatchReason}
            <span className="block mt-1 text-stone-600">
              Íme a legközelebbi, legkevesebb hiányzóval elkészíthető receptünk:
            </span>
          </div>
        </div>
      )}

      {/* Hero Recipe Image */}
      <div className="relative w-full aspect-[16/10] bg-stone-200 overflow-hidden shadow-sm">
        <img
          src={recipe.coverImage}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Recipe Title & Badge on Hero */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#C85A32] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              Valós magyar recept
            </span>
            <span className="bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {recipe.prepTimeMinutes} perc
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight leading-tight drop-shadow-md">
            {recipe.title}
          </h1>
          <p className="text-xs text-stone-200 line-clamp-1 mt-0.5 drop-shadow">
            {recipe.tagline}
          </p>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Illeszkedési Sor */}
        <div className="bg-white rounded-2xl p-3.5 border border-stone-200/80 shadow-soft">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 mb-0.5">
                Illeszkedés az otthoni készlethez
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {matchRowText}
              </p>
            </div>
          </div>
        </div>

        {/* Missing Ingredients Cards with "Megveszem" and "Helyettesítem" */}
        {missingIngredients.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Hiányzó alapanyag ({missingIngredients.length})
              </h2>
              <span className="text-[11px] text-amber-700 font-medium">
                Pótold vagy helyettesítsd egy kattintással!
              </span>
            </div>

            {missingIngredients.map((missing) => {
              const isBought = boughtItems.has(missing.ingredientId);
              const subRule = missing.availableSubstitution;
              const isSubstituted =
                activeSubstitutions[missing.ingredientId] || false;

              // Scaled missing amount
              const scaledMissingText = formatIngredientDisplay(
                missing.baseAmount,
                missing.unit,
                recipe.baseServings,
                servings,
                missing.isSpiceOrSeasoning
              );

              return (
                <div
                  key={missing.ingredientId}
                  className={`bg-white rounded-2xl p-3.5 border transition-all shadow-soft ${
                    isBought
                      ? 'border-emerald-300 bg-emerald-50/40'
                      : 'border-amber-200/90'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={missing.imageUrl}
                      alt={missing.name}
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-stone-900 truncate">
                          {missing.name}
                        </span>
                        {isBought && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
                            Megvéve
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-stone-600 font-medium">
                        Szükséges mennyiség: <strong className="text-stone-900">{scaledMissingText}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Actions for missing item */}
                  <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => toggleBought(missing.ingredientId)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isBought
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{isBought ? 'Megvéve (Készleten)' : 'Megveszem'}</span>
                    </button>

                    {subRule && (
                      <button
                        type="button"
                        onClick={() =>
                          onToggleSubstitution(recipe.id, missing.ingredientId)
                        }
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                          isSubstituted
                            ? 'bg-amber-100 border-amber-300 text-amber-900'
                            : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800'
                        }`}
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                        <span>
                          {isSubstituted
                            ? `Csere: ${subRule.substituteName} ✓`
                            : `Helyettesítem: ${subRule.substituteName}`}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Adagválasztó (1–100, alapértelmezés: 4 fő) */}
        <section className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                Adagok száma
              </span>
              <span className="text-lg font-black text-[#C85A32]">
                {servings} főre.
              </span>
            </div>
            {/* Quick +/- buttons */}
            <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleServingChange(-1)}
                disabled={servings <= 1}
                className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-stone-700 font-bold disabled:opacity-40"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-bold text-sm">
                {servings}
              </span>
              <button
                type="button"
                onClick={() => handleServingChange(1)}
                disabled={servings >= 100}
                className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-stone-700 font-bold disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Slider 1–100 */}
          <input
            type="range"
            min={1}
            max={100}
            value={servings}
            onChange={handleSliderChange}
            className="w-full accent-[#C85A32] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-600 mt-1 font-medium">
            <span>1 fő</span>
            <span>4 fő (alap)</span>
            <span>100 fő</span>
          </div>
        </section>

        {/* Hozzávalók Lista (Miniatűr fotóval és skálázott mennyiséggel) */}
        <section className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
            <h2 className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5">
              <span>Hozzávalók</span>
              <span className="text-xs font-normal text-stone-500">
                ({servings} főre újraszámolva)
              </span>
            </h2>
            {servings > 8 && (
              <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                Fűszerek: kóstolásra
              </span>
            )}
          </div>

          <div className="divide-y divide-stone-100">
            {recipe.ingredients.map((ing) => {
              const subRule = recipe.availableSubstitutions?.[ing.ingredientId];
              const isSubstituted =
                subRule && activeSubstitutions[ing.ingredientId];

              const effectiveId = isSubstituted
                ? subRule.substituteId
                : ing.ingredientId;
              const effectiveName = isSubstituted
                ? subRule.substituteName
                : ing.name;
              const effectiveUnit =
                isSubstituted && subRule.substituteUnit
                  ? subRule.substituteUnit
                  : ing.unit;
              const effectiveBaseAmount =
                isSubstituted && subRule.amountMultiplier
                  ? ing.baseAmount * subRule.amountMultiplier
                  : ing.baseAmount;

              const isPerishable = perishableIngredientIds.has(effectiveId);
              const ingMeta = ingredientMap.get(effectiveId);
              const displayAmount = formatIngredientDisplay(
                effectiveBaseAmount,
                effectiveUnit,
                recipe.baseServings,
                servings,
                ing.isSpiceOrSeasoning
              );

              return (
                <div
                  key={ing.ingredientId}
                  className="py-2.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={
                        ingMeta?.imageUrl ||
                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80'
                      }
                      alt={effectiveName}
                      className="w-9 h-9 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-stone-900 truncate">
                          {effectiveName}
                        </span>
                        {isPerishable && (
                          <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded-full shrink-0">
                            Romlandó
                          </span>
                        )}
                        {isSubstituted && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full shrink-0">
                            Helyettesítve
                          </span>
                        )}
                      </div>
                      {ing.optional && (
                        <span className="text-[11px] text-stone-600 italic block">
                          opcionális
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-stone-900 bg-stone-50 px-2 py-1 rounded-lg border border-stone-100">
                      {displayAmount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Lépések előnézete */}
        <section className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-soft">
          <h2 className="text-sm font-extrabold text-stone-900 mb-3">
            Elkészítés lépései ({recipe.steps.length} lépés)
          </h2>
          <div className="space-y-3">
            {recipe.steps.map((step) => {
              // Apply substitution to step text if any
              let stepText = step.instruction;
              Object.keys(activeSubstitutions).forEach((origId) => {
                if (activeSubstitutions[origId]) {
                  const sub = recipe.availableSubstitutions?.[origId];
                  if (sub?.stepReplacements) {
                    Object.entries(sub.stepReplacements).forEach(
                      ([fromWord, toWord]) => {
                        stepText = stepText.split(fromWord).join(toWord);
                      }
                    );
                  }
                }
              });

              return (
                <div key={step.stepNumber} className="flex gap-3 text-xs leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-[#C85A32]/10 text-[#C85A32] font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                    {step.stepNumber}
                  </span>
                  <div className="flex-1 text-stone-700">
                    {step.title && (
                      <strong className="text-stone-900 block mb-0.5">
                        {step.title}
                      </strong>
                    )}
                    <p>{stepText}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Fixed Bottom CTA: Főzés közben */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/95 to-transparent backdrop-blur-md z-40">
        <div className="max-w-md mx-auto flex gap-3">
          {allMatchesCount > 1 && (
            <button
              type="button"
              onClick={onNextRecipe}
              className="py-3.5 px-4 bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-bold rounded-2xl text-sm flex items-center justify-center gap-1.5 shadow-sm touch-press"
            >
              <Shuffle className="w-4 h-4 text-[#C85A32]" />
              <span>Másikat</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onStartCooking(servings)}
            className="flex-1 py-3.5 px-6 rounded-2xl font-extrabold text-base tracking-wide flex items-center justify-center gap-2.5 bg-[#C85A32] hover:bg-[#B34B25] text-white shadow-floating touch-press cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>FŐZÉS KÖZBEN</span>
          </button>
        </div>
      </div>
    </div>
  );
};

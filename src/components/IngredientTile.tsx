import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { Ingredient } from '../types';

interface IngredientTileProps {
  ingredient: Ingredient;
  isSelected: boolean;
  isPerishable: boolean;
  onToggleSelect: (id: string) => void;
  onTogglePerishable: (id: string) => void;
}

export const IngredientTile: React.FC<IngredientTileProps> = ({
  ingredient,
  isSelected,
  isPerishable,
  onToggleSelect,
  onTogglePerishable,
}) => {
  return (
    <div
      className={`relative group rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer select-none border-2 touch-press ${
        isSelected
          ? 'bg-white border-[#C85A32] shadow-md ring-2 ring-[#C85A32]/20'
          : 'bg-white/80 border-stone-200/80 hover:border-stone-300 opacity-90'
      }`}
      onClick={() => onToggleSelect(ingredient.id)}
    >
      {/* Red ribbon for perishables: "holnap" */}
      {isPerishable && isSelected && (
        <div className="absolute top-2 left-2 z-20 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 animate-pulse">
          <AlertCircle className="w-3 h-3 stroke-[2.5]" />
          <span>holnap</span>
        </div>
      )}

      {/* Round checkmark on top right */}
      <div
        className={`absolute top-2 right-2 z-20 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
          isSelected
            ? 'bg-[#C85A32] text-white shadow-sm scale-100'
            : 'bg-stone-100/90 text-transparent border border-stone-300 scale-90'
        }`}
      >
        <Check className="w-4 h-4 stroke-[3]" />
      </div>

      {/* Real Food Image */}
      <div className="w-full aspect-[4/3] bg-stone-100 overflow-hidden relative">
        <img
          src={ingredient.imageUrl}
          alt={ingredient.displayName}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isSelected ? 'scale-105' : 'grayscale-[20%] group-hover:scale-105'
          }`}
          loading="lazy"
          onError={(e) => {
            // Fallback food graphic if image fails
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
      </div>

      {/* Tile Details & Perishable Toggle */}
      <div className="p-2.5 flex flex-col justify-between gap-1.5 bg-white">
        <span
          className={`font-semibold text-sm leading-tight line-clamp-1 ${
            isSelected ? 'text-stone-900' : 'text-stone-600'
          }`}
        >
          {ingredient.displayName}
        </span>

        {/* Romlandó jelölő gomb (külön kattintható) */}
        {isSelected ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePerishable(ingredient.id);
            }}
            className={`w-full py-1 px-2 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-colors ${
              isPerishable
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>{isPerishable ? 'Romlandó (holnap)' : 'Hamar lejár?'}</span>
          </button>
        ) : (
          <div className="h-6 flex items-center text-[11px] text-stone-400">
            Kattints a pipáláshoz
          </div>
        )}
      </div>
    </div>
  );
};

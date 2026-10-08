export type UnitType = 'g' | 'dkg' | 'dl' | 'ek' | 'tk' | 'db' | 'csokor' | 'kóstolásra' | 'csipet';

export interface Ingredient {
  id: string;
  name: string; // lowercase match key, e.g. "csirkemell"
  displayName: string; // e.g. "Csirkemell"
  imageUrl: string;
  isPantryDefault?: boolean; // olaj, só, bors, cukor, liszt, ecet, víz
  aliases?: string[];
}

export interface RecipeIngredient {
  ingredientId: string;
  name: string;
  baseAmount: number;
  unit: UnitType;
  isSpiceOrSeasoning?: boolean; // só, bors, pirospaprika: above 8 servings becomes "kóstolásra"
  optional?: boolean;
}

export interface CookingStep {
  stepNumber: number;
  title?: string;
  instruction: string;
  imageUrl: string; // Action photo (slicing, frying pan, pouring, plating etc.)
  timerSeconds?: number;
  timerLabel?: string;
}

export interface SubstitutionRule {
  targetId: string;
  substituteId: string;
  substituteName: string;
  substituteUnit?: UnitType;
  amountMultiplier?: number;
  stepReplacements: Record<string, string>;
}

export interface Recipe {
  id: string;
  title: string;
  tagline: string;
  coverImage: string; // Large food photo of the finished dish
  prepTimeMinutes: number;
  baseServings: number; // default 4
  ingredients: RecipeIngredient[];
  steps: CookingStep[];
  availableSubstitutions?: Record<string, SubstitutionRule>;
}

export interface MatchResult {
  recipe: Recipe;
  usedPerishables: string[];
  missingPerishables: string[];
  matchedIngredients: string[];
  missingIngredients: {
    ingredientId: string;
    name: string;
    baseAmount: number;
    unit: UnitType;
    isSpiceOrSeasoning?: boolean;
    imageUrl: string;
    availableSubstitution?: SubstitutionRule;
  }[];
  allPerishablesUsed: boolean;
  missingCount: number; // excluding pantry if enabled
}

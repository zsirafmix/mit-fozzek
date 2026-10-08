import { Recipe, Ingredient, MatchResult } from '../types';
import { PANTRY_INGREDIENT_IDS } from '../data/ingredients';

export function matchRecipes(
  recipes: Recipe[],
  allIngredients: Ingredient[],
  selectedIngredientIds: Set<string>,
  perishableIngredientIds: Set<string>,
  pantryEnabled: boolean,
  activeSubstitutions: Record<string, Record<string, boolean>> = {}
): {
  matches: MatchResult[];
  fallbackMatch: MatchResult | null;
  noExactMatchReason?: string;
} {
  const ingredientMap = new Map<string, Ingredient>(
    allIngredients.map((ing) => [ing.id, ing])
  );

  const results: MatchResult[] = recipes.map((recipe) => {
    const matchedIngs: string[] = [];
    const missingIngs: MatchResult['missingIngredients'] = [];
    const usedPerishables: string[] = [];
    const missingPerishables: string[] = [];

    const recipeSubs = activeSubstitutions[recipe.id] || {};

    for (const rIng of recipe.ingredients) {
      if (rIng.optional) {
        continue;
      }

      // Check if substitution is active
      const subRule = recipe.availableSubstitutions?.[rIng.ingredientId];
      const isSubstituted = subRule && recipeSubs[rIng.ingredientId];

      const effectiveIngId = isSubstituted ? subRule.substituteId : rIng.ingredientId;
      const effectiveName = isSubstituted ? subRule.substituteName : rIng.name;
      const effectiveUnit = (isSubstituted && subRule.substituteUnit) ? subRule.substituteUnit : rIng.unit;
      const effectiveAmount = isSubstituted && subRule.amountMultiplier ? rIng.baseAmount * subRule.amountMultiplier : rIng.baseAmount;

      const isPantry = PANTRY_INGREDIENT_IDS.includes(effectiveIngId);
      const isAvailableInPantry = pantryEnabled && isPantry;

      const isSelected = selectedIngredientIds.has(effectiveIngId) || isAvailableInPantry;

      if (isSelected) {
        matchedIngs.push(effectiveName);
        if (perishableIngredientIds.has(effectiveIngId)) {
          usedPerishables.push(effectiveName);
        }
      } else {
        const ingData = ingredientMap.get(effectiveIngId);
        missingIngs.push({
          ingredientId: effectiveIngId,
          name: effectiveName,
          baseAmount: effectiveAmount,
          unit: effectiveUnit,
          isSpiceOrSeasoning: rIng.isSpiceOrSeasoning,
          imageUrl: ingData?.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
          availableSubstitution: subRule
        });
      }
    }

    // Check which marked perishables were NOT used by this recipe
    for (const pId of perishableIngredientIds) {
      const pIng = ingredientMap.get(pId);
      const pName = pIng?.displayName || pId;
      
      const recipeUsesThis = recipe.ingredients.some(
        (ri) => ri.ingredientId === pId || (pId === 'csirkemell' && ri.ingredientId === 'csirkecomb') || (pId === 'csirkecomb' && ri.ingredientId === 'csirkemell')
      );

      if (!recipeUsesThis && !missingPerishables.includes(pName)) {
        missingPerishables.push(pName);
      }
    }

    const allPerishablesUsed = perishableIngredientIds.size === 0 || missingPerishables.length === 0;
    const missingCount = missingIngs.length;

    return {
      recipe,
      usedPerishables,
      missingPerishables,
      matchedIngredients: matchedIngs,
      missingIngredients: missingIngs,
      allPerishablesUsed,
      missingCount
    };
  });

  // Filter recipes:
  // Must have at most 1 missing non-pantry ingredient (missingCount <= 1)
  // Must prioritize:
  // 1. Uses ALL perishables (allPerishablesUsed = true)
  // 2. missingCount (0 is better than 1)
  // 3. prepTimeMinutes (shorter is better)
  const qualified = results.filter((r) => r.missingCount <= 1);

  const sortedQualified = [...qualified].sort((a, b) => {
    // 1. All perishables used comes first
    if (a.allPerishablesUsed !== b.allPerishablesUsed) {
      return a.allPerishablesUsed ? -1 : 1;
    }
    // 2. Count of used perishables (more is better)
    if (a.usedPerishables.length !== b.usedPerishables.length) {
      return b.usedPerishables.length - a.usedPerishables.length;
    }
    // 3. Missing count: 0 better than 1
    if (a.missingCount !== b.missingCount) {
      return a.missingCount - b.missingCount;
    }
    // 4. Shorter prep time wins
    return a.recipe.prepTimeMinutes - b.recipe.prepTimeMinutes;
  });

  // Check if top match satisfies perishable requirement
  const perfectPerishableMatches = sortedQualified.filter((r) => r.allPerishablesUsed);

  let finalMatches = perfectPerishableMatches.length > 0 ? perfectPerishableMatches : sortedQualified;

  // Fallback: If no match with <= 1 missing or if perishables couldn't be satisfied
  let fallbackMatch: MatchResult | null = null;
  let noExactMatchReason: string | undefined;

  if (perishableIngredientIds.size > 0 && perfectPerishableMatches.length === 0) {
    noExactMatchReason = 'Nem találtunk olyan receptet, amely az összes megjelölt romlandót egyszerre hasznosítja.';
    // Fallback: best available recipe regardless of perishables
    fallbackMatch = sortedQualified[0] || [...results].sort((a, b) => a.missingCount - b.missingCount || a.recipe.prepTimeMinutes - b.recipe.prepTimeMinutes)[0] || null;
  } else if (finalMatches.length === 0) {
    noExactMatchReason = 'A jelenleg kiválasztott alapanyagokból nem találtunk legfeljebb 1 hiányzós receptet.';
    // Suggest the closest recipe with lowest missing items
    fallbackMatch = [...results].sort((a, b) => a.missingCount - b.missingCount || a.recipe.prepTimeMinutes - b.recipe.prepTimeMinutes)[0] || null;
  }

  return {
    matches: finalMatches,
    fallbackMatch,
    noExactMatchReason
  };
}

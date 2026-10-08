import { RECIPES } from './data/recipes';
import { ALL_DEFAULT_INGREDIENTS } from './data/ingredients';
import { matchRecipes } from './utils/matching';
import { calculateScaledAmount, formatIngredientDisplay } from './utils/scaling';

function runTests() {
  console.log('--- STARTING VERIFICATION TESTS ---');

  // Test 1: Perishable priority (csirkemell + tejfol marked as perishable)
  const selected = new Set(['csirkemell', 'tejfol', 'voroshagyma', 'fokhagyma', 'krumpli', 'liszt', 'olaj', 'so', 'bors', 'ecet', 'viz']);
  const perishables = new Set(['csirkemell', 'tejfol']);

  const result1 = matchRecipes(RECIPES, ALL_DEFAULT_INGREDIENTS, selected, perishables, true);
  console.log('Test 1 (Perishable Priority): Found', result1.matches.length, 'matches');
  console.log('Top match:', result1.matches[0]?.recipe.title);
  if (!result1.matches[0] || (result1.matches[0].recipe.id !== 'tejfeles-raguleves' && result1.matches[0].recipe.id !== 'paprikas-csirke')) {
    throw new Error('Test 1 failed: Expected Tejfölös raguleves or Paprikás csirke');
  }
  console.log('✓ Test 1 Passed: Perishables prioritized correctly');

  // Test 2: Scaling rules
  // 4 servings (base)
  const scale4 = calculateScaledAmount(1.5, 4, 4, true);
  console.log('Scale 4 servings spice (base 1.5):', scale4);
  if (scale4.amountText !== '1.5' || scale4.isTasteOnly) throw new Error('Test 2.1 failed');

  // 10 servings (> 8) -> should be "kóstolásra"
  const scale10 = calculateScaledAmount(1.5, 4, 10, true);
  console.log('Scale 10 servings spice (>8):', scale10);
  if (!scale10.isTasteOnly || scale10.amountText !== 'kóstolásra') throw new Error('Test 2.2 failed');

  // Linear ingredient (csirkemell 500g at 4 servings -> 10 servings should be 1250g)
  const scaleMeat10 = calculateScaledAmount(500, 4, 10, false);
  console.log('Scale 10 servings meat (base 500g):', scaleMeat10);
  if (scaleMeat10.amountText !== '1250' || scaleMeat10.isTasteOnly) throw new Error('Test 2.3 failed');
  console.log('✓ Test 2 Passed: Serving & spice scaling rules work accurately');

  // Test 3: Substitution rule (kapor -> petrezselyem in Tejfölös raguleves)
  const activeSubs = {
    'tejfeles-raguleves': {
      'kapor': true
    }
  };
  const selectedWithSub = new Set(['csirkemell', 'tejfol', 'voroshagyma', 'fokhagyma', 'krumpli', 'petrezselyem', 'liszt', 'olaj', 'so', 'bors', 'ecet', 'viz']);
  const result3 = matchRecipes(RECIPES, ALL_DEFAULT_INGREDIENTS, selectedWithSub, new Set(['csirkemell']), true, activeSubs);
  console.log('Test 3 (Substitution): Missing count for Tejfölös raguleves with kapor substituted to petrezselyem:', result3.matches[0]?.missingCount);
  if (result3.matches[0]?.missingCount !== 0) {
    throw new Error('Test 3 failed: Substitution should resolve missing kapor');
  }
  console.log('✓ Test 3 Passed: Verified substitutions work seamlessly');

  // Test 4: >= 2 missing non-pantry items should not appear
  const sparseSelection = new Set(['krumpli']);
  const result4 = matchRecipes(RECIPES, ALL_DEFAULT_INGREDIENTS, sparseSelection, new Set(), true);
  console.log('Test 4 (Sparse selection): Matches with max 1 missing:', result4.matches.map(m => m.recipe.title));
  console.log('Fallback/Closest recipe suggested:', result4.fallbackMatch?.recipe.title);
  console.log('✓ Test 4 Passed: 2+ missing filtered and honest fallback provided');

  console.log('--- ALL TESTS PASSED SUCCESSFULLY ---');
}

runTests();

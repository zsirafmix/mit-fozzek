import React, { useState, useEffect, useMemo } from 'react';
import { Ingredient, MatchResult, Recipe } from './types';
import { INITIAL_INGREDIENTS, PANTRY_INGREDIENTS } from './data/ingredients';
import { RECIPES } from './data/recipes';
import { matchRecipes } from './utils/matching';
import { ScreenFridge } from './components/ScreenFridge';
import { ScreenResult } from './components/ScreenResult';
import { ScreenCooking } from './components/ScreenCooking';

type ActiveScreen = 'fridge' | 'result' | 'cooking';

const STORAGE_KEYS = {
  SELECTED: 'mit_fozzek_selected_v1',
  PERISHABLE: 'mit_fozzek_perishable_v1',
  PANTRY_ENABLED: 'mit_fozzek_pantry_v1',
  CUSTOM_INGREDIENTS: 'mit_fozzek_custom_ings_v1',
  ACTIVE_SUBS: 'mit_fozzek_subs_v1',
};

export const App: React.FC = () => {
  // Screen state
  const [screen, setScreen] = useState<ActiveScreen>('fridge');

  // Ingredients state
  const [customIngredients, setCustomIngredients] = useState<Ingredient[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_INGREDIENTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const allIngredients = useMemo(() => {
    return [...INITIAL_INGREDIENTS, ...PANTRY_INGREDIENTS, ...customIngredients];
  }, [customIngredients]);

  // Selected & Perishable states
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SELECTED);
      if (saved) return new Set(JSON.parse(saved));
      // Default initial pre-selection: csirkemell, tejföl, vöröshagyma, fokhagyma, tojás
      return new Set(['csirkemell', 'tejfol', 'voroshagyma', 'fokhagyma', 'tojas']);
    } catch {
      return new Set(['csirkemell', 'tejfol', 'voroshagyma', 'fokhagyma', 'tojas']);
    }
  });

  const [perishableIngredientIds, setPerishableIngredientIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PERISHABLE);
      if (saved) return new Set(JSON.parse(saved));
      // Default perishable pre-selected: csirkemell, tejfol
      return new Set(['csirkemell', 'tejfol']);
    } catch {
      return new Set(['csirkemell', 'tejfol']);
    }
  });

  // Pantry toggle (default true)
  const [pantryEnabled, setPantryEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PANTRY_ENABLED);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Active substitutions per recipe: { [recipeId]: { [originalId]: boolean } }
  const [activeSubstitutions, setActiveSubstitutions] = useState<
    Record<string, Record<string, boolean>>
  >(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_SUBS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Current selected match index
  const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);

  // Cooking mode active servings
  const [cookingServings, setCookingServings] = useState<number>(4);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.SELECTED,
      JSON.stringify(Array.from(selectedIngredientIds))
    );
  }, [selectedIngredientIds]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.PERISHABLE,
      JSON.stringify(Array.from(perishableIngredientIds))
    );
  }, [perishableIngredientIds]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.PANTRY_ENABLED,
      JSON.stringify(pantryEnabled)
    );
  }, [pantryEnabled]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.CUSTOM_INGREDIENTS,
      JSON.stringify(customIngredients)
    );
  }, [customIngredients]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.ACTIVE_SUBS,
      JSON.stringify(activeSubstitutions)
    );
  }, [activeSubstitutions]);

  // Handlers for Screen 1
  const toggleSelectIngredient = (id: string) => {
    setSelectedIngredientIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        // If unselecting, also unmark as perishable
        setPerishableIngredientIds((pPrev) => {
          const pNext = new Set(pPrev);
          pNext.delete(id);
          return pNext;
        });
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const togglePerishableIngredient = (id: string) => {
    setPerishableIngredientIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // Ensure it is selected if marked as perishable
        setSelectedIngredientIds((sPrev) => new Set(sPrev).add(id));
      }
      return next;
    });
  };

  const togglePantry = () => {
    setPantryEnabled((prev) => !prev);
  };

  const handleAddNewIngredient = (name: string) => {
    const clean = name.trim().toLowerCase();
    if (!clean) return;

    // Check if already exists in allIngredients
    const existing = allIngredients.find(
      (i) => i.name.toLowerCase() === clean || i.displayName.toLowerCase() === clean
    );

    if (existing) {
      setSelectedIngredientIds((prev) => new Set(prev).add(existing.id));
      return;
    }

    // Auto-generate curated food image based on keyword
    let foodImg = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
    if (clean.includes('gomba')) {
      foodImg = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80';
    } else if (clean.includes('hal') || clean.includes('tonhal')) {
      foodImg = 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=400&q=80';
    } else if (clean.includes('zöldség') || clean.includes('répa')) {
      foodImg = 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80';
    }

    const newIng: Ingredient = {
      id: `custom_${Date.now()}`,
      name: clean,
      displayName: name.charAt(0).toUpperCase() + name.slice(1),
      imageUrl: foodImg,
    };

    setCustomIngredients((prev) => [...prev, newIng]);
    setSelectedIngredientIds((prev) => new Set(prev).add(newIng.id));
  };

  // Perform Recipe Matching
  const matchOutcome = useMemo(() => {
    return matchRecipes(
      RECIPES,
      allIngredients,
      selectedIngredientIds,
      perishableIngredientIds,
      pantryEnabled,
      activeSubstitutions
    );
  }, [
    allIngredients,
    selectedIngredientIds,
    perishableIngredientIds,
    pantryEnabled,
    activeSubstitutions,
  ]);

  const activeMatches = matchOutcome.matches;
  const fallbackMatch = matchOutcome.fallbackMatch;

  // Determine current active match
  const currentMatchResult: MatchResult | null = useMemo(() => {
    if (activeMatches.length > 0) {
      const idx = currentMatchIndex % activeMatches.length;
      return activeMatches[idx];
    }
    return fallbackMatch;
  }, [activeMatches, currentMatchIndex, fallbackMatch]);

  const handleFindRecipe = () => {
    setCurrentMatchIndex(0);
    setScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextRecipe = () => {
    if (activeMatches.length > 1) {
      setCurrentMatchIndex((prev) => (prev + 1) % activeMatches.length);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleSubstitution = (recipeId: string, originalId: string) => {
    setActiveSubstitutions((prev) => {
      const recipeSubs = prev[recipeId] || {};
      const currentVal = recipeSubs[originalId] || false;
      return {
        ...prev,
        [recipeId]: {
          ...recipeSubs,
          [originalId]: !currentVal,
        },
      };
    });
  };

  const handleStartCooking = (servings: number) => {
    setCookingServings(servings);
    setScreen('cooking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans">
      {screen === 'fridge' && (
        <ScreenFridge
          allIngredients={allIngredients}
          selectedIngredientIds={selectedIngredientIds}
          perishableIngredientIds={perishableIngredientIds}
          pantryEnabled={pantryEnabled}
          onToggleSelect={toggleSelectIngredient}
          onTogglePerishable={togglePerishableIngredient}
          onTogglePantry={togglePantry}
          onAddNewIngredient={handleAddNewIngredient}
          onFindRecipe={handleFindRecipe}
        />
      )}

      {screen === 'result' && currentMatchResult && (
        <ScreenResult
          matchResult={currentMatchResult}
          allMatchesCount={activeMatches.length}
          currentMatchIndex={currentMatchIndex % (activeMatches.length || 1)}
          allIngredients={allIngredients}
          perishableIngredientIds={perishableIngredientIds}
          activeSubstitutions={activeSubstitutions[currentMatchResult.recipe.id] || {}}
          isFallback={activeMatches.length === 0}
          noMatchReason={matchOutcome.noExactMatchReason}
          onNextRecipe={handleNextRecipe}
          onBackToFridge={() => setScreen('fridge')}
          onStartCooking={handleStartCooking}
          onToggleSubstitution={handleToggleSubstitution}
        />
      )}

      {screen === 'cooking' && currentMatchResult && (
        <ScreenCooking
          recipe={currentMatchResult.recipe}
          servings={cookingServings}
          activeSubstitutions={activeSubstitutions[currentMatchResult.recipe.id] || {}}
          onExit={() => setScreen('result')}
        />
      )}
    </div>
  );
};

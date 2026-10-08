import { UnitType } from '../types';

export function calculateScaledAmount(
  baseAmount: number,
  baseServings: number,
  targetServings: number,
  isSpiceOrSeasoning?: boolean
): { amountText: string; isTasteOnly: boolean } {
  if (isSpiceOrSeasoning && targetServings > 8) {
    return { amountText: 'kóstolásra', isTasteOnly: true };
  }

  const factor = targetServings / baseServings;
  const rawValue = baseAmount * factor;

  // Format decimal numbers nicely
  let formatted: string;
  if (Number.isInteger(rawValue)) {
    formatted = rawValue.toString();
  } else if (rawValue < 1) {
    // 0.25 -> 1/4, 0.5 -> 1/2, 0.75 -> 3/4 or 1 decimal place
    if (Math.abs(rawValue - 0.5) < 0.05) formatted = '1/2';
    else if (Math.abs(rawValue - 0.25) < 0.05) formatted = '1/4';
    else if (Math.abs(rawValue - 0.75) < 0.05) formatted = '3/4';
    else if (Math.abs(rawValue - 0.33) < 0.05) formatted = '1/3';
    else formatted = rawValue.toFixed(1).replace('.0', '');
  } else {
    // e.g. 1.5, 2.25
    const rounded = Math.round(rawValue * 10) / 10;
    formatted = rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1);
  }

  return { amountText: formatted, isTasteOnly: false };
}

export function formatIngredientDisplay(
  baseAmount: number,
  unit: UnitType,
  baseServings: number,
  targetServings: number,
  isSpiceOrSeasoning?: boolean
): string {
  const { amountText, isTasteOnly } = calculateScaledAmount(
    baseAmount,
    baseServings,
    targetServings,
    isSpiceOrSeasoning
  );

  if (isTasteOnly) {
    return 'Ízlés szerint (kóstolásra)';
  }

  return `${amountText} ${unit}`;
}

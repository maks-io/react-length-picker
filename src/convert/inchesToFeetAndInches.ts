import { FeetAndInches } from "$/types/FeetAndInches";

export const inchesToFeetAndInches = (
  inches: number,
  roundInches = false,
): FeetAndInches => {
  if (inches < 0) {
    const positiveValue: FeetAndInches = inchesToFeetAndInches(
      inches * -1,
      roundInches,
    );
    return { feet: positiveValue.feet * -1, inches: positiveValue.inches * -1 };
  }

  const usedInches = roundInches ? Math.round(inches) : inches;
  return {
    feet: Math.floor(usedInches / 12),
    inches: usedInches % 12,
  };
};

import { FeetAndInches } from "$/types/FeetAndInches";

export const inchesToFeetAndInches = (
  inches: number,
  roundInches = false,
): FeetAndInches => {
  const usedInches = roundInches ? Math.round(inches) : inches;
  return {
    feet: Math.floor(usedInches / 12),
    inches: usedInches % 12,
  };
};

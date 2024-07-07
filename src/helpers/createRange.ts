import lodashRange from "lodash.range";

export const createRange = (
  min: number,
  max: number,
  step: number,
  ascending: boolean,
): number[] => {
  const range = lodashRange(min, max + step, step);
  return ascending ? range : range.reverse();
};

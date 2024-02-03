export const getClosestInRange = (range: number[], value: number): number =>
  range
    .map((rangeVal) => ({ rangeVal, diff: Math.abs(rangeVal - value) }))
    .sort((a, b) => a.diff - b.diff)[0].rangeVal;

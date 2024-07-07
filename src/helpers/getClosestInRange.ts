export const getClosestInRange = (range: number[], value: number): number => {
  const sortedList = range
    .map((rangeVal) => ({ rangeVal, diff: Math.abs(rangeVal - value) }))
    .sort((a, b) => a.diff - b.diff);

  return sortedList[0].rangeVal;
};

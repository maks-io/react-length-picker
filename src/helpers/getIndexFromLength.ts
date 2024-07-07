import { getClosestInRange } from "$/helpers/getClosestInRange";

export const getIndexFromLength = (range: number[], length: number) => {
  let index = range.indexOf(length);
  if (index === -1) {
    index = range.indexOf(getClosestInRange(range, length));
  }
  return index;
};

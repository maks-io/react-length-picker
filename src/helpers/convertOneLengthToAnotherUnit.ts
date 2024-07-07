import { imperialToMetric } from "$/convert/imperialToMetric";
import { metricToImperial } from "$/convert/metricToImperial";
import { getClosestInRange } from "$/helpers/getClosestInRange";
import { Unit } from "$/types/Unit";
import { createRange } from "$/helpers/createRange";

interface RangeData {
  min: number;
  max: number;
  step: number;
}

export const convertOneLengthToAnotherUnit = (
  metricRange: RangeData,
  imperialRange: RangeData,
  ascending: boolean,
  oldValue: number,
  newUnit: Unit,
) => {
  const rangeMetric = createRange(
    metricRange.min,
    metricRange.max,
    metricRange.step,
    ascending,
  );
  const rangeImperial = createRange(
    imperialRange.min,
    imperialRange.max,
    imperialRange.step,
    ascending,
  );

  const oldRange = newUnit === "imperial" ? rangeMetric : rangeImperial;
  const oldLengthSanitized = getClosestInRange(oldRange, oldValue);
  const valueFromOtherRangeInNewUnit =
    newUnit === "metric"
      ? imperialToMetric(oldLengthSanitized)
      : metricToImperial(oldLengthSanitized);

  const newRange = newUnit === "imperial" ? rangeImperial : rangeMetric;
  return getClosestInRange(newRange, valueFromOtherRangeInNewUnit);
};

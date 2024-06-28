import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ListEntry } from "$/components/ListEntry";
import lodashRange from "lodash.range";
import { imperialToMetric } from "$/convert/imperialToMetric";
import { metricToImperial } from "$/convert/metricToImperial";
import { getClosestInRange } from "$/helpers/getClosestInRange";
import { ListProps } from "$/types/ListProps";

const SCROLL_TO_OFFSET = 0;

export const List = ({
  entryHeight,
  rootMargin,
  metricStep,
  metricMin,
  metricMax,
  metricFormatter,
  imperialStep,
  imperialMin,
  imperialMax,
  imperialFormatter,
  onLengthChange,
  defaultLength,
  containerHeight,
  unit,
  ascending,
  entryContainerStyle,
  entryContentStyle,
  containerStyle,
  onUnitChange,
  disabled,
}: ListProps) => {
  const [usedUnit, setUsedUnit] = useState(unit);
  const ref = useRef<HTMLDivElement>();
  const [currentLengths, setCurrentLengths] = useState([defaultLength]);

  const numberRange = useMemo(() => {
    if (unit === "imperial") {
      if (ascending) {
        return lodashRange(
          imperialMin,
          imperialMax + imperialStep,
          imperialStep,
        );
      } else {
        return lodashRange(
          imperialMin,
          imperialMax + imperialStep,
          imperialStep,
        ).reverse();
      }
    } else {
      if (ascending) {
        return lodashRange(metricMin, metricMax + metricStep, metricStep);
      } else {
        return lodashRange(
          metricMin,
          metricMax + metricStep,
          metricStep,
        ).reverse();
      }
    }
  }, [
    ascending,
    unit,
    metricMin,
    metricMax,
    metricStep,
    imperialMin,
    imperialMax,
    imperialStep,
  ]);

  const scrollContainer = useCallback(
    (numberRange: number[], value: number, smooth = false) => {
      const top =
        numberRange.indexOf(value) * entryHeight +
        containerHeight / 2.5 -
        entryHeight / 2 -
        SCROLL_TO_OFFSET;
      ref.current.scrollTo({
        top,
        left: 0,
        behavior: smooth ? "smooth" : "instant",
      });
    },
    [entryHeight, containerHeight],
  );

  useEffect(() => {
    if (currentLengths.length === 1) {
      onLengthChange(currentLengths[0]);
    }
  }, [currentLengths]);

  useEffect(() => {
    if (!currentLengths || currentLengths.length !== 1) {
      return;
    }
    if (usedUnit === unit) {
      return;
    }
    const valueFromPrevRange = currentLengths[0];
    const valueFromOtherRangeInCurrentUnit =
      unit === "metric"
        ? imperialToMetric(valueFromPrevRange)
        : metricToImperial(valueFromPrevRange);
    let currentRange =
      unit === "metric"
        ? lodashRange(metricMin, metricMax + metricStep, metricStep)
        : lodashRange(imperialMin, imperialMax + imperialStep, imperialStep);
    if (!ascending) {
      currentRange = currentRange.reverse();
    }
    const closestInRange = getClosestInRange(
      currentRange,
      valueFromOtherRangeInCurrentUnit,
    );

    scrollContainer(currentRange, closestInRange, false);
    setCurrentLengths([closestInRange]);
    onUnitChange(unit);
    setUsedUnit(unit);
  }, [unit, usedUnit, currentLengths]);

  useEffect(() => {
    scrollContainer(numberRange, defaultLength);
  }, []);

  useEffect(() => {
    if (!currentLengths || currentLengths.length !== 1) {
      return;
    }
    if (currentLengths[0] === defaultLength) {
      return;
    }
    scrollContainer(numberRange, defaultLength);
  }, [defaultLength]);

  return (
    <div
      ref={ref}
      className={"scroll-list"}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowX: "hidden",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        border: "black 3px solid",
        filter: disabled ? "grayscale(1)" : "grayscale(0)",
        ...containerStyle,
      }}
    >
      {numberRange.map((m: number, index: number) => (
        <ListEntry
          key={`entry-${m}`}
          index={index}
          unit={unit}
          currentLengths={currentLengths}
          setCurrentLengths={setCurrentLengths}
          rootMargin={rootMargin}
          parentRef={ref}
          value={m}
          entryHeight={entryHeight}
          metricFormatter={metricFormatter}
          imperialFormatter={imperialFormatter}
          isFirst={index === 0}
          isLast={index === numberRange.length - 1}
          containerHeight={containerHeight}
          entryContainerStyle={entryContainerStyle}
          entryContentStyle={entryContentStyle}
          disabled={disabled}
        />
      ))}
      <style>{`
               .scroll-list {
                   -ms-overflow-style: none;
                   scrollbar-width: none;
               }
               .scroll-list::-webkit-scrollbar {
                   display: none;      
               }
        `}</style>
    </div>
  );
};

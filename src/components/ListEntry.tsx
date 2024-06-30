import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { metricToImperial } from "$/convert/metricToImperial";
import { inchesToFeetAndInches } from "$/convert/inchesToFeetAndInches";
import { imperialToMetric } from "$/convert/imperialToMetric";
import { ListEntryProps } from "$/types/ListEntryProps";
import { ListEntryCore } from "$/components/ListEntryCore";

export const ListEntry = ({
  value,
  parentRef,
  entryHeight,
  rootMargin,
  setCurrentLengths,
  currentLengths,
  metricFormatter,
  isFirst,
  isLast,
  containerHeight,
  imperialFormatter,
  unit,
  index,
  entryContainerStyle = {},
  entryContentStyle = {},
  disabled,
}: ListEntryProps) => {
  const [ref, inView] = useInView({
    rootMargin,
    threshold: 1,
    root: parentRef.current,
  });

  useEffect(() => {
    if (inView && !currentLengths.includes(value)) {
      setCurrentLengths((prevState) => [...prevState, value]);
    } else if (!inView && currentLengths.includes(value)) {
      setCurrentLengths((prevState) => prevState.filter((v) => v !== value));
    }
    return () => {
      setCurrentLengths((prevState) => prevState.filter((v) => v !== value));
    };
  }, [inView]);

  const metricValue = useMemo(
    () => (unit === "metric" ? value : imperialToMetric(value)),
    [unit, value],
  );

  const metricValueFormatted = useMemo(() => {
    return metricFormatter(unit === "metric", metricValue, index, disabled);
  }, [unit, metricFormatter, index, metricValue, disabled]);

  const imperialValue = useMemo(
    () => (unit === "imperial" ? value : metricToImperial(value)),
    [unit, value],
  );

  const imperialValueFormatted = useMemo(() => {
    const feetAndInches = inchesToFeetAndInches(imperialValue, true);
    return imperialFormatter(
      unit === "imperial",
      imperialValue,
      feetAndInches,
      index,
      disabled,
    );
  }, [unit, imperialFormatter, index, imperialValue, disabled]);

  const entryContainerStyleEffective =
    typeof entryContainerStyle === "function"
      ? entryContainerStyle(index, metricValue, imperialValue, inView, disabled)
      : entryContainerStyle;

  const entryContentStyleEffective =
    typeof entryContentStyle === "function"
      ? entryContentStyle(index, metricValue, imperialValue, inView, disabled)
      : entryContentStyle;

  return (
    <ListEntryCore
      refFromParent={ref}
      index={index}
      disabled={disabled}
      metricValue={metricValue}
      imperialValue={imperialValue}
      inView={inView}
      metricValueFormatted={metricValueFormatted}
      imperialValueFormatted={imperialValueFormatted}
      unit={unit}
      isFirst={isFirst}
      isLast={isLast}
      containerHeight={containerHeight}
      entryHeight={entryHeight}
      entryContainerStyleEffective={entryContainerStyleEffective}
      entryContentStyleEffective={entryContentStyleEffective}
    />
  );
};

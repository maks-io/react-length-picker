import React, { memo, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { metricToImperial } from "$/convert/metricToImperial";
import { inchesToFeetAndInches } from "$/convert/inchesToFeetAndInches";
import { SecondaryListEntry } from "$/components/SecondaryListEntry";
import { imperialToMetric } from "$/convert/imperialToMetric";
import { ListEntryProps } from "$/types/ListEntryProps";

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
    return metricFormatter(unit === "metric", metricValue, index);
  }, [unit, metricFormatter, index, metricValue]);

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
    );
  }, [unit, imperialFormatter, index, imperialValue]);

  const entryContainerStyleEffective =
    typeof entryContainerStyle === "function"
      ? entryContainerStyle(index, metricValue, imperialValue, inView)
      : entryContainerStyle;

  const entryContentStyleEffective =
    typeof entryContentStyle === "function"
      ? entryContentStyle(index, metricValue, imperialValue, inView)
      : entryContentStyle;

  return (
    <div
      className={"noselect"}
      ref={ref}
      style={{
        position: "relative",
        minHeight: entryHeight,
        fontSize: 24,
        fontWeight: "bold",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        scrollSnapAlign: "center",
        ...entryContainerStyleEffective,
        marginTop: isFirst ? containerHeight / 2 - entryHeight / 2 : undefined,
        marginBottom: isLast
          ? containerHeight / 2 - entryHeight / 2
          : undefined,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: inView ? 1 : 0.35,
          transition: "opacity 0.5s",
          zIndex: 2,
          ...entryContentStyleEffective,
        }}
      >
        {unit === "metric" ? metricValueFormatted : imperialValueFormatted}
        <SecondaryListEntry>
          {unit === "metric" ? imperialValueFormatted : metricValueFormatted}
        </SecondaryListEntry>
      </div>
    </div>
  );
};

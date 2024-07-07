import React, { useMemo } from "react";
import { metricToImperial } from "$/convert/metricToImperial";
import { inchesToFeetAndInches } from "$/convert/inchesToFeetAndInches";
import { imperialToMetric } from "$/convert/imperialToMetric";
import { ListEntryProps } from "$/types/ListEntryProps";
import { SecondaryListEntry } from "$/components/SecondaryListEntry";

export const ListEntry = ({
  value,
  entryHeight,
  metricFormatter,
  imperialFormatter,
  unit,
  index,
  entryContainerStyle = {},
  entryContentStyle = {},
  disabled,
  visibilityStatus,
}: ListEntryProps) => {
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
    const feetAndInches = inchesToFeetAndInches(imperialValue, false);
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
      ? entryContainerStyle(
          index,
          metricValue,
          imperialValue,
          visibilityStatus,
          disabled,
        )
      : entryContainerStyle;

  const entryContentStyleEffective =
    typeof entryContentStyle === "function"
      ? entryContentStyle(
          index,
          metricValue,
          imperialValue,
          visibilityStatus,
          disabled,
        )
      : entryContentStyle;

  return (
    <div
      className={"noselect"}
      style={{
        position: "relative",
        minHeight: entryHeight,
        fontSize: 24,
        fontWeight: "bold",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...entryContainerStyleEffective,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: visibilityStatus === "CENTERED_EXACTLY" ? 1 : 0.35,
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

import { SecondaryListEntry } from "$/components/SecondaryListEntry";
import React, { memo, ReactNode } from "react";

interface ListEntryCoreProps {
  refFromParent: (node?: Element | null) => void;
  unit: "metric" | "imperial";
  isFirst: boolean;
  isLast: boolean;
  containerHeight: number;
  entryHeight: number;
  entryContainerStyleEffective: React.CSSProperties;
  entryContentStyleEffective: React.CSSProperties;
  inView: boolean;
  metricValueFormatted: string | number | ReactNode;
  imperialValueFormatted: string | number | React.ReactNode;
  index?: number; // passed in only for memo check
  disabled?: boolean; // passed in only for memo check
  metricValue?: number; // passed in only for memo check
  imperialValue?: number; // passed in only for memo check
}

export const ListEntryCore = memo(
  ({
    unit,
    isFirst,
    isLast,
    containerHeight,
    refFromParent,
    entryHeight,
    entryContainerStyleEffective,
    entryContentStyleEffective,
    inView,
    metricValueFormatted,
    imperialValueFormatted,
    index,
    disabled,
    metricValue,
    imperialValue,
  }: ListEntryCoreProps) => {
    return (
      <div
        className={"noselect"}
        ref={refFromParent}
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
          marginTop: isFirst
            ? containerHeight / 2 - entryHeight / 2
            : undefined,
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
  },
  (prevProps, nextProps) => {
    const {
      refFromParent: rPrev,
      metricValueFormatted: mPrev,
      imperialValueFormatted: iPrev,
      ...prefRest
    } = prevProps;
    const {
      refFromParent: rNext,
      metricValueFormatted: mNext,
      imperialValueFormatted: iNext,
      ...nextRest
    } = nextProps;
    return JSON.stringify(prefRest) === JSON.stringify(nextRest);
  },
);

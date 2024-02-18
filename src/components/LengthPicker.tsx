import { ReactLengthPickerProps } from "$/types/ReactLengthPickerProps";
import React from "react";
import { List } from "$/components/List";
import { FeetAndInches } from "$/types/FeetAndInches";

const fontSizePrimary = 18;
const fontSizeSecondary = 9;

export const LengthPicker = ({
  containerWidth = 160,
  containerHeight = 80,
  entryHeight = 40,
  defaultLength = 350,
  unit = "metric",
  onLengthChange = () => {},
  onUnitChange = () => {},
  metricStep = 1,
  metricMin = 300,
  metricMax = 400,
  metricFormatter = (
    isPrimary: boolean,
    centimeters: number,
    index: number,
  ) => (
    <>
      <span
        style={{
          fontSize: isPrimary ? fontSizePrimary : fontSizeSecondary,
          fontWeight: "bold",
        }}
      >
        {isPrimary ? centimeters : `~${Math.round(centimeters)}`}
      </span>
      <span
        style={{
          marginLeft: 2,
          fontSize: isPrimary ? fontSizePrimary : fontSizeSecondary,
          fontWeight: "normal",
        }}
      >
        <small>cm</small>
      </span>
    </>
  ),
  imperialStep = 1,
  imperialMin = 118,
  imperialMax = 157,
  imperialFormatter = (
    isPrimary: boolean,
    inchesOnly: number,
    feetAndInches: FeetAndInches,
  ) => (
    <>
      <span
        style={{
          fontSize: isPrimary ? fontSizePrimary : fontSizeSecondary,
          fontWeight: "bold",
        }}
      >
        {isPrimary ? feetAndInches.feet : `~${feetAndInches.feet}`}
      </span>
      <span
        style={{
          fontSize: isPrimary ? fontSizePrimary : fontSizeSecondary,
          fontWeight: "normal",
        }}
      >
        ′
      </span>
      <span
        style={{
          fontSize: isPrimary ? fontSizePrimary : fontSizeSecondary,
          fontWeight: "bold",
        }}
      >
        {isPrimary ? feetAndInches.inches : Math.round(feetAndInches.inches)}
      </span>
      <span
        style={{
          fontSize: isPrimary ? fontSizePrimary : fontSizeSecondary,
          fontWeight: "normal",
        }}
      >
        ″
      </span>
    </>
  ),
  containerStyle,
  entryContainerStyle,
  entryContentStyle,
  ascending = true,
}: ReactLengthPickerProps) => {
  const margin = (containerHeight - entryHeight) / 1.5;
  const rootMargin = `-${margin}px 0%`;

  return (
    <div
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
    >
      <List
        containerStyle={containerStyle}
        unit={unit}
        containerHeight={containerHeight}
        entryHeight={entryHeight}
        rootMargin={rootMargin}
        metricStep={metricStep}
        metricMin={metricMin}
        metricMax={metricMax}
        imperialStep={imperialStep}
        imperialMin={imperialMin}
        imperialMax={imperialMax}
        metricFormatter={metricFormatter}
        imperialFormatter={imperialFormatter}
        defaultLength={defaultLength}
        onLengthChange={onLengthChange}
        entryContainerStyle={entryContainerStyle}
        entryContentStyle={entryContentStyle}
        ascending={ascending}
        onUnitChange={onUnitChange}
      />
      <style>{`
            .noselect {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
            }
            `}</style>
    </div>
  );
};

import { ReactLengthPickerProps } from "$/types/ReactLengthPickerProps";
import React, { useEffect } from "react";
import { List } from "$/components/List";
import { FeetAndInches } from "$/types/FeetAndInches";

const fontSizePrimary = 18;
const fontSizeSecondary = 9;

export const LengthPicker = ({
  keyName: keyNameSuffix,
  disabled = false,
  containerWidth = 160,
  containerHeight = 80,
  entryHeight = 40,
  unit = "metric",
  hideScrollbar = true,
  onLengthChange = () => {},
  onUnitChange = () => {},
  length,
  metricStep = 1,
  metricMin = 300,
  metricMax = 400,
  metricFormatter = (
    isPrimary: boolean,
    centimeters: number,
    index: number,
    disabled: boolean,
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
    index: number,
    disabled: boolean,
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
        &Prime;
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
        &prime;
      </span>
    </>
  ),
  containerStyle,
  entryContainerStyle,
  entryContentStyle,
  ascending = true,
}: ReactLengthPickerProps) => {
  const keyName = `react-length-picker-${keyNameSuffix}`;

  useEffect(() => {
    onUnitChange(unit);
  }, [unit]);

  return (
    <div
      id={keyName}
      key={keyName}
      style={{
        height: containerHeight,
        width: containerWidth,
        pointerEvents: disabled ? "none" : "all",
        touchAction: disabled ? "none" : "auto",
      }}
    >
      <List
        keyName={keyName}
        containerStyle={containerStyle}
        unit={unit}
        containerHeight={containerHeight}
        entryHeight={entryHeight}
        metricStep={metricStep}
        metricMin={metricMin}
        metricMax={metricMax}
        imperialStep={imperialStep}
        imperialMin={imperialMin}
        imperialMax={imperialMax}
        metricFormatter={metricFormatter}
        imperialFormatter={imperialFormatter}
        length={length}
        onLengthChange={onLengthChange}
        entryContainerStyle={entryContainerStyle}
        entryContentStyle={entryContentStyle}
        ascending={ascending}
        hideScrollbar={hideScrollbar}
        disabled={disabled}
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

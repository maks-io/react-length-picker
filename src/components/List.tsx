import React, { useMemo } from "react";
import { ListProps } from "$/types/ListProps";
import { ListEntry } from "$/components/ListEntry";
import { createRange } from "$/helpers/createRange";
import { getIndexFromLength } from "$/helpers/getIndexFromLength";
import { IVirtuosaElement, Virtuosa } from "virtuosa";

export const List = ({
  keyName: keyNamePrefix,
  entryHeight,
  metricStep,
  metricMin,
  metricMax,
  metricFormatter,
  imperialStep,
  imperialMin,
  imperialMax,
  imperialFormatter,
  onLengthChange,
  length,
  containerHeight,
  unit,
  ascending,
  entryContainerStyle,
  entryContentStyle,
  containerStyle,
  containerWidth,
  onUnitChange,
  disabled,
  backgroundRenderNumber = 20,
  throttleWait = 32,
  onLengthChangeTrigger = "CENTERED",
}: ListProps) => {
  const numberRangeImperial = useMemo(
    () => createRange(imperialMin, imperialMax, imperialStep, ascending),
    [ascending, imperialMin, imperialMax, imperialStep],
  );

  const numberRangeMetric = useMemo(
    () => createRange(metricMin, metricMax, metricStep, ascending),
    [ascending, metricMin, metricMax, metricStep],
  );

  const numberRange = useMemo(
    () => (unit === "imperial" ? numberRangeImperial : numberRangeMetric),
    [unit, numberRangeImperial, numberRangeMetric],
  );

  const getLengthViaIndex = (index: number) => numberRange[index];

  const index = getIndexFromLength(numberRange, length);

  const elements: IVirtuosaElement[] = useMemo(
    () =>
      numberRange.map((m: number) => ({ index, visibilityStatus }) => (
        <ListEntry
          key={`entry-${m}`}
          index={index}
          visibilityStatus={visibilityStatus}
          unit={unit}
          value={m}
          entryHeight={entryHeight}
          metricFormatter={metricFormatter}
          imperialFormatter={imperialFormatter}
          entryContainerStyle={entryContainerStyle}
          entryContentStyle={entryContentStyle}
          disabled={disabled}
        />
      )),
    [
      numberRange,
      unit,
      entryHeight,
      metricFormatter,
      imperialFormatter,
      entryContainerStyle,
      entryContentStyle,
      disabled,
    ],
  );

  const keyName = `${keyNamePrefix}-list`;

  return (
    <Virtuosa
      keyName={keyName}
      containerStyle={containerStyle}
      containerHeight={containerHeight}
      elementHeight={entryHeight}
      elements={elements}
      onChange={(activeElementIndex) => {
        onLengthChange(getLengthViaIndex(activeElementIndex));
      }}
      currentIndex={index}
      centerFirstVertically
      centerLastVertically
      disabled={disabled}
      backgroundRenderNumber={backgroundRenderNumber}
      throttleWait={throttleWait}
      onChangeTrigger={onLengthChangeTrigger}
    />
  );
};

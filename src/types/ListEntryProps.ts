import React from "react";
import { ImperialFormatter } from "$/types/ImperialFormatter";
import { MetricFormatter } from "$/types/MetricFormatter";
import { ContainerStyle } from "$/types/ContainerStyle";

export interface ListEntryProps {
  index: number;
  value: number;
  parentRef: React.MutableRefObject<HTMLDivElement>;
  entryHeight: number;
  rootMargin: string;
  setCurrentLengths: (value: ((prevState: any[]) => any[]) | any[]) => void;
  currentLengths: any[];
  metricFormatter: MetricFormatter;
  isFirst: boolean;
  isLast: boolean;
  containerHeight: number;
  imperialFormatter: ImperialFormatter;
  unit: "metric" | "imperial";
  entryContainerStyle?: ContainerStyle;
  entryContentStyle?: ContainerStyle;
  disabled: boolean;
}

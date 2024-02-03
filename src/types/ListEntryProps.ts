import React, { CSSProperties, ReactNode } from "react";
import { FeetAndInches } from "$/types/FeetAndInches";
import { ImperialFormatter } from "$/types/ImperialFormatter";
import { MetricFormatter } from "$/types/MetricFormatter";

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
  entryContainerStyle?:
    | CSSProperties
    | ((index: number, isActive: boolean) => CSSProperties);
  entryContentStyle?:
    | CSSProperties
    | ((index: number, isActive: boolean) => CSSProperties);
}

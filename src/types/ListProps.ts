import { CSSProperties } from "react";
import { Unit } from "$/types/Unit";
import { MetricFormatter } from "$/types/MetricFormatter";
import { ImperialFormatter } from "$/types/ImperialFormatter";

export interface ListProps {
  entryHeight: number;
  rootMargin: string;
  metricStep: number;
  metricMin: number;
  metricMax: number;
  metricFormatter: MetricFormatter;
  imperialStep: number;
  imperialMin: number;
  imperialMax: number;
  imperialFormatter: ImperialFormatter;
  onLengthChange: (length: number) => void;
  defaultLength: number;
  containerHeight: number;
  unit: "metric" | "imperial";
  entryContainerStyle?:
    | CSSProperties
    | ((index: number, isActive: boolean) => CSSProperties);
  entryContentStyle?:
    | CSSProperties
    | ((index: number, isActive: boolean) => CSSProperties);
  containerStyle?: CSSProperties;
  ascending: boolean;
  onUnitChange: (unit: Unit) => void;
}

import { CSSProperties } from "react";
import { Unit } from "$/types/Unit";
import { MetricFormatter } from "$/types/MetricFormatter";
import { ImperialFormatter } from "$/types/ImperialFormatter";

export interface ListProps {
  ascending: boolean;
  containerHeight: number;
  containerStyle?: CSSProperties;
  defaultLength: number;
  entryContainerStyle?:
    | CSSProperties
    | ((
        index: number,
        currentMetricValue: number,
        currentImperialValue: number,
        isActive: boolean,
      ) => CSSProperties);
  entryContentStyle?:
    | CSSProperties
    | ((
        index: number,
        currentMetricValue: number,
        currentImperialValue: number,
        isActive: boolean,
      ) => CSSProperties);
  entryHeight: number;
  imperialFormatter: ImperialFormatter;
  imperialMax: number;
  imperialMin: number;
  imperialStep: number;
  metricFormatter: MetricFormatter;
  metricMax: number;
  metricMin: number;
  metricStep: number;
  onLengthChange: (length: number) => void;
  onUnitChange: (unit: Unit) => void;
  rootMargin: string;
  unit: "metric" | "imperial";
}

import { CSSProperties } from "react";
import { Unit } from "$/types/Unit";
import { ContainerStyle } from "$/types/ContainerStyle";
import { MetricFormatter } from "$/types/MetricFormatter";
import { ImperialFormatter } from "$/types/ImperialFormatter";

export interface ReactLengthPickerProps {
  ascending?: boolean;
  containerHeight?: number;
  containerStyle?: CSSProperties;
  containerWidth?: number;
  disabled?: boolean;
  entryContainerStyle?: ContainerStyle;
  entryContentStyle?: ContainerStyle;
  entryHeight?: number;
  imperialFormatter?: ImperialFormatter;
  imperialMax?: number;
  imperialMin?: number;
  imperialStep?: number;
  keyName: string;
  length: number;
  metricFormatter?: MetricFormatter;
  metricMax?: number;
  metricMin?: number;
  metricStep?: number;
  onLengthChange?: (length: number) => void;
  onUnitChange?: (unit: Unit) => void;
  unit?: Unit;
}

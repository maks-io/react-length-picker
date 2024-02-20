import { CSSProperties, ReactNode } from "react";
import { Unit } from "$/types/Unit";
import { FeetAndInches } from "$/types/FeetAndInches";

export interface ReactLengthPickerProps {
  ascending?: boolean;
  containerHeight?: number;
  containerStyle?: CSSProperties;
  containerWidth?: number;
  defaultLength?: number;
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
  entryHeight?: number;
  imperialFormatter?: (
    isPrimary: boolean,
    inches: number,
    feetAndInches: FeetAndInches,
    index: number,
  ) => string | number | ReactNode;
  imperialMax?: number;
  imperialMin?: number;
  imperialStep?: number;
  metricFormatter?: (
    isPrimary: boolean,
    centimeters: number,
    index: number,
  ) => string | number | ReactNode;
  metricMax?: number;
  metricMin?: number;
  metricStep?: number;
  onLengthChange?: (length: number) => void;
  onUnitChange?: (unit: Unit) => void;
  unit?: Unit;
}

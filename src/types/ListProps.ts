import { CSSProperties } from "react";
import { IOnChangeTrigger } from "virtuosa";
import { Unit } from "$/types/Unit";
import { MetricFormatter } from "$/types/MetricFormatter";
import { ImperialFormatter } from "$/types/ImperialFormatter";
import { ContainerStyle } from "$/types/ContainerStyle";

export interface ListProps {
  ascending: boolean;
  backgroundRenderNumber?: number;
  containerHeight: number;
  containerStyle?: CSSProperties;
  disabled: boolean;
  entryContainerStyle?: ContainerStyle;
  entryContentStyle?: ContainerStyle;
  entryHeight: number;
  hideScrollbar?: boolean;
  imperialFormatter: ImperialFormatter;
  imperialMax: number;
  imperialMin: number;
  imperialStep: number;
  keyName: string;
  length: number;
  metricFormatter: MetricFormatter;
  metricMax: number;
  metricMin: number;
  metricStep: number;
  onLengthChange: (length: number) => void;
  onLengthChangeTrigger?: IOnChangeTrigger;
  throttleWait?: number;
  unit: "metric" | "imperial";
}

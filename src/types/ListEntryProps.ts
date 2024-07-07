import { IVisibilityStatus } from "virtuosa";
import { ImperialFormatter } from "$/types/ImperialFormatter";
import { MetricFormatter } from "$/types/MetricFormatter";
import { ContainerStyle } from "$/types/ContainerStyle";

export interface ListEntryProps {
  index: number;
  value: number;
  entryHeight: number;
  metricFormatter: MetricFormatter;
  imperialFormatter: ImperialFormatter;
  unit: "metric" | "imperial";
  entryContainerStyle?: ContainerStyle;
  entryContentStyle?: ContainerStyle;
  disabled: boolean;
  visibilityStatus?: IVisibilityStatus;
}

import { ReactNode } from "react";

export type MetricFormatter = (
  isPrimary: boolean,
  centimeters: number,
  index: number,
  disabled: boolean,
) => string | number | ReactNode;

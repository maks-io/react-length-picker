import { CSSProperties } from "react";

export type ContainerStyle =
  | CSSProperties
  | ((
      index: number,
      currentMetricValue: number,
      currentImperialValue: number,
      isActive: boolean,
      disabled: boolean,
    ) => CSSProperties);

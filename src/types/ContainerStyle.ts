import { CSSProperties } from "react";
import { IVisibilityStatus } from "virtuosa/build/types/IVisibilityStatus";

export type ContainerStyle =
  | CSSProperties
  | ((
      index: number,
      currentMetricValue: number,
      currentImperialValue: number,
      visibilityStatus: IVisibilityStatus,
      disabled: boolean,
    ) => CSSProperties);

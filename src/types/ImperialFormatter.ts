import React from "react";
import { FeetAndInches } from "$/types/FeetAndInches";

export type ImperialFormatter = (
  isPrimary: boolean,
  inches: number,
  feetAndInches: FeetAndInches,
  index: number,
  disabled: boolean,
) => string | number | React.ReactNode;

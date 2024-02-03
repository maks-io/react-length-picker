import React, { PropsWithChildren } from "react";

export const SecondaryListEntry = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        position: "absolute",
        color: "gray",
        fontSize: 10,
        fontWeight: "bold",
        bottom: 0,
        opacity: 0.5,
      }}
    >
      {children}
    </div>
  );
};

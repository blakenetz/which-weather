import React from "react";
import { ForecastContext } from "./ForecastContext";

export default function ForecastProvider({
  children,
}: React.PropsWithChildren) {
  const [body, setBody] = React.useState<FormData>();

  return (
    <ForecastContext.Provider value={{ body, initializeDataFetch: setBody }}>
      {children}
    </ForecastContext.Provider>
  );
}

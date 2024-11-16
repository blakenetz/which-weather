import React from "react";
import { ForecastContext } from "./ForecastContext";

const forecastURL = new URL("forecast", import.meta.env.VITE_SERVER).toString();

export default function ForecastProvider({
  children,
}: React.PropsWithChildren) {
  const [body, setBody] = React.useState<FormData>();

  const fetchData = () =>
    fetch(forecastURL, { method: "POST", body }).then((res) =>
      res.body?.getReader()
    );

  return (
    <ForecastContext.Provider
      value={{
        initialize: (v: FormData) => setBody(v),
        ready: !!body,
        fetchData,
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
}

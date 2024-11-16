import React from "react";

type ForecastContextType = {
  body?: FormData;
  initializeDataFetch: (d: FormData) => void;
};
export const ForecastContext = React.createContext({} as ForecastContextType);

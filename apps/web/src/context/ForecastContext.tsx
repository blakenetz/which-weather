import { ForecastChartData, ForecastClient } from "@server/types";
import React from "react";

type ForecastContextType = {
  body?: FormData;
  initializeDataFetch: (d: FormData) => void;
  setChartData: (client: ForecastClient, d: ForecastChartData[]) => void;
  chartData: Record<ForecastClient, ForecastChartData[]>;
};
export const ForecastContext = React.createContext({} as ForecastContextType);

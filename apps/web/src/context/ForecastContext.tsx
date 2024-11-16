import React from "react";

type ForecastContextType = {
  initialize: (v: FormData) => void;
  fetchData: () => Promise<ReadableStreamDefaultReader<Uint8Array> | undefined>;
  ready: boolean;
};
export const ForecastContext = React.createContext({
  ready: false,
} as ForecastContextType);

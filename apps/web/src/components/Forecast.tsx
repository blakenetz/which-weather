import { ForecastContext } from "@web/context/ForecastContext";
import React from "react";

export default function Forecast() {
  const forecastCtx = React.useContext(ForecastContext);

  if (!forecastCtx.ready) return null;
  const reader = forecastCtx.fetchData();
  console.log(reader.read());

  return <section></section>;
}

import {
  Forecast as ForecastData,
  ForecastClient,
  ForecastResponseBody,
} from "@server/types";
import { ForecastContext } from "@web/context/ForecastContext";

import React from "react";

type State = Record<ForecastClient, ForecastData[]>;
type Action = ForecastResponseBody;

const forecastURL = new URL("forecast", import.meta.env.VITE_SERVER).toString();

const decoder = new TextDecoder();

function reducer(state: State, action: Action) {
  if (action.type === "chunk") {
    return {
      ...state,
      [action.client!]: action.data,
    };
  }

  return state;
}

const initialValue: State = {
  accuWeather: [],
  openWeather: [],
  weatherDotGov: [],
};

export default function Forecast() {
  const { body } = React.useContext(ForecastContext);

  const [data, dispatch] = React.useReducer(reducer, initialValue);

  React.useEffect(() => {
    if (!body) return;
    const fetchData = async () => {
      const response = await fetch(forecastURL, { method: "POST", body });
      if (response.ok) {
        const reader = response.body!.getReader()!;
        while (true) {
          const { done, value } = await reader.read();
          console.log({ done, value });

          if (done) break;

          // Assuming the stream provides JSON data:
          const decoded = decoder.decode(value);
          console.log(decoded);
          const chunk: ForecastResponseBody = JSON.parse(decoded);
          console.log(chunk);
          dispatch(chunk);
        }
      }
    };

    fetchData();
  }, [body]);

  return "forecast";
}

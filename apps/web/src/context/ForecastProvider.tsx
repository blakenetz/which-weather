import React from "react";
import { ForecastContext } from "./ForecastContext";
import { ForecastChartData, ForecastClient } from "@server/types";
import { union } from "lodash";

type State = Record<ForecastClient, ForecastChartData[]>;
type Action =
  | { type: "reset" }
  | {
      type: "update";
      client: ForecastClient;
      data: ForecastChartData[];
    };

const initialState: State = {
  accuWeather: [],
  openWeather: [],
  weatherDotGov: [],
};

function reducer(state: State, action: Action) {
  if (action.type === "reset") {
    return initialState;
  }

  state[action.client] = union(state[action.client], action.data);
  return state;
}

export default function ForecastProvider({
  children,
}: React.PropsWithChildren) {
  const [body, setBody] = React.useState<FormData>();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ForecastContext.Provider
      value={{
        body,
        initializeDataFetch: (d) => {
          dispatch({ type: "reset" });
          setBody(d);
        },
        setChartData: (client, data) =>
          dispatch({ client, data, type: "update" }),
        chartData: state,
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
}

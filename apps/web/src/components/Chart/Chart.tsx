import { Skeleton } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { ForecastChartData, ForecastClient } from "@server/types";
import { ForecastContext } from "@web/context/ForecastContext";
import use, { Reader } from "@web/hooks/use";
import { format } from "date-fns";
import { every, flatMap, isEmpty, reduce } from "lodash";
import React, { Suspense } from "react";

const clients: ForecastClient[] = [
  "accuWeather",
  "openWeather",
  "weatherDotGov",
];

type Data = Record<ForecastClient, ForecastChartData[]>;
type DataSet = (ForecastChartData & { client: ForecastClient })[];

async function extractChartData(data?: Data): Promise<DataSet> {
  return await new Promise((res) => {
    if (data)
      return res(
        flatMap(
          reduce<Data, DataSet>(
            data,
            (acc, dataArray, client) => {
              acc.push(
                ...dataArray.map((item) => ({
                  ...item,
                  client: client as ForecastClient,
                }))
              );

              return acc;
            },
            []
          )
        )
      );
  });
}

interface ChartUIProps {
  reader: Reader<DataSet>;
}

function ChartUI({ reader }: ChartUIProps) {
  const { data, error } = reader.read();
  console.log(error, data);

  return (
    <LineChart
      height={500}
      dataset={data}
      xAxis={[{ dataKey: "x", valueFormatter: (d) => format(d, "YYYY/MM/dd") }]}
      series={clients.map((client) => ({
        dataKey: client,
        showMark: false,
      }))}
    />
  );
}

export default function Chart() {
  const ctx = React.useContext(ForecastContext);
  if (!ctx.body) return null;

  const reader = use(extractChartData(ctx.chartData));

  return (
    <Suspense
      fallback={<Skeleton variant="rounded" width={300} height={150} />}
      name="chart"
    >
      <ChartUI reader={reader} />
    </Suspense>
  );
}

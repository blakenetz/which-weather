import { Forecast, ForecastClient } from "@server/types";
import { ForecastContext } from "@web/context/ForecastContext";
import React, { Suspense } from "react";

import use from "@web/hooks/use";
import { ErrorContext, ErrorContextType } from "@web/context/ErrorContext";
import { Skeleton, Stack, Typography } from "@mui/material";
import Card from "./Card";
import { startCase } from "lodash";

interface ForecastGridProps {
  client: ForecastClient;
}

interface ForecastGridItemProps extends ForecastGridProps {
  data: { read: () => Forecast[] };
}

function fetchData(
  url: URL,
  body: FormData,
  handleError: ErrorContextType["setError"]
) {
  return fetch(url.toString(), { method: "POST", body })
    .then((res) => {
      if (res.ok) return res.json();
      handleError("forecast");
    })
    .catch(() => handleError("unknown"));
}

function Fallback() {
  return (
    <Stack direction="row" gap={2}>
      {Array.from({ length: 5 }).map((_el, i) => (
        <Skeleton variant="rounded" width={300} height={150} key={i} />
      ))}
    </Stack>
  );
}

function ForecastGridItem({ data, client }: ForecastGridItemProps) {
  const forecastData = data.read();
  let title = startCase(client).replace(/\s/g, "");
  if (client === "weatherDotGov") title = title.replace(/Dot/, ".");

  return (
    <section>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>

      <Stack direction="row" gap={2} sx={{ pb: 3, overflow: "scroll" }}>
        {forecastData.map((data) => (
          <Card data={data} key={data.time + client} />
        ))}
      </Stack>
    </section>
  );
}

export default function ForecastGrid({ client }: ForecastGridProps) {
  const { body } = React.useContext(ForecastContext);
  const errorCtx = React.useContext(ErrorContext);

  if (!body) return null;

  const forecastURL = new URL(
    `forecast/${client}`,
    import.meta.env.VITE_SERVER
  );

  const promise = fetchData(forecastURL, body, errorCtx.setError);
  const data = use<Forecast[]>(promise);

  return (
    <Suspense fallback={<Fallback />}>
      <ForecastGridItem data={data} client={client} />
    </Suspense>
  );
}

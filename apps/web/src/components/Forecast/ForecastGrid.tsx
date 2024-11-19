import { Alert, Skeleton, Stack, Typography } from "@mui/material";
import { Forecast, ForecastClient } from "@server/types";
import { ForecastContext } from "@web/context/ForecastContext";
import use, { Reader } from "@web/hooks/use";
import { startCase } from "lodash";
import React, { Suspense } from "react";
import { Card } from "@web/components";

interface ForecastGridProps {
  client: ForecastClient;
}

interface ForecastGridItemProps extends ForecastGridProps {
  reader: Reader<Forecast[]>;
}

function fetchData(client: ForecastClient, body: FormData) {
  return fetch(`api/forecast/${client}`, { method: "POST", body }).then(
    (res) => {
      if (res.ok) return res.json();
      throw new Error(`Temporarily unavailable. Please try again later.`);
    }
  );
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

function ForecastGridItem({ reader, client }: ForecastGridItemProps) {
  const ctx = React.useContext(ForecastContext);
  const { data, error } = reader.read();

  let title = startCase(client).replace(/\s/g, "");
  if (client === "weatherDotGov") title = title.replace(/Dot/, ".");

  ctx.setChartData(
    client,
    data.flatMap((i) => i.chart)
  );

  if (data)
    return (
      <section>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>

        <Stack direction="row" gap={2} sx={{ pb: 3, overflow: "scroll" }}>
          {error?.message ? (
            <Alert severity="error">{error.message}</Alert>
          ) : (
            data.map((item) => <Card data={item} key={item.time + client} />)
          )}
        </Stack>
      </section>
    );
}

export default function ForecastGrid({ client }: ForecastGridProps) {
  const { body } = React.useContext(ForecastContext);
  if (!body) return null;

  const reader = use<Forecast[]>(fetchData(client, body));

  return (
    <Suspense fallback={<Fallback />} name={client}>
      <ForecastGridItem reader={reader} client={client} />
    </Suspense>
  );
}

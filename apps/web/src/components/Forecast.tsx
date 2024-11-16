import { ForecastClient } from "@server/types";

import ForecastGrid from "./ForecastGrid";
import { Box } from "@mui/material";

const clients: ForecastClient[] = [
  "accuWeather",
  "openWeather",
  "weatherDotGov",
];

export default function Forecast() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        width: "100%",
      }}
    >
      {clients.map((client) => (
        <ForecastGrid client={client} key={client} />
      ))}
    </Box>
  );
}

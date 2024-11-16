import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { Forecast } from "@server/types";
import { format, isToday, isTomorrow } from "date-fns";

interface CardProps {
  data: Forecast;
}

function formatDate(date: string) {
  let formatString = "ccc";

  if (isToday(date)) {
    formatString = "'Today'";
  } else if (isTomorrow(date)) {
    formatString = "'Tomorrow'";
  }

  return format(date, `${formatString} 'at' h:mm aaaa`);
}

export default function Card({ data }: CardProps) {
  const date = formatDate(data.time);

  return (
    <MuiCard sx={{ minWidth: 300 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Stack direction="row">
          {data.icon && (
            <Box
              component="img"
              src={data.icon}
              sx={({ typography }) => ({
                height: `calc(${typography.subtitle1.fontSize} * 2)`,
              })}
            />
          )}
          <Typography variant="subtitle2">{date}</Typography>
        </Stack>
        <div>
          {Array.isArray(data.temperature) ? (
            <div>
              <Typography>High: {data.temperature[0]}°F</Typography>
              <Typography>Low: {data.temperature[1]}°F</Typography>
            </div>
          ) : (
            <Typography>Temp: {data.temperature}°F</Typography>
          )}
          {data.feelsLike && (
            <Typography>Feels like: {data.feelsLike}°F</Typography>
          )}
        </div>
        {data.description && <Typography>{data.description}</Typography>}
        {data.wind && <Typography>{data.wind}</Typography>}
      </CardContent>
      {data.link && (
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button size="small" component="a" href={data.link} target="_blank">
            Source
          </Button>
        </CardActions>
      )}
    </MuiCard>
  );
}

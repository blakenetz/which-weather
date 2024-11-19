import { Air, Thermostat } from "@mui/icons-material";
import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  Stack,
  styled,
  Box,
  svgIconClasses,
} from "@mui/material";
import { Forecast } from "@server/types";
import { format, isToday, isTomorrow } from "date-fns";
import { startCase } from "lodash";

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

  return format(date, `${formatString} 'at' h:mm aaa`);
}

function isAfternoon(date: string) {
  return format(date, "a") === "PM";
}

function Temperature({
  type,
  temp,
}: {
  type?: "high" | "low" | "feelsLike";
  temp: number;
}) {
  return (
    <Typography variant="body2">
      {`${startCase(type ?? "temp")}: `}
      <Typography
        variant="body2"
        sx={{ color: "text.secondary" }}
        component="span"
      >
        {temp}°F
      </Typography>
    </Typography>
  );
}

const Section = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1),
  [`.${svgIconClasses.root}`]: {
    height: theme.typography.body2.fontSize,
    width: "auto",
  },
}));

export default function Card({ data }: CardProps) {
  const date = formatDate(data.time);
  const isDark = isAfternoon(data.time);

  return (
    <MuiCard
      raised
      sx={{
        minWidth: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <CardHeader
          title={date}
          avatar={data.icon && <Avatar src={data.icon} />}
          sx={{
            alignItems: "flex-start",
            bgcolor: isDark ? "grey.900" : "primary.light",
            color: isDark ? "primary.contrastText" : "text.primary",
          }}
        />

        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {data.description}
          </Typography>
          <Section>
            <Thermostat />
            <Stack>
              {Array.isArray(data.temperature) ? (
                <div>
                  <Temperature type="high" temp={data.temperature[1]} />
                  <Temperature type="low" temp={data.temperature[0]} />
                </div>
              ) : (
                <Temperature temp={data.temperature} />
              )}
              {data.feelsLike && (
                <Temperature type="feelsLike" temp={data.feelsLike} />
              )}
            </Stack>
          </Section>

          {data.wind && (
            <Section>
              <Air />
              <Typography>{data.wind}</Typography>
            </Section>
          )}
        </CardContent>
      </div>

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

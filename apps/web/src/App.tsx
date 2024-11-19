import { Box, Container, styled, Typography } from "@mui/material";
import { Form, Forecast, Chart } from "@web/components";
import ErrorProvider from "@web/context/ErrorProvider";
import ForecastProvider from "@web/context/ForecastProvider";
import backgroundImgUrl from "/noaa-weather.jpg";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(4),
  position: "relative",
  padding: theme.spacing(2),
}));

export default function App() {
  return (
    <ErrorProvider>
      <ForecastProvider>
        <Box
          sx={{
            background: `no-repeat center url(${backgroundImgUrl})`,
            color: "primary.contrastText",
            pb: 3,
          }}
        >
          <StyledContainer
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontWeight: "boldest",
            }}
          >
            <Typography variant="h2" component="h1">
              Which Weather
            </Typography>
            <Typography variant="subtitle1" component="p">
              Get your weather forecast from numerous sources
            </Typography>
            <Form />
          </StyledContainer>
        </Box>
        <StyledContainer>
          <Chart />
          <Forecast />
        </StyledContainer>
      </ForecastProvider>
    </ErrorProvider>
  );
}

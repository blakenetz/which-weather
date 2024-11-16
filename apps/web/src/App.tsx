import { Box, Container, styled, Typography } from "@mui/material";
import Form from "./components/Form";
import Forecast from "./components/Forecast";
import ErrorProvider from "./context/ErrorProvider";
import ForecastProvider from "./context/ForecastProvider";
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
          <Forecast />
        </StyledContainer>
      </ForecastProvider>
    </ErrorProvider>
  );
}

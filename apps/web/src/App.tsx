import { Container, styled } from "@mui/material";
import Form from "./components/Form";
import Forecast from "./components/Forecast";
import ErrorProvider from "./context/ErrorProvider";
import ForecastProvider from "./context/ForecastProvider";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  position: "relative",
  p: 1,
  minHeight: "100dvh",
});

export default function App() {
  return (
    <ErrorProvider>
      <ForecastProvider>
        <StyledContainer maxWidth="xl">
          <Form />
          <Forecast />
        </StyledContainer>
      </ForecastProvider>
    </ErrorProvider>
  );
}

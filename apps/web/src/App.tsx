import { Container, styled } from "@mui/material";
import Form from "./components/Form";
import Forecast from "./components/Forecast";
import ErrorProvider from "./context/ErrorProvider";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  position: "relative",
  p: 1,
  minHeight: "100dvh",
});

const StyledForm = styled(Form)(({ theme }) => ({
  marginTop: "15dvh",
  width: "100%",
  maxWidth: theme.breakpoints.values["sm"],
}));

export default function App() {
  return (
    <ErrorProvider>
      <StyledContainer maxWidth="xl">
        <StyledForm />
        <Forecast />
      </StyledContainer>
    </ErrorProvider>
  );
}

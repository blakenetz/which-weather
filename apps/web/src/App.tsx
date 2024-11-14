import { Container } from "@mui/material";
import Form from "./components/Form";
import Forecast from "./components/Forecast";

export default function App() {
  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Form />
      <Forecast />
    </Container>
  );
}

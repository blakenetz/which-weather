import { Alert, Container } from "@mui/material";
import Form from "./components/Form";
import Forecast from "./components/Forecast";
import React from "react";

export default function App() {
  const [error, showError] = React.useState(true);

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {error && (
        <Alert onClose={() => showError(false)} severity="error">
          There seems to be a problem with one of our service providers
        </Alert>
      )}
      <Form handleError={() => showError((p) => !p)} />
      <Forecast />
    </Container>
  );
}

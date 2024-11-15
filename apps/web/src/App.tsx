import { Container, SxProps, Theme } from "@mui/material";
import Form from "./components/Form";
import Forecast from "./components/Forecast";
import React from "react";
import Error from "./components/Error";

const containerSx: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  position: "relative",
  p: 1,
  minHeight: "100dvh",
};

const formSx: SxProps<Theme> = ({ breakpoints }) => ({
  mt: "15dvh",
  width: "100%",
  maxWidth: breakpoints.values["sm"],
});

export default function App() {
  const [error, showError] = React.useState(true);

  return (
    <Container maxWidth="xl" sx={containerSx}>
      {error && <Error handleClose={() => showError(false)} />}

      <Form handleError={() => showError(true)} sx={formSx} />
      <Forecast />
    </Container>
  );
}

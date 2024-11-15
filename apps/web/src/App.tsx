import { Container, SxProps, Theme } from "@mui/material";
import Form from "./components/Form";
import Forecast from "./components/Forecast";
import Error from "./components/Error";
import { Endpoints } from "@server/types";
import React from "react";

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
  const [_error, setError] = React.useState<
    Endpoints | "unknown" | undefined
  >();

  return (
    <Container maxWidth="xl" sx={containerSx}>
      <Error handleClose={() => setError(undefined)} />

      <Form handleError={setError} sx={formSx} />
      <Forecast />
    </Container>
  );
}

import React from "react";
import { Alert, Snackbar, SnackbarCloseReason, styled } from "@mui/material";
import { AlertCause, Cause, ErrorContext } from "./ErrorContext";

const messages: Record<AlertCause, string> = {
  forecast:
    "Looks like the world is out of forecasts! Who knows what tomorrow brings",
  location: "Hmmmm... we were unable to find that location. Please try again",
  unknown:
    "There seems to be a problem with one of our service providers 😭. Please try again later",
};

const StyledAlert = styled(Alert)(({ theme }) => ({
  zIndex: 100,
  position: "absolute",
  top: theme.spacing(2),
  left: 0,
  right: 0,
  margin: `0 auto`,
  width: "fit-content",
}));

export default function ErrorProvider({ children }: React.PropsWithChildren) {
  const [showSnackbar, toggleSnackbar] = React.useState(false);
  const [alert, setAlert] = React.useState<AlertCause | false>(false);

  const handleError = (cause: Cause) => {
    if (cause === "autocomplete") toggleSnackbar(true);
    else setAlert(cause);
  };

  const handleClose = (
    _e: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    toggleSnackbar(false);
  };

  return (
    <ErrorContext.Provider value={{ setError: handleError }}>
      {alert && (
        <StyledAlert severity="error" onClose={() => setAlert(false)}>
          {messages[alert]}
        </StyledAlert>
      )}

      {children}

      <Snackbar
        open={showSnackbar}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Autocomplete is currently unavailable, so please type carefully 😬
        </Alert>
      </Snackbar>
    </ErrorContext.Provider>
  );
}

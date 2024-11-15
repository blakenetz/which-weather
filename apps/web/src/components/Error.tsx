import { Alert } from "@mui/material";

interface ErrorProps {
  handleClose: VoidFunction;
}

export default function Error({ handleClose }: ErrorProps) {
  return (
    <Alert
      onClose={handleClose}
      severity="error"
      sx={({ spacing }) => ({ position: "absolute", top: spacing(2) })}
    >
      There seems to be a problem with one of our service providers
    </Alert>
  );
}

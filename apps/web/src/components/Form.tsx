import { Close, Search } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  IconButton,
  Menu,
  MenuItem,
  OutlinedInput,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import React from "react";
import { Endpoints, WeatherLocation } from "@server/types";

const locationURL = new URL("location", import.meta.env.VITE_SERVER).toString();
const forecastURL = new URL("forecast", import.meta.env.VITE_SERVER).toString();

interface FormProps extends BoxProps<"form"> {
  handleError: (type: Endpoints | "unknown") => void;
}

export default function Form({ handleError, ...props }: FormProps) {
  const ref = React.useRef<HTMLInputElement>(null);

  const [options, setOptions] = React.useState<WeatherLocation[]>([]);
  const [selected, setSelected] = React.useState<WeatherLocation | null>(null);
  const [showErrorSnackbar, toggleErrorSnackbar] = React.useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = React.useCallback(debounce(fetchData, 500), []);

  function fetchData(e: React.ChangeEvent<HTMLInputElement>) {
    setSelected(null);
    const { name, value } = e.target;

    if (!value) return;

    fetch(locationURL, {
      method: "POST",
      body: JSON.stringify({ [name]: value }),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        if (res.status === 200) setOptions((await res.json()) ?? []);
        else toggleErrorSnackbar(true);
      })
      .catch(() => handleError("location"));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    debouncedOnChange.cancel();

    const formData = new FormData(e.currentTarget);
    if (selected) {
      formData.append("key", selected.key);
      formData.append("lat", selected.lat.toString());
      formData.append("long", selected.long.toString());
    }

    fetch(forecastURL, {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        if (res.status === 200) setOptions((await res.json()) ?? []);
        else handleError("forecast");
      })
      .catch(() => handleError("unknown"));
  }

  const handleClose = (
    _e: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    toggleErrorSnackbar(false);
  };

  return (
    <Box {...props} onSubmit={handleSubmit} component="form">
      <OutlinedInput
        ref={ref}
        id="search"
        name="q"
        placeholder="Search by Zip Code or City"
        aria-label="Search by zip code or city"
        autoFocus
        startAdornment={<Search />}
        onChange={debouncedOnChange}
        fullWidth
      />
      <Menu
        id="options-menu"
        anchorEl={ref.current!}
        open={Boolean(options.length)}
        onClose={() => setOptions([])}
        MenuListProps={{ "aria-labelledby": "search" }}
      >
        {options.map((o) => (
          <MenuItem key={o.key} onClick={() => setSelected(o)}>
            <Typography>{o.city}</Typography>
            <Typography>{`${o.state}, ${o.country}`}</Typography>
          </MenuItem>
        ))}
      </Menu>
      <Snackbar
        open={showErrorSnackbar}
        message="Autocomplete is currently unavailable"
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        onClose={handleClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}

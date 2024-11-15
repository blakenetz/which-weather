import { Search } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Menu,
  MenuItem,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import React from "react";
import { WeatherLocation } from "@server/types";
import { ErrorContext } from "@web/context/ErrorContext";

const locationURL = new URL("location", import.meta.env.VITE_SERVER).toString();
const forecastURL = new URL("forecast", import.meta.env.VITE_SERVER).toString();

export default function Form(props: BoxProps<"form">) {
  const ref = React.useRef<HTMLInputElement>(null);
  const errorCtx = React.useContext(ErrorContext);

  const [options, setOptions] = React.useState<WeatherLocation[]>([]);
  const [selected, setSelected] = React.useState<WeatherLocation | null>(null);

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
        else errorCtx.setError("autocomplete");
      })
      .catch(() => errorCtx.setError("location"));
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
        else errorCtx.setError("forecast");
      })
      .catch(() => errorCtx.setError("unknown"));
  }

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
    </Box>
  );
}

import { Search } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Menu,
  menuClasses,
  MenuItem,
  OutlinedInput,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import React from "react";
import { WeatherLocation } from "@server/types";
import { ErrorContext } from "@web/context/ErrorContext";
import { ForecastContext } from "@web/context/ForecastContext";
import { darkTheme } from "@web/theme";

export default function Form(props: BoxProps<"form">) {
  const errorCtx = React.useContext(ErrorContext);
  const forecastCtx = React.useContext(ForecastContext);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const [options, setOptions] = React.useState<WeatherLocation[]>([]);
  const [selected, setSelected] = React.useState<WeatherLocation | null>(null);

  // since `setSelected` is async, this guarantees submit is called after `selected` updates
  React.useEffect(() => {
    if (selected) formRef.current?.requestSubmit();
  }, [selected]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = React.useCallback(debounce(fetchData, 500), []);

  function fetchData(e: React.ChangeEvent<HTMLInputElement>) {
    setSelected(null);
    const { name, value } = e.target;

    if (!value) return;

    fetch("api/location", {
      method: "POST",
      body: JSON.stringify({ [name]: value }),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        if (res.ok) setOptions((await res.json()) ?? []);
        else errorCtx.setError("autocomplete");
      })
      .catch(() => errorCtx.setError("location"));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedOnChange.cancel();

    const formData = new FormData(e.currentTarget);
    if (selected) {
      formData.append("lat", selected.lat.toString());
      formData.append("long", selected.long.toString());
      formData.append("key", selected?.key);
    }

    forecastCtx.initializeDataFetch(formData);
  };

  const handleClick = (option: WeatherLocation) => {
    setOptions([]);
    setSelected(option);
  };

  return (
    <Box
      {...props}
      onSubmit={handleSubmit}
      component="form"
      ref={formRef}
      sx={({ breakpoints }) => ({
        width: "100%",
        maxWidth: breakpoints.values["sm"],
      })}
    >
      <ThemeProvider theme={darkTheme}>
        <OutlinedInput
          ref={inputRef}
          id="search"
          name="q"
          placeholder="Search by Zip Code or City"
          aria-label="Search by zip code or city"
          autoFocus
          startAdornment={<Search />}
          onChange={debouncedOnChange}
          fullWidth
        />
      </ThemeProvider>

      <Menu
        id="options-menu"
        anchorEl={inputRef.current!}
        open={Boolean(options.length)}
        onClose={() => setOptions([])}
        MenuListProps={{ "aria-labelledby": "search" }}
        sx={({ breakpoints }) => ({
          [`.${menuClasses.paper}`]: { width: breakpoints.values["sm"] },
        })}
      >
        {options.map((o) => (
          <MenuItem key={o.key} onClick={() => handleClick(o)} sx={{ gap: 1 }}>
            <Typography variant="button" color="primary">
              {o.city}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >{`${o.state}, ${o.country}`}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

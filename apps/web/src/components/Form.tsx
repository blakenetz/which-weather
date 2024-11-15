import { Search } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Menu,
  menuClasses,
  MenuItem,
  OutlinedInput,
  styled,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import React from "react";
import { WeatherLocation } from "@server/types";
import { ErrorContext } from "@web/context/ErrorContext";
import { locationData } from "@web/test/data";

const locationURL = new URL("location", import.meta.env.VITE_SERVER).toString();
const forecastURL = new URL("forecast", import.meta.env.VITE_SERVER).toString();

const StyledMenu = styled(Menu, {
  shouldForwardProp: (propName) => propName !== "inputWidth",
})<{ inputWidth?: number }>(({ inputWidth }) => ({
  [`.${menuClasses.paper}`]: {
    backgroundColor: "purple",
  },
}));

export default function Form(props: BoxProps<"form">) {
  const errorCtx = React.useContext(ErrorContext);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const [options, setOptions] = React.useState<WeatherLocation[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = React.useCallback(debounce(fetchData, 500), []);

  function fetchData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (!value) return;

    return setOptions(locationData);

    // fetch(locationURL, {
    //   method: "POST",
    //   body: JSON.stringify({ [name]: value }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then(async (res) => {
    //     if (res.ok) setOptions((await res.json()) ?? []);
    //     else errorCtx.setError("autocomplete");
    //   })
    //   .catch(() => errorCtx.setError("location"));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    debouncedOnChange.cancel();

    fetch(forecastURL, {
      method: "POST",
      body: new FormData(e.currentTarget),
    })
      .then(async (res) => {
        if (res.status === 200) setOptions((await res.json()) ?? []);
        else errorCtx.setError("forecast");
      })
      .catch(() => errorCtx.setError("unknown"));
  }

  return (
    <Box
      {...props}
      onSubmit={handleSubmit}
      component="form"
      ref={formRef}
      sx={({ breakpoints }) => ({
        marginTop: "15dvh",
        width: "100%",
        maxWidth: breakpoints.values["sm"],
      })}
    >
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
          <MenuItem
            key={o.key}
            onClick={() => formRef.current?.requestSubmit()}
            sx={{ gap: 1 }}
          >
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

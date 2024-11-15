import { Search } from "@mui/icons-material";
import { Box, BoxProps, Menu, MenuItem, OutlinedInput } from "@mui/material";
import { debounce } from "lodash";
import React from "react";
import { WeatherLocation } from "@server/types";

const url = new URL("location", import.meta.env.VITE_SERVER).toString();

interface FormProps extends BoxProps<"form"> {
  handleError: VoidFunction;
}

export default function Form({ handleError, ...props }: FormProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  const [options, setOptions] = React.useState<WeatherLocation[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = React.useCallback(debounce(fetchData, 500), []);

  async function fetchData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (!value) return;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ [name]: value }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        if (res.status === 522) handleError();
        return;
      }

      setOptions((await res.json()) ?? []);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    debouncedOnChange.cancel();
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
        MenuListProps={{
          "aria-labelledby": "search",
        }}
      >
        {options.map((o) => (
          <MenuItem key={o.lat + o.lon}>{o.name}</MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

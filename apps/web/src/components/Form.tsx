import { Search } from "@mui/icons-material";
import { OutlinedInput } from "@mui/material";
import { debounce } from "lodash";
import React from "react";

const url = new URL("location", import.meta.env.VITE_SERVER).toString();

export default function Form() {
  const ref = React.useRef<HTMLFormElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = React.useCallback(debounce(fetchData, 500), []);

  async function fetchData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (!value) return;

    try {
      const res = await fetch(url, {
        method: "post",
        body: JSON.stringify({ [name]: value }),
      });
      if (!res.ok) {
        console.log(res.status, res.statusText);
        return;
      }
      const data = await res.json();
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    debouncedOnChange.cancel();
  }

  return (
    <form onSubmit={handleSubmit} ref={ref}>
      <OutlinedInput
        name="q"
        placeholder="Search by Zip Code or City"
        aria-label="Search by zip code or city"
        autoFocus
        startAdornment={<Search />}
        onChange={debouncedOnChange}
      />
    </form>
  );
}

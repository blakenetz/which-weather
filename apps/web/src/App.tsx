import { Search } from "@mui/icons-material";
import { Container, OutlinedInput } from "@mui/material";
import styles from "./App.module.css";
import React from "react";

const url = new URL("location", import.meta.env.VITE_SERVER).toString();

export default function App() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch(url, {
        method: "post",
        body: new FormData(e.currentTarget),
      });
      if (!res.ok) {
        console.log(res.status, res.statusText);
        return "bad";
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Container maxWidth="xl" className={styles.container}>
      <form onSubmit={handleSubmit}>
        <OutlinedInput
          name="q"
          placeholder="Search by Zip Code or City"
          aria-label="Search by zip code or city"
          autoFocus
          startAdornment={<Search />}
        />
      </form>
    </Container>
  );
}

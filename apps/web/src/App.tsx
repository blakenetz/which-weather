import { Search } from "@mui/icons-material";
import { Container, OutlinedInput } from "@mui/material";
import styles from "./App.module.css";
import React from "react";

export default function App() {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e);
  };

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

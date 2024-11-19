import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Card from "./Card";

test("Form", async () => {
  const { baseElement } = render(
    <Card
      data={{
        time: new Date(2000, 1, 1).toString(),
        temperature: 100,
        icon: "",
        description: "description",
        wind: "wind",
      }}
    />
  );

  expect(baseElement).toMatchSnapshot();
});

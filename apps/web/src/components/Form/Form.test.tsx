import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Form from "./Form";

test("Form", async () => {
  const { baseElement } = render(<Form />);

  expect(baseElement).toMatchSnapshot();
});

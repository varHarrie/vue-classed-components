import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import { classed } from "../dist/index.js";

const Button = classed.button("px-4 py-2 rounded", {
  variants: {
    variant: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-500 text-white",
      danger: "bg-red-500 text-white",
    },
    size: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

const FloatButton = classed(
  Button,
  "fixed bottom-4 right-4 rounded-full shadow-lg",
);

test("renders a component", async () => {
  const defaultButton = mount(Button);

  const largeButton = mount(Button, {
    props: {
      variant: "primary",
      size: "large",
    },
  });

  const largeFloatButton = mount(FloatButton, {
    props: {
      variant: "primary",
      size: "large",
    },
  });

  expect(defaultButton.classes().join(" ")).toContain("px-4 py-2 rounded");

  expect(largeButton.classes().join(" ")).toBe(
    "px-4 py-2 rounded bg-blue-500 text-white text-lg",
  );

  expect(largeFloatButton.classes().join(" ")).toBe(
    "px-4 py-2 rounded bg-blue-500 text-white text-lg fixed bottom-4 right-4 rounded-full shadow-lg",
  );
});

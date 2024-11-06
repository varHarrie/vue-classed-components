# vue-classed-components

A utility library for Vue 3 that helps you create type-safe components with class variations. Inspired by `react-twc` and `class-variance-authority`.

## Features

- ✨ Full TypeScript support.
- 🎨 Powerful style variant system based on `class-variance-authority`
- 🔧 Support for all native HTML elements and Vue components
- 🔄 Compatible with existing CSS solutions (Tailwind CSS, UnoCSS, etc.)
- 📦 Lightweight with no extra dependencies

## Use Cases

- Creating reusable components with multiple style variants
- Wanting a styled-components-like development experience in Vue 3 projects
- Projects using atomic CSS frameworks like Tailwind CSS

## Installation

```bash
npm install vue-classed-components
# or
yarn add vue-classed-components
# or
pnpm add vue-classed-components
```

## Basic Usage

For detailed usage of variants, please refer to [class-variance-authority](https://cva.style/docs).

```typescript
import { classed } from "vue-classed-components";

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
```

Use in your component:

```vue
<template>
  <Button variant="primary" size="large"> Click me </Button>
  <FloatButton> Click me </FloatButton>
</template>
```

## Acknowledgement

This project is inspired by:

- [react-twc](https://github.com/gregberge/twc) - Similar implementation for React components
- [class-variance-authority](https://github.com/joe-bell/cva) - Core implementation of class name variants
- [@classed/vue](https://github.com/flamrdevs/classed/tree/main/packages/vue) - Type system reference and inspiration

Thanks for these amazing projects.

## License

MIT License © 2024-Present [varHarrie](https://github.com/varHarrie)

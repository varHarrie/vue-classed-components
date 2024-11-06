import { cva } from "class-variance-authority";
import {
  type ClassProp,
  type StringToBoolean,
} from "class-variance-authority/types";
import {
  defineComponent,
  h,
  type DefineSetupFnComponent,
  type FunctionalComponent,
  type NativeElements,
} from "vue";
import { type JSX } from "vue/jsx-runtime";

type SimpleComponent<P> = new () => { $props: P };

type VueComponentType<P = any> =
  | SimpleComponent<P>
  | FunctionalComponent<P>
  | (P extends Record<string, any> ? DefineSetupFnComponent<P> : never);

type IntrinsicElementType<P = any> = {
  [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K]
    ? K
    : never;
}[keyof JSX.IntrinsicElements];

type ElementType<P = any> = IntrinsicElementType<P> | VueComponentType<P>;

export type VueComponentProps<
  T extends VueComponentType | keyof JSX.IntrinsicElements,
> =
  T extends VueComponentType<infer P>
    ? P
    : T extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[T]
      : {};

type ClassValue = Parameters<typeof cva>[0];

type Config<V> = Parameters<typeof cva<V>>[1];

type ClassedComponent<E extends ElementType, P extends VueComponentProps<E>> = (
  props: P,
) => JSX.Element;

type ConfigSchema = Record<string, Record<string, ClassValue>>;
type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};

type CVAProps<V> = V extends ConfigSchema
  ? ConfigVariants<V> & ClassProp
  : ClassProp;

type Classed = {
  <E extends ElementType, V>(
    element: E,
    baseClass: ClassValue,
    config?: Config<V>,
  ): ClassedComponent<E, VueComponentProps<E> & CVAProps<V>>;
} & {
  [K in keyof NativeElements]: <V>(
    baseClass: ClassValue,
    config?: Config<V>,
  ) => ClassedComponent<K, VueComponentProps<K> & CVAProps<V>>;
};

function create(
  element: ElementType,
  baseClass: ClassValue,
  config?: Config<any>,
) {
  const variants = Object.keys(config?.variants || {});

  return defineComponent(
    (props, { attrs, slots }) => {
      return () =>
        h(element, { ...attrs, class: cva(baseClass, config)(props) }, slots);
    },
    {
      props: ["class", ...variants],
      inheritAttrs: false,
    },
  );
}

export const classed = new Proxy(create as unknown as Classed, {
  get(target, prop) {
    if (typeof prop === "string") {
      return (baseClass: ClassValue, config?: Config<any>) =>
        target(prop, baseClass, config);
    }
    return (target as any)[prop];
  },
});

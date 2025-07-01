import type { ComponentProps, ElementType } from 'react';
import type {
  AcceptsStyle,
  AsProp,
  PropsToOmit,
  StackPropsInternal,
} from './types.ts';
export { setDefaultGap, type Gap } from './gap.js';

export { default as Stack } from './components/Stack.svelte';
export { default as VStack } from './components/VStack.svelte';

export type StackProps<Component extends ElementType = 'div'> =
  AcceptsStyle<Component> extends never
    ? never
    : AsProp<Component> &
        StackPropsInternal &
        Omit<
          ComponentProps<Component>,
          PropsToOmit<Component, StackPropsInternal>
        >;


<script lang="ts" generics="Component extends keyof HTMLElementTagNameMap = 'div'">
  import type { StackProps } from '../index.js';
  import Stack from './Stack.svelte';

  let props: StackProps<Component> & { vertical?: never } = $props();
</script>

<Stack {...props} vertical />;

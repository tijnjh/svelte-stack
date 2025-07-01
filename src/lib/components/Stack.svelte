<script lang="ts" generics="Component extends keyof HTMLElementTagNameMap = 'div'">
  import { resolveAlignment } from '$lib/alignment.js';
  import { resolveGap } from '$lib/gap.js';
  import type { StackProps } from '../index.js';

  let {
    alignCenter,
    alignEnd,
    alignStart,
    around,
    as,
    baseline,
    between,
    center,
    columnGap: _columnGap,
    content,
    end,
    evenly,
    flex1,
    gap: _gap,
    horizontalPadding,
    inline,
    padding,
    reverse,
    rowGap: _rowGap,
    safe,
    self,
    shrink0,
    stretch,
    style,
    vertical,
    verticalPadding,
    wrap,
    children,
    ...props
  }: StackProps<Component> = $props();

  function baseStyle() {
    const baseStyle: Record<string, string | number | undefined> = {
      "align-content": resolveAlignment(content),
      "align-items": alignStart
        ? 'flex-start'
        : alignCenter
          ? 'center'
          : alignEnd
            ? 'flex-end'
            : baseline
              ? 'baseline'
              : undefined,
      "align-self": resolveAlignment(self),
      display: inline ? 'inline-flex' : 'flex',
      flex: flex1 ? 1 : undefined,
      "flex-direction": vertical
        ? reverse
          ? 'column-reverse'
          : 'column'
        : reverse
          ? 'row-reverse'
          : 'row',
      "flex-grow": stretch ? 1 : undefined,
      "flex-shrink": shrink0 ? 0 : undefined,
      "flex-wrap": wrap ? 'wrap' : 'nowrap',
      "justify-content": center
        ? `${safe ? 'safe ' : ''}center`
        : end
          ? `${safe ? 'safe ' : ''}flex-end`
          : between
            ? 'space-between'
            : evenly
              ? 'space-evenly'
              : around
                ? 'space-around'
                : 'flex-start',
    };

    const gap = resolveGap(_gap);
    const rowGap = resolveGap(_rowGap);
    const columnGap = resolveGap(_columnGap);

    if (rowGap != null) {
      baseStyle.rowGap = rowGap;
    }
    if (columnGap != null) {
      baseStyle.columnGap = columnGap;
    }
    if (gap != null && rowGap == null && columnGap == null) {
      baseStyle.gap = gap;
    }

    const vGap = rowGap ?? gap;
    const hGap = columnGap ?? gap;
    if (padding === true) {
      if (vGap != null) {
        baseStyle.paddingTop = baseStyle.paddingBottom = vGap;
      }
      if (hGap != null) {
        baseStyle.paddingLeft = baseStyle.paddingRight = hGap;
      }
    } else if (padding != null) {
      baseStyle.padding = padding;
    } else {
      if (verticalPadding != null || vGap != null) {
        const paddingValue = verticalPadding === true ? vGap : verticalPadding;
        baseStyle.paddingTop = baseStyle.paddingBottom = paddingValue;
      }

      if (horizontalPadding != null || hGap != null) {
        const paddingValue =
          horizontalPadding === true ? hGap : horizontalPadding;
        baseStyle.paddingLeft = baseStyle.paddingRight = paddingValue;
      }
    }

    return baseStyle;
  }


  function cssStringify(obj: Record<string, string | number | undefined>) {
    return Object.keys(obj).map(k => `${k}: ${obj[k]}`).join(';')
  }


</script>

<svelte:element
  this={ as || 'div'}
  {...props}
  style={cssStringify(baseStyle())}

>
 {@render children?.()}
</svelte:element>
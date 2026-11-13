export default defineAppConfig({
  ui: {
    colors: {
      primary: 'neutral',
      secondary: 'blue',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'neutral',
      brand: 'brand',
    },
    button: {
      slots: { base: 'justify-center rounded-none' },
      compoundVariants: [
        {
          color: 'brand',
          variant: 'solid',
          class: 'text-white hover:bg-brand-strong',
        },
        {
          class: 'outline-focus focus-visible:outline-2 focus-visible:outline-offset-2',
        },
      ],
      defaultVariants: { color: 'brand' },
    },
    modal: {
      variants: {
        transition: {
          true: {
            content:
              'motion-reduce:data-[state=open]:animate-[fade-in_200ms_var(--ease-out)] motion-reduce:data-[state=closed]:animate-[fade-out_200ms_var(--ease-out)]',
          },
        },
      },
    },
    link: {
      base: 'outline-focus focus-visible:outline-2 focus-visible:outline-offset-2',
    },
    input: {
      compoundVariants: [
        {
          highlight: false,
          class: { base: 'ring-(--ui-text-muted)' },
        },
        {
          class: {
            base: 'placeholder:text-muted focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-focus',
          },
        },
      ],
    },
    switch: {
      compoundVariants: [
        {
          class: {
            base: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
          },
        },
      ],
    },
  },
})

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
    link: {
      base: 'outline-focus focus-visible:outline-2 focus-visible:outline-offset-2',
    },
    input: {
      compoundVariants: [
        {
          class: {
            base: 'focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-focus',
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

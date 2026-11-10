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
          class:
            'text-white hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted',
        },
      ],
      defaultVariants: { color: 'brand' },
    },
  },
})

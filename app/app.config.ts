export default defineAppConfig({
  ui: {
    colors: {
      primary: 'neutral',
      secondary: 'blue',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'slate',
    },
    button: {
      slots: { base: 'justify-center' },
      compoundVariants: [
        { color: 'error', variant: 'solid', class: 'dark:text-white light:text-black' },
      ],
      defaultVariants: { color: 'error' },
    },
  },
})

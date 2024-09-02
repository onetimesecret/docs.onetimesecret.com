export default defineAppConfig({
  ui: {
    safelistColors: ['brand', 'orange'],
    primary: 'brand',
    gray: 'midnight',
    button: {
      rounded: 'rounded-md',
      default: {
        size: 'md',
        color: 'gray'
      },
      color: {

      },
    },
    input: {
      default: {
        size: 'md'
      }
    },
    card: {
      rounded: 'rounded-xl'
    },
    footer: {
      top: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
        container: 'py-8 lg:py-16'
      },
      bottom: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    },
    page: {
      hero: {
        wrapper: 'lg:py-24'
      }
    },
    font: {
      default: 'font-serif'
    },
  }
})

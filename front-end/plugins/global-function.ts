export default defineNuxtPlugin(() => {
  const toLabel = (text: string) =>
    text ? text.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase()) : ''

  const toPlaceHolder = (key: string): string => {
    return toLabel(key)
  }

  return {
    provide: {
      toLabel,
      toPlaceHolder,
    },
  }
})
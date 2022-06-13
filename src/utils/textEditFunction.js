// eslint-disable-next-line import/prefer-default-export
export const getPastedText = e => {
  let pastedText
  if (window.clipboardData && window.clipboardData.getData) {
    pastedText = window.clipboardData.getData('Text')
  } else if (e.clipboardData && e.clipboardData.getData) {
    pastedText = e.clipboardData.getData('text/plain')
  }
  return pastedText
}

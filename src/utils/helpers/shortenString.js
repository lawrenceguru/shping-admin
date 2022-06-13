// eslint-disable-next-line import/prefer-default-export
export const shortenString = (str, maxLength) => {
  return str.length > maxLength ? `${str.slice(0, maxLength - 3)}...` : str
}

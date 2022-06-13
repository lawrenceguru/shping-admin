// eslint-disable-next-line import/prefer-default-export
export const getCountriesOptions = countries => {
  return countries ? countries.map(el => ({ value: el.iso, label: el.name })) : []
}

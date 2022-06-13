const getQueryString = values => {
  let queryString = ''
  if (values && values.length) {
    values.forEach((item, index) => {
      if (index === values.length - 1) {
        queryString += `${item}`
      } else {
        queryString += `${item},`
      }
    })
  }
  return queryString
}

// eslint-disable-next-line import/prefer-default-export
export const getOwnerFilter = (filter, participants) => {
  let ownerName = null
  if (filter && filter.value) {
    const foundId = participants
      .filter(el => el.name && el.name.toLowerCase().includes(filter.value.toLowerCase()))
      .map(el => el.id)
    ownerName = foundId && foundId.length ? getQueryString(foundId) : filter.value
  }
  return ownerName
}

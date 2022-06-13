export function getUserConfiguration(field) {
  try {
    const userConfiguration = JSON.parse(localStorage.getItem('userConfiguration'))
    if (!userConfiguration) {
      return null
    }
    return userConfiguration[field] ? userConfiguration[field] : null
  } catch (e) {
    return null
  }
}

export function setUserConfiguration(data) {
  const userConfiguration = JSON.parse(localStorage.getItem('userConfiguration'))
  if (!userConfiguration) {
    localStorage.setItem('userConfiguration', JSON.stringify({ [data.pageName]: [data.widgetName] }))
    return
  }
  const nU = userConfiguration[data.pageName]
    ? { ...userConfiguration, [data.pageName]: [...userConfiguration[data.pageName], data.widgetName] }
    : { ...userConfiguration, [data.pageName]: [data.widgetName] }
  localStorage.setItem('userConfiguration', JSON.stringify(nU))
}

export function removeItemFromUserConfiguration(field, item) {
  const userConfiguration = JSON.parse(localStorage.getItem('userConfiguration'))
  const newConfiguration = userConfiguration[field]
    ? { ...userConfiguration, [field]: userConfiguration[field].filter(el => el !== item) }
    : { ...userConfiguration }
  localStorage.setItem('userConfiguration', JSON.stringify(newConfiguration))
}

export function setUserOrder(page, order) {
  const userOrder = JSON.parse(localStorage.getItem('order'))
  if (!userOrder) {
    localStorage.setItem('order', JSON.stringify({ [page]: order }))
    return
  }
  const nU = { ...userOrder, [page]: order }
  localStorage.setItem('order', JSON.stringify(nU))
}

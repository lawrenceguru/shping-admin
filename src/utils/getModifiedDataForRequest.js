export const getModifiedDataForGetAttachmentsRequest = (response, responsePositions) => {
  const param = {
    query: 'id=in=(',
    order: 'name',
    type: 'data'
  }
  let brands = []
  let positionProductInfo = null

  if (response && response.data && response.data.gtin && response.data.gtin.length) {
    param.query += response.data.gtin.map(value => `${value},`).reduce((acc, value) => acc + value, '')
  } else {
    param.take = 0
  }

  if (response && response.data && response.data.brand) {
    brands = response.data.brand
  }

  param.query += ')'

  if (!response || !response.data || !response.data.gtin || !Object.keys(response.data.gtin).length) {
    param.query = ''
  }

  if (responsePositions && responsePositions.gtin && Object.keys(responsePositions.gtin).length) {
    positionProductInfo = responsePositions.gtin[Object.keys(responsePositions.gtin)[0]]
  }

  if (
    !positionProductInfo &&
    responsePositions &&
    responsePositions.brand &&
    Object.keys(responsePositions.brand).length
  ) {
    positionProductInfo = responsePositions.brand[Object.keys(responsePositions.brand)[0]]
  }

  return {
    param,
    brands,
    positionProductInfo
  }
}

const getToAttach = (initialArray, keyValue) => {
  if (initialArray && initialArray.length > 0) {
    return keyValue && keyValue.length > 0 ? initialArray.filter(el => keyValue.indexOf(el.value) === -1) : initialArray
  }
  return []
}

const getToAttachPositions = (initialArray, keyValue, numberPosition) => {
  if (!keyValue || !Object.keys(keyValue).length) {
    return initialArray
  }

  return initialArray.filter(elem => keyValue[elem.value] === undefined || keyValue[elem.value] !== numberPosition)
}

const getToDetach = (initialArray, keyValue) => {
  if (keyValue && keyValue.length > 0) {
    return initialArray && initialArray.length > 0 ? keyValue.filter(g => initialArray.indexOf(g) === -1) : keyValue
  }
  return []
}

const getToDetachPositions = (initialArray, keyValue) => {
  if (!keyValue || !Object.keys(keyValue).length) {
    return []
  }

  return initialArray.filter(elem => keyValue[elem.value])
}

export const getModifiedDataForPostAttachmentsRequest = (data, brands, products, gtin, positionProductInfo, brand) => {
  let productsToAttach = []
  let positionProductToDetach = []

  let brandsToAttach = []
  let positionBrandToDetach = []

  if (positionProductInfo || positionProductInfo === 0) {
    productsToAttach = getToAttachPositions(products, data && data.gtin, Number(positionProductInfo))
    brandsToAttach = getToAttachPositions(brands, data.brand, Number(positionProductInfo))
  } else {
    productsToAttach = getToAttach(products, gtin)
    positionProductToDetach = getToDetachPositions(products, data && data.gtin)

    brandsToAttach = getToAttach(brands, brand)
    positionBrandToDetach = getToDetachPositions(brands, data && data.brand)
  }

  const productsToDetach = getToDetach(products, gtin)

  const brandsToDetach = getToDetach(brands, brand)

  return {
    productsToAttach,
    productsToDetach,
    brandsToDetach,
    brandsToAttach,
    positionProductToDetach,
    positionBrandToDetach
  }
}

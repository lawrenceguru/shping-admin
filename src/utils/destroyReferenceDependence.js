// eslint-disable-next-line import/prefer-default-export
export const destroyReferenceDependence = data => {
  let newData = null
  try {
    newData = JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }

  return newData || data
}

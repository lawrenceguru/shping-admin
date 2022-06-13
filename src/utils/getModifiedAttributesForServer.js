export default function getModifiedAttributesForServer(data) {
  const attributesWithoutEmptyKeys = []
  const attributesForServer = {}
  data.tradeItem.gpc_brick_attributes.forEach(item => {
    if (item.key && item.key && item.key.trim() !== '' && !item.key.startsWith('def')) {
      attributesWithoutEmptyKeys.push(item)
    }
  })
  attributesWithoutEmptyKeys.forEach(el => {
    attributesForServer[el.key] = el.value
  })

  return attributesForServer
}

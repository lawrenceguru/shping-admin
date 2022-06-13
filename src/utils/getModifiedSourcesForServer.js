// eslint-disable-next-line no-unused-vars
export default function(data, modifiedParticipantType, isSystem) {
  // eslint-disable-next-line array-callback-return,consistent-return
  const newSourcesWithoutTypeForServer = JSON.parse(JSON.stringify(data)).filter(
    source => isSystem || source.type === modifiedParticipantType
  )
  newSourcesWithoutTypeForServer.forEach(el => {
    if (el.conditions) {
      if (el.conditions.country && !el.conditions.country.length) {
        // eslint-disable-next-line no-param-reassign
        delete el.conditions.country
      }
      if (el.conditions.language && !el.conditions.language.length) {
        // eslint-disable-next-line no-param-reassign
        delete el.conditions.language
      }
    }
    if (!el.id && el.type) {
      // eslint-disable-next-line no-param-reassign
      delete el.type
    }
  })

  return newSourcesWithoutTypeForServer
}

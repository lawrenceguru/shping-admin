import { convertFromRaw, EditorState } from 'draft-js'
import { markdownToDraft } from 'markdown-draft-js'
import uuid from 'uuid4'

export default function(newSources) {
  newSources.forEach((el, index) => {
    const elWidgets = el.data
    elWidgets.forEach((elData, indexData) => {
      if (elData.text) {
        if (elData.text.text && typeof elData.text.text === 'string') {
          const content = convertFromRaw(markdownToDraft(elData.text.text))
          // eslint-disable-next-line no-param-reassign
          elData.text.text = EditorState.createWithContent(content)
        }
      }
      if (newSources[index].data[indexData].image) {
        // eslint-disable-next-line no-param-reassign
        elData.id = uuid()
      }
      if (elData.health_star && elData.health_star.icons && elData.health_star.icons.length) {
        // eslint-disable-next-line no-param-reassign
        elData.health_star.number_of_fields = elData.health_star.icons.length
        elData.health_star.icons.forEach(icon => {
          // eslint-disable-next-line no-param-reassign
          icon.check = true
        })
      }
      if (newSources[index].data[indexData].certificates) {
        // eslint-disable-next-line no-param-reassign
        elData.id = uuid()
      }
      if (elData.social_networks) {
        elData.social_networks.forEach(network => {
          // eslint-disable-next-line no-param-reassign
          network.id = uuid()
        })
      }
      if (elData.components && elData.components.items && elData.components.items.length) {
        const groupId = {}
        elData.components.items.forEach(item => {
          if (item.group && !groupId[item.group]) {
            groupId[item.group] = uuid()
          }
          // eslint-disable-next-line no-param-reassign
          item.groupId = groupId[item.group]
        })
      }
      if (elData.nutrition_info && elData.nutrition_info.ingredients && elData.nutrition_info.ingredients.length) {
        const groupId = {}
        elData.nutrition_info.ingredients.forEach(ingredient => {
          if (ingredient.group && !groupId[ingredient.group]) {
            groupId[ingredient.group] = uuid()
          }
          // eslint-disable-next-line no-param-reassign
          ingredient.groupId = groupId[ingredient.group]
        })
      }
      if (elData.link) {
        // eslint-disable-next-line no-param-reassign
        elData.id = uuid()
      }
    })
  })
  return newSources
}

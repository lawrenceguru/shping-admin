import { stateToMarkdown } from 'draft-js-export-markdown'
import { isNil } from 'lodash'

export default function(sources, isNewProduct, isSelectsDisable) {
  const newSources = []
  sources.forEach(el => {
    const newData = []
    const isChecking = isNewProduct ? true : !isSelectsDisable
    if (isChecking && el.data) {
      el.data.forEach(elem => {
        let copyElem = { ...elem }
        delete copyElem.id
        if (!Object.keys(elem).includes('private')) {
          copyElem.private = false
        }
        if (
          Object.keys(copyElem).filter(w => w !== 'text').length >= 1 &&
          copyElem.text &&
          typeof copyElem.text.text !== 'string'
        ) {
          const markdownString = stateToMarkdown(copyElem.text.text.getCurrentContent())
          copyElem = { ...copyElem, text: { ...copyElem.text, text: markdownString } }
        }
        if (Object.keys(copyElem).includes('image')) {
          const newImages = []
          if (copyElem.id) {
            // eslint-disable-next-line no-param-reassign
            delete copyElem.id
          }
          copyElem.image.forEach(im => {
            if (im.url) {
              newImages.push(im)
            }
          })
          copyElem = { ...copyElem, image: newImages }
        }
        if (Object.keys(copyElem).includes('certificates')) {
          if (copyElem.id) {
            // eslint-disable-next-line no-param-reassign
            delete copyElem.id
          }
        }
        if (Object.keys(copyElem).includes('link')) {
          if (copyElem.id) {
            // eslint-disable-next-line no-param-reassign
            delete copyElem.id
          }
        }
        if (Object.keys(copyElem).includes('social_networks')) {
          copyElem.social_networks.forEach(network => {
            // eslint-disable-next-line no-param-reassign
            delete network.id
          })
        }
        if (Object.keys(copyElem).includes('nutrition_info')) {
          try {
            copyElem.nutrition_info.package_size = Number(copyElem.nutrition_info.package_size)
            copyElem.nutrition_info.serving_size = Number(copyElem.nutrition_info.serving_size)
            copyElem.nutrition_info.serving_energy = Number(copyElem.nutrition_info.serving_energy)
          } catch (e) {
            console.log(e)
          }
          if (copyElem.nutrition_info.ingredients && copyElem.nutrition_info.ingredients.length) {
            copyElem.nutrition_info.ingredients.forEach(ingredient => {
              // eslint-disable-next-line no-param-reassign
              delete ingredient.groupId
            })
          }
          if (copyElem.nutrition_info.nutrition_staff && copyElem.nutrition_info.nutrition_staff.length) {
            copyElem.nutrition_info.nutrition_staff.forEach(staff => {
              try {
                // eslint-disable-next-line no-param-reassign
                staff.value = Number(staff.value)
                if (staff.rdi) {
                  // eslint-disable-next-line no-param-reassign
                  staff.rdi = Number(staff.rdi)
                }
              } catch (e) {
                console.log(e)
              }

              if (staff.nutrition_staff && staff.nutrition_staff.length) {
                // eslint-disable-next-line no-param-reassign
                staff.nutrition_staff.forEach(subStaff => {
                  try {
                    // eslint-disable-next-line no-param-reassign
                    subStaff.value = Number(subStaff.value)
                    if (subStaff.rdi) {
                      // eslint-disable-next-line no-param-reassign
                      subStaff.rdi = Number(subStaff.rdi)
                    }
                  } catch (e) {
                    console.log(e)
                  }
                })
              }
            })
          }
        }
        if (Object.keys(copyElem).includes('components')) {
          if (copyElem.components.items && copyElem.components.items.length) {
            copyElem.components.items.forEach(ingredient => {
              // eslint-disable-next-line no-param-reassign
              delete ingredient.groupId
            })
          }
        }
        if (Object.keys(copyElem).includes('health_star')) {
          // eslint-disable-next-line no-param-reassign
          delete copyElem.health_star.number_of_fields
          if (copyElem.health_star.per === 'quantity') {
            try {
              copyElem.health_star.quantity = Number(copyElem.health_star.quantity)
            } catch (e) {
              console.log(e)
            }
          }
          if (copyElem.health_star.icons && copyElem.health_star.icons.length) {
            const icons = []
            copyElem.health_star.icons.forEach(i => {
              if (i.check && !isNil(i.value)) {
                try {
                  icons.push({ ...i, value: Number(i.value), check: undefined })
                } catch (e) {
                  console.log(e)
                }
              }
              copyElem.health_star.icons = icons
            })
          }
        }
        newData.push(copyElem)
      })
      newSources.push({ ...el, data: newData })
    }
  })
  return newSources
}

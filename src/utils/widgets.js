import uuid from 'uuid4'

import { stateToMarkdown } from 'draft-js-export-markdown'
import { isNil } from 'lodash'

const NUTRITION_STAFF = [
  {
    less_than: false,
    unit: 'g',
    name: 'Total Fat',
    value: null,
    nutrition_staff: [
      { less_than: false, unit: 'g', name: 'Trans Fat', value: null },
      { less_than: false, unit: 'g', name: 'Saturated Fat', value: null }
    ]
  },
  { less_than: false, unit: 'g', name: 'Sodium', value: null },
  {
    less_than: false,
    unit: 'g',
    name: 'Total Carbohydrate',
    value: null,
    nutrition_staff: [
      { less_than: false, unit: 'g', name: 'Dietary Fiber', value: null },
      { less_than: false, unit: 'g', name: 'Sugars', value: null }
    ]
  },
  { less_than: false, unit: 'g', name: 'Protein', value: null }
]

const getWidget = widgetName => {
  if (widgetName) {
    if (widgetName === 'text') {
      return {
        [widgetName]: { title: '', text: null, markdown: false },
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'title' || widgetName === 'header') {
      return {
        [widgetName]: { text: null, markdown: false },
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'follow_fb') {
      return {
        follow_fb: { text: null, url: '' },
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'phone') {
      return {
        phone: { text: null, to: '+' },
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'email') {
      return {
        email: { subject: null, text: null, to: null },
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'image') {
      return {
        image: [{ url: null }],
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'gdti') {
      return {
        gdti: { gdti: null, inline: false },
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'video') {
      return {
        video: { preview: null, title: null, url: null },
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'link') {
      return {
        link: { text: null, url: null },
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'popup') {
      return {
        popup: { title: null, text: null, ok: null, icon: null, cancel: null },
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'certificates') {
      return {
        certificates: { title: null, list: [{ expired: false, gdti: null, img_url: null }] },
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'made_in') {
      return {
        made_in: { country: null },
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'health_star') {
      return {
        health_star: {
          icons: [
            { name: 'Energy', unit: 'kJ', value: null, check: false },
            { name: 'Sat Fat', unit: 'g', value: null, check: false },
            { name: 'Sodium', unit: 'mg', value: null, check: false },
            { name: 'Fibre', unit: 'g', value: null, check: false },
            { name: 'Sugars', unit: 'g', value: null, check: false },
            { name: 'Protein', unit: 'g', value: null, check: false }
          ],
          per: 'pack',
          rating: 10,
          number_of_fields: 0
        },
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'nutrition_info') {
      return {
        nutrition_info: {
          ingredients: [],
          nutrition_staff: NUTRITION_STAFF,
          package_size: null,
          package_unit: 'g',
          serving_energy: null,
          serving_size: null,
          title: 'Nutrition Info'
        },
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'social_networks') {
      return {
        social_networks: [{ icon: undefined, url: null, id: uuid() }],
        id: uuid(),
        private: false
      }
    }

    if (widgetName === 'components') {
      return {
        components: {
          title: null,
          items: [
            {
              allergen: false,
              group: null,
              name: null,
              nano: false,
              groupId: uuid()
            }
          ]
        },
        id: uuid(),
        private: false
      }
    }

    return null
  }

  return null
}

export const getGroupWidgets = widgets => {
  const result = []
  if (widgets && widgets.length) {
    widgets.forEach(item => {
      result.push(getWidget(item))
    })
  }

  return result
}

export const getModifiedWidgetsDataForServer = (sources, isNewProduct, isSelectsDisable) => {
  const newSources = []
  const isChecking = isNewProduct || !isSelectsDisable

  sources.forEach(source => {
    const newSource = { ...source }
    delete newSource.id
    delete newSource.type
    let newData = []

    if (isChecking && source.data) {
      newData = source.data.map(elem => {
        let copyElem = { ...elem }
        delete copyElem.id
        const elemKeys = Object.keys(copyElem)

        if (!elemKeys.includes('private')) {
          copyElem.private = false
        }

        if (elemKeys.filter(w => w !== 'text').length >= 1 && copyElem.text && typeof copyElem.text.text !== 'string') {
          const markdownString = stateToMarkdown(copyElem.text.text.getCurrentContent())
          copyElem = { ...copyElem, text: { ...copyElem.text, text: markdownString } }
        }

        if (elemKeys.includes('image')) {
          copyElem = { ...copyElem, image: [...copyElem.image] }
        }

        if (elemKeys.includes('social_networks')) {
          copyElem.social_networks = copyElem.social_networks.map(network => {
            const newNetwork = { ...network }
            delete newNetwork.id
            return newNetwork
          })
        }
        if (elemKeys.includes('nutrition_info')) {
          try {
            copyElem.nutrition_info.package_size = Number(copyElem.nutrition_info.package_size)
            copyElem.nutrition_info.serving_size = Number(copyElem.nutrition_info.serving_size)
            copyElem.nutrition_info.serving_energy = Number(copyElem.nutrition_info.serving_energy)
          } catch (e) {
            console.log(e)
          }

          if (copyElem.nutrition_info.ingredients && copyElem.nutrition_info.ingredients.length) {
            copyElem.nutrition_info.ingredients = copyElem.nutrition_info.ingredients.map(ingredient => {
              const newIngredient = { ...ingredient }
              delete newIngredient.groupId
              return newIngredient
            })
          }

          if (copyElem.nutrition_info.nutrition_staff && copyElem.nutrition_info.nutrition_staff.length) {
            copyElem.nutrition_info.nutrition_staff = copyElem.nutrition_info.nutrition_staff.map(staff => {
              const newStaff = { ...staff }
              try {
                newStaff.value = Number(staff.value)
                if (staff.rdi) {
                  newStaff.rdi = Number(staff.rdi)
                }
              } catch (e) {
                console.log(e)
              }

              if (staff.nutrition_staff && staff.nutrition_staff.length) {
                newStaff.nutrition_staff = staff.nutrition_staff.map(subStaff => {
                  const newSubStaff = { ...subStaff }
                  try {
                    newSubStaff.value = Number(subStaff.value)

                    if (subStaff.rdi) {
                      newSubStaff.rdi = Number(subStaff.rdi)
                    }
                  } catch (e) {
                    console.log(e)
                  }

                  return newSubStaff
                })
              }

              return newStaff
            })
          }
        }
        if (elemKeys.includes('components')) {
          if (copyElem.components.items && copyElem.components.items.length) {
            copyElem.components.items = copyElem.components.items.map(ingredient => {
              const newIngredient = { ...ingredient }
              delete newIngredient.groupId
              return newIngredient
            })
          }
        }
        if (elemKeys.includes('health_star')) {
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
            copyElem.health_star.icons.forEach(icon => {
              if (icon.check && !isNil(icon.value)) {
                try {
                  icons.push({ ...icon, value: Number(icon.value), check: undefined })
                } catch (e) {
                  console.log(e)
                }
              }
              copyElem.health_star.icons = icons
            })
          }
        }

        return copyElem
      })

      newSources.push({ ...newSource, data: newData })
    }
  })

  return newSources
}

export const getModifiedSourcesForServer = data => {
  return data.map(source => {
    const newSource = { ...source }

    if (source.conditions && source.conditions.country && !source.conditions.country.length) {
      delete newSource.conditions.country
    }

    if (source.conditions && source.conditions.language && !source.conditions.language.length) {
      delete newSource.conditions.language
    }

    if (!source.id && source.type) {
      delete newSource.type
    }

    return newSource
  })
}

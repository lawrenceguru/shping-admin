import React from 'react'
import PropTypes from 'prop-types'
import { groupBy } from 'lodash'
import MobilePreviewIngredientGroup from '../MobilePreviewIngredientGroup'

const MobilePreviewIngredient = ({ ingredients, nutrientList, isComponent }) => {
  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {!ingredients
        ? null
        : ingredients[0] && ingredients[0].items
        ? ingredients.map((m, index) => {
            return (
              <MobilePreviewIngredientGroup
                /* eslint-disable-next-line react/no-array-index-key */
                key={`ingredientGroup.${m.group}.${index}`}
                items={m.items}
                group={m.group}
                index={index}
                nutrientList={nutrientList}
                isComponent={isComponent}
              />
            )
          })
        : Object.keys(groupBy(ingredients, 'group')).map((group, groupIndex) => {
            const items = groupBy(ingredients, 'group')

            return (
              <MobilePreviewIngredientGroup
                /* eslint-disable-next-line react/no-array-index-key */
                key={`ingredientGroup.${group}.${groupIndex}`}
                items={items[group]}
                group={group}
                index={groupIndex}
                nutrientList={nutrientList}
                isComponent={isComponent}
              />
            )
          })}
    </>
  )
}

MobilePreviewIngredient.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
  nutrientList: PropTypes.arrayOf(PropTypes.object),
  isComponent: PropTypes.bool
}

MobilePreviewIngredient.defaultProps = {
  ingredients: null,
  nutrientList: null,
  isComponent: false
}

export default MobilePreviewIngredient

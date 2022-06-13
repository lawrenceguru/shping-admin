import React, { useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import MobilePreviewWidgetWrapper from '../MobilePreviewWidgetWrapper'
import * as ST from './styles'

const MobilePreviewIngredientGroup = ({ items, group, nutrientList, isComponent }) => {
  const [description, setDescription] = useState('')

  const handleShowDescription = value => {
    setDescription(value === description ? '' : value)
  }

  const groupItems =
    items &&
    items.map((item, index) => {
      const isLast = index !== items.length - 1

      if (!item) {
        return null
      }

      // eslint-disable-next-line no-nested-ternary
      const itemName = item.gdti
        ? // eslint-disable-next-line no-nested-ternary
          nutrientList && nutrientList.length > 0
          ? nutrientList.find(nutrient => nutrient.value === item.gdti)
            ? nutrientList.find(nutrient => nutrient.value === item.gdti).label
            : ''
          : ''
        : item.name

      return (
        <ST.IngredientItem
          allergen={item.allergen}
          description={item.description}
          isComponent={isComponent}
          /* eslint-disable-next-line react/no-array-index-key */
          key={`ingredientItem.${group}.${itemName}.${index}`}
          {...(item.description && { onClick: () => handleShowDescription(item.description) })}
        >
          {item.nano ? `${itemName || ''} (${intl.get('mobilePreviewNutritionInfo.nanoLabel')})` : itemName}
          {isLast && ','}
        </ST.IngredientItem>
      )
    })

  return (
    <ST.IngredientsWrapper>
      {group && group !== 'undefined' && (
        <MobilePreviewWidgetWrapper text={group || ''} isInner>
          <ST.ItemWrapper isComponent={isComponent}>
            <ST.IngredientsBody>{groupItems}</ST.IngredientsBody>
            {description && <ST.IngredientsDescription>{description}</ST.IngredientsDescription>}
          </ST.ItemWrapper>
        </MobilePreviewWidgetWrapper>
      )}
    </ST.IngredientsWrapper>
  )
}

MobilePreviewIngredientGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  group: PropTypes.string,
  nutrientList: PropTypes.arrayOf(PropTypes.object),
  isComponent: PropTypes.bool
}

MobilePreviewIngredientGroup.defaultProps = {
  items: null,
  group: null,
  nutrientList: null,
  isComponent: false
}

export default MobilePreviewIngredientGroup

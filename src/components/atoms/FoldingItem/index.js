import React, { useState } from 'react'
import PropTypes from 'prop-types'
import 'rc-slider/assets/index.css'
import { ItemWrapper, ClickButton, ItemNameWrapper, FoldingValues, ItemChildWrapper } from './styles'

const FoldingItem = ({ item, child, servings, nutrientList, ...rest }) => {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false)

  const floatValue = val => (val ? parseFloat(val.replace ? val.replace(',', '.') : val) : 0)
  const value = Math.round(floatValue(item.value) * servings * 100) / 100

  // eslint-disable-next-line no-nested-ternary
  const itemName = item.gdti
    ? // eslint-disable-next-line no-nested-ternary
      nutrientList && nutrientList.length > 0
      ? nutrientList.find(nutrient => nutrient.value === item.gdti)
        ? nutrientList.find(nutrient => nutrient.value === item.gdti).label
        : ''
      : ''
    : item.name

  const toggle = e => {
    e.stopPropagation()
    e.preventDefault()
    setOpen(!open)
  }

  return (
    <div {...rest}>
      <ItemWrapper>
        {item.nutrition_staff && item.nutrition_staff.length > 0 && (
          // eslint-disable-next-line react/button-has-type
          <ClickButton onClick={toggle}>
            <img src={open ? '/reduce-white.svg' : '/add-white.svg'} alt='Click' />
          </ClickButton>
        )}
        {child && !item.nutrition_staff ? (
          <ItemChildWrapper isGdti={!!item.gdti}>{itemName}</ItemChildWrapper>
        ) : (
          <ItemNameWrapper isGdti={!!item.gdti}>{itemName}</ItemNameWrapper>
        )}
        <FoldingValues child={child}>
          {/* eslint-disable-next-line no-restricted-globals */}
          {!isNaN(value) &&
            item.unit &&
            `${(item.less_than && '< ') || ''}${value}${typeof item.unit === 'object' ? item.unit.value : item.unit}`}
        </FoldingValues>
        <FoldingValues child={child}>
          {item.rdi && floatValue(item.rdi) > 0 ? `${Math.round((value / floatValue(item.rdi)) * 100)}%` : '-'}
        </FoldingValues>
      </ItemWrapper>
      {item.nutrition_staff
        ? item.nutrition_staff.map(
            (foldingItem, i) =>
              (foldingItem.gdti || foldingItem.name) && (
                <FoldingItem
                  servings={servings}
                  style={{
                    display: open ? 'inherit' : 'none',
                    fontWeight: 300
                  }}
                  item={foldingItem}
                  child
                  itemkey={(foldingItem.gdti || foldingItem.name) + i}
                  nutrientList={nutrientList}
                  /* eslint-disable-next-line react/no-array-index-key */
                  key={i}
                />
              )
          )
        : null}
    </div>
  )
}

FoldingItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  data: PropTypes.object
}

FoldingItem.defaultProps = {
  data: null
}

export default FoldingItem

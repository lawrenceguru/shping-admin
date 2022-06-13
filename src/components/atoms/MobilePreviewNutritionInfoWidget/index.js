import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider'
import intl from 'react-intl-universal'
import FoldingItem from '../FoldingItem'
import IconButton from '../../molecules/IconButton'
import * as ST from './styles'

const MobilePreviewNutritionInfoWidget = ({ data, nutrientList }) => {
  const [servings, setServings] = useState(1)

  const percentage = (data.nutrition_info.serving_size / data.nutrition_info.package_size) * 100 * servings
  return (
    <ST.NutritionInfoWrapper>
      {!data.nutrition_info.serving_size || !data.nutrition_info.package_size ? null : (
        <>
          <ST.Percentage>
            {percentage && <span>{percentage % 1 === 0 ? percentage : percentage.toFixed(2)}%</span>}
            <span>
              (
              {`${data.nutrition_info.serving_size * servings}${
                typeof data.nutrition_info.package_unit === 'object'
                  ? data.nutrition_info.package_unit.value
                  : data.nutrition_info.package_unit
              }`}
              )
            </span>
          </ST.Percentage>
          <ST.SliderRangeWrapper>
            <IconButton
              type='Minus'
              styleParam={{ fontSize: 20 }}
              actionFunction={() => {
                if (servings >= 1) {
                  setServings(servings - 1)
                }
              }}
            />
            <Slider
              onChange={value => {
                setServings(value / ((data.nutrition_info.serving_size / data.nutrition_info.package_size) * 100))
              }}
              value={(data.nutrition_info.serving_size / data.nutrition_info.package_size) * 100 * servings}
              step={(data.nutrition_info.serving_size / data.nutrition_info.package_size) * 100}
              dots
            />
            <IconButton
              type='Add'
              styleParam={{ fontSize: 20 }}
              actionFunction={() => {
                if (servings <= data.nutrition_info.package_size / data.nutrition_info.serving_size - 1)
                  setServings(servings + 1)
              }}
            />
          </ST.SliderRangeWrapper>
          <ST.NutritionInfoDataWrapper>
            {(data.nutrition_info.serving_energy || data.nutrition_info.nutrition_staff) && (
              <div>
                <ST.NutritionInfoItemsHeadersWrapper>
                  <span>{intl.get('mobilePreviewNutritionInfo.amountsPerSaving')}</span>
                  <span />
                  <span>{intl.get('mobilePreviewNutritionInfo.dailyValue')}</span>
                </ST.NutritionInfoItemsHeadersWrapper>
                <ST.NutritionDetails>
                  <ST.DetailWrapper>
                    <span>{intl.get('mobilePreviewNutritionInfo.calories')}</span>
                    <span>
                      {Math.round(data.nutrition_info.serving_energy * servings * 100) / 100}
                      {intl.get('mobilePreviewNutritionInfo.kcal')}
                    </span>
                    <span />
                  </ST.DetailWrapper>
                  {data.nutrition_info.nutrition_staff &&
                    data.nutrition_info.nutrition_staff.map((item, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <FoldingItem key={i} servings={servings} item={item} itemkey={i} nutrientList={nutrientList} />
                    ))}
                </ST.NutritionDetails>
              </div>
            )}
          </ST.NutritionInfoDataWrapper>
        </>
      )}
    </ST.NutritionInfoWrapper>
  )
}

MobilePreviewNutritionInfoWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  nutrientList: PropTypes.arrayOf(PropTypes.object)
}

MobilePreviewNutritionInfoWidget.defaultProps = {
  data: null,
  nutrientList: null
}

export default MobilePreviewNutritionInfoWidget

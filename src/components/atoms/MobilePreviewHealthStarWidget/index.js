import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import MobilePreviewHealthStarCylinder from '../MobilePreviewHealthStarCylinder'
import IconButton from '../../molecules/IconButton'
import * as ST from './styles'

const MobilePreviewHealthStarWidget = ({ data }) => {
  const uncheckedCount = !data || !data.icons || !data.icons.length ? 0 : 5 - data.icons.filter(el => el.check).length

  return (
    <ST.MainWrapper>
      <ST.Wrapper uncheckedCount={uncheckedCount}>
        <ST.CircleWrapper uncheckedCount={uncheckedCount}>
          <ST.CircleFakeWrapper />
          {uncheckedCount !== 5 && uncheckedCount !== 0 && <ST.HideBorder />}
          <ST.CircleContentWrapper>
            <ST.Circle>
              <ST.StarsWrapper>
                {new Array(5).fill(null).map((a, i) => (
                  <IconButton
                    /* eslint-disable-next-line react/no-array-index-key */
                    key={i}
                    /* eslint-disable-next-line no-nested-ternary */
                    type={i < data.rating / 2 ? (i + 0.5 === data.rating / 2 ? 'StarHalf' : 'Star') : 'StarEmpty'}
                    visible
                    styleParam={{
                      color: '#f9ad3d',
                      cursor: 'default',
                      fontSize: '10px',
                      position: 'absolute'
                    }}
                  />
                ))}
              </ST.StarsWrapper>
              <ST.RatingValue>{data && data.rating / 2}</ST.RatingValue>
            </ST.Circle>
            <ST.Label>{intl.get('widgets.health_star.title').toUpperCase()}</ST.Label>
          </ST.CircleContentWrapper>
        </ST.CircleWrapper>
        {uncheckedCount !== 5 && uncheckedCount !== 0 && (
          <>
            <ST.BochkaFakeWrapper uncheckedCount={uncheckedCount} />
            <ST.BochkaWrapper uncheckedCount={uncheckedCount}>
              {data &&
                data.icons.map((el, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <MobilePreviewHealthStarCylinder left={index * 33} element={el} key={index} />
                ))}
            </ST.BochkaWrapper>
            <ST.PerWrapper>{data.per === 'quantity' ? `Per${data.quantity}${data.unit}` : 'Per package'}</ST.PerWrapper>
          </>
        )}
      </ST.Wrapper>
    </ST.MainWrapper>
  )
}

MobilePreviewHealthStarWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  data: PropTypes.object
}

MobilePreviewHealthStarWidget.defaultProps = {
  data: null
}

export default MobilePreviewHealthStarWidget

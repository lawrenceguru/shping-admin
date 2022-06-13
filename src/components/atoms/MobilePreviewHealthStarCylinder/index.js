import React from 'react'
import PropTypes from 'prop-types'
import * as ST from './styles'

const MobilePreviewHealthStarCylinder = ({ left, element }) => {
  return (
    element.check && (
      <ST.HealthStarCylinderWrapper>
        <ST.Cylinder leftMargin={left}>
          <ST.Cylinder className='small' />
          <ST.HeaderWrapper>{element.name && element.name.toUpperCase()}</ST.HeaderWrapper>
          <div className='oval'>{element.value ? element.value + element.unit : 0 + element.unit}</div>
        </ST.Cylinder>
      </ST.HealthStarCylinderWrapper>
    )
  )
}

MobilePreviewHealthStarCylinder.propTypes = {
  left: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  element: PropTypes.object
}

MobilePreviewHealthStarCylinder.defaultProps = {
  left: null,
  element: null
}

export default MobilePreviewHealthStarCylinder

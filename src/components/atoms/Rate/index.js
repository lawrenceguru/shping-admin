import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconButton from '../../molecules/IconButton'

const RateWrapper = styled.div`
  display: flex;
`

const Rate = ({ rate }) => {
  return (
    <RateWrapper>
      {new Array(5).fill(null).map((a, i) => (
        <IconButton
          /* eslint-disable-next-line react/no-array-index-key */
          key={i}
          /* eslint-disable-next-line no-nested-ternary */
          type={i >= rate ? (i + 0.5 === rate ? 'StarHalf' : 'StarEmpty') : 'Star'}
          visible
          styleParam={{ color: '#f9ad3d', cursor: 'default', fontSize: '20px' }}
          width='22.5px'
          height='20px'
        />
      ))}
    </RateWrapper>
  )
}

Rate.propTypes = {
  rate: PropTypes.number
}

Rate.defaultProps = {
  rate: null
}
export default Rate

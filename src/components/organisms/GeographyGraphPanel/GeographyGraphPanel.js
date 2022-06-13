import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MapContainer from '../../atoms/MapContainer'

const StyledGraphBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 400px;
  background: #fff;
  border-radius: 10px 10px 6px 6px;
  flex-shrink: 0;
`

const GeographyGraphPanel = ({
  coordinates,
  dataIndex,
  analyticsGetCoordinates,
  setItem,
  selectCountry,
  countries,
  ...props
}) => {
  useEffect(() => {
    analyticsGetCoordinates()
  }, [])

  return (
    <StyledGraphBlock {...props} className='pdf-export' data-index={dataIndex}>
      <MapContainer coordinates={coordinates} setItem={setItem} selectCountry={selectCountry} countries={countries} />
    </StyledGraphBlock>
  )
}

GeographyGraphPanel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  coordinates: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  analyticsGetCoordinates: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  selectCountry: PropTypes.string.isRequired,
  dataIndex: PropTypes.string
}

GeographyGraphPanel.defaultProps = {
  countries: [],
  coordinates: [],
  dataIndex: null
}
export default GeographyGraphPanel

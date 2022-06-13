import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AudienceGraph from '../AudienceGraph'
import useGetAudienceByAge from './useGetAudienceByAge'

export const StyledGraphBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`

const AudienceGraphPanel = ({
  dataIndex,
  setItem,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  ...props
}) => {
  const { audienceRange } = useGetAudienceByAge({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  return (
    <StyledGraphBlock {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <AudienceGraph newArray={audienceRange} setItem={setItem} />
      </div>
    </StyledGraphBlock>
  )
}

AudienceGraphPanel.propTypes = {
  setItem: PropTypes.func.isRequired,
  dataIndex: PropTypes.string,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired
}

AudienceGraphPanel.defaultProps = {
  dataIndex: null
}
export default AudienceGraphPanel

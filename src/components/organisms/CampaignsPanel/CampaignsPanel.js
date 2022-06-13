import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import CampaignChart from '../CampaignsChart'
import useGetCampaigns from './useGetCampaigns'

const CampaignsPanel = ({
  setItem,
  setTableHeight,
  selectRange,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  ...props
}) => {
  const { campaigns } = useGetCampaigns({
    aggregation: selectRange,
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  useEffect(() => {
    setTableHeight(campaigns)
  }, [campaigns])

  return <CampaignChart campaigns={campaigns} setItem={setItem} {...props} />
}

CampaignsPanel.propTypes = {
  setItem: PropTypes.func.isRequired,
  setTableHeight: PropTypes.func.isRequired,
  selectRange: PropTypes.string.isRequired,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired
}

export default React.memo(CampaignsPanel)

import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import PieChart from '../../atoms/PieChart'
import useGetAudienceByAges from './useGetAudienceByAges'

const RoiAgeProfile = ({
  getMaxCountItems,
  dataIndex,
  setItem,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectGtin,
  selectCountry,
  ...props
}) => {
  const { audiencePieData } = useGetAudienceByAges({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry,
    gtins: selectGtin
  })

  return (
    <PieChart
      dataIndex={dataIndex}
      pieName={intl.get('roiPage.age')}
      widgetName='ageProfile'
      pieData={audiencePieData}
      setItem={() => setItem({ pageName: 'roiPage', widgetName: 'ageProfile' })}
      getMaxCountItems={getMaxCountItems}
      {...props}
    />
  )
}

RoiAgeProfile.propTypes = {
  setItem: PropTypes.func.isRequired,
  dataIndex: PropTypes.string,
  getMaxCountItems: PropTypes.func.isRequired,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  selectGtin: PropTypes.arrayOf(PropTypes.string).isRequired
}

RoiAgeProfile.defaultProps = {
  dataIndex: null
}

export default RoiAgeProfile

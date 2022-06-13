import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import AudiencePie from '../../atoms/PieChart'
import useGetAudienceByGenders from './useGetAudienceByGenders'

const AudiencePieGenders = ({
  dataIndex,
  setItem,
  invisibleItems,
  getMaxCountItems,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  ...props
}) => {
  const { audiencePieData } = useGetAudienceByGenders({
    from: selectFirstDate,
    to: selectSecondDate,
    country: selectCountry,
    brand: selectBrand
  })

  return (
    !invisibleItems.includes('gender') && (
      <AudiencePie
        dataIndex={dataIndex}
        pieName={intl.get('audiencePage.gender')}
        widgetName='gender'
        pieData={audiencePieData}
        setItem={() => setItem({ pageName: 'audiencePage', widgetName: 'gender' })}
        invisibleItems={invisibleItems}
        getMaxCountItems={getMaxCountItems}
        showLegend={false}
        {...props}
      />
    )
  )
}

AudiencePieGenders.propTypes = {
  setItem: PropTypes.func.isRequired,
  invisibleItems: PropTypes.arrayOf(PropTypes.string),
  getMaxCountItems: PropTypes.func.isRequired,
  dataIndex: PropTypes.string
}

AudiencePieGenders.defaultProps = {
  invisibleItems: [],
  dataIndex: null
}
export default AudiencePieGenders

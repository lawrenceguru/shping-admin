import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import AudiencePie from '../../atoms/PieChart'
import useGetAudienceByGenerations from './useGetAudienceByGenerations'

const AudiencePiePanel = ({
  setItem,
  invisibleItems,
  getMaxCountItems,
  dataIndex,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  ...props
}) => {
  const { audiencePieData } = useGetAudienceByGenerations({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  return (
    !invisibleItems.includes('generation') && (
      <AudiencePie
        pieName={intl.get('audiencePage.generation')}
        widgetName='generation'
        pieData={audiencePieData}
        setItem={() => setItem({ pageName: 'audiencePage', widgetName: 'generation' })}
        invisibleItems={invisibleItems}
        dataIndex={dataIndex}
        getMaxCountItems={getMaxCountItems}
        showLegend={false}
        {...props}
      />
    )
  )
}

AudiencePiePanel.propTypes = {
  setItem: PropTypes.func.isRequired,
  invisibleItems: PropTypes.arrayOf(PropTypes.string),
  getMaxCountItems: PropTypes.func.isRequired,
  dataIndex: PropTypes.string
}

AudiencePiePanel.defaultProps = {
  invisibleItems: [],
  dataIndex: null
}
export default AudiencePiePanel

import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import OverviewInformationBlock from '../../atoms/OverviewInformationBlock'
import useGetOverviewInformationData from './useGetOverviewInformationData'

const OverviewInformationPanel = ({
  id,
  setInvisibleItemsCallback,
  selectRange,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  ...props
}) => {
  const { users, interactions, spend, sales, receiptSalesAmount } = useGetOverviewInformationData({
    aggregation: selectRange,
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  const smallWidgetsData = useMemo(() => {
    return {
      1: {
        widgetName: 'UniqueUsers',
        title: `${intl.get(`overviewPage.usersPeriod`)}`,
        currScans: users,
        footer: `CPU - $${spend && users ? Number(spend / users).toFixed(2) : 0}`,
        color: '#f7cb4e'
      },
      2: {
        widgetName: 'Interaction',
        title: `${intl.get('overviewPage.interactionPeriod')}`,
        currScans: interactions,
        footer: `CPI - $${spend && interactions ? Number(spend / interactions).toFixed(2) : 0}`,
        color: '#1875f0'
      },
      3: {
        widgetName: 'Spent',
        title: `${intl.get(`overviewPage.spendPeriod`)}`,
        currScans: spend,
        symbol: '$',
        color: '#50d166'
      },
      4: {
        widgetName: 'Sales',
        title: `${intl.get(`overviewPage.salesPeriod`)}`,
        currScans: receiptSalesAmount,
        symbol: '$',
        footer: `Items - ${sales.toFixed(0) || 0}`,
        color: '#797979'
      }
    }
  }, [users, interactions, spend, sales, receiptSalesAmount])

  return (
    <OverviewInformationBlock
      widgetName={smallWidgetsData[id].widgetName}
      symbol={smallWidgetsData[id].symbol}
      title={smallWidgetsData[id].title}
      currScans={smallWidgetsData[id].currScans}
      color={smallWidgetsData[id].color}
      footer={smallWidgetsData[id].footer}
      setItem={() =>
        setInvisibleItemsCallback({ pageName: 'overviewPage', widgetName: smallWidgetsData[id].widgetName })
      }
      {...props}
    />
  )
}

OverviewInformationPanel.propTypes = {
  id: PropTypes.string.isRequired,
  setInvisibleItemsCallback: PropTypes.func.isRequired,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired
}

export default React.memo(OverviewInformationPanel)

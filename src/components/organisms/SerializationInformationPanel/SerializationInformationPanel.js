import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import OverviewInformationBlock from '../../atoms/OverviewInformationBlock'

const SerializationInformationPanel = ({
  createdTotal,
  intoCirculationTotal,
  shippedTotal,
  serializationGetCreatedProducts,
  serializationGetIntoCirculationProducts,
  serializationGetShippedProducts,
  id,
  dataIndex,
  setInvisibleItemsCallback,
  ...props
}) => {
  const smallWidgetsData = useMemo(() => {
    return {
      1: {
        widgetName: 'created',
        title: `${intl.get(`overviewPage.serialization.created`)}`,
        currScans: createdTotal || 0,
        color: '#f7cb4e'
      },
      2: {
        widgetName: 'into_circulation',
        title: `${intl.get('overviewPage.serialization.into_circulation')}`,
        currScans: intoCirculationTotal || 0,
        color: '#1875f0'
      },
      3: {
        widgetName: 'shipped',
        title: `${intl.get(`overviewPage.serialization.shipped`)}`,
        currScans: shippedTotal || 0,
        color: '#50d166'
      }
    }
  }, [createdTotal, intoCirculationTotal, shippedTotal])
  const getAction = useCallback(() => {
    switch (smallWidgetsData[id].widgetName) {
      case 'created':
        return serializationGetCreatedProducts()
      case 'into_circulation':
        return serializationGetIntoCirculationProducts()
      case 'shipped':
        return serializationGetShippedProducts()
      default:
        return null
    }
  }, [smallWidgetsData, id])

  useEffect(() => {
    getAction()
  }, [])

  return (
    <OverviewInformationBlock
      widgetName={smallWidgetsData[id].widgetName}
      symbol={smallWidgetsData[id].symbol}
      title={smallWidgetsData[id].title}
      currScans={smallWidgetsData[id].currScans}
      color={smallWidgetsData[id].color}
      dataIndex={dataIndex}
      setItem={() =>
        setInvisibleItemsCallback({
          pageName: 'serializationOverviewPage',
          widgetName: smallWidgetsData[id].widgetName
        })
      }
      {...props}
    />
  )
}

SerializationInformationPanel.propTypes = {
  createdTotal: PropTypes.number,
  intoCirculationTotal: PropTypes.number,
  shippedTotal: PropTypes.number,
  serializationGetCreatedProducts: PropTypes.func.isRequired,
  serializationGetIntoCirculationProducts: PropTypes.func.isRequired,
  serializationGetShippedProducts: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  setInvisibleItemsCallback: PropTypes.func.isRequired,
  dataIndex: PropTypes.string
}

SerializationInformationPanel.defaultProps = {
  createdTotal: 0,
  intoCirculationTotal: 0,
  shippedTotal: 0,
  dataIndex: null
}

export default React.memo(SerializationInformationPanel)

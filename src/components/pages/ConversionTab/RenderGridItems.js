import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Responsive, WidthProvider } from 'react-grid-layout'
import ConversionClicks from '../../molecules/ConversionClicks'
import ConversionExtendedClicks from '../../molecules/ConversionExtendedClicks'
import 'react-grid-layout/css/styles.css'
import Panel from '../../organisms/FilterPanel'
import Loader from '../../templates/Loader'
import { getUserConfiguration, setUserOrder } from '../../../utils/localStorage'
import ConversionSales from '../../molecules/ConversionSales'
import ConversionVideos from '../../molecules/ConversionVideos'
import ConversionReviews from '../../molecules/ConversionReviews'
import ConversionImpressions from '../../molecules/ConversionImpressions'
import ConversionInteractions from '../../molecules/ConversionInteractions'
import CrossMarketingPerformanceGraph from '../../organisms/CrossMarketingPerformanceGraph'
import { useWindowSize } from '../../molecules/Table/utils'
import ConversionBuyingIntent from '../../molecules/ConversionBuyingIntent'
import ConversionCommunityGrowth from '../../molecules/ConversionCommunityGrowth'
import ConversionEducation from '../../molecules/ConversionEducation'

const widgetsEnum = {
  2: 'Videos',
  3: 'Reviews',
  6: 'Impressions',
  7: 'Interactions',
  8: 'crossMarketPerformanceGraph',
  9: 'buyingIntent',
  10: 'communityGrowth',
  11: 'education'
}

const WidgetsSettings = [
  { i: '2', x: 2, y: 0, w: 2, h: 1.3 },
  { i: '3', x: 0, y: 0, w: 2, h: 6 },
  { i: '6', x: 1, y: 0, w: 1, h: 1.5 },
  { i: '7', x: 1, y: 0, w: 1, h: 1.5 },
  { i: '8', x: 0, y: 0, w: 2, h: 2.8 },
  { i: '9', x: 4, y: 0, w: 2, h: 3 },
  { i: '10', x: 0, y: 0, w: 2, h: 3 },
  { i: '11', x: 0, y: 0, w: 2, h: 3 }
]
const ResponsiveGridLayout = WidthProvider(Responsive)
const renderGridItems = ({
  invisibleItems,
  setInvisibleItemsCallback,
  setWidgetModalVisible,
  isLoadingNewFiltersInfo,
  getLayoutForParent,
  getCols
}) => {
  const getLayout = useMemo(() => {
    return localStorage.getItem('order') && JSON.parse(localStorage.getItem('order')).conversionPage
      ? JSON.parse(localStorage.getItem('order')).conversionPage.filter(({ i }) => i !== '1' && i !== '4' && i !== '5')
      : WidgetsSettings
  }, [])
  const [layout, setLayout] = useState(getLayout)
  const [width] = useWindowSize()

  const getFilteredLayout = () => {
    const layouts = [...getLayout].filter(el => !invisibleItems.includes(widgetsEnum[el.i]))
    WidgetsSettings.forEach(item => {
      const indexInLayout = layouts.findIndex(el => el.i === item.i)
      if (indexInLayout === -1 && !invisibleItems.includes(widgetsEnum[item.i])) {
        layouts.push(item)
      }
    })
    return layouts
  }

  useEffect(() => {
    const order = localStorage.getItem('order')

    if (order && order.conversionPage) {
      getLayoutForParent(order.conversionPage)
    }
  }, [])

  useEffect(() => {
    if (width > 1599) {
      getCols(2)
    } else if (width > 1024) {
      getCols(2)
    }
  }, [width])

  useEffect(() => {
    const newLayout = getFilteredLayout()
    setLayout(newLayout)
  }, [invisibleItems])

  useEffect(() => {
    window.dispatchEvent(new Event('resize'))
  }, [])

  useEffect(() => {
    const isCheckedOnSalesWidgets = JSON.parse(localStorage.getItem('isCheckedOnSalesWidgetsConversion'))
    if (!isCheckedOnSalesWidgets) {
      const userConfig = getUserConfiguration('conversionPage')
      const invisible = [
        {
          pageName: 'conversionPage',
          widgetName: 'conversionSales'
        }
      ]

      setInvisibleItemsCallback(
        invisible.filter(item => !(userConfig && Array.isArray(userConfig) && userConfig.includes(item.widgetName)))
      )

      const newLayout = getFilteredLayout()
      setLayout(newLayout)
      localStorage.setItem('isCheckedOnSalesWidgetsConversion', true)
    }
  }, [])

  const addInvisible = layer => {
    const newLayer = [...layer]
    layout.forEach(el => {
      if (newLayer.findIndex(item => item.i === el.i) === -1) {
        newLayer.push(el)
      }
    })
    return newLayer
  }

  const setTableHeight = (array, itemIndex) => {
    let oldSized = [...layout]
    const ind = oldSized.findIndex(el => el.i === itemIndex)

    if (array.length > 0) {
      if (itemIndex === '5') {
        oldSized[ind] = { ...oldSized[ind], h: 3.7 }
      } else if (itemIndex === '3') {
        oldSized[ind] = { ...oldSized[ind], h: 5.1 }
      } else if (itemIndex === '2') {
        if (array.length === 2) {
          oldSized[ind] = { ...oldSized[ind], h: 2 }
        } else if (array.length >= 3) {
          oldSized[ind] = { ...oldSized[ind], h: 3 }
        } else {
          oldSized[ind] = { ...oldSized[ind], h: 1.3 }
        }
      } else if (itemIndex === '6') {
        oldSized[ind] = { ...oldSized[ind], h: 2 }
      } else if (itemIndex === '7' && array.length > 4) {
        oldSized[ind] = { ...oldSized[ind], h: 2.7 }
      } else if (itemIndex === '7') {
        oldSized[ind] = { ...oldSized[ind], h: 2 }
      } else {
        oldSized[ind] = { ...oldSized[ind], h: 3 }
      }
    } else {
      oldSized[ind] = { ...oldSized[ind], h: 1.5 }
    }

    oldSized = addInvisible(oldSized)
    setLayout(oldSized)
    setUserOrder('conversionPage', layout)
  }
  const setViewAllSize = (state, data) => {
    let oldSized = [...layout]
    const ind = oldSized.findIndex(el => el.i === '4')
    if (state) {
      let viewAllTableLength = 3
      switch (data.length) {
        case 6:
          viewAllTableLength = 3.7
          break
        case 7:
          viewAllTableLength = 4.3
          break
        case 8:
          viewAllTableLength = 4.8
          break
        case 9:
          viewAllTableLength = 5.5
          break
        case 10:
          viewAllTableLength = 6
          break
        case 0:
          viewAllTableLength = 1.5
          break
        default:
          viewAllTableLength = 3
      }
      oldSized[ind] = { ...oldSized[ind], h: viewAllTableLength }
    } else {
      oldSized[ind] = { ...oldSized[ind], h: 3 }
    }
    oldSized = addInvisible(oldSized)
    setLayout(oldSized)
    setUserOrder('conversionPage', oldSized)
  }

  // eslint-disable-next-line consistent-return
  const renderComponent = gridData => {
    if (gridData.i === '1') {
      return (
        <ConversionClicks
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'conversionPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    if (gridData.i === '2') {
      return (
        <ConversionVideos
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'conversionPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
          setTableHeight={array => setTableHeight(array, gridData.i)}
        />
      )
    }
    if (gridData.i === '3') {
      return (
        <ConversionReviews
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'conversionPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
          setTableHeight={array => setTableHeight(array, gridData.i)}
        />
      )
    }
    if (gridData.i === '4') {
      return (
        <ConversionSales
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'conversionPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
          setViewAllSize={setViewAllSize}
          setTableHeight={array => setTableHeight(array, gridData.i)}
        />
      )
    }
    if (gridData.i === '5') {
      return (
        <ConversionExtendedClicks
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'conversionPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
          setViewAllSize={setViewAllSize}
          setTableHeight={array => setTableHeight(array, gridData.i)}
        />
      )
    }
    if (gridData.i === '6') {
      return (
        <ConversionImpressions
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'conversionPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
          setViewAllSize={setViewAllSize}
          setTableHeight={array => setTableHeight(array, gridData.i)}
        />
      )
    }
    if (gridData.i === '7') {
      return (
        <ConversionInteractions
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'conversionPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
          setViewAllSize={setViewAllSize}
          setTableHeight={array => setTableHeight(array, gridData.i)}
        />
      )
    }
    if (gridData.i === '8') {
      return (
        <CrossMarketingPerformanceGraph
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'conversionPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
          setTableHeight={() => {}}
        />
      )
    }

    if (gridData.i === '9') {
      return (
        <ConversionBuyingIntent
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'conversionPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }

    if (gridData.i === '10') {
      return (
        <ConversionCommunityGrowth
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'conversionPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }

    if (gridData.i === '11') {
      return (
        <ConversionEducation
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'conversionPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
  }

  const onLayoutChange = lay => {
    setLayout(lay)
    setUserOrder('conversionPage', lay)
  }

  return (
    <>
      <Panel setModal={state => setWidgetModalVisible(state)} />
      <ResponsiveGridLayout
        compactType='vertical'
        className='layout'
        style={{ display: isLoadingNewFiltersInfo ? 'none' : 'block' }}
        layouts={{ lg: layout, md: layout, sm: layout, xs: layout }}
        breakpoints={{ lg: 1500, md: 1024, sm: 767, xs: 0 }}
        measureBeforeMount
        margin={[15, 15]}
        cols={{ lg: 4, md: 2, sm: 1, xs: 1 }}
        onDragStop={onLayoutChange}
        onBreakpointChange={(point, cols) => getCols(cols)}
        onLayoutChange={newLayout => getLayoutForParent(newLayout)}
      >
        {layout
          .filter(el => {
            return !invisibleItems.includes(widgetsEnum[el.i])
          })
          .map(gridData => {
            return renderComponent(gridData)
          })}
      </ResponsiveGridLayout>
      <Loader style={{ display: isLoadingNewFiltersInfo ? 'block' : 'none' }} />
    </>
  )
}

renderGridItems.propTypes = {
  invisibleItems: PropTypes.arrayOf(PropTypes.string),
  setInvisibleItemsCallback: PropTypes.func.isRequired,
  isLoadingNewFiltersInfo: PropTypes.bool.isRequired,
  setWidgetModalVisible: PropTypes.func.isRequired,
  getLayoutForParent: PropTypes.func.isRequired,
  getCols: PropTypes.func.isRequired
}

renderGridItems.defaultProps = {
  invisibleItems: []
}

export default renderGridItems

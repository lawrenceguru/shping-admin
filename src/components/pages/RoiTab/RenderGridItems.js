import React, { useMemo, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import styled from 'styled-components'
import Loader from '../../templates/Loader'
import { setUserOrder } from '../../../utils/localStorage'
import { useWindowSize } from '../../molecules/Table/utils'
import RoiInformationPanel from '../../organisms/RoiInformationPanel'
import RoiConversionPanel from '../../organisms/RoiConversionPanel'
import RoiAgeProfile from '../../organisms/RoiAgeProfile'
import RoiCommunityGrowth from '../../molecules/RoiCommunityGrowth'
import RoiBuyingIntent from '../../organisms/RoiBuyingIntent'
import RoiCalendar from '../../organisms/RoiCalendar'
import ReviewsByBrands from '../../organisms/ReviewsByBrands'

const widgetsEnum = {
  2: 'UniqueUsers',
  3: 'Impressions',
  4: 'ProductsHits',
  5: 'CommunityGrowth',
  6: 'ageProfile',
  7: 'competitorAdConversion',
  8: 'buyingIntentConversion',
  9: 'buyingIntentRoi',
  10: 'reviewRatingScore',
  11: 'definedPeriod',
  12: 'reviewsByBrands'
}

const Wrapper = styled.div`
  position: relative;
  padding: 40px 0;
`

const WidgetsSettings = [
  { i: '2', x: 10, y: 0, w: 4, h: 1 },
  { i: '3', x: 6, y: 0, w: 4, h: 1 },
  { i: '4', x: 14, y: 0, w: 4, h: 1 },
  { i: '5', x: 6, y: 2, w: 6, h: 2 },
  { i: '6', x: 12, y: 2, w: 6, h: 2.5 },
  { i: '7', x: 6, y: 1, w: 4, h: 1.5 },
  { i: '8', x: 10, y: 1, w: 4, h: 1.5 },
  { i: '9', x: 12, y: 3, w: 6, h: 1.5 },
  { i: '10', x: 14, y: 1, w: 4, h: 1.5 },
  { i: '11', x: 0, y: 0, w: 6, h: 3 },
  { i: '12', x: 0, y: 4, w: 6, h: 3 }
]

const ResponsiveGridLayout = WidthProvider(Responsive)
const renderGridItems = ({
  invisibleItems,
  getLayoutForParent,
  setInvisibleItemsCallback,
  isLoadingNewFiltersInfo,
  getCols
}) => {
  const getLayout = useMemo(() => {
    return localStorage.getItem('order') && JSON.parse(localStorage.getItem('order')).overviewRoiPage
      ? JSON.parse(localStorage.getItem('order')).overviewRoiPage
      : WidgetsSettings
  }, [])
  const [layout, setLayout] = useState(getLayout)
  const [width] = useWindowSize()
  const [maxItemsCount, setMaxItemsCount] = useState(0)
  const [maxPieHeight, setMaxPieHeight] = useState(5)

  const setFilteredLayout = () => {
    const layouts = [...getLayout].filter(el => !invisibleItems.includes(widgetsEnum[el.i]))
    WidgetsSettings.forEach(item => {
      const indexInLayout = layouts.findIndex(el => el.i === item.i)
      if (indexInLayout === -1 && !invisibleItems.includes(widgetsEnum[item.i])) {
        layouts.push(item)
      }
    })
    return layouts
  }

  const addInvisible = layer => {
    const newLayer = [...layer]
    getLayout.forEach(el => {
      if (newLayer.findIndex(item => item.i === el.i) === -1) {
        newLayer.push(el)
      }
    })
    return newLayer
  }

  const getMaxCountItems = useCallback(
    count => {
      if (maxItemsCount < count) {
        setMaxItemsCount(count)
      }
    },
    [maxItemsCount]
  )

  useEffect(() => {
    switch (maxItemsCount) {
      case 1:
        setMaxPieHeight(3.2)
        break
      case 2:
        setMaxPieHeight(3.2)
        break
      case 3:
        setMaxPieHeight(3.4)
        break
      case 4:
        setMaxPieHeight(3.6)
        break
      case 5:
        setMaxPieHeight(3.4)
        break
      case 6:
        setMaxPieHeight(4.0)
        break
      case 7:
        setMaxPieHeight(4.2)
        break
      case 8:
        setMaxPieHeight(4.4)
        break
      case 9:
        setMaxPieHeight(4.6)
        break
      case 10:
        setMaxPieHeight(4.8)
        break
      default:
        setMaxPieHeight(3)
    }
  }, [maxItemsCount])

  useEffect(() => {
    const order = localStorage.getItem('order')

    if (order && order.overviewRoiPage) {
      getLayoutForParent(order.overviewRoiPage)
    }
  }, [])

  useEffect(() => {
    if (width > 1599) {
      getCols(4)
    } else if (width > 1024) {
      getCols(4)
    }
  }, [width])

  const rerenderHeightWidget = useCallback(
    lays => {
      let oldSized = [...lays]

      oldSized = oldSized.map(item => {
        // if (item.i === '6') {
        //   return { ...item, h: maxPieHeight }
        // }

        return { ...item }
      })

      setLayout(oldSized)
      setUserOrder('overviewRoiPage', oldSized)
    },
    [maxPieHeight]
  )

  useEffect(() => {
    const newLayout = setFilteredLayout()
    rerenderHeightWidget(newLayout)
  }, [invisibleItems])

  useEffect(() => {
    const newLayout = setFilteredLayout()
    rerenderHeightWidget(newLayout)
  }, [maxPieHeight])

  // eslint-disable-next-line consistent-return
  const renderComponent = gridData => {
    if (['2', '3', '4', '10'].includes(gridData.i)) {
      return (
        <RoiInformationPanel
          key={gridData.i}
          dataIndex={gridData.i}
          id={gridData.i}
          setInvisibleItemsCallback={setInvisibleItemsCallback}
        />
      )
    }
    if (gridData.i === '5') {
      return (
        <RoiCommunityGrowth
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'overviewRoiPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    if (gridData.i === '6') {
      return (
        <RoiAgeProfile
          getMaxCountItems={getMaxCountItems}
          key={gridData.i}
          showLegend={false}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'overviewRoiPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    if (['7', '8'].includes(gridData.i)) {
      return (
        <RoiConversionPanel
          key={gridData.i}
          dataIndex={gridData.i}
          id={gridData.i}
          setInvisibleItemsCallback={setInvisibleItemsCallback}
        />
      )
    }
    if (gridData.i === '9') {
      return (
        <RoiBuyingIntent
          key={gridData.i}
          dataIndex={gridData.i}
          id={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'overviewRoiPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    if (gridData.i === '11') {
      return (
        <RoiCalendar
          key={gridData.i}
          dataIndex={gridData.i}
          id={gridData.i}
          setInvisibleItemsCallback={setInvisibleItemsCallback}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'overviewRoiPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    if (gridData.i === '12') {
      return (
        <ReviewsByBrands
          key={gridData.i}
          dataIndex={gridData.i}
          id={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'overviewRoiPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
  }

  const onBreakpointChange = (point, cols) => {
    getCols(cols)
    const currLayout = addInvisible(layout)
    setLayout(currLayout)
    setUserOrder('overviewRoiPage', currLayout)
  }

  const onLayoutChange = lay => {
    setLayout(lay)
    setUserOrder('overviewRoiPage', lay)
  }

  return (
    <>
      <ResponsiveGridLayout
        style={{ display: isLoadingNewFiltersInfo ? 'none' : 'block' }}
        layouts={{ lg: layout, md: layout, sm: layout, xs: layout }}
        breakpoints={{ lg: 1600, md: 1024, sm: 767, xs: 0 }}
        measureBeforeMount
        onBreakpointChange={onBreakpointChange}
        margin={[40, 40]}
        transformScale={2}
        cols={{ lg: 18, md: 18, sm: 18, xs: 18 }}
        onDragStop={onLayoutChange}
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
      <Wrapper>
        <Loader style={{ display: isLoadingNewFiltersInfo ? 'block' : 'none' }} />
      </Wrapper>
    </>
  )
}

renderGridItems.propTypes = {
  invisibleItems: PropTypes.arrayOf(PropTypes.string),
  setInvisibleItemsCallback: PropTypes.func.isRequired,
  isLoadingNewFiltersInfo: PropTypes.bool.isRequired,
  getLayoutForParent: PropTypes.func.isRequired,
  getCols: PropTypes.func.isRequired
}

renderGridItems.defaultProps = {
  invisibleItems: []
}

export default renderGridItems

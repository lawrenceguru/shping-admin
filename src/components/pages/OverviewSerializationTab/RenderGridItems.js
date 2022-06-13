import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import Loader from '../../templates/Loader'
import { setUserOrder } from '../../../utils/localStorage'
import SerializationAnalyticsStatistic from '../../organisms/SerializationAnalyticsStatistic'
import SerializationInformationPanel from '../../organisms/SerializationInformationPanel'
import { useWindowSize } from '../../molecules/Table/utils'

const widgetsEnum = {
  1: 'created',
  2: 'into_circulation',
  3: 'shipped',
  4: 'statistic'
}

const WidgetsSettings = [
  { i: '1', x: 0, y: 0, w: 1, h: 1 },
  { i: '2', x: 1, y: 0, w: 1, h: 1 },
  { i: '3', x: 2, y: 0, w: 1, h: 1 },
  { i: '4', x: 0, y: 0, w: 4, h: 2.7 }
]

const ResponsiveGridLayout = WidthProvider(Responsive)
const renderGridItems = ({
  invisibleItems,
  setInvisibleItemsCallback,
  isLoadingNewFiltersInfo,
  getLayoutForParent,
  getCols
}) => {
  const getLayout = useMemo(() => {
    return localStorage.getItem('order') && JSON.parse(localStorage.getItem('order')).serializationOverviewPage
      ? JSON.parse(localStorage.getItem('order')).serializationOverviewPage
      : WidgetsSettings
  }, [])
  const [layout, setLayout] = useState(getLayout)
  const [width] = useWindowSize()

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

  useEffect(() => {
    window.dispatchEvent(new Event('resize'))
  }, [])

  useEffect(() => {
    const order = localStorage.getItem('order')

    if (order && order.serializationOverviewPage) {
      getLayoutForParent(order.serializationOverviewPage)
    }
  }, [])

  useEffect(() => {
    if (width > 1599) {
      getCols(4)
    } else if (width > 1024) {
      getCols(4)
    }
  }, [width])

  useEffect(() => {
    const newLayout = setFilteredLayout()
    setLayout(newLayout)
  }, [invisibleItems])

  const addInvisible = layer => {
    const newLayer = [...layer]
    getLayout.forEach(el => {
      if (newLayer.findIndex(item => item.i === el.i) === -1) {
        newLayer.push(el)
      }
    })
    return newLayer
  }

  // eslint-disable-next-line consistent-return
  const renderComponent = gridData => {
    if (['1', '2', '3'].includes(gridData.i)) {
      return (
        <SerializationInformationPanel
          key={gridData.i}
          dataIndex={gridData.i}
          id={gridData.i}
          setInvisibleItemsCallback={setInvisibleItemsCallback}
        />
      )
    }
    if (gridData.i === '4') {
      return (
        <SerializationAnalyticsStatistic
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'serializationOverviewPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
  }

  const onBreakpointChange = (point, cols) => {
    getCols(cols)
    if (point !== 'xs' || point !== 'sm') {
      let currLayout = [...layout]
      const index = currLayout.findIndex(el => el.i === '4')

      if (index !== -1 && currLayout[index] && currLayout[index].w !== 4) {
        currLayout[index].w = 4
      }

      currLayout = addInvisible(currLayout)
      setLayout(currLayout)
      setUserOrder('serializationOverviewPage', currLayout)
    }
  }

  const onLayoutChange = lay => {
    setLayout(lay)
    setUserOrder('serializationOverviewPage', lay)
  }

  return (
    <>
      <ResponsiveGridLayout
        style={{ display: isLoadingNewFiltersInfo ? 'none' : 'block' }}
        layouts={{ lg: layout, md: layout, sm: layout, xs: layout }}
        breakpoints={{ lg: 1600, md: 1024, sm: 767, xs: 0 }}
        onBreakpointChange={onBreakpointChange}
        measureBeforeMount
        margin={[40, 40]}
        transformScale={2}
        cols={{ lg: 4, md: 4, sm: 2, xs: 2 }}
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
      <Loader style={{ display: isLoadingNewFiltersInfo ? 'block' : 'none' }} />
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

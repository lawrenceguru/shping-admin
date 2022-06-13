import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { useSelector } from 'react-redux'
import 'react-grid-layout/css/styles.css'
import Loader from '../../templates/Loader'
import { getUserConfiguration, setUserOrder } from '../../../utils/localStorage'
import OverviewEngagementPanel from '../../organisms/OverviewEngagementPanel'
import TopProductsTable from '../../molecules/TopProductsTable'
import TopUsersTable from '../../molecules/TopUsersTable'
import CampaignsPanel from '../../organisms/CampaignsPanel'
import BrandSalesTable from '../../molecules/BrandSalesTable'
import OverviewInformationPanel from '../../organisms/OverviewInformationPanel'
import { useWindowSize } from '../../molecules/Table/utils'
import CrossMarketTable from '../../molecules/CrossMarketTable'

const widgetsEnum = {
  1: 'UniqueUsers',
  2: 'Interaction',
  3: 'Spent',
  4: 'Sales',
  5: 'engagement',
  6: 'topProducts',
  7: 'topUsers',
  8: 'campaigns',
  10: 'crossMarketing'
}

const WidgetsSettings = [
  { i: '1', x: 0, y: 0, w: 1, h: 1 },
  { i: '2', x: 1, y: 0, w: 1, h: 1 },
  { i: '3', x: 2, y: 0, w: 1, h: 1 },
  { i: '4', x: 3, y: 0, w: 1, h: 1 },
  { i: '5', x: 0, y: 0, w: 4, h: 2.7 },
  { i: '6', x: 0, y: 0, w: 2, h: 4 },
  { i: '7', x: 2, y: 0, w: 2, h: 4 },
  { i: '8', x: 0, y: 0, w: 2, h: 2.7 },
  { i: '10', x: 0, y: 0, w: 2, h: 3 }
]

const ResponsiveGridLayout = WidthProvider(Responsive)
const renderGridItems = ({
  invisibleItems,
  setInvisibleItemsCallback,
  isLoadingNewFiltersInfo,
  setModal,
  getLayoutForParent,
  getCols
}) => {
  const currentUserEmail = useSelector(({ identity }) => identity.email)

  const getLayout = useMemo(() => {
    return localStorage.getItem('order') && JSON.parse(localStorage.getItem('order')).overviewPage
      ? JSON.parse(localStorage.getItem('order')).overviewPage.filter(({ i }) => i !== '9')
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
    const order = localStorage.getItem('order')

    if (order && order.overviewPage) {
      getLayoutForParent(order.overviewPage)
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

  useEffect(() => {
    const isCheckedOnSalesWidgets = JSON.parse(localStorage.getItem('isCheckedOnSalesWidgets'))

    if (!isCheckedOnSalesWidgets) {
      const userConfig = getUserConfiguration('overviewPage')
      const invisible = [
        {
          pageName: 'overviewPage',
          widgetName: 'Sales'
        },
        {
          pageName: 'overviewPage',
          widgetName: 'SalesAmount'
        },
        {
          pageName: 'overviewPage',
          widgetName: 'brandSales'
        }
      ]

      setInvisibleItemsCallback(
        invisible.filter(item => !(userConfig && Array.isArray(userConfig) && userConfig.includes(item.widgetName)))
      )

      const newLayout = setFilteredLayout()
      setLayout(newLayout)
      localStorage.setItem('isCheckedOnSalesWidgets', true)
    }
  }, [])

  const addInvisible = layer => {
    const newLayer = [...layer]
    getLayout.forEach(el => {
      if (newLayer.findIndex(item => item.i === el.i) === -1) {
        newLayer.push(el)
      }
    })
    return newLayer
  }

  useEffect(() => {
    const isCheckedOnCrossMarketingWidget = JSON.parse(localStorage.getItem('isCheckedOnCrossMarketingWidget'))

    if (!isCheckedOnCrossMarketingWidget) {
      const currentOrder = localStorage.getItem('order')
      const newLayout =
        currentOrder && currentOrder.overviewPage ? currentOrder.overviewPage.push(WidgetsSettings[9]) : WidgetsSettings
      const currLayout = addInvisible(newLayout)
      setLayout(currLayout)
      setUserOrder('overviewPage', currLayout)
      localStorage.setItem('isCheckedOnCrossMarketingWidget', true)
    }
  }, [])

  useEffect(() => {
    let currLayout = [...layout]
    const index = currLayout.findIndex(el => el.i === '6')
    const crossMarketIndex = currLayout.findIndex(el => el.i === '10')

    if (width < 1600 && index !== -1 && currLayout[index] && currLayout[index].w !== 4) {
      currLayout[index].w = 4
      currLayout = addInvisible(currLayout)
      setLayout(currLayout)
      setUserOrder('overviewPage', currLayout)
    }

    if (
      width < 1600 &&
      crossMarketIndex !== -1 &&
      currLayout[crossMarketIndex] &&
      currLayout[crossMarketIndex].w !== 4
    ) {
      currLayout[crossMarketIndex].w = 4
      currLayout = addInvisible(currLayout)
      setLayout(currLayout)
      setUserOrder('overviewPage', currLayout)
    }
    window.dispatchEvent(new Event('resize'))
  }, [])

  const getTableHeight = (length, key) => {
    switch (length) {
      case 1:
        return key === 'crossMarket' ? 1.6 : 1.8
      case 2:
        return key === 'crossMarket' ? 2.3 : 2.5
      case 3:
        return key === 'crossMarket' ? 2.8 : 3
      case 4:
        return key === 'crossMarket' ? 3.6 : 3.7
      default:
        return key === 'crossMarket' ? 3.6 : 3.7
    }
  }

  const setTableHeight = (array, itemIndex) => {
    let oldSized = [...layout]
    const ind = oldSized.findIndex(el => el.i === itemIndex)
    if (array.length > 0) {
      if (itemIndex === '6') {
        oldSized[ind] = { ...oldSized[ind], h: getTableHeight(array.length) }
      }
      if (itemIndex === '10') {
        oldSized[ind] = { ...oldSized[ind], h: getTableHeight(array.length, 'crossMarket') }
      }
      if (itemIndex === '7') {
        oldSized[ind] = { ...oldSized[ind], h: 3 }
      }
      if (itemIndex === '9') {
        oldSized[ind] = { ...oldSized[ind], h: 2.7 }
      }
    } else if (itemIndex === '6' || itemIndex === '7' || itemIndex === '9' || itemIndex === '10') {
      oldSized[ind] = { ...oldSized[ind], h: 1.5 }
    }
    oldSized = addInvisible(oldSized)
    setLayout(oldSized)
    setUserOrder('overviewPage', layout)
  }

  const setViewAllSize = (state, data) => {
    let oldSized = [...layout]

    const ind = oldSized.findIndex(el => el.i === '6')
    const indCrossMarket = oldSized.findIndex(el => el.i === '10')
    if (state) {
      let viewAllTableLength = 3
      switch (data.length) {
        case 1:
          viewAllTableLength = 1.6
          break
        case 2:
          viewAllTableLength = 2.4
          break
        case 3:
          viewAllTableLength = 2.9
          break
        case 4:
          viewAllTableLength = 3.6
          break
        case 6:
          viewAllTableLength = 3.9
          break
        case 7:
          viewAllTableLength = 4.5
          break
        case 8:
          viewAllTableLength = 5
          break
        case 9:
          viewAllTableLength = 5.7
          break
        case 10:
          viewAllTableLength = 6.2
          break
        case 0:
          viewAllTableLength = 1.7
          break
        default:
          viewAllTableLength = 3.2
      }
      oldSized[ind] = { ...oldSized[ind], h: viewAllTableLength }
      oldSized[indCrossMarket] = { ...oldSized[indCrossMarket], h: viewAllTableLength }
    } else {
      oldSized[ind] = { ...oldSized[ind], h: 3 }
      oldSized[indCrossMarket] = { ...oldSized[indCrossMarket], h: 3 }
    }
    oldSized = addInvisible(oldSized)
    setLayout(oldSized)
    setUserOrder('overviewPage', oldSized)
  }

  // eslint-disable-next-line consistent-return
  const renderComponent = gridData => {
    if (['1', '2', '3', '4'].includes(gridData.i)) {
      return (
        <OverviewInformationPanel
          key={gridData.i}
          dataIndex={gridData.i}
          id={gridData.i}
          setInvisibleItemsCallback={setInvisibleItemsCallback}
        />
      )
    }
    if (gridData.i === '5') {
      return (
        <OverviewEngagementPanel
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'overviewPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    if (gridData.i === '6') {
      return (
        <TopProductsTable
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'overviewPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
          setViewAllSize={setViewAllSize}
          setTableHeight={array => setTableHeight(array, gridData.i)}
          setModal={setModal}
        />
      )
    }
    if (gridData.i === '7') {
      return (
        <TopUsersTable
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'overviewPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
          setTableHeight={array => setTableHeight(array, gridData.i)}
        />
      )
    }
    if (gridData.i === '8') {
      return (
        <CampaignsPanel
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'overviewPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
          setTableHeight={() => {}}
        />
      )
    }
    if (gridData.i === '9') {
      return (
        <BrandSalesTable
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'overviewPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
          setTableHeight={array => setTableHeight(array, gridData.i)}
        />
      )
    }
    if (gridData.i === '10') {
      return (
        <CrossMarketTable
          key={gridData.i}
          dataIndex={gridData.i}
          setModal={setModal}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'overviewPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
          setViewAllSize={setViewAllSize}
          setTableHeight={array => setTableHeight(array, gridData.i)}
        />
      )
    }
  }
  const onBreakpointChange = (point, cols) => {
    getCols(cols)
    if (point !== 'xs' || point !== 'sm') {
      let currLayout = [...layout]
      const index = currLayout.findIndex(el => el.i === '5')

      if (index !== -1 && currLayout[index] && currLayout[index].w !== 4) {
        currLayout[index].w = 4
      }

      const indexTopTable = currLayout.findIndex(el => el.i === '6')

      if (point === 'lg') {
        currLayout[indexTopTable].w = 2
      } else {
        currLayout[indexTopTable].w = 4
      }

      const indexCrossMarketTable = currLayout.findIndex(el => el.i === '10')

      if (point === 'lg') {
        currLayout[indexCrossMarketTable].w = 2
      } else {
        currLayout[indexCrossMarketTable].w = 4
      }

      currLayout = addInvisible(currLayout)
      setLayout(currLayout)
      setUserOrder('overviewPage', currLayout)
    }
  }

  const onLayoutChange = lay => {
    setLayout(lay)
    setUserOrder('overviewPage', lay)
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
        {layout &&
          layout
            .filter(el => {
              return (
                !invisibleItems.includes(widgetsEnum[el.i]) &&
                (el.i !== '11' ||
                  (el.i === '11' && currentUserEmail && currentUserEmail.substr(-11, 11) === '@shping.com'))
              )
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
  setModal: PropTypes.func.isRequired,
  getLayoutForParent: PropTypes.func.isRequired,
  getCols: PropTypes.func.isRequired
}

renderGridItems.defaultProps = {
  invisibleItems: []
}

export default renderGridItems

import React, { useMemo, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import styled from 'styled-components'
import Loader from '../../templates/Loader'
import { setUserOrder } from '../../../utils/localStorage'
import { useWindowSize } from '../../molecules/Table/utils'
import ShoppingListWidgets from '../../organisms/ShoppingListWidgets'
import ShoppingListLinearDiagramPanel from '../../organisms/ShoppingListLinearDiagramPanel'
import ShoppingListTableCategory from '../../organisms/ShoppingListTableCategory'
import ShoppingListTableAttribute from '../../organisms/ShoppingListTableAttribute'
import ShoppingListTableUsageByUser from '../../organisms/ShoppingListTableUsageByUser'

const widgetsEnum = {
  2: 'UniqueUsers',
  3: 'AverageClicksOnGO'
}

const Wrapper = styled.div`
  position: relative;
  padding: 40px 0;
`

const WidgetsSettings = [
  { i: '2', x: 0, y: 0, w: 4, h: 1 },
  { i: '3', x: 4, y: 0, w: 4, h: 1 },
  { i: '4', x: 8, y: 0, w: 4, h: 1 },
  { i: '5', x: 12, y: 0, w: 4, h: 1 },
  { i: '6', x: 0, y: 1, w: 4, h: 1 },
  { i: '7', x: 4, y: 1, w: 4, h: 1 },
  { i: '8', x: 8, y: 1, w: 4, h: 1 },
  { i: '9', x: 12, y: 2, w: 4, h: 1 },
  { i: '10', x: 0, y: 2, w: 4, h: 1 },
  { i: '11', x: 4, y: 2, w: 4, h: 1 },
  { i: '12', x: 8, y: 2, w: 4, h: 1 },
  { i: '13', x: 12, y: 2, w: 4, h: 1 },
  { i: '14', x: 0, y: 3, w: 4, h: 1 },
  { i: '15', x: 4, y: 3, w: 4, h: 1 },
  { i: '16', x: 0, y: 4, w: 16, h: 4 },
  { i: '17', x: 8, y: 3, w: 4, h: 1 },
  { i: '18', x: 0, y: 7, w: 8, h: 2 },
  { i: '19', x: 8, y: 7, w: 8, h: 2 },
  { i: '20', x: 0, y: 8, w: 16, h: 2 }
]

const ResponsiveGridLayout = WidthProvider(Responsive)
const renderGridItems = ({ invisibleItems, setInvisibleItemsCallback, getLayoutForParent, getCols }) => {
  const isLoadingNewFiltersInfo = false
  const getLayout = useMemo(() => {
    return localStorage.getItem('order') && JSON.parse(localStorage.getItem('order')).shoppingListsUsagePage
      ? JSON.parse(localStorage.getItem('order')).shoppingListsUsagePage
      : WidgetsSettings
  }, [])
  const [layout, setLayout] = useState(getLayout)
  const [width] = useWindowSize()
  const maxItemsCount = 3
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

    if (order && order.shoppingListsUsagePage) {
      getLayoutForParent(order.shoppingListsUsagePage)
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
      setUserOrder('shoppingListsUsagePage', oldSized)
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
    if (['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '17'].includes(gridData.i)) {
      return (
        <ShoppingListWidgets
          key={gridData.i}
          dataIndex={gridData.i}
          id={gridData.i}
          setInvisibleItemsCallback={setInvisibleItemsCallback}
        />
      )
    }
    if (gridData.i === '16') {
      return (
        <ShoppingListLinearDiagramPanel
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'shoppingListsUsagePage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    if (gridData.i === '18') {
      return (
        <ShoppingListTableCategory
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'shoppingListsUsagePage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    if (gridData.i === '19') {
      return (
        <ShoppingListTableAttribute
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'shoppingListsUsagePage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
    if (gridData.i === '20') {
      return <ShoppingListTableUsageByUser key={gridData.i} dataIndex={gridData.i} />
    }
  }

  const onBreakpointChange = (point, cols) => {
    getCols(cols)
    const currLayout = addInvisible(layout)
    setLayout(currLayout)
    setUserOrder('shoppingListsUsagePage', currLayout)
  }

  const onLayoutChange = lay => {
    setLayout(lay)
    setUserOrder('shoppingListsUsagePage', lay)
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
        {layout &&
          layout
            // .filter(el => {
            //   return !invisibleItems.includes(widgetsEnum[el.i])
            // })
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
  getLayoutForParent: PropTypes.func.isRequired,
  setInvisibleItemsCallback: PropTypes.func.isRequired,
  getCols: PropTypes.func.isRequired
}

renderGridItems.defaultProps = {
  invisibleItems: []
}

export default renderGridItems

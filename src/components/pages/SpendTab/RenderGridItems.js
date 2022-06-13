import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import styled from 'styled-components'
import Loader from '../../templates/Loader'
import { setUserOrder } from '../../../utils/localStorage'
import SpendPanel from '../../organisms/SpendPanel'
import SpendInformationPanel from '../../organisms/SpendInformationPanel'
import SpendTable from '../../molecules/SpendTable'
import { useWindowSize } from '../../molecules/Table/utils'

const widgetsEnum = {
  1: 'spends',
  2: 'InteractionClicks',
  3: 'ApprovedReviews',
  4: 'CompletedVideoViews',
  5: 'Impressions',
  6: 'StreamTable'
}

const Wrapper = styled.div`
  position: relative;
  padding: 40px 0;
`

const WidgetsSettings = [
  { i: '2', x: 0, y: 0, w: 1, h: 1 },
  { i: '3', x: 1, y: 0, w: 1, h: 1 },
  { i: '4', x: 2, y: 0, w: 1, h: 1 },
  { i: '5', x: 3, y: 0, w: 1, h: 1 },
  { i: '1', x: 0, y: 0, w: 4, h: 2.7 },
  { i: '6', x: 0, y: 0, w: 4, h: 3.7 }
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
    return localStorage.getItem('order') && JSON.parse(localStorage.getItem('order')).spendsPage
      ? JSON.parse(localStorage.getItem('order')).spendsPage.map(item =>
          item.i === '1' || item.i === '6' ? { ...item, w: 4, h: item.i === '6' ? 3.7 : item.h } : { ...item }
        )
      : WidgetsSettings
  }, [])
  const [layout, setLayout] = useState(getLayout)
  const [width] = useWindowSize()
  const currentLocale = useMemo(() => {
    return localStorage.getItem('lang')
  }, [])

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
    const order = localStorage.getItem('order')

    if (order && order.spendsPage) {
      getLayoutForParent(order.spendsPage)
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

  const getTableHeight = length => {
    switch (length) {
      case 1:
        return currentLocale === 'ru' ? 1.7 : 1.3
      case 2:
        return currentLocale === 'ru' ? 2.4 : 2
      case 3:
        return currentLocale === 'ru' ? 2.7 : 2.3
      case 4:
        return currentLocale === 'ru' ? 3.1 : 2.7
      case 5:
        return currentLocale === 'ru' ? 3.7 : 3.1
      case 6:
        return currentLocale === 'ru' ? 3.7 : 3.3
      case 7:
        return currentLocale === 'ru' ? 4.1 : 3.7
      default:
        return currentLocale === 'ru' ? 3.7 : 3.5
    }
  }

  const setTableHeight = (array, itemIndex) => {
    let oldSized = [...layout]
    const ind = oldSized.findIndex(el => el.i === itemIndex)
    if (array.length > 0) {
      if (itemIndex === '6') {
        oldSized[ind] = { ...oldSized[ind], h: getTableHeight(array.length) }
      }
    } else if (itemIndex === '6') {
      oldSized[ind] = { ...oldSized[ind], h: 2 }
    }
    oldSized = addInvisible(oldSized)
    setLayout(oldSized)
    setUserOrder('spendsPage', layout)
  }

  // eslint-disable-next-line consistent-return
  const renderComponent = gridData => {
    if (gridData.i === '1') {
      return (
        <SpendPanel
          key={gridData.i}
          dataIndex={gridData.i}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'spendsPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
          setTableHeight={() => {}}
        />
      )
    }
    if (['2', '3', '4', '5'].includes(gridData.i)) {
      return (
        <SpendInformationPanel
          key={gridData.i}
          dataIndex={gridData.i}
          id={gridData.i}
          setInvisibleItemsCallback={setInvisibleItemsCallback}
        />
      )
    }
    if (gridData.i === '6') {
      return (
        <SpendTable
          dataIndex={gridData.i}
          key={gridData.i}
          setTableHeight={array => setTableHeight(array, gridData.i)}
          setItem={() =>
            setInvisibleItemsCallback({
              pageName: 'spendsPage',
              widgetName: widgetsEnum[gridData.i]
            })
          }
        />
      )
    }
  }

  const onBreakpointChange = (point, cols) => {
    getCols(cols)
    let currLayout = [...layout]
    let index = currLayout.findIndex(el => el.i === '1')

    if (index !== -1 && currLayout[index] && currLayout[index].w !== 4) {
      currLayout[index].w = 4
    }

    index = currLayout.findIndex(el => el.i === '6')

    if (index !== -1 && currLayout[index] && currLayout[index].w !== 4) {
      currLayout[index].w = 4
    }

    currLayout = addInvisible(currLayout)
    setLayout(currLayout)
    setUserOrder('spendsPage', currLayout)
  }

  const onLayoutChange = lay => {
    setLayout(lay)
    setUserOrder('spendsPage', lay)
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
        cols={{ lg: 4, md: 4, sm: 4, xs: 4 }}
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

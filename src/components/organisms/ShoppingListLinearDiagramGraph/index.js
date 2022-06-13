import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import intl from 'react-intl-universal'
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Legend, LineSeries } from 'react-jsx-highcharts'
import * as ST from './styles'
import { rangeEnum, plotOptions, tooltipData } from './consts'
import RemoveIcon from '../../molecules/RemoveIcon'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'

const ShoppingListLinearDiagramGraph = ({
  selectRange,
  setItem,
  dataIndex,
  xItems,
  users,
  addedProducts,
  purchasedProducts,
  finishClicks,
  receipts,
  loyalteeCards,
  ...props
}) => {
  const [nameOfHoverLabel, setNameOfHoverLabel] = useState(null)
  const legend = {}
  const isHaveData = useMemo(() => {
    const isUsersHaveData = users && users.length && users.some(elem => elem !== 0)
    const isAddedProductsHaveData = addedProducts && addedProducts.length && addedProducts.some(elem => elem !== 0)
    const isPurchsedProductsHaveData =
      purchasedProducts && purchasedProducts.length && purchasedProducts.some(elem => elem !== 0)
    const isFinishClicksHaveData = finishClicks && finishClicks.length && finishClicks.some(elem => elem !== 0)
    const isReceiptsHaveData = receipts && receipts.length && receipts.some(elem => elem !== 0)
    const isLoyalteeCardsHaveData = loyalteeCards && loyalteeCards.length && loyalteeCards.some(elem => elem !== 0)
    return (
      isFinishClicksHaveData ||
      isPurchsedProductsHaveData ||
      isAddedProductsHaveData ||
      isUsersHaveData ||
      isReceiptsHaveData ||
      isLoyalteeCardsHaveData
    )
  }, [addedProducts, purchasedProducts, users, finishClicks, receipts, loyalteeCards])
  const chart = {
    type: 'line',
    style: {
      'border-bottom-left-radius': '10px;',
      'border-bottom-right-radius': '10px;'
    },
    events: {
      load() {
        setTimeout(() => {
          if (legend && legend.allItems) {
            legend.allItems.forEach(item => {
              const label = item.legendItem.element
              label.addEventListener('mouseover', () => {
                setNameOfHoverLabel(label.textContent[0].toLowerCase() + label.textContent.slice(1))
              })
              label.addEventListener('mouseout', () => {
                setNameOfHoverLabel(null)
              })
            })
          }
        }, 1000)
      }
    }
  }

  return (
    <ST.OverviewEngagementBlock {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <ST.LegendTooltip isVisible={!!nameOfHoverLabel}>
          <ST.TooltipHeader>
            {nameOfHoverLabel && intl.get(`shoppingListUsagePage.${nameOfHoverLabel}`)}
          </ST.TooltipHeader>
          {nameOfHoverLabel &&
            tooltipData[nameOfHoverLabel] &&
            tooltipData[nameOfHoverLabel].map(field => <span key={field}>{field}</span>)}
        </ST.LegendTooltip>
        <ST.TitleChart>
          <div>
            {intl.get(`overviewPage.${rangeEnum[selectRange]}`)} {intl.get('shoppingListUsagePage.linear_diagrams')}
          </div>
          <RemoveIcon setItem={setItem} />
        </ST.TitleChart>
        {isHaveData ? (
          <HighchartsChart useHTML chart={chart} plotOptions={plotOptions}>
            <Chart type='spline' />
            <ST.StyledTooltip valueSuffix=' units' color='#ffffff' fill='#ffffff' border={0} />
            <Legend useHTML verticalAlign='top' />
            <XAxis categories={xItems} startOnTick gridLineWidth={1} />
            <YAxis>
              <YAxis.Title verticalAlign='top'>{intl.get(`overviewPage.units`)}</YAxis.Title>
              <LineSeries name={intl.get(`shoppingListUsagePage.unique_users`)} data={users} color='#f7cb4e' />
              <LineSeries
                name={intl.get(`shoppingListUsagePage.added_products`)}
                data={addedProducts}
                color='#ff4a4b'
              />
              <LineSeries
                name={intl.get(`shoppingListUsagePage.purchased_products`)}
                data={purchasedProducts}
                color='#00fffd'
              />
              <LineSeries name={intl.get(`shoppingListUsagePage.finish_clicks`)} data={finishClicks} color='#1875f0' />
              <LineSeries name={intl.get(`shoppingListUsagePage.receipts`)} data={receipts} color='#e875f0' />
              <LineSeries
                name={intl.get(`shoppingListUsagePage.loyaltee_cards`)}
                data={loyalteeCards}
                color='#d8d5d0'
              />
            </YAxis>
          </HighchartsChart>
        ) : (
          <NoDataPlaceholder />
        )}
      </div>
    </ST.OverviewEngagementBlock>
  )
}

ShoppingListLinearDiagramGraph.propTypes = {
  selectRange: PropTypes.string.isRequired,
  setItem: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  xItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  users: PropTypes.arrayOf(PropTypes.number).isRequired,
  addedProducts: PropTypes.arrayOf(PropTypes.number).isRequired,
  purchasedProducts: PropTypes.arrayOf(PropTypes.number).isRequired,
  finishClicks: PropTypes.arrayOf(PropTypes.number).isRequired,
  receipts: PropTypes.arrayOf(PropTypes.number).isRequired,
  loyalteeCards: PropTypes.arrayOf(PropTypes.number).isRequired,
  dataIndex: PropTypes.string
}

ShoppingListLinearDiagramGraph.defaultProps = {
  dataIndex: null
}

export default withHighcharts(ShoppingListLinearDiagramGraph, Highcharts)

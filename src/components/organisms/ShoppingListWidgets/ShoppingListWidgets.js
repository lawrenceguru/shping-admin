import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import intl from 'react-intl-universal'
import OverviewInformationBlock from '../../atoms/OverviewInformationBlock'
import useShoppingListsUsageCounter from '../../../data/graphql/shoppinglists-usage'

const ShoppingListWidgets = ({ id, setInvisibleItemsCallback, ...props }) => {
  const selectFirstDate = useSelector(({ filterAnalytics }) => filterAnalytics.selectFirstDate)
  const selectSecondDate = useSelector(({ filterAnalytics }) => filterAnalytics.selectSecondDate)
  const selectCountry = useSelector(({ filterAnalytics }) => filterAnalytics.selectCountry)
  const selectState = useSelector(({ filterAnalytics }) => filterAnalytics.selectState)
  const selectPostcode = useSelector(({ filterAnalytics }) => filterAnalytics.selectPostcode)
  const selectRange = useSelector(({ filterAnalytics }) => filterAnalytics.selectRange)
  const {
    uniqueUsers,
    goClicks,
    opens,
    finishClicks,
    avgShoppingListSize,
    ocasionalBuys,
    createdLists,
    mainAddedProducts,
    customAddedProducts,
    purchasedProducts,
    sharedAccounts,
    receipts,
    loyalteeCards,
    timeSpent,
    searches
  } = useShoppingListsUsageCounter({
    from: selectFirstDate,
    to: selectSecondDate,
    country: selectCountry,
    state: selectState,
    aggregation: selectRange,
    postcode: selectPostcode
  })

  const smallWidgetsData = useMemo(() => {
    return {
      2: {
        widgetName: 'UniqueUsers',
        title: `${intl.get(`shoppingListUsagePage.unique_users`)}`,
        currScans: uniqueUsers,
        color: '#50d166'
      },
      3: {
        widgetName: 'AverageClicksOnGO',
        title: `${intl.get('shoppingListUsagePage.go_clicks')}`,
        currScans: goClicks,
        color: '#DC143C'
      },
      4: {
        widgetName: 'Average opens of shopping list',
        title: `${intl.get(`shoppingListUsagePage.opens`)}`,
        currScans: opens,
        color: '#1875f0'
      },
      5: {
        widgetName: 'finish_clicks',
        title: `${intl.get(`shoppingListUsagePage.finish_clicks`)}`,
        currScans: finishClicks,
        color: '#68228B'
      },
      6: {
        widgetName: 'avg_shopping_list_size',
        title: `${intl.get(`shoppingListUsagePage.avg_shopping_list_size`)}`,
        currScans: avgShoppingListSize,
        color: '#1875f0'
      },
      7: {
        widgetName: 'ocasional_buys',
        title: `${intl.get(`shoppingListUsagePage.ocasional_buys`)}`,
        currScans: ocasionalBuys,
        color: '#68228B'
      },
      8: {
        widgetName: 'created_lists',
        title: `${intl.get(`shoppingListUsagePage.created_lists`)}`,
        currScans: createdLists,
        color: '#1875f0'
      },
      9: {
        widgetName: 'main_added_products',
        title: `${intl.get(`shoppingListUsagePage.main_added_products`)}`,
        currScans: mainAddedProducts,
        color: '#68228B'
      },
      10: {
        widgetName: 'custom_added_products',
        title: `${intl.get(`shoppingListUsagePage.custom_added_products`)}`,
        currScans: customAddedProducts,
        color: '#1875f0'
      },
      11: {
        widgetName: 'purchased_products',
        title: `${intl.get(`shoppingListUsagePage.purchased_products`)}`,
        currScans: purchasedProducts,
        color: '#68228B'
      },
      12: {
        widgetName: 'shared_accounts',
        title: `${intl.get(`shoppingListUsagePage.shared_accounts`)}`,
        currScans: sharedAccounts,
        color: '#1875f0'
      },
      13: {
        widgetName: 'receipts',
        title: `${intl.get(`shoppingListUsagePage.receipts`)}`,
        currScans: receipts,
        color: '#68228B'
      },
      14: {
        widgetName: 'loyaltee_cards',
        title: `${intl.get(`shoppingListUsagePage.loyaltee_cards`)}`,
        currScans: loyalteeCards,
        color: '#1875f0'
      },
      15: {
        widgetName: 'time_spent',
        title: `${intl.get(`shoppingListUsagePage.time_spent`)}`,
        currScans: timeSpent,
        color: '#68228B'
      },
      17: {
        widgetName: 'searches',
        title: `${intl.get(`shoppingListUsagePage.searches`)}`,
        currScans: searches,
        color: '#68228B'
      }
    }
  }, [
    uniqueUsers,
    goClicks,
    opens,
    finishClicks,
    avgShoppingListSize,
    ocasionalBuys,
    createdLists,
    mainAddedProducts,
    customAddedProducts,
    purchasedProducts,
    sharedAccounts,
    receipts,
    loyalteeCards,
    timeSpent
  ])

  return (
    <OverviewInformationBlock
      widgetName={smallWidgetsData[id].widgetName}
      symbol={smallWidgetsData[id].symbol}
      title={smallWidgetsData[id].title}
      currScans={smallWidgetsData[id].currScans}
      color={smallWidgetsData[id].color}
      setItem={() =>
        setInvisibleItemsCallback({ pageName: 'shoppingListUsagePage', widgetName: smallWidgetsData[id].widgetName })
      }
      {...props}
    />
  )
}

ShoppingListWidgets.propTypes = {
  id: PropTypes.string.isRequired,
  setInvisibleItemsCallback: PropTypes.func.isRequired
}

export default React.memo(ShoppingListWidgets)

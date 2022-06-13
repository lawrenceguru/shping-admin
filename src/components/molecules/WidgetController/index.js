import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid4'
import OverviewInformationBlocks from '../../organisms/OverviewInformationBlocks'
import OverviewEngagementGraph from '../../organisms/OverviewEngagementGraph'
import TopTable from '../../atoms/TopTable'
import CampaignChart from '../../organisms/CampaignsChart'

const WidgetController = ({ item, setItem, invisibleItems }) => {
  if (!invisibleItems.includes(item.widgetName)) {
    if (item.type === 'smallWidgetsPanel') {
      return (
        <OverviewInformationBlocks
          orderAll={item.orderAll}
          widgetName={item.widgetName}
          currScans={item.currScans}
          currPercents={item.currPercents}
          currImpressions={item.currImpressions}
          currImpressionsPercents={item.currImpressionsPercents}
          currSpend={item.currSpend}
          currSpendPercents={item.currSpendPercents}
          currSales={item.currSales}
          currSalesPercents={item.currSalesPercents}
          selectRange={item.selectRange}
        />
      )
    }
    if (item.type === 'engagement') {
      return (
        <OverviewEngagementGraph
          widgetName={item.widgetName}
          selectRange={item.selectRange}
          xItems={item.xItems}
          scans={item.scans}
          impressions={item.impressions}
          users={item.users}
          clicks={item.clicks}
          setItem={() => setItem({ pageName: 'overviewPage', widgetName: item.widgetName })}
        />
      )
    }
    if (item.type === 'table') {
      return (
        <TopTable
          widgetName={item.widgetName}
          onRow={item.onRow}
          columns={item.columns}
          columnsData={item.columnsData}
          rowKey={() => uuid()}
          setModal={item.setModal}
          headerText={item.headerText}
          isFooter={item.isFooter}
          setItem={() => setItem({ pageName: 'overviewPage', widgetName: item.widgetName })}
          invisibleItems={item.invisibleItems}
        />
      )
    }
    if (item.type === 'chart') {
      return (
        <CampaignChart
          widgetName={item.widgetName}
          campaigns={item.campaigns}
          setItem={() => setItem({ pageName: 'overviewPage', widgetName: item.widgetName })}
          invisibleItems={item.invisibleItems}
          key={() => uuid()}
        />
      )
    }
  }
  return <div />
}

WidgetController.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  invisibleItems: PropTypes.arrayOf(PropTypes.string),
  setItem: PropTypes.func.isRequired
}

WidgetController.defaultProps = {
  invisibleItems: []
}

export default WidgetController

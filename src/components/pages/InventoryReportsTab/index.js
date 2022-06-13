import { connect } from 'react-redux'
import { inventoryGetItems, inventoryGetItemsExport, inventoryClearFullData } from 'store/actions'
import InventoryReportsTab from './InventoryReports'

const mapStateToProps = state => ({
  skip: state.inventoryReports.offset,
  take: state.inventoryReports.limit,
  allItems: state.inventoryReports.all,
  totalItems: state.inventoryReports.totalItems,
  isLoading: state.inventoryReports.isLoading,
  fullData: state.inventoryReports.fullData
})

export default connect(mapStateToProps, {
  inventoryGetItems,
  inventoryGetItemsExport,
  inventoryClearFullData
})(InventoryReportsTab)

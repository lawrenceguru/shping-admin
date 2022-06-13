import React from 'react'
import PropTypes from 'prop-types'
import * as ST from './styles'
import StoreCardReportChart from '../StoreCardReportChart'
import PieChartReports from '../../atoms/PieChartReports'
import TableReports from '../TableReports'
import Loader from '../../templates/Loader'

const Reports = ({ reports, columns, isLoading, children, header, pieHeader, tableHeader, isColumnGraph }) => {
  return (
    <ST.Wrapper>
      <ST.Header>{header}</ST.Header>
      {children}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ST.GraphsWrapper>
            <StoreCardReportChart isColumnGraph={isColumnGraph} data={reports.graph} header='User activity' />
            <PieChartReports data={reports.rate} header={pieHeader} />
          </ST.GraphsWrapper>
          <TableReports columns={columns} data={reports.list} header={tableHeader} />
        </>
      )}
    </ST.Wrapper>
  )
}

Reports.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  reports: PropTypes.object,
  children: PropTypes.element,
  pieHeader: PropTypes.string,
  tableHeader: PropTypes.string,
  header: PropTypes.string,
  isLoading: PropTypes.bool,
  isColumnGraph: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object)
}

Reports.defaultProps = {
  reports: null,
  children: null,
  pieHeader: null,
  tableHeader: null,
  header: null,
  isLoading: false,
  isColumnGraph: false,
  columns: []
}

export default Reports

import React, { useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as ST from './styles'
import Table from '../../molecules/Table'
import GraphHeader from '../../molecules/GraphHeader'

const TableReports = ({ data, header, columns }) => {
  const dataSource = useMemo(() => {
    return (data && data.length && data.map((item, key) => ({ ...item, key }))) || []
  }, [data])

  return (
    <ST.Wrapper>
      <ST.StyledChartBlock>
        <GraphHeader name={header} isHaveRemoverIcon={false} />
        <Table columns={columns} noScroll data={dataSource} rowKey='key' />
      </ST.StyledChartBlock>
    </ST.Wrapper>
  )
}

TableReports.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  header: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object)
}

TableReports.defaultProps = {
  data: [],
  header: null,
  columns: []
}

export default withRouter(TableReports)

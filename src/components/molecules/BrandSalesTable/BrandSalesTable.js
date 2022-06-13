import React, { useEffect, useMemo } from 'react'
import intl from 'react-intl-universal'
import uuid from 'uuid4'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TopTable from '../../atoms/TopTable'

const StyledImageContainer = styled.div`
  height: 52px;
  padding: 5px 25px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
`

const StyledImage = styled.img`
  width: 40px;
  height: 40px;
`

const StyledImagePhoto = styled(StyledImage)`
  border-radius: 50%;
  margin-right: 20px;
`
const StyledContainerImagePhoto = styled(StyledImageContainer)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
  background: transparent !important;
  font-size: 14px;
  font-weight: bold;
  color: #b3b3b3;
`

const LineRender = styled.div`
  max-width: 212px;
  height: 4px;
  border-radius: 60px;
  align-self: flex-start;
`

const StyledColumn = styled.span`
  max-width: 212px;
  display: flex;
  flex-direction: row;
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  font-style: normal;
`
const StyledSales = styled.div`
  margin-top: -25px;
  margin-left: -20px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  font-style: normal;
`

const colors = ['#50d166', '#ff4a4b', '#1875f0', '#5553ce', '#f7cb4e', '#1875f0', '#b3b3b3']

const StyledTableTitle = styled.div`
  background-color: #fff;
  border-radius: 6px;
  & .ant-table-placeholder {
    border-bottom: 0;
  }
`

const BrandSalesTable = ({ sales, dataIndex, analyticsGetBrandSales, setTableHeight, setItem, ...props }) => {
  const colorLine = (i, data) => {
    const index = sales.findIndex(x => x.name === data.name)
    const startSales = (sales[0] && sales[0].num_sales) || 0
    const currSales = data.num_sales
    const per = currSales / startSales
    const currWidth = 212 * per
    return (
      <StyledColumn>
        <LineRender style={{ backgroundColor: colors[index], width: `${currWidth}px` }} />
        <StyledSales>{currSales}</StyledSales>
      </StyledColumn>
    )
  }

  const sourceData = useMemo(() => {
    return sales && sales.length ? sales.filter(item => !!item.brand).slice(0, 5) : []
  }, [sales])

  const campaignsColumns = [
    {
      dataIndex: 'name',
      key: 'brand',
      render: (i, data) => (
        <StyledContainerImagePhoto>
          <StyledImagePhoto src='/no-image-product.jpg' alt='Brand' />
          <span>{data.brand}</span>
        </StyledContainerImagePhoto>
      )
    },
    {
      dataIndex: 'num_sales',
      key: 'num_sales',
      render: (i, data) => colorLine(i, data)
    }
  ]
  useEffect(() => {
    analyticsGetBrandSales()
  }, [])
  useEffect(() => {
    setTableHeight(sales || [])
  }, [sales])
  return (
    <StyledTableTitle className='sales-table' {...props}>
      <TopTable
        dataIndex={dataIndex}
        widgetName='brandSales'
        columns={campaignsColumns}
        headerText={`${intl.get('overviewPage.sales')}`}
        rowKey={() => uuid()}
        columnsData={sourceData}
        isFooter={false}
        setItem={setItem}
      />
    </StyledTableTitle>
  )
}

BrandSalesTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sales: PropTypes.arrayOf(PropTypes.object),
  analyticsGetBrandSales: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  setTableHeight: PropTypes.func.isRequired,
  dataIndex: PropTypes.string
}

BrandSalesTable.defaultProps = {
  sales: [],
  dataIndex: null
}

export default React.memo(BrandSalesTable)

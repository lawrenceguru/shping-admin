import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid4'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import TopTable from '../../atoms/TopTable'

const StyledImage = styled.img`
  width: 40px;
  height: 40px;
  font-size: 10px;
  margin: 0 auto;
`

const StyledContainerProductPhoto = styled.div`
  display: flex;
  justify-content: center;
`

const productsColumns = [
  {
    title: `${intl.get('conversionPage.sales.image')}`,
    key: 'image',
    render: data => (
      <StyledContainerProductPhoto>
        {data.image ? (
          <StyledImage src={data.image} alt='Product' />
        ) : (
          <StyledImage src='/no-image-product.jpg' alt='Product' />
        )}
      </StyledContainerProductPhoto>
    )
  },
  {
    title: `${intl.get('conversionPage.sales.product')}`,
    key: 'name',
    dataIndex: 'name',
    render: data => {
      let nameProduct = 'Unknown'
      if (data && data.name) {
        nameProduct = data.name
      }
      return nameProduct
    }
  },
  {
    title: `${intl.get('conversionPage.sales.sales')}`,
    dataIndex: 'num_sales',
    key: 'num_sales'
  }
]

const ConversionSales = ({
  sales,
  dataIndex,
  analyticsGetSales,
  setItem,
  setViewAllSize,
  setTableHeight,
  ...props
}) => {
  useEffect(() => {
    analyticsGetSales()
  }, [])

  const [viewAll, setViewAll] = useState(false)

  useEffect(() => {
    setTableHeight(sales)
    setViewAll(false)
  }, [sales])

  return (
    <TopTable
      widgetName='conversionSales'
      columns={productsColumns}
      dataIndex={dataIndex}
      columnsData={sales}
      rowKey={() => uuid()}
      headerText={intl.get('conversionPage.sales.title')}
      isFooter
      setItem={setItem}
      setViewAllSize={setViewAllSize}
      viewAll={viewAll}
      setViewAll={setViewAll}
      {...props}
    />
  )
}

ConversionSales.propTypes = {
  sales: PropTypes.arrayOf(PropTypes.object),
  analyticsGetSales: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  setViewAllSize: PropTypes.func.isRequired,
  setTableHeight: PropTypes.func.isRequired,
  dataIndex: PropTypes.string
}

ConversionSales.defaultProps = {
  sales: [],
  dataIndex: null
}
export default ConversionSales

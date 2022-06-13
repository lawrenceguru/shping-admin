import React, { useEffect, useState } from 'react'
import intl from 'react-intl-universal'
import uuid from 'uuid4'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styled from 'styled-components'
import TopTable from '../../atoms/TopTable'
import ProductImage from '../../atoms/ProductImageWithout'
import useGetTopProductsData from './useGetTopProducts'
import { shortenString } from '../../../utils/helpers/shortenString'

const { Column, ColumnGroup } = Table

export const StyledIcon = styled.img`
  width: 40px;
  color: #e02d2d;
`

const StyledFeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyleImpressions = styled.div`
  z-index: 100000;
  position: relative;
  height: 52px;
  padding: 5px 25px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  max-width: 100px;
  justify-content: space-around;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 5px 35px;
  background: transparent !important;
  &:hover {
    background-color: #0000000a;
    cursor: pointer;
  }
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 5px;
  }
`

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  & > div {
    position: relative;
    width: 120px;
    height: auto;
    max-height: 100%;
  }
  & img {
    max-width: 100%;
    width: 100%;
    height: auto;
  }
`

const TopProductsTable = ({
  isLoadingNewFiltersInfo,
  setModal,
  setItem,
  setTableHeight,
  selectRange,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  ...props
}) => {
  const { topProducts } = useGetTopProductsData({
    aggregation: selectRange,
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  const [currentData, setCurrentData] = useState([])
  const onClickHandler = (data, key, event) => {
    event.stopPropagation()
    event.preventDefault()
    setModal({
      ...data,
      key
    })
  }
  const stopPropagation = event => {
    event.stopPropagation()
  }

  useEffect(() => {
    setTableHeight(currentData)
  }, [currentData])

  return (
    <TopTable
      widgetName='topProducts'
      columnsData={topProducts}
      rowKey={() => uuid()}
      headerText={intl.get('overviewPage.topProducts.topProducts')}
      isFooter
      setCurrentData={setCurrentData}
      setItem={setItem}
      viewAll
      pagination
      scroll
      isLoadingNewFiltersInfo={isLoadingNewFiltersInfo}
      {...props}
    >
      <ColumnGroup title={intl.get('overviewPage.topProducts.featured')} align='center'>
        <Column
          title={intl.get('overviewPage.topProducts.blast')}
          dataIndex='blast'
          key='blast'
          render={data => (
            <StyledFeatureContainer>
              {data ? (
                <>
                  <StyledIcon src='/featured-icon.svg' />
                  <span>{data}</span>
                </>
              ) : null}
            </StyledFeatureContainer>
          )}
        />
        <Column
          title={intl.get('overviewPage.topProducts.rotation')}
          dataIndex='rotation'
          key='rotation'
          render={data => (
            <StyledFeatureContainer>
              {data ? (
                <>
                  <StyledIcon src='/featured-icon.svg' />
                  <span>{data}</span>
                </>
              ) : null}
            </StyledFeatureContainer>
          )}
        />
      </ColumnGroup>
      <Column
        title={intl.get('overviewPage.topProducts.image')}
        key='image'
        width='10%'
        render={data => (
          <ImageWrapper>
            <ProductImage image={data.product_image} />
          </ImageWrapper>
        )}
      />
      <Column
        title={intl.get('overviewPage.topProducts.product')}
        key='product_name'
        dataIndex='product_name'
        render={(i, { product_name: name = '' }) => {
          return <div title={name}>{name && shortenString(name, 50)}</div>
        }}
      />
      <Column
        title={intl.get('overviewPage.topProducts.impressions')}
        key='impressions'
        dataIndex='impressions'
        render={(i, data) => (
          <StyleImpressions
            onMouseDown={stopPropagation}
            onTouchStart={stopPropagation}
            onClick={event => onClickHandler(data, 'impressions', event)}
          >
            <div>
              <img src='/open-icon.svg' alt='open' />
            </div>
            <div>{data.impressions.total}</div>
          </StyleImpressions>
        )}
      />
      <Column
        title={intl.get('overviewPage.topProducts.interactions')}
        key='interactions'
        dataIndex='interactions'
        render={(i, data) => (
          <StyleImpressions
            onMouseDown={stopPropagation}
            onTouchStart={stopPropagation}
            onClick={event => onClickHandler(data, 'interactions', event)}
          >
            <div>
              <img src='/open-icon.svg' alt='open' />
            </div>
            <div>{data.interactions.total}</div>
          </StyleImpressions>
        )}
      />
    </TopTable>
  )
}

TopProductsTable.propTypes = {
  setModal: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  setTableHeight: PropTypes.func.isRequired,
  selectRange: PropTypes.string.isRequired,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  isLoadingNewFiltersInfo: PropTypes.bool
}

TopProductsTable.defaultProps = {
  isLoadingNewFiltersInfo: false
}

export default React.memo(TopProductsTable)

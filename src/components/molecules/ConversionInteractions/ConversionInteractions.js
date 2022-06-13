import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid4'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import TopTable from '../../atoms/TopTable'
import IconButton from '../IconButton'
import useGetConversionInteractions from './useGetConversionIteractions'

const InteractionsWrapper = styled.div`
  margin-left: 25px;
`

const CountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  & > div {
    min-width: 65px;
  }
`
const productsColumns = [
  {
    title: `${intl.get('conversionPage.impressions.type')}`,
    dataIndex: 'action',
    key: 'action',
    render: (i, data) => {
      let name = 'Unknown'
      if (data && data.action) {
        name = data.action
      }

      return <InteractionsWrapper>{intl.get(`conversionPage.interactions.fieldsNames.${name}`)}</InteractionsWrapper>
    }
  },
  {
    title: `${intl.get('conversionPage.impressions.showCount')}`,
    dataIndex: 'num_interactions',
    key: 'num_interactions',
    render: (i, data) => (
      <CountWrapper>
        <div>{data.num_interactions}</div>
        <IconButton
          width='3000px'
          height='2400px'
          type='Interaction'
          styleParam={{ marginLeft: '10px', fontSize: '20px' }}
          visible={false}
        />
      </CountWrapper>
    )
  }
]

const ConversionInteractions = ({
  setItem,
  setTableHeight,
  dataIndex,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  ...props
}) => {
  const { interactions } = useGetConversionInteractions({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  useEffect(() => {
    setTableHeight(interactions)
  }, [interactions])

  return (
    <TopTable
      widgetName='Interactions'
      viewAll
      dataIndex={dataIndex}
      columns={productsColumns}
      columnsData={interactions || []}
      rowKey={() => uuid()}
      headerText={intl.get('conversionPage.interactions.title')}
      isFooter={false}
      setItem={setItem}
      {...props}
    />
  )
}

ConversionInteractions.propTypes = {
  setItem: PropTypes.func.isRequired,
  setTableHeight: PropTypes.func.isRequired,
  dataIndex: PropTypes.string,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired
}

ConversionInteractions.defaultProps = {
  dataIndex: null
}
export default ConversionInteractions

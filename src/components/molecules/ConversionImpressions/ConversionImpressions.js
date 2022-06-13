import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid4'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import TopTable from '../../atoms/TopTable'
import IconButton from '../IconButton'
import useGetConversionImpressions from './useGetConversionImpressions'

const ImpressionWrapper = styled.div`
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
      return <ImpressionWrapper>{intl.get(`conversionPage.impressions.fieldsNames.${name}`)}</ImpressionWrapper>
    }
  },
  {
    title: `${intl.get('conversionPage.impressions.showCount')}`,
    dataIndex: 'num_impressions',
    key: 'num_impressions',
    render: (i, data) => (
      <CountWrapper>
        <div>{data.num_impressions}</div>
        <IconButton
          type='Eye'
          width='3000px'
          height='2400px'
          styleParam={{ marginLeft: '10px', fontSize: '20px' }}
          visible={false}
        />
      </CountWrapper>
    )
  }
]

const ConversionImpressions = ({
  setItem,
  setTableHeight,
  dataIndex,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  selectGtin,
  ...props
}) => {
  const { impressions } = useGetConversionImpressions({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry,
    gtins: selectGtin
  })

  useEffect(() => {
    setTableHeight(impressions)
  }, [impressions])

  return (
    <TopTable
      widgetName='Impressions'
      columns={productsColumns}
      columnsData={(impressions && impressions.length && impressions.slice(0, 4)) || []}
      rowKey={() => uuid()}
      headerText={intl.get('conversionPage.impressions.title')}
      isFooter={false}
      setItem={setItem}
      dataIndex={dataIndex}
      {...props}
    />
  )
}

ConversionImpressions.propTypes = {
  setItem: PropTypes.func.isRequired,
  setTableHeight: PropTypes.func.isRequired,
  dataIndex: PropTypes.string,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  selectGtin: PropTypes.arrayOf(PropTypes.string).isRequired
}

ConversionImpressions.defaultProps = {
  dataIndex: null
}
export default ConversionImpressions

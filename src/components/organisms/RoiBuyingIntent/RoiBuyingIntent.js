import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { WidgetTemplate } from '../../../styles'
import GraphHeader from '../../molecules/GraphHeader'
import useGetRoiBuyingIntent from './useGetRoiBuyingIntent'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'

const Block = styled.div`
  border-radius: 0 0 6px 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  height: 100%;
  background-color: #fff;
`

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1rem;
  padding: 2rem 1rem 0;
`

const BlockRow = styled.div`
  display: flex;
  flex-direction: row;
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  @media (max-width: 1724px) {
    font-size: 13px;
  }
  @media (max-width: 1670px) {
    font-size: 12px;
  }
  @media (max-width: 1611px) {
    font-size: 11px;
  }
  @media (max-width: 1490px) {
    font-size: 10px;
  }
  @media (max-width: 1440px) {
    font-size: 9px;
  }
`

const BlockCell = styled.div`
  display: grid;
  grid-template-rows: 3rem 1fr;
  row-gap: 1rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  align-content: center;
  font-size: 14px;
  overflow: hidden;
  padding: 1rem;
  @media (max-width: 1482px) {
    font-size: 13px;
  }
  @media (max-width: 1452px) {
    font-size: 12px;
  }
  @media (max-width: 1422px) {
    font-size: 11px;
  }
  ${({ isHighlighted }) =>
    isHighlighted &&
    `
      background-color: #f4f4f4;
      border-radius: 4px;
      > ${BlockRow} {
        color: inherit;
      }
    `}
`

const BlockValue = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  @media (max-width: 1482px) {
    font-size: 1.5rem;
  }
  @media (max-width: 1452px) {
    font-size: 1.4rem;
  }
  @media (max-width: 1422px) {
    font-size: 1.3rem;
  }
`

const RoiBuyingIntent = ({
  dataIndex,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  setItem,
  ...props
}) => {
  const { sales, spend, potentialRoi } = useGetRoiBuyingIntent({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  const hasData = !!sales || !!spend || !!potentialRoi

  return (
    <Block widgetName='buyingIntentRoi' className='pdf-export' data-index={dataIndex} {...props}>
      <WidgetTemplate>
        <GraphHeader name={intl.get('roiPage.buyingIntentRoi')} setItem={setItem} />

        {hasData ? (
          <Body>
            <BlockCell>
              <BlockRow>{intl.get('roiPage.buyingIntentSpend')}</BlockRow>
              <BlockValue>${spend}</BlockValue>
            </BlockCell>

            <BlockCell>
              <BlockRow>{intl.get('roiPage.buyingIntentSales')}</BlockRow>
              <BlockValue>${sales}</BlockValue>
            </BlockCell>

            <BlockCell isHighlighted>
              <BlockRow>{intl.get('roiPage.buyingIntentPotentialRoi')}</BlockRow>
              <BlockValue>{potentialRoi}</BlockValue>
            </BlockCell>
          </Body>
        ) : (
          <div style={{ paddingTop: '3rem' }}>
            <NoDataPlaceholder />
          </div>
        )}
      </WidgetTemplate>
    </Block>
  )
}

RoiBuyingIntent.propTypes = {
  dataIndex: PropTypes.string,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  setItem: PropTypes.func.isRequired
}

RoiBuyingIntent.defaultProps = {
  dataIndex: null
}

export default RoiBuyingIntent

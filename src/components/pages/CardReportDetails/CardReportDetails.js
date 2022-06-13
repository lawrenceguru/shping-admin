import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as ST from './styles'
import Loader from '../../templates/Loader'
import Table from '../../molecules/Table'
import { columns } from './consts'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'
import StoreCard from '../../molecules/StoreCard'

const CardReportDetails = ({
  match,
  isLoadingCardReportDetails,
  cardReportDetails,
  storeCardsGetCardReportDetails
}) => {
  const userId = useMemo(() => {
    return (match && match.params && match.params.user) || null
  }, [match])

  const cardId = useMemo(() => {
    return (match && match.params && match.params.card) || null
  }, [match])

  const data = useMemo(() => {
    return (
      (cardReportDetails &&
        cardReportDetails.history &&
        cardReportDetails.history.length &&
        cardReportDetails.history.map((item, index) => ({
          ...item,
          key: index
        }))) ||
      []
    )
  }, [cardReportDetails])

  useEffect(() => {
    if (userId && cardId) {
      storeCardsGetCardReportDetails({ userId, cardId })
    }
  }, [userId, cardId])

  return (
    <ST.Wrapper>
      {isLoadingCardReportDetails ? (
        <Loader />
      ) : (
        <>
          <ST.Header>Store card details</ST.Header>
          <ST.InfoWrapper>
            <ST.SubHeader>
              <span>{`User id: ${userId}`}</span>
            </ST.SubHeader>
            <ST.SubHeader>
              <span>{`Card id: ${cardId}`}</span>
            </ST.SubHeader>
            {cardReportDetails && cardReportDetails.currentCard ? (
              <>
                <StoreCard card={cardReportDetails.currentCard} isDefault />
                {cardReportDetails &&
                  cardReportDetails.otherCards &&
                  cardReportDetails.otherCards.length !== 0 &&
                  cardReportDetails.otherCards.map(item => <StoreCard key={item.id} card={item} />)}
              </>
            ) : (
              <ST.NoDataPlaceholderWrapper>
                <NoDataPlaceholder />
              </ST.NoDataPlaceholderWrapper>
            )}
          </ST.InfoWrapper>
          <Table noScroll columns={columns} data={data} rowKey='key' />
        </>
      )}
    </ST.Wrapper>
  )
}

CardReportDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  isLoadingCardReportDetails: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  cardReportDetails: PropTypes.object,
  storeCardsGetCardReportDetails: PropTypes.func.isRequired
}

CardReportDetails.defaultProps = {
  isLoadingCardReportDetails: false,
  cardReportDetails: null
}

export default CardReportDetails

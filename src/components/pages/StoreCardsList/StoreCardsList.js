/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect, useCallback } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import * as ST from './styles'
import Loader from '../../templates/Loader'
import FoundItems from '../../atoms/FoundItems'
import IconButton from '../../molecules/IconButton'
import CardProductImage from '../../atoms/CardProductImage'
import deleteModal from '../../molecules/DeleteModal'
import LoadingSpinner from '../../atoms/LoadingSpinner'
import Button from '../../atoms/Button'

const StoreCardsList = ({
  history,
  match,
  storeCardsGetCountryCards,
  storeCardsDeleteCountryCards,
  countryCards,
  countryCardsIsLoading,
  deletingCardId
}) => {
  const countryId = useMemo(() => {
    return (match && match.params && match.params.id) || null
  }, [match])

  const totalCount = useMemo(() => {
    return (countryCards && countryCards.length) || 0
  }, [countryCards])

  useEffect(() => {
    if (!countryCardsIsLoading && countryId) {
      storeCardsGetCountryCards({ id: countryId })
    }
  }, [countryId])

  const handleOnCardClick = useCallback(
    id => {
      history.push(`/admin/store-cards/configuration/${countryId}/list/editor/${id}`)
    },
    [countryId]
  )

  const handleOnAddClick = useCallback(() => {
    history.push(`/admin/store-cards/configuration/${countryId}/list/editor`)
  }, [countryId])

  return (
    <ST.Wrapper>
      {countryCardsIsLoading ? (
        <Loader />
      ) : (
        <>
          <ST.ActionsWrapper>
            <Button size='large' type='danger' onClick={() => handleOnAddClick()}>
              {intl.get('storecards.addCard')}
            </Button>
          </ST.ActionsWrapper>
          <FoundItems count={totalCount} />
          {countryCards &&
            countryCards.length !== 0 &&
            countryCards.map(item => (
              <LoadingSpinner key={item.id} isLoading={deletingCardId === item.id}>
                <ST.StoreCardInfoWrapper key={item.id} onClick={() => handleOnCardClick(item.id)}>
                  <ST.StyledStoreCardIcon>
                    <CardProductImage imageSrc={item.image_big && item.image_big.urls} />
                  </ST.StyledStoreCardIcon>
                  <ST.StyledStoreCardMainInfo>
                    <ST.StyledMainStoreCardText>{item.name}</ST.StyledMainStoreCardText>
                    <span>{item.bgcolor}</span>
                  </ST.StyledStoreCardMainInfo>
                  <ST.DeleteIcon>
                    <IconButton
                      type='DeleteTrash'
                      actionFunction={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        deleteModal(
                          () => storeCardsDeleteCountryCards({ countryId, cardId: item.id }),
                          intl.get('storecards.confirmDelete', { name: item.name })
                        )
                      }}
                    />
                  </ST.DeleteIcon>
                </ST.StoreCardInfoWrapper>
              </LoadingSpinner>
            ))}
        </>
      )}
    </ST.Wrapper>
  )
}

StoreCardsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  storeCardsGetCountryCards: PropTypes.func.isRequired,
  storeCardsDeleteCountryCards: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  countryCards: PropTypes.arrayOf(PropTypes.object),
  countryCardsIsLoading: PropTypes.bool,
  deletingCardId: PropTypes.string
}

StoreCardsList.defaultProps = {
  countryCards: null,
  countryCardsIsLoading: false,
  deletingCardId: null
}

export default StoreCardsList

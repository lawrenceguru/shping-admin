import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import CardProductImage from '../../atoms/CardProductImage'
import * as ST from './styles'
import { getMomentLocale } from '../../../utils/helpers/date'
import Button from '../../atoms/Button'

const Card = ({ card, isDefault, isReceipt, handleOnChangeLocation }) => {
  return (
    <ST.Wrapper>
      <ST.CardInfoWrapper isDefault={isDefault}>
        <ST.StyledCardIcon>
          {isDefault ? (
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={isReceipt ? card.receipt && card.receipt[0] : card.image_small}
            >
              <CardProductImage
                width='300px'
                maxWidth='300px'
                maxHeight={isReceipt ? 'initial' : '300px'}
                imageSrc={isReceipt ? card.receipt && card.receipt[0] : card.image_small}
              />
            </a>
          ) : (
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={isReceipt ? card.receipt && card.receipt[0] : card.image_small}
            >
              <CardProductImage imageSrc={isReceipt ? card.receipt && card.receipt[0] : card.image_small} />
            </a>
          )}
        </ST.StyledCardIcon>
        <ST.StyledCardMainInfo>
          <ST.StyledMainCardText isReceipt={isReceipt}>{card.name || card.location_name}</ST.StyledMainCardText>
          {isReceipt && isDefault && (
            <Button size='small' type='danger' onClick={handleOnChangeLocation}>
              Change Location
            </Button>
          )}
          {card.store_id ? <span>{`Store id: ${card.store_id}`}</span> : <p />}
          <span>
            {`Created: ${moment(card.ts || card.created)
              .locale(getMomentLocale())
              .format('lll')}`}
          </span>
          {card.latitude && <span>{`Latitude: ${card.latitude}`}</span>}
          {card.longitude && <span>{`Longitude: ${card.longitude}`}</span>}
          {isDefault && !isReceipt && <span>{card.barcode_type}</span>}
        </ST.StyledCardMainInfo>
        <ST.IndexFieldsInfo>
          {card.custom_fields &&
            card.custom_fields.length !== 0 &&
            card.custom_fields.map(field => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <span key={field.id}>
                  {field.id}: {field.value}
                </span>
              )
            })}
        </ST.IndexFieldsInfo>
      </ST.CardInfoWrapper>
    </ST.Wrapper>
  )
}

Card.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  card: PropTypes.object,
  isDefault: PropTypes.bool,
  isReceipt: PropTypes.bool,
  handleOnChangeLocation: PropTypes.func
}

Card.defaultProps = {
  card: null,
  isDefault: false,
  isReceipt: false,
  handleOnChangeLocation: null
}

export default Card

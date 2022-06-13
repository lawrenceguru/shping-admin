import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
import IconButton from '../IconButton'
import CardProductImage from '../../atoms/CardProductImage'
import * as ST from './styles'

const Card = ({
  items,
  showConfirm,
  isDeleteIconExist,
  redirectOnClick,
  hiddenFields,
  visibleFields,
  fields,
  participants,
  isAdditionalFields,
  popText
}) => {
  return (
    <ST.Wrapper>
      {items.map(item => (
        <ST.ProductInfoWrapper key={item.id} onClick={() => redirectOnClick(item.id)}>
          <ST.StyledProductIcon>
            <CardProductImage imageSrc={item.image_src} />
          </ST.StyledProductIcon>
          <ST.StyledProductMainInfo isAdditionalFields={isAdditionalFields}>
            <ST.StyledMainProductText>{item.name}</ST.StyledMainProductText>
            <span>{item.description}</span>
          </ST.StyledProductMainInfo>
          <ST.IndexFieldsInfo>
            {fields &&
              fields.map((field, index) => {
                let value = item[field.fieldName]
                let ownerName = null

                if (
                  (field.fieldId === 'owner' || field.fieldId === 'issuer') &&
                  participants &&
                  participants.length &&
                  value
                ) {
                  ownerName = participants.find(el => el.id === value)
                  value = (ownerName && ownerName.name) || value
                }

                if (field.fieldId === 'date_created') {
                  value = moment(value).format(moment.localeData().longDateFormat('L'))
                }

                if (
                  !hiddenFields.includes(field.fieldName) &&
                  (!visibleFields || visibleFields.includes(field.fieldId)) &&
                  value
                ) {
                  return (
                    // eslint-disable-next-line react/no-array-index.js-key,react/no-array-index-key
                    <ST.IndexField key={`${field.fieldId}-${index}`}>
                      <div>{field.columnName}</div>
                      <div>{value}</div>
                    </ST.IndexField>
                  )
                }
                return null
              })}
          </ST.IndexFieldsInfo>
          {isDeleteIconExist && (
            <ST.DeleteIcon>
              <IconButton
                type='DeleteTrash'
                actionFunction={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  showConfirm(item)
                }}
                popText={popText || intl.get('productCatalogue.deleteProduct')}
              />
            </ST.DeleteIcon>
          )}
        </ST.ProductInfoWrapper>
      ))}
    </ST.Wrapper>
  )
}

Card.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  showConfirm: PropTypes.func.isRequired,
  isDeleteIconExist: PropTypes.bool,
  hiddenFields: PropTypes.arrayOf(PropTypes.string),
  visibleFields: PropTypes.arrayOf(PropTypes.string),
  fields: PropTypes.arrayOf(PropTypes.string),
  participants: PropTypes.arrayOf(PropTypes.object),
  redirectOnClick: PropTypes.func,
  isAdditionalFields: PropTypes.bool,
  popText: PropTypes.string
}

Card.defaultProps = {
  hiddenFields: [],
  isDeleteIconExist: false,
  visibleFields: [],
  fields: [],
  participants: [],
  redirectOnClick: null,
  isAdditionalFields: false,
  popText: null
}

export default withRouter(Card)

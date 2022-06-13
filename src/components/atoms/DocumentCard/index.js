import React from 'react'
import moment from 'moment'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import * as ST from './styles'
import CardProductImage from '../CardProductImage'
import IconButton from '../../molecules/IconButton'
import LoadingSpinner from '../LoadingSpinner'

const DocumentCard = ({
  documents,
  participants,
  onClickCard,
  fields,
  hiddenFields,
  showConfirm,
  visibleFields,
  deletedId
}) => {
  return (
    <ST.Wrapper>
      {!!(documents && documents.length) &&
        documents.map(document => (
          <LoadingSpinner key={document.id} isLoading={document.id === deletedId}>
            <ST.DocumentInfoWrapper key={document.id} onClick={() => onClickCard(document.id)}>
              <ST.IndexFieldsInfo>
                {fields &&
                  fields.map(field => {
                    let value = document && document[field.fieldName]
                    let ownerName = null

                    if (
                      (field.fieldName === 'owner' || field.fieldName === 'issuer') &&
                      participants &&
                      participants.length &&
                      value
                    ) {
                      ownerName = participants.find(el => el.id === value)
                      value = (ownerName && ownerName.name) || '-'
                    }

                    if (field.fieldName === 'date_created') {
                      value = moment(value).format(moment.localeData().longDateFormat('L'))
                    }

                    if (
                      (!hiddenFields || !hiddenFields.includes(field.fieldName)) &&
                      (!visibleFields || visibleFields.includes(field.fieldId))
                    ) {
                      return field.fieldName === 'image' ? (
                        <ST.StyledDocumentIcon key={`${field.fieldId}`}>
                          <CardProductImage imageSrc={value} />
                        </ST.StyledDocumentIcon>
                      ) : (
                        <ST.IndexField key={`${field.fieldId}`}>
                          <div>{field.columnName}:</div>
                          <div>{value || '-'}</div>
                        </ST.IndexField>
                      )
                    }
                    return null
                  })}
              </ST.IndexFieldsInfo>
              <ST.DeleteIcon>
                <IconButton
                  type='DeleteTrash'
                  actionFunction={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    showConfirm(document.id)
                  }}
                  popText={intl.get('documents.deleteDocument')}
                />
              </ST.DeleteIcon>
            </ST.DocumentInfoWrapper>
          </LoadingSpinner>
        ))}
    </ST.Wrapper>
  )
}

DocumentCard.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.object),
  participants: PropTypes.arrayOf(PropTypes.object),
  onClickCard: PropTypes.func,
  fields: PropTypes.arrayOf(PropTypes.object),
  hiddenFields: PropTypes.arrayOf(PropTypes.object),
  showConfirm: PropTypes.func,
  visibleFields: PropTypes.arrayOf(PropTypes.string),
  deletedId: PropTypes.string
}

DocumentCard.defaultProps = {
  documents: [],
  participants: null,
  onClickCard: null,
  fields: null,
  hiddenFields: null,
  showConfirm: null,
  visibleFields: null,
  deletedId: null
}

export default DocumentCard

import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
import Datamatrix from '../Datamatrix'
import IconButton from '../../molecules/IconButton'
import CardProductImage from '../CardProductImage'
import * as ST from './styles'

const ProductCatalogueCard = ({
  products,
  showConfirm,
  history,
  isDeleteIconExist,
  showDatamatrix,
  showPreviewOnClick,
  hiddenFields,
  visibleFields,
  fields,
  participants
}) => {
  return (
    <ST.Wrapper>
      {products.map(product => (
        <ST.ProductInfoWrapper
          showDatamatrix={showDatamatrix}
          key={product.id}
          onClick={() => (showPreviewOnClick ? history.push(`/admin/products/catalogue/edit/${product.id}`) : {})}
        >
          <ST.StyledProductIcon>
            {showDatamatrix ? (
              <Datamatrix code={product.datamatrix_code} id={product.id} />
            ) : (
              <CardProductImage imageSrc={product.image} />
            )}
          </ST.StyledProductIcon>
          <ST.StyledProductMainInfo>
            <ST.StyledMainProductText>{product.name}</ST.StyledMainProductText>
            <span>{showDatamatrix ? product.gtin : product.id}</span>
            {!showDatamatrix && <ST.StyledMainProductText>{product.brand_id}</ST.StyledMainProductText>}
          </ST.StyledProductMainInfo>
          <ST.IndexFieldsInfo>
            {fields &&
              fields.map((field, index) => {
                let value = product && (product[field.fieldName] || product[field.fieldId])
                let ownerName = null

                if (field.fieldId === 'task') {
                  value = product && product[field.fieldName] && product[field.fieldName].substr(30, 36)
                }

                if (field.fieldName === 'SKU') {
                  value = product && product[field.fieldId]
                }

                if (field.fieldId === 'sscc') {
                  ownerName = null
                  value = null
                }

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
                  showConfirm(product.id)
                }}
                popText={intl.get('productCatalogue.deleteProduct')}
              />
            </ST.DeleteIcon>
          )}
        </ST.ProductInfoWrapper>
      ))}
    </ST.Wrapper>
  )
}

ProductCatalogueCard.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  showConfirm: PropTypes.func.isRequired,
  isDeleteIconExist: PropTypes.bool,
  showPreviewOnClick: PropTypes.bool,
  hiddenFields: PropTypes.arrayOf(PropTypes.string),
  showDatamatrix: PropTypes.bool,
  visibleFields: PropTypes.arrayOf(PropTypes.string),
  fields: PropTypes.arrayOf(PropTypes.object),
  participants: PropTypes.arrayOf(PropTypes.object)
}

ProductCatalogueCard.defaultProps = {
  hiddenFields: [],
  isDeleteIconExist: false,
  showPreviewOnClick: false,
  showDatamatrix: false,
  visibleFields: [],
  fields: [],
  participants: []
}

export default withRouter(ProductCatalogueCard)

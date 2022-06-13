import React, { useCallback } from 'react'
import { Form, Select } from 'antd'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import * as ST from './styles'
import { gpcFields, mainFields } from './consts'
import ProductImportColumnPreview from '../ProductImportColumnPreview'

const { Option } = Select

const ProductImportMapping = ({ header, fields, setFields, onDragEnd, setMappingColumns, mappingColumns }) => {
  const renderOptions = options => {
    return options && options.length
      ? options.map(option => (
          <Option style={{ fontSize: 16 }} key={option.id} value={option.id}>
            {option.header}
          </Option>
        ))
      : null
  }

  const selectOnChange = useCallback(
    (value, name) => {
      setMappingColumns(prevState => ({
        ...prevState,
        [name]: value
      }))
    },
    [setMappingColumns]
  )
  return (
    <>
      <ST.Row>
        <ST.Column>
          {mainFields.map(item => {
            return (
              <Form.Item key={item} label={intl.get(`importProducts.mapping.${item}`)}>
                <Select
                  showSearch
                  getPopupContainer={trigger => trigger.parentNode}
                  size='large'
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={value => selectOnChange(value, item === 'gtin' ? 'gtin_field' : item)}
                  placeholder={intl.get('importProducts.mapping.selectColumn')}
                  value={mappingColumns && mappingColumns[item === 'gtin' ? 'gtin_field' : item]}
                  defaultValue={mappingColumns && mappingColumns[item === 'gtin' ? 'gtin_field' : item]}
                >
                  {renderOptions(header)}
                </Select>
              </Form.Item>
            )
          })}
        </ST.Column>
        <ST.TwoColumns>
          <ST.Header>{intl.get('importProducts.mapping.title')}</ST.Header>
          {gpcFields.map(item => {
            return (
              <Form.Item label={intl.get(`importProducts.mapping.${item}`)} key={item}>
                <Select
                  showSearch
                  size='large'
                  getPopupContainer={trigger => trigger.parentNode}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder={intl.get('importProducts.mapping.selectColumn')}
                  onChange={value => selectOnChange(value, `gpc_${item}_field`)}
                  value={mappingColumns && mappingColumns[`gpc_${item}_field`]}
                  defaultValue={mappingColumns && mappingColumns[`gpc_${item}_field`]}
                >
                  {renderOptions(header)}
                </Select>
              </Form.Item>
            )
          })}
        </ST.TwoColumns>
      </ST.Row>
      <ProductImportColumnPreview header={header} setFields={setFields} fields={fields} onDragEnd={onDragEnd} />
    </>
  )
}

ProductImportMapping.propTypes = {
  header: PropTypes.arrayOf(PropTypes.object),
  fields: PropTypes.arrayOf(PropTypes.object),
  setFields: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  setMappingColumns: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  mappingColumns: PropTypes.object
}

ProductImportMapping.defaultProps = {
  header: [],
  fields: [],
  mappingColumns: null
}

export default ProductImportMapping

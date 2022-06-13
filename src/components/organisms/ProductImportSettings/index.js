import React, { useCallback } from 'react'
import intl from 'react-intl-universal'
import { Checkbox, Form, Select } from 'antd'
import { toast } from 'react-toastify'
import { RHFInput } from 'react-hook-form-input'
import PropTypes from 'prop-types'
import DropZone from '../../molecules/DropZone'
import RadioGroup from '../../atoms/RadioGroup'
import { Delimeter } from './consts'
import * as ST from './styles'
import { name } from '../../../utils/consts'
import ProductPreview from '../ProductPreview'

const { Option } = Select

const ProductImport = ({
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages,
  postUpload,
  lastUploaded,
  preview,
  register,
  setValue,
  values,
  conditions,
  setConditions
}) => {
  const onDrop = files => {
    if (!files || !files.length) {
      return
    }

    if (files.length > 1) {
      toast.error('Import only one CSV file at a time')
      return
    }

    const file = files[0]

    if (file.type.localeCompare('text/plain') !== 0 && file.type.localeCompare('text/csv') !== 0) {
      toast.error("Import only 'text/plain' or 'text/csv' file types")
      return
    }

    postUpload({ file })
  }

  const selectOnChange = useCallback(
    (valuesSelect, nameSelect) => {
      setConditions(prevState => ({
        ...prevState,
        [nameSelect]: valuesSelect
      }))
    },
    [setConditions]
  )

  return (
    <>
      <ST.Row>
        <ST.Column>
          <Checkbox
            size='large'
            checked={values && values.has_header}
            onChange={() => {
              setValue(`has_header`, !values.has_header)
            }}
            defaultChecked={values && values.has_header}
          >
            {intl.get('importProducts.firstRowHeader')}
          </Checkbox>
          <Form.Item label={intl.get('importProducts.uploadSelect')}>
            <ST.DropzoneWrapper>
              <DropZone
                onDrop={onDrop}
                format='text/plain, text/csv*'
                isUpload={!!(lastUploaded && lastUploaded.url)}
              />
            </ST.DropzoneWrapper>
          </Form.Item>
        </ST.Column>
        <ST.Column>
          <Form.Item label={intl.get('importProducts.delimiter')}>
            <RHFInput
              as={<RadioGroup group={Delimeter} />}
              setValue={setValue}
              register={register}
              name='delimiter'
              defaultValue={values && values.delimiter}
            />
          </Form.Item>
          <ST.Header>{intl.get('importProducts.sourceOptions')}</ST.Header>
          <Form.Item label={intl.get('todo.deliveries.form.selectCountries')}>
            <Select
              showSearch
              size='large'
              mode='multiple'
              getPopupContainer={trigger => trigger.parentNode}
              placeholder={intl.get('todo.deliveries.form.selectCountries')}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onChange={value => selectOnChange(value, 'countries')}
              value={(conditions && conditions.countries) || []}
              defaultValue={(conditions && conditions.countries) || []}
            >
              {countries && countries.length && !isLoadingCountries
                ? countries.map(country => (
                    <Option style={{ fontSize: 16 }} key={country.iso} value={country[name]}>
                      {country[name]}
                    </Option>
                  ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item label={intl.get('todo.deliveries.form.selectLanguages')}>
            <Select
              size='large'
              mode='multiple'
              getPopupContainer={trigger => trigger.parentNode}
              placeholder={intl.get('todo.deliveries.form.selectLanguages')}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onChange={value => selectOnChange(value, 'languages')}
              value={(conditions && conditions.languages) || []}
              defaultValue={(conditions && conditions.languages) || []}
            >
              {languages && languages.length && !isLoadingLanguages
                ? languages.map(language => (
                    <Option style={{ fontSize: 16 }} key={language.code} value={language[name]}>
                      {language[name]}
                    </Option>
                  ))
                : null}
            </Select>
          </Form.Item>
        </ST.Column>
      </ST.Row>
      {preview && preview.rows && !!preview.rows.length && <ProductPreview preview={preview} />}
    </>
  )
}

ProductImport.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
  languages: PropTypes.arrayOf(PropTypes.object),
  isLoadingCountries: PropTypes.bool,
  isLoadingLanguages: PropTypes.bool,
  postUpload: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  lastUploaded: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  preview: PropTypes.object,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  conditions: PropTypes.object,
  setConditions: PropTypes.func.isRequired
}

ProductImport.defaultProps = {
  countries: [],
  languages: [],
  conditions: null,
  lastUploaded: null,
  isLoadingCountries: false,
  isLoadingLanguages: false,
  preview: null,
  values: null
}

export default ProductImport

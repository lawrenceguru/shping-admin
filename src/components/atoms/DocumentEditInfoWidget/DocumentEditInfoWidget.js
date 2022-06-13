import React, { useEffect, useMemo } from 'react'
import { Input, Select, Form } from 'antd'
import { RHFInput } from 'react-hook-form-input'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import Error from '../Error'
import IconButton from '../../molecules/IconButton'
import * as ST from './styles'
import Button from '../Button'
import { name } from '../../../utils/consts'
import { getGroupWidgets } from '../../../utils/widgets'
import { destroyReferenceDependence } from '../../../utils/destroyReferenceDependence'

const { Option } = Select

const ProductEditInfoWidget = ({
  register,
  values,
  setValue,
  errors,
  isNewDocument,
  triggerValidation,
  unregister,
  languages,
  isLoadingLanguages,
  settingsGetDocumentsType,
  documentType,
  isLoadingType,
  watch,
  postUploadClear,
  clearError
}) => {
  const types = useMemo(() => {
    const newArr = []

    if (documentType && Object.keys(documentType).length) {
      Object.keys(documentType).forEach(key => {
        const type = { ...documentType[key] }
        type.index = key
        newArr.push(type)
      })
    }

    return newArr
  }, [documentType])

  const typeWatcher = watch('data.type')

  useEffect(() => {
    if (typeWatcher && isNewDocument) {
      clearError()
      postUploadClear()
      const typeWidgets = types.find(type => type.index === typeWatcher)
      const widgets = getGroupWidgets(typeWidgets && typeWidgets.widgets)

      const newSources = values.sources.map(item => {
        return {
          ...item,
          data: destroyReferenceDependence(widgets)
        }
      })
      setValue('sources', newSources)
      setValue('widgetsOfCurrType', widgets)
      triggerValidation()
    }
  }, [typeWatcher])

  useEffect(() => {
    if (isNewDocument) {
      triggerValidation()
    }

    register({ name: 'data.language[0].text' })
    setValue('data.language[0].text', 'en')

    settingsGetDocumentsType()

    return () => unregister('data.language[0].text')
  }, [])

  const handleDeleteTitle = index => {
    if (values.data && values.data.title) {
      const currTitles = values.data.title.filter((item, indexItem) => indexItem !== index)
      const currLanguages = values.data.language.filter((item, indexItem) => indexItem !== index)

      unregister(`data.title[${currTitles.length}].text`)
      unregister(`data.title[${currTitles.length}]`)
      unregister(`data.language[${currLanguages.length}].text`)
      unregister(`data.language[${currLanguages.length}]`)

      setValue('data.title', [])
      setValue('data.language', [])

      currTitles.forEach((item, indexItem) => {
        setValue(`data.title[${indexItem}].text`, item.text)
        setValue(`data.language[${indexItem}].text`, currLanguages[indexItem].text)
      })
    }
  }

  const handleAddTitle = () => {
    const currTitles = values && values.data && values.data.title && [...values.data.title]
    const currLanguages = values && values.data && values.data.language && [...values.data.language]

    currTitles.push({ text: '' })
    currLanguages.push({ text: '' })

    register({ name: `data.title[${currTitles.length - 1}]` })
    register({ name: `data.language[${currLanguages.length - 1}]` })

    setValue('data.title', [...currTitles])
    setValue('data.language', [...currLanguages])
  }

  return (
    <ProductEditWidgetWrapper headerText={intl.get('documents.documentsLabel')}>
      <Form.Item label={intl.get('documents.form.title', { language: intl.get('documents.form.english') })}>
        <RHFInput
          as={<Input size='large' />}
          rules={{ required: intl.get('todo.cards.form.required') }}
          name='data.title[0].text'
          register={register}
          unregister={unregister}
          setValue={setValue}
          defaultValue={values && values.data && values.data[0] && values.data.title[0].text}
          mode='onChange'
        />
        <Error errors={errors} destination='data.title[0].text' />
      </Form.Item>
      {!!(values && values.data && values.data.title && values.data.title.length) &&
        values.data.title.map((item, index) =>
          index !== 0 ? (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`item-${index}`}>
              <Form.Item label={intl.get('documents.form.language')}>
                <RHFInput
                  as={
                    <Select
                      size='large'
                      showSearch
                      loading={isLoadingLanguages}
                      getPopupContainer={trigger => trigger.parentNode}
                      placeholder={intl.get('todo.deliveries.form.selectLanguages')}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {languages && languages.length && !isLoadingLanguages
                        ? languages.map(language => (
                            <Option style={{ fontSize: 16 }} key={language.code} value={language[name]}>
                              {language[name]}
                            </Option>
                          ))
                        : null}
                    </Select>
                  }
                  name={`data.language[${index}].text`}
                  rules={{ required: intl.get('todo.cards.form.required') }}
                  register={register}
                  unregister={unregister}
                  setValue={setValue}
                  defaultValue={
                    values && values.data && values.data.language[index] && values.data.language[index].text
                  }
                  mode='onChange'
                />
                <Error errors={errors} destination={`data.language[${index}].text`} />
              </Form.Item>
              <Form.Item
                label={intl.get('documents.form.title', {
                  language: values && values.data && values.data.language[index] && values.data.language[index].text
                })}
              >
                <ST.TitleFieldWrapper>
                  <RHFInput
                    as={<Input size='large' />}
                    rules={{ required: intl.get('todo.cards.form.required') }}
                    name={`data.title[${index}].text`}
                    register={register}
                    unregister={unregister}
                    setValue={setValue}
                    defaultValue={values && values.data && values.data.title[index] && values.data.title[index].text}
                    mode='onChange'
                  />
                  <IconButton
                    type='Delete'
                    popText={intl.get('documents.form.deleteTitle')}
                    actionFunction={() => handleDeleteTitle(index)}
                  />
                </ST.TitleFieldWrapper>
                <Error errors={errors} destination={`data.title[${index}].text`} />
              </Form.Item>
            </div>
          ) : null
        )}
      <ST.ButtonWrapper>
        <Button type='danger' onClick={handleAddTitle}>
          {intl.get('documents.form.addLanguage')}
        </Button>
      </ST.ButtonWrapper>
      <Form.Item label={intl.get('documents.form.type')}>
        <RHFInput
          as={
            <Select
              size='large'
              showSearch
              disabled={!isNewDocument}
              loading={isLoadingType}
              getPopupContainer={trigger => trigger.parentNode}
              placeholder={intl.get('documents.form.type')}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {types && types.length && !isLoadingType
                ? types.map(type => (
                    <Option style={{ fontSize: 16 }} key={type.name} value={type.index}>
                      {type.name}
                    </Option>
                  ))
                : null}
            </Select>
          }
          name='data.type'
          rules={{ required: intl.get('todo.cards.form.required') }}
          register={register}
          unregister={unregister}
          setValue={setValue}
          value={values && values.data && values.data.type}
          defaultValue={values && values.data && values.data.type}
          mode='onChange'
        />
        <Error errors={errors} destination='data.type' />
      </Form.Item>
    </ProductEditWidgetWrapper>
  )
}

ProductEditInfoWidget.propTypes = {
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  isNewDocument: PropTypes.bool,
  triggerValidation: PropTypes.func.isRequired,
  unregister: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.object),
  isLoadingLanguages: PropTypes.bool,
  settingsGetDocumentsType: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  documentType: PropTypes.object,
  isLoadingType: PropTypes.bool,
  watch: PropTypes.func.isRequired,
  postUploadClear: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
}

ProductEditInfoWidget.defaultProps = {
  errors: null,
  values: null,
  isNewDocument: true,
  languages: null,
  isLoadingLanguages: false,
  documentType: null,
  isLoadingType: false
}

export default ProductEditInfoWidget

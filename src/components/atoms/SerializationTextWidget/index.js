import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import intl from 'react-intl-universal'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import Error from '../Error'
import IconButton from '../../molecules/IconButton'
import { FieldsWrapper, IconWrapper } from './styles'

const SerializationTextWidget = ({ setValue, values, index, clearError, setError, errors, deleteWidget }) => {
  const currWidget = useMemo(() => {
    return values && values.source && values.source.data && values.source.data[index].text
  }, [values, index])

  const handleTextChange = (value, field) => {
    const newValues = { ...values.source }
    newValues.data[index].text[field] = value
    setValue('source', newValues)
  }

  useEffect(() => {
    if (currWidget && !currWidget.title) {
      setError(`source[${index}].title`, 'notMatch', intl.get('validation.requiredField'))
    }
    if (currWidget && !currWidget.text) {
      setError(`source[${index}].text`, 'notMatch', intl.get('validation.requiredField'))
    }
  })

  return (
    <ProductEditWidgetWrapper
      headerText={intl.get('widgets.text.title')}
      smallSize
      maxWidth='100%'
      HeaderPanel={() =>
        index > 0 && (
          <IconWrapper>
            <IconButton
              type='Delete'
              popText={intl.get('widgets.text.delete')}
              actionFunction={() => {
                clearError(`source[${index}].title`)
                clearError(`source[${index}].text`)
                deleteWidget(index)
              }}
            />
          </IconWrapper>
        )
      }
    >
      <FieldsWrapper>
        <div>
          <Form.Item label={intl.get('widgets.text.title')}>
            <Input
              size='large'
              value={currWidget && currWidget.title}
              onChange={e => {
                clearError(`source[${index}].title`)
                const { value } = e.target
                handleTextChange(value, 'title')
                if (value.trim() === '') {
                  setError(`source[${index}].title`, 'notMatch', intl.get('validation.requiredField'))
                }
              }}
            />
          </Form.Item>
          <Error errors={errors} destination={`source[${index}].title`} />
        </div>
        <div>
          <Form.Item label={intl.get('widgets.images.content')}>
            <Input
              size='large'
              value={currWidget && currWidget.text}
              onChange={e => {
                clearError(`source[${index}].text`)
                const { value } = e.target
                handleTextChange(value, 'text')
                if (value.trim() === '') {
                  setError(`source[${index}].text`, 'notMatch', intl.get('validation.requiredField'))
                }
              }}
            />
          </Form.Item>
          <Error errors={errors} destination={`source[${index}].text`} />
        </div>
      </FieldsWrapper>
    </ProductEditWidgetWrapper>
  )
}

SerializationTextWidget.propTypes = {
  setValue: PropTypes.func.isRequired
}

export default SerializationTextWidget

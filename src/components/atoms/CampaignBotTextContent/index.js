import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { RHFInput } from 'react-hook-form-input'
import { Form, Input } from 'antd'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import 'image-manipulation'
import Error from '../Error'
import WidgetRemaining from '../WidgetRemaining'

const CONTENT_LENGTH = 500

const CampaignBotTextContent = ({ setValue, register, errors, index, id, values, handleDelete }) => {
  const remainingContentValue = useMemo(() => {
    return (
      CONTENT_LENGTH -
      ((values &&
        values.textScans &&
        values.textScans[index] &&
        values.textScans[index].content &&
        values.textScans[index].content.length) ||
        0)
    )
  }, [values])

  return (
    <ProductEditWidgetWrapper
      handleDelete={handleDelete}
      index={index}
      isHaveDeleteIcon
      headerText={intl.get('campaigns.bot.form.scanValue', { value: index + 1 })}
      id={id}
    >
      <Form.Item label={intl.get('campaigns.bot.form.textTitle')}>
        <RHFInput
          as={<Input size='large' placeholder={intl.get('campaigns.bot.form.textTitlePlaceholder')} />}
          name={`textScans[${index}].title`}
          rules={{ required: intl.get('todo.cards.form.required') }}
          register={register}
          setValue={setValue}
          defaultValue={values && values.textScans && values.textScans[index] && values.textScans[index].title}
          mode='onChange'
        />
        <Error errors={errors} destination={`textScans[${index}].title`} />
      </Form.Item>
      <Form.Item label={intl.get('campaigns.bot.form.contentTitle')}>
        <WidgetRemaining value={remainingContentValue} />
        <RHFInput
          as={<Input size='large' placeholder={intl.get('campaigns.bot.form.textBodyPlaceholder')} />}
          name={`textScans[${index}].content`}
          rules={{ required: intl.get('todo.cards.form.required') }}
          register={register}
          setValue={setValue}
          onKeyPress={event => {
            if (event.target && event.target.value && event.target.value.length >= CONTENT_LENGTH) {
              event.stopPropagation()
              event.preventDefault()
            }
          }}
          defaultValue={values && values.textScans && values.textScans[index] && values.textScans[index].content}
          mode='onChange'
        />
        <Error errors={errors} destination={`textScans[${index}].content`} />
      </Form.Item>
    </ProductEditWidgetWrapper>
  )
}

CampaignBotTextContent.propTypes = {
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  errors: PropTypes.object,
  register: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  handleDelete: PropTypes.func.isRequired
}

CampaignBotTextContent.defaultProps = {
  errors: {},
  values: null
}

export default CampaignBotTextContent

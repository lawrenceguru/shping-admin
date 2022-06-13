import React, { useEffect, useMemo } from 'react'
import { RHFInput } from 'react-hook-form-input'
import { Form, Input } from 'antd'
import intl from 'react-intl-universal'
import { isNil } from 'lodash'
import PropTypes from 'prop-types'
import WidgetRemaining from '../../../atoms/WidgetRemaining'
import Error from '../../../atoms/Error'
import Wrapper from './styles'
import { checkValueLength } from '../../../../utils/validation'

const TITLE_LENGTH = 100

const Textbox = ({ errors, values, register, setValue, activeStepIndex, field, unregister, clearError }) => {
  useEffect(() => {
    if (!isNil(activeStepIndex)) {
      Object.keys(values && values.steps && values.steps[activeStepIndex]).forEach(el => {
        setValue(`${field}.${el}`, values.steps[activeStepIndex][el])
      })
    }

    return () => {
      clearError()
    }
  }, [])

  const activeField = useMemo(() => {
    return isNil(activeStepIndex) ? values[field] : values && values.steps && values.steps[activeStepIndex]
  }, [activeStepIndex, field, values])

  const remainingTitleValue = useMemo(() => {
    return TITLE_LENGTH - ((values && values[field] && values[field].title && values[field].title.length) || 0)
  }, [values, field])

  return (
    <Wrapper>
      <Form.Item label={intl.get('todo.cards.stepsSettings.title')}>
        <WidgetRemaining value={remainingTitleValue} />
        <RHFInput
          as={<Input size='large' placeholder={intl.get('todo.cards.stepsSettings.title')} />}
          name={`${field}.title`}
          rules={{
            required: intl.get('todo.cards.form.required'),
            maxLength: {
              value: 100,
              message: intl.get('todo.cards.stepsSettings.maxLengthErrorMessage', {
                type: intl.get('todo.cards.stepsSettings.title')
              })
            }
          }}
          register={register}
          defaultValue={activeField && activeField.title}
          setValue={setValue}
          unregister={unregister}
          mode='onChange'
          onKeyPress={event => {
            checkValueLength(event, TITLE_LENGTH)
          }}
        />
        <Error errors={errors} destination={`${field}.title`} />
      </Form.Item>
    </Wrapper>
  )
}

Textbox.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  activeStepIndex: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  field: PropTypes.string,
  unregister: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
}

Textbox.defaultProps = {
  values: {},
  errors: {},
  activeStepIndex: null,
  field: null
}

export default Textbox

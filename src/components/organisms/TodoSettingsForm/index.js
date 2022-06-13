import React, { useEffect, useMemo } from 'react'
import { RHFInput } from 'react-hook-form-input'
import intl from 'react-intl-universal'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import WidgetRemaining from '../../atoms/WidgetRemaining'
import Error from '../../atoms/Error'
import { StyledForm, FieldsWrapper, SwitchWrapper, ConditionsWrapper, Wrapper } from './styles'
import IconList from '../IconList'
import UploadImg from '../../atoms/UploadImg'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import SwitchOption from '../../atoms/SwitchOption'
import SettingsSummary from '../TodoSettingsSummary'
import { checkValueLength } from '../../../utils/validation'

const { TextArea } = Input
const competitions = ['prize', 'terms_conds', 'eligibility']

const SettingsForm = ({ setValue, setError, register, errors, values, setIsSubmit, triggerValidation, clearError }) => {
  useEffect(() => {
    register({ name: 'icon', type: 'custom' }, { required: intl.get('todo.cards.form.required') })
    register({ name: 'promo_image' })
  }, [register])

  const remainingNameFieldValue = useMemo(() => {
    return 100 - ((values && values.name && values.name.length) || 0)
  }, [values.name])

  const remainingDescriptionFieldValue = useMemo(() => {
    return 500 - ((values && values.description && values.description.length) || 0)
  }, [values.description])

  const remainingCompetitionSize = useMemo(() => {
    if (values && values.competition) {
      const keys = Object.keys(values.competition)
      const remainingSizes = {}
      keys.forEach(key => {
        remainingSizes[key] = 250 - ((values.competition[key] && values.competition[key].length) || 0)
      })
      return remainingSizes
    }
    return {}
  }, [values.competition])

  useEffect(() => {
    if (!values.competition_toggle && values.competition) {
      Object.keys(values.competition).forEach(key => {
        clearError(`competition.${key}`)
      })
      clearError('promo_image')
    }
  }, [values.competition_toggle])

  useEffect(() => {
    setIsSubmit({
      call: () =>
        new Promise(resolve => {
          triggerValidation().then(isValidate => {
            resolve(isValidate)
          })
        })
    })
  }, [triggerValidation, values])

  useEffect(() => {
    if (values.competition_toggle && !values.competition.prize) {
      setError('competition.prize', 'required', intl.get('todo.cards.form.required'))
    }
  }, [values.competition, values.competition_toggle])

  useEffect(() => {
    if (values.competition_toggle && !values.competition.terms_conds) {
      setError('competition.terms_conds', 'required', intl.get('todo.cards.form.required'))
    }
  }, [values.competition, values.competition_toggle])

  useEffect(() => {
    if (values.competition_toggle && !values.competition.eligibility) {
      setError('competition.eligibility', 'required', intl.get('todo.cards.form.required'))
    }
  }, [values.competition, values.competition_toggle])

  useEffect(() => {
    if (values.competition_toggle && !values.promo_image) {
      setError('promo_image', 'required', intl.get('todo.cards.form.required'))
    }
  }, [values.promo_image, values.competition_toggle])

  return (
    <Wrapper>
      <StyledForm>
        <Form.Item label={intl.get('todo.cards.form.nameField.name')}>
          <WidgetRemaining value={remainingNameFieldValue} />
          <RHFInput
            as={<Input size='large' placeholder={intl.get('todo.cards.form.nameField.placeholder')} />}
            name='name'
            rules={{
              required: intl.get('todo.cards.form.required'),
              minLength: { value: 3, message: intl.get('todo.cards.form.nameField.minLengthErrorMessage') },
              maxLength: { value: 100, message: intl.get('todo.cards.form.nameField.maxLengthErrorMessage') }
            }}
            register={register}
            setValue={setValue}
            defaultValue={values.name}
            mode='onChange'
            onKeyPress={event => {
              checkValueLength(event, 100)
            }}
          />
          <Error errors={errors} destination='name' />
        </Form.Item>
        <Form.Item label={intl.get('todo.cards.form.iconField.name')}>
          <IconList
            setValue={setValue}
            name='icon'
            clearError={clearError}
            titleUpload={intl.get('todo.cards.form.iconField.title')}
            defaultValue={values.icon}
          />
          <Error errors={errors} destination='icon' />
        </Form.Item>
        <Form.Item label={intl.get('todo.cards.form.promoImageField.name')}>
          <UploadImg
            setValue={setValue}
            name='promo_image'
            description={intl.get('todo.cards.form.promoImageField.description')}
            titleUpload={intl.get('todo.cards.form.promoImageField.title')}
            active={!!values.promo_image}
            clearError={clearError}
            defaultValue={values.promo_image}
          />
          <Error errors={errors} destination='promo_image' />
        </Form.Item>
        <Form.Item label={intl.get('todo.cards.form.descriptionField.name')}>
          <WidgetRemaining value={remainingDescriptionFieldValue} />
          <RHFInput
            as={
              <TextArea size='large' rows={4} placeholder={intl.get('todo.cards.form.descriptionField.placeholder')} />
            }
            name='description'
            rules={{
              required: intl.get('todo.cards.form.required'),
              minLength: { value: 3, message: intl.get('todo.cards.form.descriptionField.minLengthErrorMessage') },
              maxLength: { value: 500, message: intl.get('todo.cards.form.descriptionField.maxLengthErrorMessage') }
            }}
            register={register}
            setValue={setValue}
            defaultValue={values.description}
            mode='onChange'
            onKeyPress={event => {
              checkValueLength(event, 500)
            }}
          />
          <Error errors={errors} destination='description' />
        </Form.Item>
        <Form.Item label={intl.get('todo.cards.form.coinsField.name')}>
          <FieldsWrapper>
            <RHFInput
              as={<CustomInputNumber size='large' placeholder={intl.get('todo.cards.form.coinsField.placeholder')} />}
              name='result.coins'
              rules={{
                validate: {
                  minValue: value =>
                    value
                      ? parseInt(value, 10) > 0 || intl.get('todo.cards.form.coinsField.minValueErrorMessage')
                      : true
                }
              }}
              register={register}
              setValue={setValue}
              defaultValue={values.result && values.result.coins}
              mode='onChange'
            />
            <RHFInput
              as={
                <SwitchOption
                  text={intl.get('todo.cards.form.coinsField.autoApprove.name')}
                  checked={values.auto_approve}
                />
              }
              name='auto_approve'
              register={register}
              setValue={setValue}
              defaultValue={values.auto_approve}
            />
          </FieldsWrapper>
          <Error errors={errors} destination='result.coins' />
        </Form.Item>
        <Form.Item>
          <SwitchWrapper>
            <RHFInput
              as={
                <SwitchOption
                  text={intl.get('todo.cards.form.competition.toggleField.name')}
                  checked={!!values.competition_toggle}
                />
              }
              name='competition_toggle'
              register={register}
              setValue={setValue}
              defaultValue={values.competition_toggle}
            />
          </SwitchWrapper>
          <Error errors={errors} destination='competition_toggle' />
        </Form.Item>
        <ConditionsWrapper isVisible={values.competition_toggle}>
          {competitions.map(item => {
            return (
              <Form.Item key={item}>
                <WidgetRemaining value={remainingCompetitionSize[item]} />
                <RHFInput
                  as={<Input size='large' placeholder={intl.get(`todo.cards.form.competition.${item}.placeholder`)} />}
                  name={`competition.${item}`}
                  rules={{
                    maxLength: {
                      value: 250,
                      message: intl.get(`todo.cards.form.competition.${item}.maxLengthErrorMessage`)
                    }
                  }}
                  register={register}
                  setValue={setValue}
                  mode='onChange'
                  defaultValue={values.competition && values.competition[item]}
                  onKeyPress={event => {
                    checkValueLength(event, 250)
                  }}
                />
                <Error errors={errors} destination={`competition.${item}`} />
              </Form.Item>
            )
          })}
        </ConditionsWrapper>
      </StyledForm>
      <SettingsSummary values={values} />
    </Wrapper>
  )
}

SettingsForm.propTypes = {
  clearError: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}

export default SettingsForm

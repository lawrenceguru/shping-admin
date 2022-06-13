/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import intl from 'react-intl-universal'
import { RHFInput } from 'react-hook-form-input'
import { Form, Input } from 'antd'
import { ChromePicker } from 'react-color'
import { toast } from 'react-toastify'
import * as ST from './styles'
import Error from '../../atoms/Error'
import AddImageWidget from '../../atoms/AddImageWidget'
import Button from '../../atoms/Button'
import Loader from '../../templates/Loader'

const initialValues = {
  name: '',
  bgcolor: '#FFFFFF',
  image_big: null,
  image_small: null
}

const StoreCardEditor = ({
  match,
  countryCards,
  history,
  isSuccessUpdate,
  isUpdatingCards,
  storeCardsFormCountryCards
}) => {
  const cardId = useMemo(() => {
    return (match && match.params && match.params.card) || null
  }, [match])
  const countryId = useMemo(() => {
    return (match && match.params && match.params.id) || null
  }, [match])
  const initialState = useMemo(() => {
    if (cardId && countryCards && countryCards.length) {
      return countryCards.find(element => element.id === cardId)
    }
    return initialValues
  }, [cardId, countryCards])

  const { watch, register, setValue, errors, setError, clearError, getValues, triggerValidation, unregister } = useForm(
    {
      defaultValues: JSON.parse(JSON.stringify(initialState))
    }
  )

  const all = watch()
  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [all])

  useEffect(() => {
    register({ name: 'bgcolor' })
  }, [])

  useEffect(() => {
    if (isSuccessUpdate) {
      history.push(`/admin/store-cards/configuration/${countryId}/list`)
    }
  }, [isSuccessUpdate])

  useEffect(() => {
    if (cardId && countryCards && countryCards.length) {
      const countryCard = countryCards.find(element => element.id === cardId)
      Object.keys(countryCard).forEach(key => {
        if (['image_big', 'image_small'].includes(key)) {
          register({ name: key })
          setValue(key, countryCard[key].urls)
        } else {
          register({ name: key })
          setValue(key, countryCard[key])
        }
      })
    }
  }, [cardId])

  const handleCancel = useCallback(() => {
    history.push(`/admin/store-cards/configuration/${countryId}/list`)
  }, [history, countryId])

  const handleFinish = useCallback(() => {
    triggerValidation().then(isValid => {
      if (isValid) {
        storeCardsFormCountryCards({
          ...values,
          id: cardId,
          countryId
        })
      } else {
        toast.error('Validation failed!')
      }
    })
  }, [values, cardId, countryId])

  return (
    <ST.Wrapper>
      {isUpdatingCards ? (
        <Loader />
      ) : (
        <>
          <ST.StyledForm>
            <Form.Item label={intl.get('storecards.form.nameHeader')}>
              <RHFInput
                as={<Input size='large' placeholder={intl.get('todo.cards.form.nameField.placeholder')} />}
                name='name'
                rules={{
                  required: intl.get('todo.cards.form.required')
                }}
                register={register}
                unregister={unregister}
                setValue={setValue}
                defaultValue={values && values.name}
                mode='onChange'
              />
              <Error errors={errors} destination='name' />
            </Form.Item>
            <Form.Item label={intl.get('storecards.form.colorHeader')}>
              <ChromePicker
                color={values && values.bgcolor}
                onChange={value => setValue('bgcolor', value.hex)}
                disableAlpha
              />
              <Error errors={errors} destination='bgcolor' />
            </Form.Item>
          </ST.StyledForm>
          {['image_big', 'image_small'].map(item => (
            <AddImageWidget
              key={item}
              setValue={setValue}
              clearError={clearError}
              name={item}
              values={values}
              errors={errors}
              setError={setError}
              register={register}
              headerText={intl.get(`storecards.form.${item}`)}
            />
          ))}
          <ST.ButtonsWrapper>
            <div>
              <Button size='large' onClick={handleCancel}>
                {intl.get('cancel')}
              </Button>
              <Button type='danger' size='large' onClick={handleFinish}>
                {intl.get('serializationTasks.serializationStep.finish')}
              </Button>
            </div>
          </ST.ButtonsWrapper>
        </>
      )}
    </ST.Wrapper>
  )
}

StoreCardEditor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  countryCards: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  isSuccessUpdate: PropTypes.bool,
  isUpdatingCards: PropTypes.bool,
  storeCardsFormCountryCards: PropTypes.func.isRequired
}

StoreCardEditor.defaultProps = {
  countryCards: null,
  isSuccessUpdate: false,
  isUpdatingCards: false
}

export default StoreCardEditor

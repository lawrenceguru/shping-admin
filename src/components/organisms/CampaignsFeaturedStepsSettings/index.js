import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import Form from '../Form'
import { fields } from './consts'

const CampaignsFeaturedStepsSettings = ({
  values,
  unregister,
  setValue,
  register,
  errors,
  setError,
  clearError,
  setIsSubmit,
  triggerValidation,
  watch
}) => {
  const dates = watch('dates')
  const time = watch('run_time')
  const products = watch('products')

  const validation = useCallback((value, name) => {
    if (typeof value === 'object' ? !!(value && value.length) : !!value) {
      clearError(name)
    }
  }, [])

  useEffect(() => {
    register({ name: 'status' })
    setValue('status', 'inactive')
  }, [])

  useEffect(() => {
    validation(dates, 'dates')
  }, [dates])

  useEffect(() => {
    validation(products, 'products')
  }, [products])

  useEffect(() => {
    validation(time, 'run_time')
  }, [time])
  return (
    <Form
      values={values}
      setValue={setValue}
      register={register}
      errors={errors}
      setError={setError}
      clearError={clearError}
      setIsSubmit={setIsSubmit}
      triggerValidation={triggerValidation}
      unregister={unregister}
      fields={fields}
    />
  )
}

CampaignsFeaturedStepsSettings.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  unregister: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired
}

CampaignsFeaturedStepsSettings.defaultProps = {
  values: null,
  errors: null
}

export default CampaignsFeaturedStepsSettings

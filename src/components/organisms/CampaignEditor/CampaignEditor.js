import React, { useMemo, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import { withRouter } from 'react-router-dom'
import * as ST from './styles'
import Loader from '../../templates/Loader'
import TodoStepForm from '../TodoStepForm'
import { name } from '../../../utils/consts'
import { getValesFromArray } from '../../../utils/settings'

const CampaignEditor = ({
  history,
  match,
  isLoading,
  updated,
  campaigns,
  postCampaign,
  putCampaign,
  settingsGetCountries,
  settingsGetLanguages,
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages,
  initialValues,
  Summary,
  steps,
  redirectLink,
  generateRequest,
  getDataFromCampaign,
  formObjectFields
}) => {
  const {
    watch,
    register,
    setValue,
    errors,
    setError,
    clearError,
    getValues,
    triggerValidation,
    unregister,
    reset
  } = useForm({
    defaultValues: JSON.parse(JSON.stringify(initialValues))
  })
  const editId = useMemo(() => {
    return match && match.params && match.params.id
  }, [match])
  const editCampaign = useMemo(() => {
    return editId && campaigns && campaigns.length ? campaigns.find(item => item.id === editId) : null
  }, [campaigns, editId])

  const [editCountries, setEditCountries] = useState([])
  const [editLanguages, setEditLanguages] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const all = watch()
  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [all])

  useEffect(() => {
    if ((!countries || !countries.length) && !isLoadingCountries) {
      settingsGetCountries()
    }

    if ((!languages || !languages.length) && !isLoadingLanguages) {
      settingsGetLanguages()
    }
  }, [])

  useEffect(() => {
    if (editId && editCampaign !== null) {
      const res = { ...initialValues, ...getDataFromCampaign(editCampaign) }

      Object.keys(res).forEach(key => {
        if (key !== 'audience' && !formObjectFields.includes(key)) {
          register({ name: key })
          setValue(key, res[key])
        }
      })

      if (res.audience) {
        setEditCountries(res.audience.countries || [])
        setEditLanguages(res.audience.languages || [])
        Object.keys(res.audience).forEach(key => {
          if (key !== 'countries' && key !== 'languages') {
            register({ name: `audience.${key}` })
            setValue(`audience.${key}`, res.audience[key])
          }
        })
      }

      if (formObjectFields && formObjectFields.length) {
        formObjectFields.forEach(item => {
          Object.keys(res[item]).forEach(key => {
            register({ name: `buddy_invites.${key}` })
            setValue(`buddy_invites.${key}`, res[item][key])
          })
        })
      }
    }
    if (editId && editCampaign == null) {
      history.push(redirectLink)
    }
  }, [editId])

  useEffect(() => {
    if (updated) {
      history.push(redirectLink)
    }
  }, [updated])

  useEffect(() => {
    if (countries && countries.length && editCountries && editCountries.length) {
      const result = getValesFromArray(editCountries, countries, 'iso', name)

      register({ name: 'audience.countries' })
      setValue('audience.countries', result)

      setEditCountries([])
    }
  }, [countries, editCountries])

  useEffect(() => {
    if (languages && languages.length && editLanguages && editLanguages.length) {
      register({ name: 'audience.languages' })
      setValue('audience.languages', editLanguages)

      setEditLanguages([])
    }
  }, [languages, editLanguages])
  const [antdData, setAntdData] = useState()
  const onSubmit = useCallback(() => {
    triggerValidation().then(isValid => {
      if (isValid) {
        const data = { ...values, ...values.audience }

        if (data.countries && data.countries.length === 0) {
          delete data.countries
        } else {
          const isoCountries = getValesFromArray(data.countries, countries, name, 'iso')
          data.countries = [...isoCountries]
        }

        if (data.languages && data.languages.length === 0) {
          delete data.languages
        } else {
          const codeLanguages = getValesFromArray(data.languages, languages, name, 'code')
          data.languages = [...codeLanguages]
        }

        const newRequest = { ...data, ...antdData }
        const request = generateRequest(newRequest)
        if (editId) {
          putCampaign({ id: editId, request })
        } else {
          postCampaign(request)
        }
      }
    })
  }, [values, editId])

  return (
    <ST.Wrapper>
      {isLoading || updated ? (
        <Loader />
      ) : (
        <>
          <TodoStepForm
            steps={steps}
            register={register}
            setValue={setValue}
            antdData={antdData}
            setAntdData={setAntdData}
            errors={errors}
            setError={setError}
            clearError={clearError}
            triggerValidation={triggerValidation}
            unregister={unregister}
            reset={reset}
            finalStepIndex={steps.length - 1}
            values={values}
            watch={watch}
            redirectLink={redirectLink}
            getCurrStep={setCurrentStep}
            isHaveNotAllProductsOption
            createTask={onSubmit}
          />
          {currentStep !== 2 && (
            <ST.PreviewWrapper>
              <Summary values={values} />
            </ST.PreviewWrapper>
          )}
        </>
      )}
    </ST.Wrapper>
  )
}

CampaignEditor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  updated: PropTypes.bool,
  campaigns: PropTypes.arrayOf(PropTypes.object),
  languages: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingLanguages: PropTypes.bool,
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  postCampaign: PropTypes.func.isRequired,
  putCampaign: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object,
  Summary: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  redirectLink: PropTypes.string.isRequired,
  generateRequest: PropTypes.func.isRequired,
  getDataFromCampaign: PropTypes.func.isRequired,
  formObjectFields: PropTypes.arrayOf(PropTypes.string)
}

CampaignEditor.defaultProps = {
  isLoading: false,
  updated: false,
  campaigns: null,
  isLoadingLanguages: false,
  isLoadingCountries: false,
  languages: [],
  countries: [],
  initialValues: null,
  formObjectFields: []
}

export default withRouter(CampaignEditor)

import React, { useMemo, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import * as ST from './styles'
import Loader from '../../templates/Loader'
import TodoStepForm from '../../organisms/TodoStepForm'
import { stepperCampaignBoost } from '../../../utils/steps'
import CampaignsBoostSummary from '../../organisms/CampaignsBoostSummary'
import { getValesFromArray } from '../../../utils/settings'
import { name } from '../../../utils/consts'
import { generateBoostRequest, getDataFromBoost } from '../../../utils/boost'

const initialValues = {
  name: '',
  start_date: null,
  end_date: null,
  stop_date: null,
  limit: null,
  method: 'invite',
  period_min: null,
  first_scan: false,
  level: undefined,
  buddy_invites: {
    first: 'bronze',
    first_period: 'scan',
    if_max_level: 'none',
    max_repeat: 'none',
    repeat: 'none',
    repeat_period: 'last_date'
  },
  audience: {
    countries: [],
    languages: [],
    gender: 'any',
    ageRange: []
  },
  products: []
}

const CampaignBoostEditor = ({
  history,
  match,
  isLoadingBoosts,
  updatedBoosts,
  boosts,
  rewardsPostCampaignBoost,
  rewardsPutCampaignBoost,
  settingsGetCountries,
  settingsGetLanguages,
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages
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
  const editBoost = useMemo(() => {
    return editId && boosts && boosts.length ? boosts.find(item => item.id === editId) : null
  }, [boosts, editId])
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
    if (editId && editBoost) {
      const res = { ...initialValues, ...getDataFromBoost(editBoost) }
      Object.keys(res).forEach(key => {
        if (key !== 'audience' && key !== 'buddy_invites') {
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

      if (res.buddy_invites) {
        Object.keys(res.buddy_invites).forEach(key => {
          register({ name: `buddy_invites.${key}` })
          setValue(`buddy_invites.${key}`, res.buddy_invites[key])
        })
      }
    }
    // if (editId && !editBoost) {
    //   history.push('/admin/campaigns/boost')
    // }
  }, [editId])

  useEffect(() => {
    if (updatedBoosts) {
      history.push('/admin/campaigns/boost')
    }
  }, [updatedBoosts])

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
        const request = generateBoostRequest(newRequest)

        if (editId) {
          rewardsPutCampaignBoost({ id: editId, request })
        } else {
          rewardsPostCampaignBoost(request)
        }
      }
    })
  }, [values, editId])

  return (
    <ST.Wrapper>
      {isLoadingBoosts || updatedBoosts ? (
        <Loader />
      ) : (
        <>
          <TodoStepForm
            steps={stepperCampaignBoost}
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
            finalStepIndex={2}
            values={values}
            watch={watch}
            redirectLink='/admin/campaigns/boost'
            getCurrStep={setCurrentStep}
            isHaveNotAllProductsOption
            createTask={onSubmit}
          />
          {currentStep !== 2 && (
            <ST.PreviewWrapper>
              <CampaignsBoostSummary values={values} />
            </ST.PreviewWrapper>
          )}
        </>
      )}
    </ST.Wrapper>
  )
}

CampaignBoostEditor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  isLoadingBoosts: PropTypes.bool,
  updatedBoosts: PropTypes.bool,
  boosts: PropTypes.arrayOf(PropTypes.object),
  languages: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingLanguages: PropTypes.bool,
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  rewardsPostCampaignBoost: PropTypes.func.isRequired,
  rewardsPutCampaignBoost: PropTypes.func.isRequired
}

CampaignBoostEditor.defaultProps = {
  isLoadingBoosts: false,
  updatedBoosts: false,
  boosts: null,
  isLoadingLanguages: false,
  isLoadingCountries: false,
  languages: [],
  countries: []
}

export default CampaignBoostEditor

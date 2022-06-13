import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useForm from 'react-hook-form'
import PropTypes from 'prop-types'
import moment from 'moment'
import * as ST from '../CampaignRewardsEditor/styles'
import Loader from '../../templates/Loader'
import TodoStepForm from '../../organisms/TodoStepForm'
import { stepperCampaignBotSteps } from '../../../utils/steps'
import CampaignsBotSummary from '../../organisms/CampaignsBotSummary'
import { getValesFromArray } from '../../../utils/settings'
import { name } from '../../../utils/consts'
import { generateCreateBotRequest, getBotsFormValues } from '../../../utils/bot'

const initialValues = {
  name: '',
  status: true,
  botTiming: 'immediately',
  start_date: moment().format('M/D/YYYY'),
  end_date: null,
  gender: 'any',
  audience: {
    countries: [],
    languages: [],
    ageRange: [],
    registration_methods: [],
    weekly_scans: { from: 0, to: 0 },
    scan_countries: [],
    scan_date: '',
    max_age: '',
    min_age: '',
    gender: 'any'
  },
  mediaScans: [],
  textScans: []
}

const CampaignShpingBotEditor = ({
  match,
  history,
  bots,
  isLoadingBot,
  updatedBot,
  rewardsUpdateCampaignBot,
  rewardsCreateCampaignBot,
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages,
  settingsGetCountries,
  settingsGetLanguages,
  rewardsClearSelectedDuplicatedCampaignBot,
  duplicateId
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
  const [currentStep, setCurrentStep] = useState(0)
  const all = watch()

  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [all])

  const editId = useMemo(() => {
    return match && match.params && match.params.id
  }, [match])

  const editBot = useMemo(() => {
    return (duplicateId || editId) && bots && bots.length
      ? bots.find(item => item.id === (duplicateId || editId))
      : null
  }, [bots, editId])

  const [editCountries, setEditCountries] = useState([])
  const [editLanguages, setEditLanguages] = useState([])
  const [editScanCountries, setEditScanCountries] = useState([])

  useEffect(() => {
    if ((!countries || !countries.length) && !isLoadingCountries) {
      settingsGetCountries()
    }

    if ((!languages || !languages.length) && !isLoadingLanguages) {
      settingsGetLanguages()
    }

    return () => rewardsClearSelectedDuplicatedCampaignBot()
  }, [])

  useEffect(() => {
    if (updatedBot) {
      history.push('/admin/campaigns/bot')
    }
  }, [updatedBot])

  useEffect(() => {
    if (countries && countries.length && editCountries && editCountries.length) {
      const result = getValesFromArray(editCountries, countries, 'iso', name)

      register({ name: 'audience.countries' })
      setValue('audience.countries', result)

      setEditCountries([])
    }
  }, [countries, editCountries])

  useEffect(() => {
    if (countries && countries.length && editScanCountries && editScanCountries.length) {
      register({ name: 'audience.scan_countries' })
      setValue('audience.scan_countries', editScanCountries)

      setEditScanCountries([])
    }
  }, [countries, editCountries])

  useEffect(() => {
    if (languages && languages.length && editLanguages && editLanguages.length) {
      register({ name: 'audience.languages' })
      setValue('audience.languages', editLanguages)

      setEditLanguages([])
    }
  }, [languages, editLanguages])

  useEffect(() => {
    if (editId || duplicateId) {
      const res = { ...initialValues, ...getBotsFormValues(editBot, duplicateId) }
      Object.keys(res).forEach(key => {
        if (key !== 'audience') {
          register({ name: key })
          console.log(key, res[key])
          setValue(key, res[key])
        }
      })

      if (res.audience) {
        setEditCountries(res.audience.countries || [])
        setEditLanguages(res.audience.languages || [])
        setEditScanCountries(res.audience.scan_countries || [])

        Object.keys(res.audience).forEach(key => {
          if (key === 'weekly_scans') {
            register({ name: `audience.${key}.from` })
            setValue(`audience.${key}.from`, res.audience.weekly_scans.from)

            register({ name: `audience.${key}.to` })
            setValue(`audience.${key}.to`, res.audience.weekly_scans.to)
          } else if (key !== 'countries' && key !== 'languages' && key !== 'scan_countries') {
            register({ name: `audience.${key}` })
            setValue(`audience.${key}`, res.audience[key])
          }
        })
      }
    }
  }, [editId, duplicateId])

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

        if (data.scan_countries && data.scan_countries.length === 0) {
          delete data.scan_countries
        } else {
          const isoCountries = getValesFromArray(data.scan_countries, countries, name, 'iso')
          data.scan_countries = [...isoCountries]
        }

        const request = { ...data, ...antdData }
        const newRequest = generateCreateBotRequest(request)
        if (editId) {
          rewardsUpdateCampaignBot({ id: editId, request: newRequest })
        } else {
          rewardsCreateCampaignBot(newRequest)
        }
      }
    })
  }, [values, editId])

  return (
    <ST.Wrapper>
      {isLoadingBot || updatedBot ? (
        <Loader />
      ) : (
        <>
          <TodoStepForm
            steps={stepperCampaignBotSteps}
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
            finalStepIndex={3}
            values={values}
            watch={watch}
            redirectLink='/admin/campaigns/bot'
            getCurrStep={setCurrentStep}
            createTask={onSubmit}
            isHaveNotAllProductsOption
          />
          {/* {currentStep === 0 && ( */}
          {console.log(currentStep)}
          <ST.PreviewWrapper>
            <CampaignsBotSummary values={values} watch={watch} />
          </ST.PreviewWrapper>
          {/* )} */}
        </>
      )}
    </ST.Wrapper>
  )
}

CampaignShpingBotEditor.propTypes = {
  isLoadingBot: PropTypes.bool,
  updatedBot: PropTypes.bool,
  rewardsCreateCampaignBot: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  bots: PropTypes.arrayOf(PropTypes.object),
  languages: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingLanguages: PropTypes.bool,
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  rewardsUpdateCampaignBot: PropTypes.func.isRequired,
  rewardsClearSelectedDuplicatedCampaignBot: PropTypes.func.isRequired,
  duplicateId: PropTypes.string
}

CampaignShpingBotEditor.defaultProps = {
  isLoadingBot: false,
  updatedBot: false,
  bots: [],
  isLoadingLanguages: false,
  isLoadingCountries: false,
  languages: [],
  countries: [],
  duplicateId: null
}

export default CampaignShpingBotEditor

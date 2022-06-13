import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useForm from 'react-hook-form'
import PropTypes from 'prop-types'
import moment from 'moment'
import intl from 'react-intl-universal'
import { toast } from 'react-toastify'
import * as ST from '../CampaignRewardsEditor/styles'
import Loader from '../../templates/Loader'
import TodoStepForm from '../../organisms/TodoStepForm'
import { stepperCampaignShoutoutsSteps } from '../../../utils/steps'
import CampaignsShoutoutsSummary from '../../organisms/CampaignsShoutoutsSummary'
import { getValesFromArray } from '../../../utils/settings'
import { name } from '../../../utils/consts'
import { generateCreateShoutoutRequest, getShoutoutsFormValues } from '../../../utils/shoutouts'

const initialValues = {
  name: '',
  status: true,
  shoutoutTiming: 'immediately',
  copy: '',
  delay: null,
  count: null,
  start_date: moment().format('M/D/YYYY'),
  end_date: null,
  audience: {
    countries: [],
    languages: [],
    gender: 'any',
    ageRange: [],
    user_level: ['basic'],
    // weekly_scans: { from: '', to: '', inverse: false },
    // brand_scans: { from: '', to: '', start_date: null, end_date: null, inverse: false },
    // scan_countries: [],
    // scan_countries_inverse: false,
    // scan_date: '',
    // scan_date_inverse: false,
    advanced: {
      weekly_scans: { from: '', to: '', inverse: false },
      brand_scans: { scans_from: '', scans_to: '', date_from: null, date_to: null, inverse: false },
      scan_countries: { list: [], inverse: false },
      last_scan_date: { from: '', to: '', inverse: false }
    },
    max_age: '',
    min_age: ''
  },
  products: []
}

const CampaignShoutoutsEdiotr = ({
  match,
  history,
  isLoadingShoutout,
  updatedShoutout,
  shoutouts,
  duplicateIdShoutout,
  rewardsUpdateCampaignShoutouts,
  rewardsCreateCampaignShoutouts,
  rewardsClearSelectedDuplicatedCampaignShoutout,
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages,
  settingsGetCountries,
  settingsGetLanguages
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

  const editShoutout = useMemo(() => {
    return (duplicateIdShoutout || editId) && shoutouts && shoutouts.length
      ? shoutouts.find(item => item.id === (duplicateIdShoutout || editId))
      : null
  }, [shoutouts, editId, duplicateIdShoutout])

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

    return () => rewardsClearSelectedDuplicatedCampaignShoutout()
  }, [])

  useEffect(() => {
    if (updatedShoutout) {
      history.push('/admin/campaigns/shoutouts')
    }
  }, [updatedShoutout])

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
      const result = getValesFromArray(editScanCountries, countries, 'iso', name)

      register({ name: 'audience.scan_countries' })
      setValue('audience.scan_countries', result)

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
    if (editId || duplicateIdShoutout) {
      const res = { ...initialValues, ...getShoutoutsFormValues(editShoutout, duplicateIdShoutout) }
      Object.keys(res).forEach(key => {
        if (key !== 'audience') {
          register({ name: key })
          setValue(key, res[key])
        }
      })

      if (res.audience) {
        setEditCountries(res.audience.countries || [])
        setEditLanguages(res.audience.languages || [])
        setEditScanCountries(res.audience.advanced.countries || [])

        Object.keys(res.audience).forEach(key => {
          if (key === 'weekly_scans') {
            register({ name: `audience.${key}.from` })
            setValue(`audience.${key}.from`, res.audience.weekly_scans.from)

            register({ name: `audience.${key}.to` })
            setValue(`audience.${key}.to`, res.audience.weekly_scans.to)

            register({ name: `audience.${key}.inverse` })
            setValue(`audience.${key}.inverse`, res.audience.brand_scans.inverse)
          } else if (key === 'brand_scans') {
            register({ name: `audience.${key}.from` })
            setValue(`audience.${key}.from`, res.audience.brand_scans.from)

            register({ name: `audience.${key}.to` })
            setValue(`audience.${key}.to`, res.audience.brand_scans.to)

            register({ name: `audience.${key}.start_date` })
            setValue(`audience.${key}.start_date`, res.audience.brand_scans.start_date)

            register({ name: `audience.${key}.end_date` })
            setValue(`audience.${key}.end_date`, res.audience.brand_scans.end_date)

            register({ name: `audience.${key}.inverse` })
            setValue(`audience.${key}.inverse`, res.audience.brand_scans.inverse)
          } else if (key !== 'countries' && key !== 'languages' && key !== 'scan_countries') {
            register({ name: `audience.${key}` })
            setValue(`audience.${key}`, res.audience[key])
          }
        })
      }
    }
  }, [editId, duplicateIdShoutout])
  const [antdData, setAntdData] = useState()
  const onSubmit = useCallback(() => {
    triggerValidation().then(isValid => {
      if (isValid) {
        const data = { ...values, ...values.audience }

        if (!data.products || !data.products.length) {
          toast.error(intl.get('campaigns.shoutouts.form.requiredProducts'))
          return
        }

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

        if (data.languages && data.languages.length === 0) {
          delete data.languages
        } else {
          const codeLanguages = getValesFromArray(data.languages, languages, name, 'code')
          data.languages = [...codeLanguages]
        }

        const antdAdvance = antdData.audience.advanced
        const autdLocations = { locations: antdData.locations }
        const reAudience = antdData.audience
        delete reAudience.advanced
        const comAudience = { ...reAudience, ...antdAdvance }
        const newRequest = { ...data, ...comAudience }
        const finalReq = { ...newRequest, ...autdLocations }
        const request = generateCreateShoutoutRequest(finalReq)
        if (editId) {
          rewardsUpdateCampaignShoutouts({ id: editId, request })
        } else {
          rewardsCreateCampaignShoutouts(request)
        }
      }
    })
  }, [values, editId])

  return (
    <ST.Wrapper>
      {isLoadingShoutout || updatedShoutout ? (
        <Loader />
      ) : (
        <>
          <TodoStepForm
            steps={stepperCampaignShoutoutsSteps}
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
            redirectLink='/admin/campaigns/shoutouts'
            getCurrStep={setCurrentStep}
            isHaveNotAllProductsOption
            createTask={onSubmit}
          />
          {currentStep !== 2 && (
            <ST.PreviewWrapper>
              <CampaignsShoutoutsSummary values={values} />
            </ST.PreviewWrapper>
          )}
        </>
      )}
    </ST.Wrapper>
  )
}

CampaignShoutoutsEdiotr.propTypes = {
  isLoadingShoutout: PropTypes.bool,
  updatedShoutout: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  shoutouts: PropTypes.arrayOf(PropTypes.object),
  duplicateIdShoutout: PropTypes.string,
  rewardsUpdateCampaignShoutouts: PropTypes.func.isRequired,
  rewardsCreateCampaignShoutouts: PropTypes.func.isRequired,
  rewardsClearSelectedDuplicatedCampaignShoutout: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingLanguages: PropTypes.bool,
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired
}

CampaignShoutoutsEdiotr.defaultProps = {
  isLoadingShoutout: false,
  updatedShoutout: false,
  isLoadingLanguages: false,
  isLoadingCountries: false,
  languages: [],
  countries: [],
  shoutouts: [],
  duplicateIdShoutout: null
}

export default CampaignShoutoutsEdiotr

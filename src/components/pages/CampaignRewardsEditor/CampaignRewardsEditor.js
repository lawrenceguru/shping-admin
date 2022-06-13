import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import useForm from 'react-hook-form'
import moment from 'moment'
import PropTypes from 'prop-types'
import TodoStepForm from '../../organisms/TodoStepForm'
import { stepperCampaignRewardsSteps } from '../../../utils/steps'
import * as ST from './styles'
import CampaignRewardsSummary from '../../organisms/CampaignsRewardsSummary'
import { generateCampaignRequest, getDataFromCampaign } from '../../../utils/campaign'
import { name } from '../../../utils/consts'
import { getValesFromArray } from '../../../utils/settings'
import Loader from '../../templates/Loader'

const initialValues = {
  name: '',
  action: '',
  points: null,
  campaignTime: 'immediately',
  start_date: moment().format('M/D/YYYY'),
  end_date: null,
  rewardAdjustmentActive: false,
  audience: {
    countries: [],
    languages: [],
    gender: 'any',
    ageRange: [],
    postcode: '',
    user_levels: ['basic'],
    min_age: 0,
    max_age: 0
  },
  adjustment: {
    result: null,
    coins_step: 1
  },
  location: false,
  condition: 'once',
  budget: {
    interval: 'day',
    per_interval: undefined,
    overall: undefined
  },
  allOptions: false,
  receipt_active: false,
  isHaveRestrictions: true,
  products: [],
  allProducts: false,
  spendings: null,
  partner_brand: false
}

const CampaignRewardsEditor = ({
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages,
  settingsGetCountries,
  settingsGetLanguages,
  rewardsPostCampaign,
  isLoading,
  updated,
  history,
  match,
  campaigns,
  rewardsPutCampaign,
  todoClearConvertedBudget,
  duplicateIdCampaign,
  rewardsClearSelectedDuplicatedCampaign
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
    return duplicateIdCampaign || (match && match.params && match.params.id)
  }, [match])
  const editCampaign = useMemo(() => {
    return editId && campaigns && campaigns.length ? campaigns.find(item => item.id === editId) : null
  }, [campaigns, editId])
  useEffect(() => {
    if ((!countries || !countries.length) && !isLoadingCountries) {
      settingsGetCountries()
    }

    if ((!languages || !languages.length) && !isLoadingLanguages) {
      settingsGetLanguages()
    }

    return () => {
      todoClearConvertedBudget()
      rewardsClearSelectedDuplicatedCampaign()
    }
  }, [])
  useEffect(() => {
    if (editId && editCampaign !== null) {
      const res = { ...initialValues, ...getDataFromCampaign(editCampaign) }
      Object.keys(res).forEach(key => {
        if (key !== 'audience' && key !== 'adjustment' && key !== 'budget') {
          register({ name: key })
          setValue(key, res[key])
        }
      })

      if (res.rewardAdjustmentActive) {
        register({ name: 'adjustment.result' })
        setValue('adjustment.result', res.adjustment && res.adjustment.result)

        register({ name: 'adjustment.coins_step' })
        setValue('adjustment.coins_step', res.adjustment && res.adjustment.coins_step)
      }

      if (res.budget) {
        register({ name: 'budget.interval' })
        setValue('budget.interval', res.budget.interval)

        register({ name: 'budget.per_interval' })
        setValue('budget.per_interval', res.budget.per_interval)
      }

      if (res.audience) {
        Object.keys(res.audience).forEach(key => {
          register({ name: `audience.${key}` })
          setValue(`audience.${key}`, res.audience[key])
        })
      }
    }
  }, [editId])

  useEffect(() => {
    if (updated) {
      history.push('/admin/campaigns/rewards')
    }
  }, [updated])

  const all = watch()
  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [all])
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

        if (antdData.audience.gender === 'any') delete antdData.audience.gender
        if (antdData.audience.user_levels.length === 0) delete antdData.audience.user_levels
        if (antdData.audience.languages.length === 0) delete antdData.audience.languages
        const request = generateCampaignRequest(data)
        const newRequest = { ...request, ...antdData }
        if (!duplicateIdCampaign && editId) {
          rewardsPutCampaign({ id: editId, request: newRequest })
        } else {
          rewardsPostCampaign(newRequest)
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
            steps={stepperCampaignRewardsSteps}
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
            createTask={onSubmit}
            clearStore={todoClearConvertedBudget}
            redirectLink='/admin/campaigns/rewards'
          />
          <ST.PreviewWrapper>
            <CampaignRewardsSummary values={values} watch={watch} />
          </ST.PreviewWrapper>
        </>
      )}
    </ST.Wrapper>
  )
}

CampaignRewardsEditor.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingLanguages: PropTypes.bool,
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  rewardsPostCampaign: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  updated: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  campaigns: PropTypes.arrayOf(PropTypes.object),
  rewardsPutCampaign: PropTypes.func.isRequired,
  todoClearConvertedBudget: PropTypes.func.isRequired,
  duplicateIdCampaign: PropTypes.string,
  rewardsClearSelectedDuplicatedCampaign: PropTypes.func.isRequired
}

CampaignRewardsEditor.defaultProps = {
  isLoadingLanguages: false,
  isLoadingCountries: false,
  languages: [],
  countries: [],
  isLoading: false,
  updated: false,
  campaigns: [],
  duplicateIdCampaign: null
}

export default withRouter(CampaignRewardsEditor)

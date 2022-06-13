import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useForm from 'react-hook-form'
import PropTypes from 'prop-types'
import * as ST from './styles'
import Loader from '../../templates/Loader'
import TodoStepForm from '../../organisms/TodoStepForm'
import { stepperCampaignReminder } from '../../../utils/steps'
import CampaignsReminderSummary from '../../organisms/CampaignsReminderSummary'
import { getValesFromArray } from '../../../utils/settings'
import { generateReminderRequest, getDataFromReminder } from '../../../utils/reminder'
import { name } from '../../../utils/consts'

const initialValues = {
  name: '',
  run_options: {
    start_date: null,
    start_time: null,
    frequency: 'once'
  },
  messages: [
    {
      text: ''
    }
  ],
  audience: {
    countries: [],
    languages: [],
    gender: 'any',
    ageRange: []
  },
  isReadOnly: false
}

const CampaignReminderEditor = ({
  history,
  match,
  isLoadingReminders,
  updatedReminder,
  reminders,
  settingsGetCountries,
  settingsGetLanguages,
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages,
  rewardsPutCampaignReminder,
  rewardsPostCampaignReminder
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

  const editReminder = useMemo(() => {
    return editId && reminders && reminders.length ? reminders.find(item => item.id === editId) : null
  }, [reminders, editId])
  const [editCountries, setEditCountries] = useState([])
  const [editLanguages, setEditLanguages] = useState([])
  const [editTitleLanguages, setEditTitleLanguages] = useState([])
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
    if (editId && editReminder !== null) {
      const res = { ...initialValues, ...getDataFromReminder(editReminder) }
      Object.keys(res).forEach(key => {
        if (key !== 'audience' && key !== 'run_options' && key !== 'messages') {
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

      if (res.run_options) {
        Object.keys(res.run_options).forEach(key => {
          register({ name: `run_options.${key}` })
          setValue(`run_options.${key}`, res.run_options[key])
        })
      }

      if (res.messages) {
        setEditTitleLanguages(res.messages.map(item => item.language))
        res.messages.forEach((item, index) => {
          register({ name: `messages[${index}].text` })
          setValue(`messages[${index}].text`, item.text)
        })
      }
    }
    if (editId && editReminder == null) {
      history.push('/admin/campaigns/reminder')
    }
  }, [editReminder])

  useEffect(() => {
    if (updatedReminder) {
      history.push('/admin/campaigns/reminder')
    }
  }, [updatedReminder])

  useEffect(() => {
    if (countries && countries.length && editCountries && editCountries.length) {
      const result = getValesFromArray(editCountries, countries, 'iso', name)

      register({ name: 'audience.countries' })
      setValue('audience.countries', result)

      setEditCountries([])
    }
  }, [countries, editCountries])

  useEffect(() => {
    if (languages && languages.length && editTitleLanguages && editTitleLanguages.length) {
      const result = getValesFromArray(editTitleLanguages, languages, 'code', name)

      result.forEach((item, index) => {
        if (index !== 0) {
          register({ name: `messages[${index}].language` })
          setValue(`messages[${index}].language`, item)
        }
      })

      setEditTitleLanguages([])
    }
  }, [languages, editTitleLanguages])

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
        const data = { ...values, ...values.audience, ...values.run_options }

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

        if (data.messages && data.messages.length > 1) {
          const valuesLanguages = getValesFromArray(
            data.messages.map(item => item.language),
            languages,
            name,
            'code'
          )
          data.messages = data.messages.map((item, index) => ({
            text: item.text,
            language: valuesLanguages[index] || 'en'
          }))
        } else {
          data.messages[0].language = 'en'
        }

        const newRequest = { ...data, ...antdData }
        const request = generateReminderRequest(newRequest)
        console.log(antdData, request)
        if (editId) {
          rewardsPutCampaignReminder({ id: editId, request })
        } else {
          rewardsPostCampaignReminder(request)
        }
      }
    })
  }, [values, editId])

  return (
    <ST.Wrapper>
      {isLoadingReminders || updatedReminder ? (
        <Loader />
      ) : (
        <>
          <TodoStepForm
            steps={stepperCampaignReminder}
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
            finalStepIndex={1}
            values={values}
            watch={watch}
            redirectLink='/admin/campaigns/reminder'
            isHaveNotAllProductsOption
            createTask={onSubmit}
          />
          <ST.PreviewWrapper>
            <CampaignsReminderSummary values={values} />
          </ST.PreviewWrapper>
        </>
      )}
    </ST.Wrapper>
  )
}

CampaignReminderEditor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  isLoadingReminders: PropTypes.bool,
  updatedReminder: PropTypes.bool,
  reminders: PropTypes.arrayOf(PropTypes.object),
  languages: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingLanguages: PropTypes.bool,
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  rewardsPutCampaignReminder: PropTypes.func.isRequired,
  rewardsPostCampaignReminder: PropTypes.func.isRequired
}

CampaignReminderEditor.defaultProps = {
  isLoadingReminders: false,
  updatedReminder: false,
  reminders: null,
  isLoadingLanguages: false,
  isLoadingCountries: false,
  languages: [],
  countries: []
}

export default CampaignReminderEditor

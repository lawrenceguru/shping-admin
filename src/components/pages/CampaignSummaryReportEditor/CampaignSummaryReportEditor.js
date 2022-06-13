import React, { useEffect, useMemo, useCallback } from 'react'
import intl from 'react-intl-universal'
import useForm from 'react-hook-form'
import moment from 'moment'
import PropTypes from 'prop-types'
import * as ST from './styles'
import Loader from '../../templates/Loader'
import { initialValues, fields, sectionOptions } from './consts'
import { getValesFromArray } from '../../../utils/settings'
import { generateSummaryReportRequest } from '../../../utils/campaign'
import { name } from '../../../utils/consts'
import Form from '../../organisms/Form'
import Button from '../../atoms/Button'
import CampaignSummary from '../../organisms/CampaignSummary'

const CampaignSummaryReportEditor = ({
  history,
  countries,
  isLoadingCountries,
  settingsGetCountries,
  campaignsPostSummaryReport,
  myTeamGetMyTeam,
  team,
  isLoadingTeam,
  isUpdated,
  isLoading,
  isSystem
}) => {
  const { watch, register, setValue, errors, setError, clearError, getValues, triggerValidation, unregister } = useForm(
    {
      defaultValues: JSON.parse(JSON.stringify(initialValues))
    }
  )

  const disabled = errors && Object.keys(errors).length !== 0
  const datesWatcher = watch('dates')
  const all = watch()
  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [all])
  const summaryValues = useMemo(() => {
    return {
      ...values,
      countries: getValesFromArray(values.countries || [], countries, 'iso', name),
      users_blacklist:
        values.users_blacklist && values.users_blacklist.length
          ? values.users_blacklist.map(item => {
              const userInfo = team.find(elem => elem.id === item)

              if (userInfo) {
                return userInfo.first_name || userInfo.last_name
                  ? `${userInfo.first_name || null} ${userInfo.last_name || null}`
                  : userInfo.id
              }

              return item
            })
          : []
    }
  }, [values, countries, team])

  useEffect(() => {
    if ((!team || !team.length) && !isLoadingTeam) {
      myTeamGetMyTeam()
    }
  }, [])

  useEffect(() => {
    if (isUpdated) {
      history.push('/admin/campaigns/summary-reports')
    }
  }, [isUpdated])

  useEffect(() => {
    if (datesWatcher && datesWatcher.length) {
      const interval = moment(datesWatcher[1]).diff(moment(datesWatcher[0]), 'days') + 1
      if (isSystem && interval > 30) {
        setError('dates', 'notMatch', intl.get('campaigns.summaryReports.date.error.invalid'))
      } else if (datesWatcher && datesWatcher.length) {
        clearError('dates')
      }
    }
  }, [datesWatcher])

  useEffect(() => {
    if ((!countries || !countries.length) && !isLoadingCountries) {
      settingsGetCountries()
    }
  }, [])

  const onSubmit = useCallback(() => {
    triggerValidation().then(isValid => {
      if (isValid) {
        const data = { ...values }

        const request = generateSummaryReportRequest(data)

        campaignsPostSummaryReport(request)
      }
    })
  }, [values])

  const handleCancel = useCallback(() => {
    history.push('/admin/campaigns/summary-reports')
  }, [history])

  return (
    <ST.Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ST.Header>{intl.get('campaigns.tabs.summaryEditor')}</ST.Header>
          <ST.ContentWrapper>
            <ST.FirstColumn>
              <Form
                values={values}
                setValue={setValue}
                register={register}
                errors={errors}
                setError={setError}
                setIsSubmit={() => {}}
                triggerValidation={triggerValidation}
                unregister={unregister}
                fields={fields}
              />
              <ST.ButtonsWrapper>
                <div>
                  {' '}
                  <Button size='large' onClick={handleCancel}>
                    {intl.get('cancel')}
                  </Button>
                  <Button type='danger' size='large' onClick={onSubmit} disabled={disabled}>
                    {intl.get('serializationTasks.serializationStep.finish')}
                  </Button>
                </div>
              </ST.ButtonsWrapper>
            </ST.FirstColumn>
            <ST.SecondColumn>
              <CampaignSummary values={summaryValues} sectionsOptions={sectionOptions} />
            </ST.SecondColumn>
          </ST.ContentWrapper>
        </>
      )}
    </ST.Wrapper>
  )
}

CampaignSummaryReportEditor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  campaignsPostSummaryReport: PropTypes.func.isRequired,
  isUpdated: PropTypes.bool,
  isLoading: PropTypes.bool,
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  isSystem: PropTypes.bool,
  myTeamGetMyTeam: PropTypes.func.isRequired,
  team: PropTypes.arrayOf(PropTypes.object),
  isLoadingTeam: PropTypes.bool
}

CampaignSummaryReportEditor.defaultProps = {
  isUpdated: false,
  isLoading: false,
  isLoadingCountries: false,
  countries: [],
  isSystem: false,
  team: [],
  isLoadingTeam: false
}

export default CampaignSummaryReportEditor

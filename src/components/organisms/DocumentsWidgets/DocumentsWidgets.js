import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import { withRouter } from 'react-router-dom'
import { Button, Form } from 'antd'
import { isArray } from 'lodash'
import intl from 'react-intl-universal'
import { toast } from 'react-toastify'
import uuid from 'uuid4'
import ProfileBuilder from '../ProfileBuilder'
import ProductEditMobilePreview from '../../atoms/ProductEditMobilePreview'
import ProductEditSourceWidget from '../../atoms/ProductEditSourceWidget'
import ProductSourceWidgets from '../ProductSourceWidgets'
import DocumentEditInfoWidget from '../../atoms/DocumentEditInfoWidget'
import * as ST from './styles'
import { getParticipantType, getSourceParticipantType } from '../../../utils/helpers'
import { getModifiedWidgetsDataForServer, getModifiedSourcesForServer } from '../../../utils/widgets'
import getModifiedDataFromServer from '../../../utils/getModifiedDataFromServer'
import { getValesFromArray } from '../../../utils/settings'
import { destroyReferenceDependence } from '../../../utils/destroyReferenceDependence'
import { name } from '../../../utils/consts'

const defaultValues = {
  sources: [{ conditions: {} }],
  activeSource: 0,
  modalWidget: { name: null, title: null },
  date: null,
  hour: null,
  minute: null,
  median: []
}

const DocumentsWidgets = ({
  history,
  match,
  participantGetParticipantProfile,
  participant,
  containerRef,
  languages,
  isLoadingLanguages,
  settingsGetLanguages,
  currentParticipant,
  participants,
  postGdti,
  editGdti,
  getGdti,
  clearGdtiInfo,
  updated,
  isLoading,
  updateGdti,
  editId,
  idContainer
}) => {
  const {
    register,
    unregister,
    errors,
    setValue,
    setError,
    getValues,
    clearError,
    watch,
    reset,
    triggerValidation,
    formState
  } = useForm({
    reValidateMode: 'onChange',
    defaultValues
  })

  const companyPrefix = useMemo(() => {
    const currParticipant = participants && participants.find(el => el.id === currentParticipant)
    if (currParticipant && currParticipant.company_prefix && currParticipant.company_prefix.length !== 0) {
      return currParticipant.company_prefix[0] === '*' ? '0000' : currParticipant.company_prefix[0]
    }
    return ''
  }, [currentParticipant])

  const isNewDocument = useMemo(() => {
    return !match.params.id
  }, [match])

  const participantType = useMemo(() => {
    return getParticipantType(participant)
  }, [participant])

  const sourceParticipantType = useMemo(() => {
    return getSourceParticipantType(participant)
  }, [participant])

  const watchAllValues = watch()

  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [watchAllValues])

  const sourceWidgets = useMemo(() => {
    const res = []
    if (!values.sources || !values.sources[values.activeSource] || !values.sources[values.activeSource].data) {
      return res
    }

    values.sources[values.activeSource].data.forEach(widget => {
      const widgetName = Object.keys(widget).find(w => w !== 'private')
      if (isArray(widgetName)) {
        if (widgetName.length > 1) {
          res.push({ [widgetName.filter(el => el !== 'text')[0]]: widget })
        } else {
          res.push({ [widgetName[0]]: widget })
        }
      } else {
        res.push({ [widgetName]: widget })
      }
    })
    return res
  }, [values])

  const activeSourceType = useMemo(() => {
    return values.sources && values.sources[values.activeSource] && values.sources[values.activeSource].type
  }, [values])

  useEffect(() => {
    register({ name: 'sources' })
    register({ name: 'activeSource' })
    register({ name: 'widgetsOfCurrType' })
    setValue('sources', [{ conditions: {} }])

    return () => unregister(['sources', 'activeSource', 'widgetsOfCurrType'])
  }, [])

  useEffect(() => {
    participantGetParticipantProfile()

    if ((!languages || !languages.length) && !isLoadingLanguages) {
      settingsGetLanguages()
    }

    if (!isNewDocument) {
      getGdti(match.params.id)
    }
    return () => {
      clearGdtiInfo()
    }
  }, [])

  const clearPageInfo = useCallback(() => {
    reset({ sources: [{ conditions: {} }] })
  }, [])

  useEffect(() => {
    if (updated && isNewDocument) {
      clearPageInfo()
      history.push(`/admin/documents/editor/${editId}`)
    }
  }, [updated])

  const setActiveSource = useCallback(
    sources => {
      const newActiveIndex = sources.findIndex(el => el.type === sourceParticipantType)
      if (newActiveIndex !== -1) {
        setValue('activeSource', newActiveIndex)
      } else {
        setValue('activeSource', 0)
      }
    },
    [sourceParticipantType]
  )

  useEffect(() => {
    if (!isNewDocument && editGdti) {
      if (typeof editGdti.title === 'object') {
        const codesLanguages = Object.keys(editGdti.title).filter(item => item !== 'en')
        const nameLanguages = getValesFromArray(codesLanguages, languages, 'code', name)

        nameLanguages.forEach((item, index) => {
          register({ name: `data.title[${index + 1}].text` })
          register({ name: `data.language[${index + 1}].text` })

          setValue(`data.title[${index + 1}].text`, editGdti.title[codesLanguages[index]])
          setValue(`data.language[${index + 1}].text`, item)
        })

        setValue(`data.title[0].text`, editGdti.title.en)
      } else {
        setValue(`data.title[0].text`, editGdti.title)
      }

      setValue('data.type', editGdti.doc_type)
      if (editGdti.sources) {
        const newSources = editGdti.sources.map(sourceData => {
          const data = destroyReferenceDependence(sourceData)
          data.data = data.data.map(widget => ({ ...widget, id: uuid() }))

          return data
        })
        if (newSources.length) {
          setActiveSource(getModifiedDataFromServer(newSources))
          setValue('sources', newSources)
        }
      }
    }
  }, [editGdti])

  const checkIsEmptySource = sources => {
    let isEmptySource = false
    if (sources && sources.length) {
      sources.forEach(el => {
        if (!el.data || !el.data.length) {
          isEmptySource = true
        }
      })
    }

    return isEmptySource
  }

  const isSelectDisabled = useMemo(() => {
    const { sources, activeSource } = values
    return !(sources && sources[activeSource] && sources[activeSource].data && sources[activeSource].data.length)
  }, [values])

  const handleOnSubmit = useCallback(() => {
    const data = { ...values }

    if (checkIsEmptySource(data.sources)) {
      toast.error('At least one widget should be added')
      return
    }

    delete data.activeSource
    data.company_prefix = companyPrefix
    let newTitle

    const newSources = getModifiedWidgetsDataForServer(data.sources, isNewDocument, false)
    setActiveSource(newSources)
    data.sources = getModifiedSourcesForServer(newSources, sourceParticipantType)

    if (data.data.title.length > 1) {
      newTitle = {}
      const valuesLanguages = getValesFromArray(
        data.data.language.map(item => item.text),
        languages,
        name,
        'code'
      )

      valuesLanguages.forEach((item, index) => {
        newTitle[item] = data.data.title[index].text
      })
    } else {
      // eslint-disable-next-line prefer-destructuring
      newTitle = data.data.title[0].text
    }

    data.title = newTitle
    data.doc_type = data.data.type
    delete data.data

    if (isNewDocument) {
      postGdti(data)
    } else {
      updateGdti({ id: match.params.id, data })
    }
  }, [values, companyPrefix])

  const onSubmit = useCallback(() => {
    triggerValidation().then(isValid => {
      if (isValid) {
        handleOnSubmit()
      }
    })
  }, [handleOnSubmit])

  return (
    <ST.Wrapper isEditor={!!match.params.id}>
      <ST.EditForm>
        <Form layout='vertical'>
          <ST.ButtonsPanel>
            <Button onClick={() => history.push('/admin/documents')}>{intl.get('documents.form.back')}</Button>
            <Button disabled={Object.entries(errors).length !== 0 || isLoading} onClick={onSubmit}>
              {intl.get('save')}
            </Button>
          </ST.ButtonsPanel>
          <ST.BottomInfo>
            <ST.WidgetsPanel>
              <DocumentEditInfoWidget
                register={register}
                errors={errors}
                setValue={setValue}
                values={values}
                triggerValidation={triggerValidation}
                unregister={unregister}
                languages={languages}
                isLoadingLanguages={isLoadingLanguages}
                watch={watch}
                clearError={clearError}
                isNewDocument={isNewDocument}
              />
              <ProductEditSourceWidget
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={values.sources}
                activeSource={values.activeSource}
                isNewProduct={isNewDocument}
                participantType={participantType}
                sourceParticipantType={sourceParticipantType}
                activeSourceType={activeSourceType}
                disableAdd={isSelectDisabled}
                widgetsOfCurrType={values.widgetsOfCurrType}
              />
              {sourceWidgets && (
                <ProductSourceWidgets
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  setError={setError}
                  clearError={clearError}
                  sources={values.sources}
                  sourceWidgets={sourceWidgets}
                  activeSource={values.activeSource}
                  triggerValidation={triggerValidation}
                />
              )}
            </ST.WidgetsPanel>
            <ProfileBuilder
              register={register}
              unregister={unregister}
              errors={errors}
              setValue={setValue}
              setError={setError}
              clearError={clearError}
              triggerValidation={triggerValidation}
              sourceWidgets={sourceWidgets}
              modalWidget={values.modalWidget}
              sources={values.sources}
              activeSource={values.activeSource}
              history={history}
              formState={formState}
              isNewProduct={isNewDocument}
              containerRef={containerRef}
              isDocumentForm
              isTryUpdateGdti={updated}
              idContainer={idContainer}
            />
            <ProductEditMobilePreview
              sourceWidgets={sourceWidgets}
              values={watchAllValues}
              isNewProduct={isNewDocument}
              register={register}
              setValue={setValue}
              reset={() => reset(null)}
              gdtiInfo={editGdti}
              isDocumentForm
            />
          </ST.BottomInfo>
        </Form>
        <div />
      </ST.EditForm>
    </ST.Wrapper>
  )
}

DocumentsWidgets.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  participantGetParticipantProfile: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  participant: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  containerRef: PropTypes.object.isRequired,
  languages: PropTypes.arrayOf(PropTypes.object),
  isLoadingLanguages: PropTypes.bool,
  settingsGetLanguages: PropTypes.func.isRequired,
  postGdti: PropTypes.func.isRequired,
  currentParticipant: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  editGdti: PropTypes.object,
  getGdti: PropTypes.func.isRequired,
  clearGdtiInfo: PropTypes.func.isRequired,
  updated: PropTypes.bool,
  isLoading: PropTypes.bool,
  updateGdti: PropTypes.func.isRequired,
  editId: PropTypes.string,
  idContainer: PropTypes.string
}

DocumentsWidgets.defaultProps = {
  participants: null,
  participant: null,
  languages: null,
  isLoadingLanguages: false,
  currentParticipant: null,
  editGdti: null,
  updated: false,
  isLoading: false,
  editId: null,
  idContainer: null
}

export default withRouter(React.memo(DocumentsWidgets))

import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'
import { isArray, isNil } from 'lodash'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'
import uuid from 'uuid4'
import { useSelector } from 'react-redux'
import ProfileBuilder from '../ProfileBuilder'
import ProductEditInfoWidget from '../../atoms/ProductEditInfoWidget'
import ProductEditMobilePreview from '../../atoms/ProductEditMobilePreview'
import ProductEditTradeItemWidget from '../../atoms/ProductEditTradeItemWidget'
import ProductEditSourceWidget from '../../atoms/ProductEditSourceWidget'
import ProductSourceWidgets from '../ProductSourceWidgets'
import { ButtonsPanel, EditForm, BottomInfo, WidgetsPanel } from './styles'
import { getParticipantType, getSourceParticipantType } from '../../../utils/helpers'
import getModifiedWidgetsDataForServer from '../../../utils/getModifiedWidgetsDataForServer'
import getModifiedAttributesForServer from '../../../utils/getModifiedAttributesForServer'
import getModifiedSourcesForServer from '../../../utils/getModifiedSourcesForServer'
import getModifiedDataFromServer from '../../../utils/getModifiedDataFromServer'
import { defaultValues } from './consts'

const ProductWidgets = ({
  history,
  getGtin,
  match,
  gtinInfo,
  isLoadingGtinInfo,
  isUpdatingGtinInfo,
  isLoadingGpcSegments,
  brands,
  updateGtin,
  indexFieldsProductsGetBrands,
  participants,
  currentParticipant,
  updated,
  participantGetParticipantProfile,
  participant,
  clearGtinInfo,
  isUpdatingSources,
  startUpdateGtin,
  endUpdateGtin,
  containerRef,
  isSystem
}) => {
  const isNewProduct = useMemo(() => {
    return !match.params.id
  }, [match])

  const participantType = useMemo(() => {
    return getParticipantType(participant)
  }, [participant])

  const sourceParticipantType = useMemo(() => {
    return getSourceParticipantType(participant)
  }, [participant])

  const {
    handleSubmit,
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

  const isExistingGtin = useSelector(({ gtin }) => gtin.fetchingStatus)
  useEffect(() => {
    register({ name: 'sources' })
    register({ name: 'activeSource' })
  }, [register])

  const companyPrefix = useMemo(() => {
    const currParticipant = participants && participants.find(el => el.id === currentParticipant)
    if (currParticipant && currParticipant.company_prefix.length !== 0) {
      return currParticipant.company_prefix
    }
    return ''
  }, [currentParticipant])

  const setDefaultComPrefix = () => {
    setValue('mainInfo.barcodeNumber.comPrefix', companyPrefix[0] === '*' ? null : companyPrefix[0])
  }

  const clearPageInfo = () => {
    reset({ ...defaultValues, sources: [{ conditions: {} }] })
    setDefaultComPrefix()
  }

  useEffect(() => {
    indexFieldsProductsGetBrands()
    participantGetParticipantProfile()
    if (!isNewProduct) {
      getGtin({ id: match.params.id })
    }
    return () => {
      clearGtinInfo()
    }
  }, [])

  const setActiveSource = sources => {
    const newActiveIndex = sources.findIndex(el => el.type === sourceParticipantType)
    if (newActiveIndex >= 0) {
      setValue('activeSource', newActiveIndex)
    } else {
      setValue('activeSource', 0)
    }
  }

  useEffect(() => {
    if (!isNewProduct) {
      setValue('mainInfo.barcodeNumber.id', gtinInfo && gtinInfo.id)
      setValue('mainInfo.name', gtinInfo && gtinInfo.name)
      setValue('mainInfo.brand', gtinInfo && gtinInfo.brand_id)
      setValue('tradeItem.gpc_segment', gtinInfo && gtinInfo.gpc_segment)
      setValue('tradeItem.gpc_family', gtinInfo && gtinInfo.gpc_family)
      setValue('tradeItem.gpc_class', gtinInfo && gtinInfo.gpc_class)
      setValue('tradeItem.gpc_brick', gtinInfo && gtinInfo.gpc_brick)
      if (gtinInfo && gtinInfo.sources) {
        // eslint-disable-next-line array-callback-return
        const newSources = gtinInfo.sources.map(el1 => {
          const el = JSON.parse(JSON.stringify(el1))

          el.data = [...el1.data].map(d => ({ ...d }))
          if (el.conditions.country) {
            el.conditions.country = !isArray(el.conditions.country) ? [el.conditions.country] : el.conditions.country
          }
          if (el.conditions.language) {
            el.conditions.language = !isArray(el.conditions.language)
              ? [el.conditions.language]
              : el.conditions.language
          }
          el.data = el.data.map(widget => ({ ...widget, id: uuid() }))
          return el
        })
        if (newSources.length) {
          setActiveSource(getModifiedDataFromServer(newSources))
          setValue('sources', newSources)
        }
      }
      let newAttributes = [{ key: 'defs', value: '' }]
      if (gtinInfo && gtinInfo.gpc_brick_attributes) {
        newAttributes = []
        Object.keys(gtinInfo.gpc_brick_attributes).forEach(keyValue => {
          newAttributes.push({ key: keyValue, value: gtinInfo.gpc_brick_attributes[keyValue] })
        })
      }
      setValue('tradeItem.gpc_brick_attributes', newAttributes)
    }
  }, [gtinInfo])

  const watchAllValues = watch()
  const watchProdId = watch('mainInfo.barcodeNumber.id')
  const watchProdCode = watch('mainInfo.barcodeNumber.prodCode')
  const watchComPrefix = watch('mainInfo.barcodeNumber.comPrefix')
  const watchCheckDigit = watch('mainInfo.barcodeNumber.checkDigit')
  const watchEnteredCheckDigit = watch('mainInfo.barcodeNumber.enteredCheckDigit')
  const watchIsOneTextInput = watch('mainInfo.isOneTextInput')
  const watchProdFlag = watch('mainInfo.barcodeNumber.flag')

  useEffect(() => {
    setDefaultComPrefix()
  }, [companyPrefix])

  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [watchAllValues])

  const sourceWidgets = useMemo(() => {
    const res = []
    if (!values.sources || !values.sources[values.activeSource] || !values.sources[values.activeSource].data) {
      return res
    }

    values.sources[values.activeSource].data.forEach(widget => {
      const widgetName = Object.keys(widget).find(w => !['private', 'no_rewards'].includes(w))
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

  const formValidation = async () => {
    // eslint-disable-next-line no-return-await
    return await triggerValidation()
  }

  useEffect(() => {
    if (updated && isNewProduct) {
      clearPageInfo()
      history.push(`/admin/products/catalogue/edit/${values.mainInfo.barcodeNumber.id}`)
    }
    endUpdateGtin()
  }, [updated])

  const checkIsEmptySource = sources => {
    let isEmptySource = false
    sources.forEach(el => {
      if (!el.data || !el.data.length) {
        isEmptySource = true
      }
    })
    return isEmptySource
  }

  const activeSourceType = useMemo(() => {
    return values.sources && values.sources[values.activeSource] && values.sources[values.activeSource].type
  }, [values])

  const isSelectsDisable = useMemo(() => {
    if (isNewProduct) {
      return false
    }
    if (sourceParticipantType !== activeSourceType) {
      return ['system'].includes(sourceParticipantType)
        ? !['gs1', 'skuadvantage'].includes(activeSourceType)
        : !(
            ['gs1', 'expert'].includes(sourceParticipantType) &&
            ['system', 'brand', 'imported_retailer', 'expert'].includes(activeSourceType)
          )
    }
    return false
  }, [isNewProduct, sourceParticipantType, activeSourceType])

  const onSubmit = data => {
    console.log(data)
    startUpdateGtin()
    if (Object.entries(errors).length === 0 && errors.constructor === Object) {
      formValidation().then(res => {
        if (res) {
          if (checkIsEmptySource(data.sources)) {
            toast.error('At least one widget should be added')
          } else {
            const newSources = getModifiedWidgetsDataForServer(data.sources, isNewProduct, false)
            setActiveSource(newSources)
            updateGtin({
              name: data.mainInfo.name,
              id: data.mainInfo.barcodeNumber.id,
              brand_id: data.mainInfo.brand || undefined,
              gpc_segment: data.tradeItem.gpc_segment || undefined,
              gpc_family: data.tradeItem.gpc_family || undefined,
              gpc_class: data.tradeItem.gpc_class || undefined,
              gpc_brick: data.tradeItem.gpc_brick || undefined,
              gpc_brick_attributes: getModifiedAttributesForServer(data) || undefined,
              sources: getModifiedSourcesForServer(newSources, sourceParticipantType, isSystem),
              isNewProduct
            })
          }
        }
      })
    }
  }

  const getCheckDigit = number => {
    const reverse = Array.from(number.replace(/,/gi, '')).reverse()
    const multiply = reverse.map((digit, i) => ((i + 2) % 2 === 0 ? digit * 3 : Number(digit)))
    const sum = String(multiply.reduce((acc, digit) => acc + digit, 0))
    const checkDigit = 10 - sum.charAt(sum.length - 1)
    return checkDigit === 10 ? 0 : checkDigit
  }

  const addComputedCheckValue = () => {
    const { barcodeNumber } = values.mainInfo
    const newId = `${barcodeNumber.flag}${barcodeNumber.comPrefix || ''}${barcodeNumber.prodCode}${
      barcodeNumber.checkDigit
    }`
    setValue('mainInfo.barcodeNumber.id', newId)
    formValidation()
  }

  useEffect(() => {
    const { barcodeNumber, isOneTextInput } = values.mainInfo

    let newId = `${barcodeNumber.flag}${barcodeNumber.comPrefix || ''}${barcodeNumber.prodCode}`

    if (newId.length === 13) {
      setValue('mainInfo.barcodeNumber.checkDigit', getCheckDigit(newId))
    } else {
      setValue('mainInfo.barcodeNumber.checkDigit', '')
    }

    if (isNewProduct && !isOneTextInput && !isNil(barcodeNumber.checkDigit)) {
      setValue('mainInfo.barcodeNumber.enteredCheckDigit.', values.mainInfo.barcodeNumber.checkDigit)
      setValue(
        'mainInfo.barcodeNumber.id',
        `${barcodeNumber.flag}${barcodeNumber.comPrefix || ''}${barcodeNumber.prodCode}${barcodeNumber.checkDigit}`
      )
    }

    if (isNewProduct) {
      if (isOneTextInput && !isNil(barcodeNumber.enteredCheckDigit)) {
        newId = `${barcodeNumber.flag}${barcodeNumber.comPrefix || ''}${barcodeNumber.prodCode}${
          barcodeNumber.enteredCheckDigit
        }`
        setValue('mainInfo.barcodeNumber.id', newId)
      }
      if (isOneTextInput && isNil(barcodeNumber.enteredCheckDigit)) {
        newId = `${barcodeNumber.flag}{barcodeNumber.comPrefix || ''}${barcodeNumber.prodCode}`
        setValue('mainInfo.barcodeNumber.id', newId)
      }
    }
  }, [
    watchProdId,
    watchComPrefix,
    watchProdCode,
    watchProdFlag,
    watchEnteredCheckDigit,
    watchCheckDigit,
    watchIsOneTextInput
  ])

  const isRequestedProcess = useMemo(() => {
    return isLoadingGtinInfo || isUpdatingGtinInfo || isLoadingGpcSegments || isUpdatingSources
  }, [isUpdatingGtinInfo, isUpdatingSources, isLoadingGpcSegments])

  const resetClicksToScanValue = useCallback(() => {
    setValue('date', null)
    setValue('hour', '')
    setValue('minute', '')
    setValue('median', undefined)
  }, [])

  useEffect(() => {
    if (isExistingGtin === 'failed') history.push('/admin/analytics')
  }, [isExistingGtin])
  return (
    <EditForm>
      {!isLoadingGtinInfo && (
        <form layout='vertical' onSubmit={handleSubmit(onSubmit)}>
          <ButtonsPanel>
            <Button onClick={() => history.push('/admin/products/catalogue')}>Back to products</Button>
            <Button
              htmlType='submit'
              loading={isRequestedProcess}
              disabled={Object.entries(errors).length !== 0 || isRequestedProcess}
            >
              {intl.get('save')}
            </Button>
          </ButtonsPanel>
          <BottomInfo>
            <WidgetsPanel>
              <ProductEditInfoWidget
                register={register}
                setValue={setValue}
                errors={errors}
                setError={setError}
                clearError={clearError}
                defaultValues={defaultValues}
                brands={brands}
                isNewProduct={isNewProduct}
                values={values}
                companyPrefix={companyPrefix}
                participantType={participantType}
                triggerValidation={triggerValidation}
                addComputedCheckValue={addComputedCheckValue}
              />
              <ProductEditTradeItemWidget
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                defaultValues={defaultValues}
                values={values}
                isNewProduct={isNewProduct}
              />
              <ProductEditSourceWidget
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                defaultValues={defaultValues}
                sources={values.sources}
                activeSource={values.activeSource}
                isNewProduct={isNewProduct}
                participantType={participantType}
                sourceParticipantType={sourceParticipantType}
                isSelectsDisable={isSelectsDisable}
                activeSourceType={activeSourceType}
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
                  isSelectsDisable={isSelectsDisable}
                />
              )}
            </WidgetsPanel>
            <ProfileBuilder
              register={register}
              unregister={unregister}
              errors={errors}
              setValue={setValue}
              setError={setError}
              clearError={clearError}
              triggerValidation={triggerValidation}
              sourceWidgets={sourceWidgets}
              isSelectsDisable={isSelectsDisable}
              modalWidget={values.modalWidget}
              sources={values.sources}
              activeSource={values.activeSource}
              history={history}
              formState={formState}
              isNewProduct={isNewProduct}
              containerRef={containerRef}
            />
            <ProductEditMobilePreview
              sourceWidgets={sourceWidgets}
              values={watchAllValues}
              isNewProduct={isNewProduct}
              register={register}
              setValue={setValue}
              reset={resetClicksToScanValue}
            />
          </BottomInfo>
        </form>
      )}
      <div />
    </EditForm>
  )
}

ProductWidgets.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gtinInfo: PropTypes.object,
  isLoadingGtinInfo: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  participants: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  currentParticipant: PropTypes.string,
  isUpdatingGtinInfo: PropTypes.bool,
  isLoadingGpcSegments: PropTypes.bool,
  updated: PropTypes.bool,
  clearGtinInfo: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  getGtin: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  brands: PropTypes.arrayOf(PropTypes.object),
  updateGtin: PropTypes.func.isRequired,
  indexFieldsProductsGetBrands: PropTypes.func.isRequired,
  participantGetParticipantProfile: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  participant: PropTypes.object,
  isUpdatingSources: PropTypes.bool,
  startUpdateGtin: PropTypes.func.isRequired,
  endUpdateGtin: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  containerRef: PropTypes.object.isRequired,
  isSystem: PropTypes.bool.isRequired
}

ProductWidgets.defaultProps = {
  gtinInfo: undefined,
  brands: null,
  participants: [],
  currentParticipant: '',
  updated: false,
  participant: null,
  isUpdatingSources: undefined,
  isLoadingGtinInfo: undefined,
  isUpdatingGtinInfo: undefined,
  isLoadingGpcSegments: undefined
}

export default withRouter(React.memo(ProductWidgets))

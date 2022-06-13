import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid4'
import intl from 'react-intl-universal'
import { Button, Icon } from 'antd'
import { toast } from 'react-toastify'
import CampaignBotMediaContent from '../../atoms/CampaingBotMediaContent'
import CampaignBotTextContent from '../../atoms/CampaignBotTextContent'
import * as ST from './styles'

const CampaignsBotStepsPickUpContent = ({
  setValue,
  register,
  errors,
  values,
  unregister,
  watch,
  setError,
  clearError,
  setIsSubmit,
  triggerValidation
}) => {
  useEffect(() => {
    setIsSubmit({
      call: value =>
        new Promise(resolve => {
          triggerValidation().then(isValidate => {
            if ((value.mediaScans && value.mediaScans.length) || (value.textScans && value.textScans.length)) {
              resolve(isValidate)
            } else {
              resolve(false)
              toast.error(intl.get('campaigns.bot.form.contentError'))
            }
          })
        })
    })
  }, [])

  const textWatcher = watch('textScans')
  const mediaWatcher = watch('mediaScans')

  const currTextScans = useMemo(() => {
    return textWatcher || []
  }, [textWatcher])

  const currMediaScans = useMemo(() => {
    return mediaWatcher || []
  }, [mediaWatcher])

  useEffect(() => {
    register({ name: 'mediaScans' })
    register({ name: 'textScans' })
  }, [])

  const handleAddTextContent = useCallback(() => {
    const currValues = (values && values.textScans && [...values.textScans]) || []
    currValues.push({ title: '', content: '' })
    setValue('textScans', [...currValues])
  }, [values])

  const handleAddMediaContent = useCallback(() => {
    const currValues = (values && values.mediaScans && [...values.mediaScans]) || []
    currValues.push({ title: '', url: '', type: '' })
    setValue('mediaScans', [...currValues])
  }, [values])

  const handleDeleteTextContent = useCallback(
    index => {
      if (values && values.textScans && values.textScans[index]) {
        const currValues = values.textScans.filter((item, indexItem) => indexItem !== index)

        unregister(`textScans[${currValues.length}].title`)
        unregister(`textScans[${currValues.length}].content`)

        setValue('textScans', [])

        currValues.forEach((item, indexItem) => {
          setValue(`textScans[${indexItem}].title`, item.title)
          setValue(`textScans[${indexItem}].content`, item.content)
        })
      }
    },
    [values]
  )

  const handleDeleteMediaContent = useCallback(
    index => {
      if (values && values.mediaScans && values.mediaScans[index]) {
        const currValues = values.mediaScans.filter((item, indexItem) => indexItem !== index)

        unregister(`mediaScans[${currValues.length}].title`)
        unregister(`mediaScans[${currValues.length}].url`)
        unregister(`mediaScans[${currValues.length}].type`)
        unregister(`mediaScans[${currValues.length}].preview`)
        clearError(`mediaScans[${index}].url`)

        setValue('mediaScans', [])

        currValues.forEach((item, indexItem) => {
          setValue(`mediaScans[${indexItem}].title`, item.title)
          setValue(`mediaScans[${indexItem}].url`, item.url)
          setValue(`mediaScans[${indexItem}].type`, item.type)
          if (item.preview) {
            register({ name: `mediaScans[${indexItem}].preview` })
            setValue(`mediaScans[${indexItem}].preview`, item.preview)
          }
        })
      }
    },
    [values]
  )

  return (
    <ST.Wrapper>
      <ST.BlockHeader>{intl.get('campaigns.bot.form.textContentTitle')}</ST.BlockHeader>
      {currTextScans && currTextScans.length
        ? currTextScans.map((item, index) => {
            return (
              <CampaignBotTextContent
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                values={values}
                setValue={setValue}
                register={register}
                errors={errors}
                index={index}
                handleDelete={handleDeleteTextContent}
                id={uuid()}
              />
            )
          })
        : null}
      <ST.BtnWrapper>
        <Button onClick={handleAddTextContent}>
          <Icon type='plus' />
          {intl.get('campaigns.bot.form.buttonAddDescription')}
        </Button>
      </ST.BtnWrapper>
      <ST.BlockHeader>{intl.get('campaigns.bot.form.mediaContentTitle')}</ST.BlockHeader>
      {currMediaScans && currMediaScans.length
        ? currMediaScans.map((item, index) => {
            return (
              <CampaignBotMediaContent
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                setError={setError}
                clearError={clearError}
                values={values}
                setValue={setValue}
                register={register}
                errors={errors}
                handleDelete={handleDeleteMediaContent}
                index={index}
                id={uuid()}
              />
            )
          })
        : null}
      <ST.BtnWrapper>
        <Button onClick={handleAddMediaContent}>
          <Icon type='plus' />
          {intl.get('campaigns.bot.form.buttonAddFiles')}
        </Button>
      </ST.BtnWrapper>
    </ST.Wrapper>
  )
}

CampaignsBotStepsPickUpContent.propTypes = {
  setValue: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  unregister: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setIsSubmit: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired
}

CampaignsBotStepsPickUpContent.defaultProps = {
  errors: null,
  values: null
}
export default CampaignsBotStepsPickUpContent

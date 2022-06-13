import React, { useEffect, useState } from 'react'
import { Popover } from 'antd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { isEqual } from 'lodash'
import { animateScroll } from 'react-scroll'
import ProfileBuilderModal from '../../molecules/ProfileBuilderModal'
import * as ST from './styles'
import deleteModal from '../../molecules/DeleteModal'
import { widgetOptions, initialFormStateFields } from './consts'
import ProfileBuilderSelectedWidgets from '../../molecules/ProfileBuilderSelectedWidgets'
import IconButton from '../../molecules/IconButton'
import CustomButton from '../../molecules/Button'

const ProfileBuilder = ({
  register,
  errors,
  unregister,
  clearError,
  setError,
  setValue,
  sourceWidgets,
  modalWidget,
  sources,
  activeSource,
  isSelectsDisable,
  triggerValidation,
  postUploadClear,
  history,
  formState,
  isNewProduct,
  isTryUpdateGtin,
  isTryUpdateGdti,
  containerRef,
  isSerializationForm,
  isDocumentForm,
  idContainer
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)

  useEffect(() => {
    if (modalVisible) {
      register({ name: 'modalWidget.name' }, { required: intl.get('validation.requiredField') })
      register({ name: 'modalWidget.title' }, { required: intl.get('validation.requiredField') })
      setValue('modalWidget.name', Object.keys(widgetOptions)[0])
      triggerValidation({ name: 'modalWidget.title' })
    } else {
      clearError('modalWidget.name')
      clearError('modalWidget.title')
      unregister('modalWidget.name')
      unregister('modalWidget.title')
    }
  }, [modalVisible])

  const changeButtonVisible = () => {
    if (containerRef.current.scrollTop > 214) {
      setButtonVisible(true)
    } else {
      setButtonVisible(false)
    }
  }

  useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.addEventListener('scroll', changeButtonVisible)
    }

    return () => {
      if (containerRef && containerRef.current) {
        containerRef.current.removeEventListener('scroll', changeButtonVisible)
      }
    }
  }, [containerRef])

  const deleteAllWidgets = () => {
    postUploadClear()
    const newSources = [...sources]
    newSources[activeSource].data = []
    setValue('sources', sources)
  }

  const clearForm = isEqual(
    formState && formState.touched.filter(t => !['sources', 'mainInfo.isOneTextInput'].includes(t)),
    initialFormStateFields
  )

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (
      !isSerializationForm &&
      !clearForm &&
      isNewProduct &&
      formState.touched &&
      formState.touched.length > 0 &&
      !isTryUpdateGtin &&
      !isTryUpdateGdti
    ) {
      history.block(e => {
        deleteModal(
          () => {
            history.block(() => {})
            history.push(e.pathname)
            deleteAllWidgets()
            return true
          },
          isDocumentForm ? intl.get('documents.form.leaveMessage') : intl.get('addProduct.leaveMessage')
        )
        return false
      })
      return () => history.block(() => {})
    }
  }, [clearForm, isNewProduct, formState])

  useEffect(() => {
    if (!isSerializationForm) {
      deleteAllWidgets()
    }
  }, [])

  return (
    <ST.ProfileBuilderWrapper className='modal-wrapper'>
      <ST.Panel>
        <div>
          <ST.ProfileBuilderHeader>Profile builder</ST.ProfileBuilderHeader>
        </div>
        <div>
          <Popover
            visible={modalVisible}
            content={
              <ProfileBuilderModal
                register={register}
                errors={errors}
                unregister={unregister}
                clearError={clearError}
                setError={setError}
                setValue={setValue}
                modalWidget={modalWidget}
                sources={sources}
                activeSource={activeSource}
                setModalVisible={setModalVisible}
                triggerValidation={triggerValidation}
                widgetOptions={widgetOptions}
              />
            }
            placement='bottom'
            title={<ST.PopoverTitle>Widget</ST.PopoverTitle>}
            trigger='click'
          >
            <ST.IconWrapper
              onClick={() => {
                return !isSelectsDisable ? setModalVisible(!modalVisible) : null
              }}
            >
              <IconButton
                type='Add'
                styleParam={{ fontSize: 28, cursor: 'pointer', marginRight: 15, color: 'rgba(0, 0, 0, 0.65)' }}
              />
            </ST.IconWrapper>
          </Popover>
        </div>
      </ST.Panel>
      <ProfileBuilderSelectedWidgets
        register={register}
        unregister={unregister}
        clearError={clearError}
        setValue={setValue}
        sourceWidgets={sourceWidgets}
        sources={sources}
        activeSource={activeSource}
        isSelectsDisable={isSelectsDisable}
        triggerValidation={triggerValidation}
        postUploadClear={postUploadClear}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {buttonVisible && (
        <ST.BackToWrapper buttonVisible={buttonVisible}>
          <CustomButton
            text={intl.get('productCatalogue.backToTop')}
            height='35px'
            fontSize='15px'
            backgroundColor='rgba(239,61,70,0.8784313725490196)'
            color='#fff'
            borderColor='rgb(217, 217, 217)'
            handleClick={() => {
              animateScroll.scrollToTop({
                containerId: idContainer || 'container1',
                duration: 500,
                delay: 0
              })
            }}
          >
            <IconButton type='ArrowUp' styleParam={{ fontSize: 14, color: '#fff' }} />
          </CustomButton>
        </ST.BackToWrapper>
      )}
    </ST.ProfileBuilderWrapper>
  )
}

ProfileBuilder.propTypes = {
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  unregister: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  modalWidget: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  sourceWidgets: PropTypes.array,
  sources: PropTypes.arrayOf(PropTypes.object),
  activeSource: PropTypes.number.isRequired,
  isSelectsDisable: PropTypes.bool,
  triggerValidation: PropTypes.func.isRequired,
  postUploadClear: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formState: PropTypes.object.isRequired,
  isNewProduct: PropTypes.bool.isRequired,
  isTryUpdateGtin: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  containerRef: PropTypes.object.isRequired,
  isSerializationForm: PropTypes.bool,
  isDocumentForm: PropTypes.bool,
  isTryUpdateGdti: PropTypes.bool,
  idContainer: PropTypes.string
}

ProfileBuilder.defaultProps = {
  errors: {},
  modalWidget: {},
  sourceWidgets: [],
  sources: [],
  isTryUpdateGtin: false,
  isSerializationForm: false,
  isDocumentForm: false,
  isSelectsDisable: false,
  isTryUpdateGdti: false,
  idContainer: null
}

export default ProfileBuilder

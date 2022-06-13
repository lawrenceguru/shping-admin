import React from 'react'
import { Form, Input, Select, Button } from 'antd'
import intl from 'react-intl-universal'
import { RHFInput } from 'react-hook-form-input'
import PropTypes from 'prop-types'
import uuid from 'uuid4'
import { toast } from 'react-toastify'
// eslint-disable-next-line no-unused-vars
import { scroller, animateScroll as scroll } from 'react-scroll'
import { StyledForm, ButtonsPanel, Replacer } from './styles'
import { StyledError } from '../../atoms/ProductEditInfoWidget/styles'
import { TITLE_TEXT_LENGTH } from '../../atoms/ProductEditTextWidget/ProductEditTextWidget'

const { Option } = Select

const ProfileBuilderModal = ({
  register,
  errors,
  clearError,
  setError,
  setValue,
  modalWidget,
  sources,
  activeSource,
  setModalVisible,
  widgetOptions,
  triggerValidation,
  unregister,
  postUploadClear
}) => {
  const containsObject = (field, list) => {
    let i
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < list.length; i++) {
      if (Object.keys(list[i]).includes(field)) {
        return true
      }
    }
    return false
  }

  const NUTRITION_STAFF = [
    {
      less_than: false,
      unit: 'g',
      name: 'Total Fat',
      value: null,
      nutrition_staff: [
        { less_than: false, unit: 'g', name: 'Trans Fat', value: null },
        { less_than: false, unit: 'g', name: 'Saturated Fat', value: null }
      ]
    },
    { less_than: false, unit: 'g', name: 'Sodium', value: null },
    {
      less_than: false,
      unit: 'g',
      name: 'Total Carbohydrate',
      value: null,
      nutrition_staff: [
        { less_than: false, unit: 'g', name: 'Dietary Fiber', value: null },
        { less_than: false, unit: 'g', name: 'Sugars', value: null }
      ]
    },
    { less_than: false, unit: 'g', name: 'Protein', value: null }
  ]

  const scrollToNewWidget = () => {
    setTimeout(() => {
      scroller.scrollTo(sources[activeSource].data[sources[activeSource].data.length - 1].id, {
        duration: 800,
        delay: 0,
        containerId: 'container1'
      })
      scroll.scrollToBottom({
        duration: 500,
        containerId: 'container2'
      })
    }, 500)
  }

  const scrollToExistingWidget = widget => {
    const foundEl = sources[activeSource].data.find(el => Object.keys(el).includes(widget))
    let foundId = null
    if (foundEl && foundEl.id) {
      foundId = foundEl.id
    }

    if (foundId) {
      setTimeout(() => {
        scroller.scrollTo(foundId, {
          duration: 800,
          delay: 0,
          containerId: 'container1'
        })
      }, 500)
      toast.success('Widget has already been added')
    }
  }

  const addWidget = () => {
    const newSources = [...sources]
    if (!newSources[activeSource].data) {
      newSources[activeSource].data = []
    }
    if (modalWidget.name) {
      if (modalWidget.name === 'text') {
        newSources[activeSource].data.push({
          [modalWidget.name]: { title: modalWidget.title, text: null, markdown: false },
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'title' || modalWidget.name === 'header') {
        newSources[activeSource].data.push({
          [modalWidget.name]: { text: null, markdown: false },
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'follow_fb') {
        newSources[activeSource].data.push({
          follow_fb: { text: null, url: '' },
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'phone') {
        newSources[activeSource].data.push({
          phone: { text: null, to: '+' },
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'email') {
        newSources[activeSource].data.push({
          email: { subject: null, text: null, to: null },
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'image') {
        newSources[activeSource].data.push({
          image: [{ url: null }],
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'gdti') {
        newSources[activeSource].data.push({
          gdti: { gdti: null, inline: false },
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'video') {
        newSources[activeSource].data.push({
          video: { preview: null, title: null, url: null },
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'link') {
        newSources[activeSource].data.push({
          link: { text: null, url: null },
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'popup') {
        newSources[activeSource].data.push({
          popup: { title: null, text: null, ok: null, icon: null, cancel: null },
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'certificates') {
        newSources[activeSource].data.push({
          certificates: { title: null, list: [{ expired: false, gdti: null, img_url: null }] },
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'made_in' && !containsObject('made_in', newSources[activeSource].data)) {
        newSources[activeSource].data.push({
          made_in: { country: null },
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'made_in' && containsObject('made_in', newSources[activeSource].data)) {
        scrollToExistingWidget('made_in')
      } else if (modalWidget.name === 'health_star' && !containsObject('health_star', newSources[activeSource].data)) {
        newSources[activeSource].data.push({
          health_star: {
            icons: [
              { name: 'Energy', unit: 'kJ', value: null, check: false },
              { name: 'Sat Fat', unit: 'g', value: null, check: false },
              { name: 'Sodium', unit: 'mg', value: null, check: false },
              { name: 'Fibre', unit: 'g', value: null, check: false },
              { name: 'Sugars', unit: 'g', value: null, check: false },
              { name: 'Protein', unit: 'g', value: null, check: false }
            ],
            per: 'pack',
            rating: 10,
            number_of_fields: 0
          },
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'health_star' && containsObject('health_star', newSources[activeSource].data)) {
        scrollToExistingWidget('health_star')
      } else if (modalWidget.name === 'nutrition_info') {
        newSources[activeSource].data.push({
          nutrition_info: {
            ingredients: [],
            nutrition_staff: NUTRITION_STAFF,
            package_size: null,
            package_unit: 'g',
            serving_energy: null,
            serving_size: null,
            title: 'Nutrition Info'
          },
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'social_networks') {
        newSources[activeSource].data.push({
          social_networks: [{ icon: undefined, url: null, id: uuid() }],
          id: uuid(),
          private: false
        })
      } else if (modalWidget.name === 'components') {
        newSources[activeSource].data.push({
          components: {
            title: null,
            items: [
              {
                allergen: false,
                group: null,
                name: null,
                nano: false,
                groupId: uuid()
              }
            ]
          },
          id: uuid(),
          private: false
        })
      }
    }
    setValue('sources', newSources)
  }

  const handleAddWidget = () => {
    addWidget()
    postUploadClear()
    scrollToNewWidget()
    setValue('modalWidget.title', null)
    setModalVisible(false)
  }

  return (
    <StyledForm>
      <Form.Item label='Type'>
        <Select
          size='large'
          showSearch
          style={{ width: '100%' }}
          optionFilterProp='children'
          value={modalWidget.name}
          getPopupContainer={trigger => trigger.parentNode}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          register={register}
          onChange={value => {
            setValue('modalWidget.name', value)
            if (value === 'text') {
              register({ name: 'modalWidget.title' }, { required: intl.get('validation.requiredField') })
              triggerValidation({ name: 'modalWidget.title' })
            } else {
              clearError('modalWidget.title')
              unregister('modalWidget.title')
            }
          }}
        >
          {Object.keys(widgetOptions).map(key => (
            <Option
              key={key}
              value={key}
              style={{ color: 'rgb(178,179,178)', fontFamily: 'Roboto', fontWeight: 400, fontSize: 20 }}
            >
              {widgetOptions[key]}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {modalWidget.name === 'text' ? (
        <Form.Item label='Widget title'>
          <RHFInput
            as={<Input size='large' />}
            rules={{ required: true }}
            register={register}
            setValue={setValue}
            value={modalWidget && modalWidget.title}
            onChange={e => {
              clearError('modalWidget.title')
              const { value } = e.target
              setValue('modalWidget.title', value.substring(0, TITLE_TEXT_LENGTH))
              if (value.trim() === '') {
                setError('modalWidget.title', 'notMatch', intl.get('validation.requiredField'))
              }
            }}
          />
          <StyledError style={{ visibility: errors['modalWidget.title'] ? 'visible' : 'hidden' }}>
            {errors['modalWidget.title'] && errors['modalWidget.title'].message}
          </StyledError>
        </Form.Item>
      ) : (
        <Replacer />
      )}
      <ButtonsPanel>
        <Button onClick={() => setModalVisible(false)}>Cancel</Button>
        <Button onClick={handleAddWidget} disabled={errors['modalWidget.title']}>
          Add
        </Button>
      </ButtonsPanel>
    </StyledForm>
  )
}

ProfileBuilderModal.propTypes = {
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  modalWidget: PropTypes.object,
  sources: PropTypes.arrayOf(PropTypes.object),
  activeSource: PropTypes.number.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  widgetOptions: PropTypes.object.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  unregister: PropTypes.func.isRequired,
  postUploadClear: PropTypes.func.isRequired
}

ProfileBuilderModal.defaultProps = {
  errors: {},
  modalWidget: {},
  sources: []
}

export default ProfileBuilderModal

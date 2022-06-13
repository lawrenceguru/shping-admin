import { DatePicker, Input, Modal, Select } from 'antd'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'
import moment from 'moment'
import { RHFInput } from 'react-hook-form-input'

const { Option } = Select

const dropdownStyle = { fontFamily: 'Roboto', fontSize: 12, color: '#b3b3b3' }

const checkNumber = value => {
  return value && value.replace(/[^0-9]+/, '', -1)
}

const ModalForm = ({ register, setValue, values, modalVisible, setModalVisible, setClickToScanFormValue, reset }) => {
  const handleSubmitForm = () => {
    const { date, hour, minute, median } = values
    const errorDate = date === null || median === undefined
    const errorHour = hour < 0 || hour > 12 || hour === null || hour === '' || hour === undefined
    const errorMinute = minute < 0 || minute > 59 || minute === null || minute === '' || minute === undefined
    const errorMedian = median === undefined || median === [] || median.length === 0

    if (errorDate || errorHour || errorMinute || errorMedian) {
      const notifyErrorDate = () => toast.error(intl.get('validation.wrongDateValue'))
      const notifyErrorHour = () => toast.error(intl.get('validation.wrongHourValue'))
      const notifyErrorMinute = () => toast.error(intl.get('validation.wrongMinuteValue'))
      const notifyErrorMedian = () => toast.error(intl.get('validation.wrongMedianValue'))

      // eslint-disable-next-line no-unused-expressions
      errorDate && notifyErrorDate()
      // eslint-disable-next-line no-unused-expressions
      errorHour && notifyErrorHour()
      // eslint-disable-next-line no-unused-expressions
      errorMinute && notifyErrorMinute()
      // eslint-disable-next-line no-unused-expressions
      errorMedian && notifyErrorMedian()
    } else {
      setClickToScanFormValue({ date, hour, minute, median })
      setModalVisible(false)
    }
  }

  useEffect(() => {
    if (!modalVisible) {
      reset()
    }
  }, [modalVisible])

  const disabledDate = current => {
    return current && current.add(1, 'minute') < moment()
  }

  return (
    <Modal
      visible={modalVisible}
      closable={false}
      centered
      width='800'
      onOk={handleSubmitForm}
      onCancel={() => setModalVisible(false)}
      okText='Save'
      okButtonProps={{ type: 'danger' }}
    >
      <DatePicker
        value={values && values.date}
        onChange={value => {
          register({ name: 'date' })
          setValue('date', value)
        }}
        style={dropdownStyle}
        placeholder='Date'
        disabledDate={disabledDate}
        format={null}
      />
      <RHFInput
        as={
          <Input
            size='large'
            placeholder='Hours'
            style={{ width: 130, margin: '0 20px', height: '32px' }}
            maxLength={2}
          />
        }
        rules={{ required: true }}
        name='hour'
        register={register}
        setValue={(name, value, b) => setValue(name, checkNumber(value), b)}
      />
      <RHFInput
        as={
          <Input
            size='large'
            placeholder='Minutes'
            style={{ width: 130, margin: '0 20px 0 0', height: '32px' }}
            maxLength={2}
          />
        }
        rules={{ required: true }}
        name='minute'
        register={register}
        setValue={(name, value, b) => setValue(name, checkNumber(value), b)}
      />
      <RHFInput
        as={
          <Select style={{ width: 130 }} placeholder='AM/PM'>
            <Option className='option' value='am'>
              AM
            </Option>
            <Option className='option' value='pm'>
              PM
            </Option>
          </Select>
        }
        rules={{ required: true }}
        name='median'
        register={register}
        setValue={setValue}
        defaultValue={values && values.median}
      />
    </Modal>
  )
}

ModalForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setClickToScanFormValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
}

ModalForm.defaultProps = {
  values: null
}

export default ModalForm

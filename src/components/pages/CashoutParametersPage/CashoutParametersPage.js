import React, { useEffect, useCallback, useMemo } from 'react'
import { Checkbox, Form, Select, Row, Col, Tabs, Input } from 'antd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { RHFInput } from 'react-hook-form-input'
import useForm from 'react-hook-form'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { LIQUID_API } from 'constants/url'
import { toast } from 'react-toastify'
import * as ST from './styles'
import { sections, fields } from './consts'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import Loader from '../../templates/Loader'
import Button from '../../atoms/Button'
import DatePickerSelectFewDates from '../../atoms/DatePickerSelectFewDates'
import { noExponents } from '../../../utils/helpers/mathOperations'

const { TabPane } = Tabs

const initialValues = {
  api: {
    enabled: false,
    cors: []
  },
  cashout: {
    enabled: false,
    fake_mode: false,
    gas_percent: 0,
    transaction_fee: 0,
    aba_recipients: [],
    uff_recipients: []
  },
  topup: {
    enabled: false,
    fake_mode: false,
    alert_recipients: []
  },
  fake_inspector: {
    enabled: false,
    notification_recipients: []
  },
  market_making: {
    enabled: false,
    fake_mode: false
  },
  banks_holidays: {
    AU: [],
    SG: []
  }
}

const CashoutParametersPage = ({ isLoading, settings, cashoutSetSettings, cashoutGetSettings }) => {
  const { watch, register, setValue, getValues, unregister } = useForm({
    defaultValues: JSON.parse(JSON.stringify(initialValues))
  })
  const all = watch()
  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [all])

  useEffect(() => {
    cashoutGetSettings()
  }, [])

  useEffect(() => {
    if (settings) {
      Object.keys(settings).forEach(section => {
        Object.keys(settings[section]).forEach(field => {
          if (field === 'shping_eth_mock_price') {
            register({ name: `${section}.${field}` })
            setValue(`${section}.${field}`, noExponents(settings[section][field]))
          } else {
            register({ name: `${section}.${field}` })
            setValue(`${section}.${field}`, settings[section][field])
          }
        })
      })
    }
  }, [settings])

  const generateField = useCallback(
    (field, status) => {
      const { placeholder, name, type } = field
      switch (type) {
        case 'checkbox':
          return (
            <Checkbox
              size='large'
              defaultChecked={values && values[name.split('.')[0]] && values[name.split('.')[0]][name.split('.')[1]]}
              checked={values && values[name.split('.')[0]] && values[name.split('.')[0]][name.split('.')[1]]}
              onChange={event => {
                register({ name })
                setValue(name, event.target.checked)
              }}
            >
              {placeholder}
            </Checkbox>
          )
        case 'input':
          return (
            <Form.Item label={placeholder}>
              <RHFInput
                as={
                  <CustomInputNumber
                    isSelectsDisable={status === 'unknown'}
                    size='large'
                    placeholder={intl.get('common.inputPlaceholder')}
                    required
                  />
                }
                name={name}
                rules={{ required: true }}
                register={register}
                unregister={unregister}
                setValue={setValue}
                defaultValue={values && values[name.split('.')[0]] && values[name.split('.')[0]][name.split('.')[1]]}
                mode='onChange'
              />
            </Form.Item>
          )
        case 'div':
          return <Col style={{ marginBottom: 10 }}>{placeholder}</Col>
        case 'hidden':
          return (
            <Form.Item hidden>
              <RHFInput
                as={<CustomInputNumber size='large' required />}
                name={name}
                rules={{ required: true }}
                register={register}
                unregister={unregister}
                setValue={setValue}
                defaultValue={values && values[name.split('.')[0]] && values[name.split('.')[0]][name.split('.')[1]]}
                mode='onChange'
              />
            </Form.Item>
          )
        case 'text':
          return (
            <Form.Item label={placeholder}>
              <RHFInput
                as={
                  <Input
                    size='large'
                    disabled={status === 'unknown'}
                    placeholder={intl.get('common.inputPlaceholder')}
                    required
                  />
                }
                name={name}
                rules={{ required: true }}
                register={register}
                unregister={unregister}
                setValue={setValue}
                defaultValue={values && values[name.split('.')[0]] && values[name.split('.')[0]][name.split('.')[1]]}
                mode='onChange'
              />
            </Form.Item>
          )
        case 'twoInputs':
          return (
            <Row>
              <Col span={24}>
                <ST.TwoInputsLabel>{placeholder}</ST.TwoInputsLabel>
              </Col>
              <Col span={11}>
                <Form.Item>
                  <RHFInput
                    as={
                      <CustomInputNumber
                        size='large'
                        placeholder={intl.get('cashout.market_making.trading_range_min')}
                        step={0.000000001}
                      />
                    }
                    name={`${name}_min`}
                    register={register}
                    unregister={unregister}
                    setValue={setValue}
                    defaultValue={values && values[`${name}_min`.split('.')[0]][`${name}_min`.split('.')[1]]}
                    mode='onChange'
                  />
                </Form.Item>
              </Col>
              <Col span={2}>&nbsp;</Col>
              <Col span={11}>
                <Form.Item>
                  <RHFInput
                    as={
                      <CustomInputNumber
                        size='large'
                        placeholder={intl.get('cashout.market_making.trading_range_max')}
                        step={0.000000001}
                      />
                    }
                    name={`${name}_max`}
                    register={register}
                    unregister={unregister}
                    setValue={setValue}
                    defaultValue={values && values[`${name}_max`.split('.')[0]][`${name}_max`.split('.')[1]]}
                    mode='onChange'
                  />
                </Form.Item>
              </Col>
            </Row>
          )
        case 'tags':
          return (
            <Form.Item label={placeholder}>
              <RHFInput
                as={
                  <Select
                    mode='tags'
                    getPopupContainer={trigger => trigger.parentNode}
                    style={{ width: '100%' }}
                    size='large'
                    placeholder={intl.get('common.inputPlaceholder')}
                  />
                }
                name={name}
                register={register}
                unregister={unregister}
                setValue={setValue}
                defaultValue={
                  (values && values[name.split('.')[0]] && values[name.split('.')[0]][name.split('.')[1]]) || []
                }
                mode='onChange'
              />
            </Form.Item>
          )
        case 'datePicker':
          return (
            <Form.Item label={placeholder}>
              <Select
                mode='tags'
                defaultValue={
                  (values && values[name.split('.')[0]] && values[name.split('.')[0]][name.split('.')[1]]) || []
                }
                value={(values && values[name.split('.')[0]] && values[name.split('.')[0]][name.split('.')[1]]) || []}
                style={{ width: '100%' }}
                size='large'
                searchValue={null}
                onChange={value => setValue(name, value)}
                notFoundContent={null}
                onInputKeyDown={event => {
                  event.preventDefault()
                  event.stopPropagation()
                }}
                open={false}
                placeholder={placeholder}
              >
                {null}
              </Select>
              <RHFInput
                as={<DatePickerSelectFewDates style={{ width: '100%' }} size='large' />}
                name={name}
                register={register}
                unregister={unregister}
                setValue={setValue}
                defaultValue={
                  (values && values[name.split('.')[0]] && values[name.split('.')[0]][name.split('.')[1]]) || []
                }
                mode='onChange'
              />
            </Form.Item>
          )
        default:
          return null
      }
    },
    [values]
  )

  const handleSave = useCallback(() => {
    cashoutSetSettings({ ...values })
  }, [values])
  const ticket = useSelector(({ identity }) => identity.ticket)
  const handlePairSubmit = currencyPair => () => {
    axios
      .post(
        `${LIQUID_API}/release`,
        { currencyPair },
        {
          headers: {
            authenticateit_identity_ticket: ticket
          }
        }
      )
      .then(() => {
        toast.success(intl.get('cashout.market_making.liquid.alerts.updateSuccess'))
        cashoutGetSettings()
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          if (error.response.data.error_data) {
            toast.error(`
              ${error.response.data.error} ${error.response.data.error_data.join(' ')}
            `)
          } else {
            toast.error(`${error.response.data.error}`)
          }
        } else {
          toast.error(intl.get('cashout.market_making.liquid.alerts.updateFail'))
        }
      })
  }
  return (
    <ST.Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* <ST.Header>{intl.get('cashout.header')}</ST.Header> */}
          {sections &&
            sections.length !== 0 &&
            sections.map(section =>
              section === 'market_making' ? (
                <ST.Tabs>
                  <ST.SubHeader>{intl.get(`cashout.market_making.header`)}</ST.SubHeader>
                  <Tabs defaultActiveKey='1'>
                    <TabPane tab={intl.get(`cashout.market_making.timex.name`)} key='1'>
                      {fields.market_making.map(elem => (
                        <div key={elem.name}>{generateField(elem)}</div>
                      ))}
                    </TabPane>
                    <TabPane tab={intl.get(`cashout.market_making.liquid.name`)} key='2'>
                      {fields.market_making_liquid_header.map(elem => (
                        <div key={elem.name}>{generateField(elem)}</div>
                      ))}
                      <Row gutter={16}>
                        <Col className='gutter-row' span={8}>
                          <h4>{intl.get(`cashout.market_making.liquid.defaultSettings`)}</h4>
                          {fields.market_making_liquid_default.map(elem => (
                            <div key={elem.name}>{generateField(elem)}</div>
                          ))}
                        </Col>
                        <Col className='gutter-row' span={8}>
                          <ST.Liquid>
                            <h4>{values?.liquid?.pair1_currencyPair}</h4>
                            <div className={values?.liquid?.pair1_status}>{values?.liquid?.pair1_status}</div>
                          </ST.Liquid>
                          {fields.market_making_liquid_pair1.map(elem => (
                            <div key={elem.name}>{generateField(elem, values?.liquid?.pair1_status)}</div>
                          ))}
                          {values?.liquid?.pair1_status === 'hold' && (
                            <Button type='primary' onClick={handlePairSubmit(values?.liquid?.pair1_currencyPair)}>
                              {intl.get(`cashout.market_making.liquid.release`)}
                            </Button>
                          )}
                        </Col>
                        <Col className='gutter-row' span={8}>
                          <ST.Liquid>
                            <h4>{values?.liquid?.pair2_currencyPair}</h4>
                            <div className={values?.liquid?.pair2_status}>{values?.liquid?.pair2_status}</div>
                          </ST.Liquid>
                          {fields.market_making_liquid_pair2.map(elem => (
                            <div key={elem.name}>{generateField(elem, values?.liquid?.pair1_status)}</div>
                          ))}
                          {values?.liquid?.pair2_status === 'hold' && (
                            <Button type='primary' onClick={handlePairSubmit(values?.liquid?.pair2_currencyPair)}>
                              Release
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </TabPane>
                  </Tabs>
                </ST.Tabs>
              ) : (
                <ST.StyledForm key={section}>
                  <ST.SubHeader>{intl.get(`cashout.${section}.header`)}</ST.SubHeader>
                  {section === 'cashout_booster' ? (
                    <Col span={8}>
                      {fields &&
                        fields[section] &&
                        fields[section].length !== 0 &&
                        fields[section].map(elem => <div key={elem.name}>{generateField(elem)}</div>)}
                    </Col>
                  ) : (
                    fields &&
                    fields[section] &&
                    fields[section].length !== 0 &&
                    fields[section].map(elem => <div key={elem.name}>{generateField(elem)}</div>)
                  )}
                  {/* {fields &&
                    fields[section] &&
                    fields[section].length !== 0 &&
                    fields[section].map(elem => <div key={elem.name}>{generateField(elem)}</div>)} */}
                </ST.StyledForm>
              )
            )}
          <ST.ButtonsWrapper>
            <div>
              <Button type='danger' size='large' onClick={handleSave}>
                {intl.get('save')}
              </Button>
            </div>
          </ST.ButtonsWrapper>
        </>
      )}
    </ST.Wrapper>
  )
}

CashoutParametersPage.propTypes = {
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  settings: PropTypes.object,
  cashoutSetSettings: PropTypes.func.isRequired,
  cashoutGetSettings: PropTypes.func.isRequired
}

CashoutParametersPage.defaultProps = {
  isLoading: false,
  settings: null
}

export default CashoutParametersPage

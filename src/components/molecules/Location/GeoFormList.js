import React, { useState } from 'react'
import { Form, Col, Select, Button, Modal, Collapse } from 'antd'
// import { CloseOutlined, RightOutlined } from '@ant-design/icons'
import { RightOutlined } from '@ant-design/icons'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
// import Switch from '../../atoms/Switch'
import Location from './index'
import * as ST from './styles'

const { Panel } = Collapse
const { Option } = Select

const GeoFromList = ({ countries, form }) => {
  const [activeKeys, setActiveKeys] = useState([])
  // const [removeIndex, setRemoveIndex] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  // const [isModal1Visible, setIsModal1Visible] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState()
  // useEffect(() => {
  //   setCountry(activeKeys)
  // }, [activeKeys])
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setSelectedCountry()
    setIsModalVisible(false)
    // setIsModal1Visible(false)
  }
  // const deleteCountry = name => {
  //   setRemoveIndex(name)
  //   setIsModal1Visible(true)
  // }
  // const removeLocatoion = remove => {
  //   remove(removeIndex)
  //   setIsModal1Visible(false)
  // }
  const findCountryName = v => {
    return Array.isArray(countries) && countries.find(c => c.numeric_code === v)?.name
  }
  const checkReContry = () => {
    if (Array.isArray(form.getFieldValue(`locations`))) {
      const check = form.getFieldValue(`locations`).findIndex(it => it.country === selectedCountry)
      if (check === -1) {
        return true
      }
    } else {
      return true
    }
    return false
  }

  return (
    <Form.List name='locations'>
      {/* {(fields, { add, remove }) => ( */}
      {(fields, { add }) => (
        <>
          <Modal
            title={intl.get('campaigns.rewards.geoTargetingCollapse.locationSettings')}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[]}
            className='createModal'
          >
            {Array.isArray(countries) && (
              <Col span={24}>
                <p>{intl.get('campaigns.rewards.form.locations.country')}</p>
                <Form.Item rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}>
                  <Select
                    showSearch
                    onChange={selected => setSelectedCountry(selected)}
                    value={selectedCountry}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {countries.map(country => (
                      <Option key={country.numeric_code} value={country.numeric_code}>
                        {country.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}
            <Col span={24}>
              <Form.Item>
                <Button
                  key='submit'
                  type='danger'
                  htmlType='submit'
                  onClick={() => {
                    if (selectedCountry) {
                      if (checkReContry()) {
                        setIsModalVisible(false)
                        add({
                          country: selectedCountry,
                          active: true,
                          distance: 10
                        })
                        setActiveKeys([selectedCountry])
                        // setCountry(selectedCountry)
                        setSelectedCountry()
                      } else toast.error(intl.get('campaigns.bot.form.reCountryChoiceError'))
                    } else toast.error(intl.get('campaigns.bot.form.countryChoiceError'))
                  }}
                >
                  {intl.get('campaigns.rewards.geoTargetingCollapse.update')}
                </Button>
              </Form.Item>
            </Col>
          </Modal>
          {/* <Modal
            title={intl.get('campaigns.rewards.geoTargetingCollapse.notification')}
            visible={isModal1Visible}
            onCancel={handleCancel}
            footer={[]}
            className='delModal'
          >
            <p>{intl.get('campaigns.shoppingListAds.deleteLocationConfirm')}</p>
            <Row gutter={16}>
              <Col span={24}>
                <Button type='primary' danger onClick={() => removeLocatoion(remove)}>
                  {intl.get('campaigns.shoppingListAds.buttonLocationContinue')}
                </Button>
                <Button onClick={() => handleCancel()}>
                  {intl.get('campaigns.shoppingListAds.buttonLocationCancel')}
                </Button>
              </Col>
            </Row>
          </Modal> */}
          <Col span={12}>
            <h4 className='geoTopic'>{intl.get('campaigns.rewards.geoTargetingCollapse.geoTargetting')}</h4>
          </Col>
          <Col span={12} align='end'>
            <Button type='primary' className='geoAddButton' onClick={showModal}>
              {intl.get('campaigns.rewards.form.addCountry')}
            </Button>
          </Col>
          <Col span={24}>
            <ST.Collapse>
              <Collapse
                bordered={false}
                activeKey={activeKeys}
                expandIcon={props => (
                  <RightOutlined
                    rotate={props.isActive ? 90 : 0}
                    onClick={() => {
                      if (activeKeys.find(key => key === props.panelKey)) {
                        setActiveKeys(activeKeys.filter(key => key !== props.panelKey))
                      } else setActiveKeys([...activeKeys, props.panelKey])
                    }}
                  />
                )}
              >
                {fields.map(({ name, fieldKey }) => (
                  <Panel
                    key={form.getFieldValue(`locations`)[`${name}`].country}
                    header={
                      <>
                        <div className='country'>
                          {findCountryName(form.getFieldValue(`locations`)[`${name}`].country)}
                        </div>
                        {/* <Form.Item
                          name={[name, 'active']}
                          fieldKey={[fieldKey, 'active']}
                          validateTrigger={['onChange', 'onBlur']}
                          // onClick={event => event.stopPropagation()}
                        >
                          <Switch values={[true, false]} />
                        </Form.Item>
                        <Button type='text' icon={<CloseOutlined />} onClick={() => deleteCountry(name)} /> */}
                      </>
                    }
                  >
                    <Location
                      form={form}
                      fieldName={name}
                      fieldKey={fieldKey}
                      country={form.getFieldValue(`locations`)[`${name}`].country}
                    />
                  </Panel>
                ))}
              </Collapse>
            </ST.Collapse>
          </Col>
        </>
      )}
    </Form.List>
  )
}

GeoFromList.propTypes = {
  countries: PropTypes.shape({}),
  form: PropTypes.shape({}).isRequired
}

GeoFromList.defaultProps = {
  countries: {}
}

export default GeoFromList

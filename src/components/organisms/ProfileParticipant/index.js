import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import intl from 'react-intl-universal'
import { Form, Input, Select, Row, Col, Upload, message, Checkbox } from 'antd'
import axios from 'axios'
import { PARTICIPANT_API } from 'constants/url'
import { toast } from 'react-toastify'
import { settingsGetCountries, settingsGetTimezone, postUpload, postUploadClear } from 'store/actions'
import { Wrapper, StyledForm } from './styles'
import Summary from './Summary'
import Button from '../../atoms/Button'
import useProfileParticipant from '../../../data/participant/users/participant'

const { Option } = Select
const countryFilterOption = (input, option) => option.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
const LogoImage = ({ value, onChange }) => {
  const [remove, setRemove] = useState(false)
  const [first, setFirst] = useState(false)
  const [otherFileList, setOtherFileList] = useState(() => {
    if (value === undefined) return []
    return [
      {
        uid: 0,
        name: `Image`,
        status: 'done',
        url: value
      }
    ]
  })
  useEffect(() => {
    console.log(value, remove)
    if (value === undefined || value === '') return
    if (remove) {
      onChange('')
    }
    if (first) {
      return
    }
    setOtherFileList([
      {
        uid: 0,
        name: `Image`,
        status: 'done',
        url: value
      }
    ])
    setFirst(true)
  }, [value])
  const dispatch = useDispatch()
  const lastUploaded = useSelector(({ upload }) => upload.lastUploaded)
  const isUploading = useSelector(({ upload }) => upload.isUploading)
  useEffect(() => {
    dispatch(postUploadClear())
    if (otherFileList.length === 1) onChange(otherFileList[0].url)
    else onChange('')
  }, [])
  useEffect(() => {
    if (isUploading === null) {
      if (lastUploaded && lastUploaded.url) {
        const updateOtherFileList = otherFileList.map(file => {
          if (file.status === 'uploading') {
            return {
              ...file,
              status: 'done',
              url: lastUploaded.url
            }
          }
          return file
        })
        setOtherFileList(updateOtherFileList)
        if (updateOtherFileList.length === 1) onChange(updateOtherFileList[0].url)
        else onChange('')
      }
    }
  }, [isUploading, lastUploaded])
  const uploadProps = {
    listType: 'picture-card',
    onRemove: () => {
      setOtherFileList([])
      onChange('')
      setRemove(true)
    },
    beforeUpload: file => {
      dispatch(postUpload({ file }))
      setRemove(false)
      setOtherFileList([
        ...otherFileList,
        {
          uid: file.uid,
          name: file.name,
          status: 'uploading'
        }
      ])
      return false
    },
    onChange(info) {
      if (otherFileList.length === 1) onChange(otherFileList[0].url)
      else onChange('')
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    fileList: otherFileList
  }

  return <Upload {...uploadProps}>{otherFileList.length === 0 && <>Upload</>}</Upload>
}

const ProfileParticipant = () => {
  const ticket = useSelector(({ identity }) => identity.ticket)
  const timezones = useSelector(({ settings }) => settings.timezones)
  const countries = useSelector(({ settings }) => settings.countries)
  const dispatch = useDispatch()
  useEffect(() => {
    if (countries.length === 0) dispatch(settingsGetCountries())
  }, [countries])
  const lang = window.localStorage.getItem('lang')
  useEffect(() => {
    if (timezones.length === 0) dispatch(settingsGetTimezone())
  }, [timezones])
  const { result: values, mutate } = useProfileParticipant()
  const [form] = Form.useForm()
  useEffect(() => {
    if (values) {
      form.setFieldsValue(values)
    }
  }, [values])
  const onFinish = data => {
    axios
      .put(`${PARTICIPANT_API}/users/participant`, data, {
        headers: {
          authenticateit_identity_ticket: ticket
        }
      })
      .then(() => {
        toast.success(intl.get('profileParticipant.alertSuccess'))
        mutate()
      })
      .catch(() => {
        toast.error(intl.get('profileParticipant.alertFail'))
      })
  }
  return (
    <Wrapper>
      <StyledForm>
        <Form layout='vertical' form={form} onFinish={onFinish} id='participant'>
          <Row>
            <Col span={12}>
              <Form.Item
                label={intl.get('profileParticipant.fields.name.label')}
                name='name'
                rules={[{ required: false, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <Input placeholder={intl.get('profileParticipant.fields.name.placeholder')} />
              </Form.Item>
              <Form.Item
                label={intl.get('profileParticipant.fields.contact.label')}
                name='contact'
                rules={[{ required: false, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <Input placeholder={intl.get('profileParticipant.fields.contact.placeholder')} />
              </Form.Item>
              <Form.Item
                label={intl.get('profileParticipant.fields.phone.label')}
                name='phone'
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <Input placeholder={intl.get('profileParticipant.fields.phone.placeholder')} />
              </Form.Item>
            </Col>
            <Col span={8} offset={4}>
              <Form.Item
                label={intl.get('profileParticipant.fields.logo.label')}
                name='logo'
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <LogoImage />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label={intl.get('profileParticipant.fields.address.label')}
            name='address'
            rules={[{ required: false, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
          >
            <Input placeholder={intl.get('profileParticipant.fields.address.placeholder')} />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                label={intl.get('profileParticipant.fields.city.label')}
                name='city'
                rules={[{ required: false, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <Input placeholder={intl.get('profileParticipant.fields.city.placeholder')} />
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item
                label={intl.get('profileParticipant.fields.country.label')}
                name='country'
                rules={[{ required: false, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <Select
                  showSearch
                  placeholder={intl.get('profileParticipant.fields.country.placeholder')}
                  filterOption={countryFilterOption}
                >
                  {Array.isArray(countries) &&
                    countries.map(country => (
                      <Option key={country.iso} value={country.iso}>
                        {lang === 'en' && country.name}
                        {lang === 'ru' && country.name_ru}
                        {lang === 'zh' && country.name_zh}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label={intl.get('profileParticipant.fields.postCode.label')}
            name='post_code'
            rules={[{ required: false, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
          >
            <Input placeholder={intl.get('profileParticipant.fields.postCode.placeholder')} />
          </Form.Item>
          <Form.Item
            label={intl.get('profileParticipant.fields.email.label')}
            name='email'
            rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
          >
            <Input placeholder={intl.get('profileParticipant.fields.email.placeholder')} />
          </Form.Item>
          <Form.Item
            label={intl.get('profileParticipant.fields.facebookUrl.label')}
            name='facebookUrl'
            rules={[{ required: false, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
          >
            <Input placeholder={intl.get('profileParticipant.fields.facebookUrl.placeholder')} />
          </Form.Item>
          <Form.Item
            label={intl.get('profileParticipant.fields.exclusiveInfo.label')}
            name='exclusive_info'
            valuePropName='checked'
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label={intl.get('profileParticipant.fields.timezoneCode.label')}
            name='timezone_code'
            rules={[{ required: false, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
          >
            <Select placeholder={intl.get('profileParticipant.fields.timezoneCode.placeholder')}>
              {timezones.map(timezone => (
                <Option key={timezone.id} value={timezone.id}>
                  {timezone.id}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button type='danger' size='large' htmlType='submit' form='participant'>
            {intl.get('profileUser.submitButton')}
          </Button>
        </Form>
      </StyledForm>
      <Summary values={values} />
    </Wrapper>
  )
}

export default withRouter(ProfileParticipant)

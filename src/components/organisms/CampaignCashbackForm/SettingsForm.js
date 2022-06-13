import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input, Row, Col, Select, DatePicker, InputNumber, Radio, Upload, message, Divider } from 'antd'
import intl from 'react-intl-universal'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { UploadOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { postUpload, postUploadClear } from 'store/actions'
import PublishConfirmDialog from './PublishConfirmDialog'
import useDisableButton from '../../../hooks/useDisableButton'
import * as ST from './styles'

const { Option } = Select

const { RangePicker } = DatePicker

const iconValues = ['action', 'brand', 'contact', 'fb', 'support', 'verify', 'warning']
const CashbackIcon = ({ value, onChange }) => {
  const [otherFileList, setOtherFileList] = useState(() => {
    if (iconValues.includes(value) || value === undefined) return []
    return [
      {
        uid: 0,
        name: `Image`,
        status: 'done',
        url: value
      }
    ]
  })
  const dispatch = useDispatch()
  const lastUploaded = useSelector(({ upload }) => upload.lastUploaded)
  const isUploading = useSelector(({ upload }) => upload.isUploading)
  useEffect(() => {
    dispatch(postUploadClear())
    if (otherFileList.length === 1) onChange(otherFileList[0].url)
    else if (!iconValues.includes(value)) onChange('')
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
        else if (!iconValues.includes(value)) onChange('')
      }
    }
  }, [isUploading, lastUploaded])
  const uploadProps = {
    listType: 'picture',
    onRemove: file => {
      const index = otherFileList.indexOf(file)
      const newFileList = [...otherFileList]
      newFileList.splice(index, 1)
      setOtherFileList(newFileList)
      onChange('')
    },
    beforeUpload: file => {
      dispatch(postUpload({ file }))
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
  const handleSelectChange = v => {
    onChange(v)
  }

  return (
    <Row>
      <Col span={12}>
        <Select defaultValue={iconValues.includes(value) ? value : ''} onChange={handleSelectChange}>
          <Option value='action'>Action</Option>
          <Option value='brand'>Brand</Option>
          <Option value='contact'>Contact</Option>
          <Option value='fb'>Fb</Option>
          <Option value='support'>Support</Option>
          <Option value='verify'>Verify</Option>
          <Option value='warning'>Warning</Option>
          <Option value=''>Custom</Option>
        </Select>
      </Col>
      <Col span={12}>
        {!iconValues.includes(value) && (
          <Upload {...uploadProps}>
            {otherFileList.length === 0 && <Button icon={<UploadOutlined />}>Click to Upload</Button>}
          </Upload>
        )}
      </Col>
    </Row>
  )
}
const BannerImage = ({ value, onChange }) => {
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
    listType: 'picture',
    onRemove: file => {
      const index = otherFileList.indexOf(file)
      const newFileList = [...otherFileList]
      newFileList.splice(index, 1)
      setOtherFileList(newFileList)
      onChange('')
    },
    beforeUpload: file => {
      dispatch(postUpload({ file }))
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

  return (
    <ST.Banner>
      <Upload {...uploadProps}>
        {otherFileList.length === 0 && <Button icon={<UploadOutlined />}>Click to Upload</Button>}
      </Upload>
    </ST.Banner>
  )
}

const BannerMissionImage = ({ value, onChange }) => {
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
    listType: 'picture',
    onRemove: file => {
      const index = otherFileList.indexOf(file)
      const newFileList = [...otherFileList]
      newFileList.splice(index, 1)
      setOtherFileList(newFileList)
      onChange('')
    },
    beforeUpload: file => {
      dispatch(postUpload({ file }))
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

  return (
    <ST.Banner>
      <Upload {...uploadProps}>
        {otherFileList.length === 0 && <Button icon={<UploadOutlined />}>Click to Upload</Button>}
      </Upload>
    </ST.Banner>
  )
}

const SettingsForm = ({ initialValues, next, onPublished, onSave }) => {
  const clonedInitialValues = { ...initialValues }
  const history = useHistory()
  const handleCancel = () => {
    history.goBack()
  }
  const [form] = Form.useForm()
  if (clonedInitialValues.start_date) {
    clonedInitialValues.range_dates = [moment(clonedInitialValues.start_date), moment(clonedInitialValues.end_date)]
  }
  if (clonedInitialValues.options && clonedInitialValues.options.receipt_date_from) {
    clonedInitialValues.receipt_range_dates = [
      moment(clonedInitialValues.options.receipt_date_from),
      moment(clonedInitialValues.options.receipt_date_to)
    ]
  }
  const [cashbackType, setCashbackType] = useState(() => {
    if (clonedInitialValues.options && clonedInitialValues.options.cashback) {
      return Object.keys(clonedInitialValues.options.cashback)[0]
    }
    return 'value'
  })
  const handleCashbackTypeChange = e => {
    setCashbackType(e.target.value)
  }
  const getFormValues = () => {
    const values = form.getFieldsValue()
    return values
  }
  const [publishFormVisible, setPublishFormVisible] = useState(false)
  const [disabledSave, setDisabledSave] = useDisableButton(false)
  const handleSave = () => {
    setDisabledSave(true)
    onSave(getFormValues())
  }
  const handlePublish = () => {
    setPublishFormVisible(true)
  }
  const publishedSubmit = () => {
    onPublished(getFormValues())
  }

  return (
    <>
      <Form
        name='setting-form'
        id='setting-form'
        layout='vertical'
        form={form}
        onFinish={next}
        initialValues={clonedInitialValues}
      >
        <ST.Section>
          <Row gutter={16}>
            <Col className='gutter-row' span={12}>
              <Form.Item
                label={intl.get('campaigns.cashbacks.fields.name')}
                name='name'
                className='horizontal'
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={intl.get('campaigns.cashbacks.fields.range_date')}
                name='range_dates'
                className='horizontal'
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <RangePicker showTime />
              </Form.Item>
              <Form.Item
                label={intl.get('campaigns.cashbacks.fields.receipt_range_date')}
                name='receipt_range_dates'
                className='horizontal'
                rules={[{ required: false, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <RangePicker showTime />
              </Form.Item>
              <Form.Item
                label={intl.get('campaigns.cashbacks.fields.campaignLogo')}
                name={['card', 'icon']}
                className='horizontal'
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
                style={{ margin: '20px 0' }}
                extra={intl.get('campaigns.cashbacks.fields.compaignLogoTip')}
                validateTrigger={['onSubmit', 'onClick']}
              >
                <CashbackIcon />
              </Form.Item>
              <Form.Item
                label={intl.get('campaigns.cashbacks.fields.campaignBanner')}
                name={['card', 'promo_image']}
                className='horizontal'
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
                style={{ margin: '20px 0' }}
                extra={intl.get('campaigns.cashbacks.fields.compaignBannerTip')}
                validateTrigger='onSubmit'
              >
                <BannerImage />
              </Form.Item>

              <Form.Item
                label={intl.get('campaigns.cashbacks.fields.campaignMissionBanner')}
                name={['card', 'promo_image_mission']}
                className='horizontal'
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
                style={{ margin: '20px 0' }}
                extra={intl.get('campaigns.cashbacks.fields.compaignMissionBannerTip')}
                validateTrigger='onSubmit'
              >
                <BannerMissionImage />
              </Form.Item>
            </Col>
            <Col className='gutter-row' span={12}>
              <Form.Item
                label={intl.get('campaigns.cashbacks.fields.description')}
                name={['card', 'description']}
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                label={intl.get('campaigns.cashbacks.fields.terms')}
                name='t&c'
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col className='gutter-row' span={5}>
              <h3>{intl.get('campaigns.cashbacks.steps.settings.compaignContraints')}</h3>
              <Form.Item
                label={intl.get('campaigns.cashbacks.fields.currency')}
                name={['options', 'currency']}
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <Select>
                  <Option value='aud'>AUD</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={intl.get('campaigns.cashbacks.fields.budget')}
                name={['budget', 'value']}
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col className='gutter-row' span={7}>
              <h3>{intl.get('campaigns.cashbacks.steps.settings.rewardOptions')}</h3>
              <Form.Item
                label={intl.get('campaigns.cashbacks.fields.value')}
                name={['options', 'cashback', cashbackType]}
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label={intl.get('campaigns.cashbacks.fields.rewardType')}
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
                help={intl.get('campaigns.cashbacks.fields.rewardTypeTip')}
              >
                <Radio.Group value={cashbackType}>
                  <Radio value='value' onChange={handleCashbackTypeChange}>
                    {intl.get('campaigns.cashbacks.fields.rewardTypeFixed')}
                  </Radio>
                  <Radio value='percents' onChange={handleCashbackTypeChange}>
                    {intl.get('campaigns.cashbacks.fields.rewardTypePercent')}
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <h3>{intl.get('campaigns.cashbacks.steps.settings.moderation')}</h3>
              <Form.Item
                label={intl.get('campaigns.cashbacks.fields.moderationMode')}
                name={['options', 'auto_approve']}
                help={intl.get('campaigns.cashbacks.fields.rewardTypeTip')}
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
              >
                <Radio.Group>
                  <Radio value={false}>{intl.get('campaigns.cashbacks.fields.moderationModeManual')}</Radio>
                  <Radio value>{intl.get('campaigns.cashbacks.fields.moderationModeAutomatic')}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col className='gutter-row' span={12}>
              <h3>{intl.get('campaigns.cashbacks.steps.settings.messages')}</h3>
              <Form.Item
                name={['messages', 0, 'message']}
                label={intl.get('campaigns.cashbacks.fields.messageSuccess')}
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
                help={intl.get('campaigns.cashbacks.fields.messageSuccessTip')}
              >
                <Input.TextArea maxLength={100} showCount />
              </Form.Item>
              <Form.Item name={['messages', 0, 'type']} hidden>
                <Input />
              </Form.Item>
              <Form.Item
                name={['messages', 1, 'message']}
                label={intl.get('campaigns.cashbacks.fields.messageRejection')}
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
                help={intl.get('campaigns.cashbacks.fields.messageRejectionTip')}
              >
                <Input.TextArea maxLength={100} showCount />
              </Form.Item>
              <Form.Item name={['messages', 1, 'type']} hidden>
                <Input />
              </Form.Item>
              <Form.Item
                name={['messages', 2, 'message']}
                label={intl.get('campaigns.cashbacks.fields.messagePending')}
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
                help={intl.get('campaigns.cashbacks.fields.messagePendingTip')}
              >
                <Input.TextArea maxLength={100} showCount />
              </Form.Item>
              <Form.Item name={['messages', 2, 'type']} hidden>
                <Input />
              </Form.Item>
              <Form.Item
                name={['messages', 3, 'message']}
                label={intl.get('campaigns.cashbacks.fields.messageManaulRejection')}
                rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
                help={intl.get('campaigns.cashbacks.fields.messageManaulRejectionTip')}
              >
                <Input.TextArea maxLength={100} showCount />
              </Form.Item>
              <Form.Item name={['messages', 3, 'type']} hidden>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </ST.Section>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Button type='primary' onClick={handleCancel}>
              {intl.get('common.cancel')}
            </Button>
          </Col>
          {initialValues.id ? (
            <>
              <Col className='gutter-row' span={4} style={{ textAlign: 'right' }}>
                <Button type='primary' htmlType='submit'>
                  {intl.get('campaigns.cashbacks.actions.next')}
                </Button>
              </Col>
              <Col className='gutter-row' span={8} style={{ textAlign: 'right' }}>
                <Button type='primary' onClick={handleSave} disabled={disabledSave}>
                  {intl.get('campaigns.cashbacks.actions.save')}
                </Button>
                <Divider type='vertical' />
                <Button type='primary' danger onClick={handlePublish}>
                  {intl.get('campaigns.cashbacks.actions.publish')}
                </Button>
              </Col>
            </>
          ) : (
            <Col className='gutter-row' span={12} style={{ textAlign: 'right' }}>
              <Button type='primary' htmlType='submit'>
                {intl.get('campaigns.cashbacks.actions.next')}
              </Button>
            </Col>
          )}
        </Row>
      </Form>
      {initialValues.id && (
        <PublishConfirmDialog
          visible={publishFormVisible}
          setVisible={setPublishFormVisible}
          published={publishedSubmit}
        />
      )}
    </>
  )
}

SettingsForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  next: PropTypes.func.isRequired,
  onPublished: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default SettingsForm

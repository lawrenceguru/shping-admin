import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input, Row, Col, Select, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import intl from 'react-intl-universal'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { postUpload, postUploadClear, customerGetAll } from 'store/actions'
import useCategories, { getTreeCategories } from '../../../data/pam/categories'
import * as ST from './styles'
import Tags from '../../molecules/Tags/form'
import SwitchOption from '../../atoms/SwitchOption'

const Switch = ({ value, onChange }) => {
  return (
    <SwitchOption
      checked={value === 'active'}
      onChange={checked => {
        if (checked) {
          onChange('active')
        } else {
          onChange('inactive')
        }
      }}
    />
  )
}
const { Option } = Select
const uploadButton = (
  <div>
    <PlusOutlined />
  </div>
)
Switch.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
}
Switch.defaultProps = {
  onChange: undefined,
  value: 'inactive'
}
const UploadFormItems = ({ value, onChange }) => {
  const [otherFileList, setOtherFileList] = useState(
    (value || [])
      .map((image, index) => {
        if (typeof image === 'string')
          return {
            uid: index,
            name: `Image${index}`,
            status: 'done',
            url: image
          }
        if (typeof image === 'object') {
          if (typeof image.url === 'object') {
            if (image.url) {
              return {
                uid: index,
                name: `Image${index}`,
                status: 'done',
                url: image.url.url
              }
            }
            return undefined
          }
          return {
            uid: index,
            name: `Image${index}`,
            status: 'done',
            url: image.url
          }
        }
        return undefined
      })
      .filter(image => image)
  )
  const dispatch = useDispatch()
  const lastUploaded = useSelector(({ upload }) => upload.lastUploaded)
  const isUploading = useSelector(({ upload }) => upload.isUploading)
  useEffect(() => {
    dispatch(postUploadClear())
    onChange(otherFileList.map(item => item.url))
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
        onChange(updateOtherFileList.map(file => file.url))
      }
    }
  }, [isUploading, lastUploaded])

  const otherProps = {
    listType: 'picture-card',
    onRemove: file => {
      const index = otherFileList.indexOf(file)
      const newFileList = [...otherFileList]
      newFileList.splice(index, 1)
      setOtherFileList(newFileList)
      onChange(newFileList.map(item => item.url))
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
      onChange(otherFileList.map(file => file.url))
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    fileList: otherFileList
  }
  return <Upload {...otherProps}>{uploadButton}</Upload>
}

const imageSizes = {
  top_category_ad: '1440x600',
  top_keyword_ad: '512x512',
  main_page_ad: '1440x850'
}
const SettingsForm = ({ initialValues, next }) => {
  const customers = useSelector(({ identity }) => identity.participants)
  let uniqueCustomers = []
  if (Array.isArray(customers)) uniqueCustomers = [...new Map(customers.map(item => [item.id, item])).values()]
  const dispatch = useDispatch()
  useEffect(() => {
    if (!Array.isArray(customers)) {
      dispatch(customerGetAll())
    }
  }, [])
  const { categories } = useCategories()
  const tree = getTreeCategories(categories)
  const history = useHistory()
  const handleCancel = () => {
    history.goBack()
  }
  const [adType, setAdType] = useState(initialValues.ad_type)
  const handleAdTypeChange = v => {
    setAdType(v)
  }
  const [form] = Form.useForm()
  return (
    <Form
      name='setting-form'
      id='setting-form'
      layout='vertical'
      form={form}
      onFinish={next}
      initialValues={initialValues}
    >
      <ST.Section>
        <Row gutter={16}>
          <Col className='gutter-row' span={24}>
            <Form.Item
              label={intl.get('campaigns.shoppingListAds.fields.name')}
              name='name'
              rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Form.Item label={intl.get('campaigns.shoppingListAds.fields.owner')} name='owner'>
              <Select>
                {uniqueCustomers.map((customer, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Option value={customer.id} key={index}>
                    {customer.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={12}>
            <Form.Item
              label={intl.get('campaigns.shoppingListAds.fields.ad_type')}
              name='ad_type'
              rules={[{ required: true, message: intl.get('campaigns.shoppingListAds.requiredMessage') }]}
            >
              <Select onChange={handleAdTypeChange}>
                <Option value='top_category_ad'>{intl.get('campaigns.shoppingListAds.adType.top_category_ad')}</Option>
                <Option value='top_category_listing'>
                  {intl.get('campaigns.shoppingListAds.adType.top_category_listing')}
                </Option>
                <Option value='top_keyword_ad'>{intl.get('campaigns.shoppingListAds.adType.top_keyword_ad')}</Option>
                <Option value='top_keyword_listing'>
                  {intl.get('campaigns.shoppingListAds.adType.top_keyword_listing')}
                </Option>
                <Option value='main_page_ad'>{intl.get('campaigns.shoppingListAds.adType.main_page_ad')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Form.Item
              label={intl.get('campaigns.shoppingListAds.fields.categories')}
              name='target_categories'
              rules={[
                {
                  required: ['top_category_ad', 'top_category_listing'].includes(adType),
                  message: intl.get('campaigns.shoppingListAds.requiredMessage')
                }
              ]}
            >
              <Select mode='multiple'>
                {tree.map(category => (
                  <Option value={category.id} key={category.id}>
                    {category.main_category && <>{category.main_category.name}/</>}
                    {category.sub1_category && <>{category.sub1_category.name}/</>}
                    {category.sub2_category && <>{category.sub2_category.name}/</>}
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={12}>
            <Form.Item
              label={intl.get('campaigns.shoppingListAds.fields.keywords')}
              name='target_keywords'
              rules={[
                {
                  required: ['top_keyword_ad', 'top_keyword_listing'].includes(adType),
                  message: intl.get('campaigns.shoppingListAds.requiredMessage')
                }
              ]}
            >
              <Tags />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            {['top_category_ad', 'top_keyword_ad', 'main_page_ad'].includes(adType) && (
              <Form.Item
                label={intl.get('campaigns.shoppingListAds.fields.images', { size: imageSizes[adType] })}
                name='image'
              >
                <UploadFormItems />
              </Form.Item>
            )}
          </Col>
          <Col className='gutter-row' span={12}>
            <Form.Item label={intl.get('campaigns.shoppingListAds.fields.status')} name='status' className='switch'>
              <Switch />
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
        <Col className='gutter-row' span={12}>
          <Button type='primary' htmlType='submit'>
            {intl.get('campaigns.shoppingListAds.actions.next')}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

SettingsForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  next: PropTypes.func.isRequired
}

export default SettingsForm

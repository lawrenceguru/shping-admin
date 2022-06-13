import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, InputNumber, AutoComplete, Divider } from 'antd'
import intl from 'react-intl-universal'
import { useDispatch, useSelector } from 'react-redux'
import { getProductCompleteLike } from 'store/actions'
import { toast } from 'react-toastify'
import * as ST from './styles'
import Switch from '../../atoms/Switch'
import PublishConfirmDialog from './PublishConfirmDialog'
import useDisableButton from '../../../hooks/useDisableButton'

const { Option } = AutoComplete

const ProductsForm = ({ initialValues, prev, next, onPublished, onSave }) => {
  const onFinishFailed = errorInfo => {
    if (Array.isArray(errorInfo.errorFields)) {
      if (errorInfo.errorFields[0].name[0] === 'purchased_products') {
        toast.error(intl.get('campaigns.cashbacks.purchasedProductsRequiredMessage'))
      }
    }
  }
  const [form] = Form.useForm()
  const handlePrev = () => {
    prev(form.getFieldsValue())
  }
  const dispatch = useDispatch()
  const gtins = useSelector(({ products }) => products.completeList)

  const handleOnChange = () => {
    dispatch(getProductCompleteLike(''))
  }
  const handleAutoSearch = value => {
    dispatch(getProductCompleteLike(value))
  }
  const [campaignReceiptLevel, setCampaignReceiptLevel] = useState(initialValues.cashback_per_x_product_receipt_level)
  const onValuesChange = changedValues => {
    if ('cashback_per_x_product_receipt_level' in changedValues)
      setCampaignReceiptLevel(changedValues.cashback_per_x_product_receipt_level)
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
        name='products-form'
        id='products-form'
        layout='vertical'
        form={form}
        onFinish={next}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        initialValues={initialValues}
      >
        <Row>
          <Col span={24}>
            <h3>{intl.get('campaigns.cashbacks.steps.products.campaignRestrictions')}</h3>
            <Row>
              <Col span={4}>
                <Form.Item label={intl.get('campaigns.cashbacks.fields.claims')} name={['options', 'max_claims']}>
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={intl.get('campaigns.cashbacks.fields.claimsPerGtin')}
                  name={['options', 'claims_per_gtin']}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={intl.get('campaigns.cashbacks.fields.claimsPerUser')}
                  name={['options', 'claims_per_user']}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
            </Row>
            <h3>{intl.get('campaigns.cashbacks.steps.products.receiptRestrictions')}</h3>
            <Row>
              <Col span={4}>
                <Form.Item
                  label={intl.get('campaigns.cashbacks.fields.capInReceipt')}
                  name={['options', 'cap_in_receipt']}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item
                  name='cashback_per_x_product_receipt_level'
                  label={intl.get('campaigns.cashbacks.fields.campaignReceiptLevel')}
                  validateTrigger={['onChange', 'onBlur']}
                >
                  <Switch values={[true, false]} />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item
                  label={intl.get('campaigns.cashbacks.fields.perxProduct')}
                  name={['options', 'cashback_per_x_product']}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col offset={18} span={6}>
            <ST.Section>
              <Form.Item
                name='all_products'
                className='horizontal-products'
                label={intl.get('campaigns.cashbacks.fields.allProducts')}
              >
                <Switch values={[true, false]} />
              </Form.Item>
            </ST.Section>
          </Col>
        </Row>
        <ST.Section>
          <Form.List
            name='purchased_products'
            rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey }) => (
                  <ST.Formlist key={key}>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          name={[name, 'gtin']}
                          fieldKey={[fieldKey, 'gtin']}
                          label={intl.get('campaigns.cashbacks.fields.products.gtn')}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[{ required: true, message: intl.get('reviews.validation.required') }]}
                        >
                          <AutoComplete onSearch={handleAutoSearch} onSelect={handleOnChange}>
                            {Array.isArray(gtins) &&
                              gtins.map(gtin => (
                                <Option key={gtin.value} value={gtin.value}>
                                  {gtin.value}
                                </Option>
                              ))}
                          </AutoComplete>
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item
                          name={[name, 'min_qty']}
                          fieldKey={[fieldKey, 'min_qty']}
                          label={intl.get('campaigns.cashbacks.fields.products.minQty')}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[{ required: true, message: intl.get('reviews.validation.required') }]}
                        >
                          <InputNumber />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item
                          name={[name, 'max_qty']}
                          fieldKey={[fieldKey, 'max_qty']}
                          label={intl.get('campaigns.cashbacks.fields.products.maxQty')}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[{ required: true, message: intl.get('reviews.validation.required') }]}
                        >
                          <InputNumber />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item
                          name={[name, 'max_price']}
                          fieldKey={[fieldKey, 'max_price']}
                          label={intl.get('campaigns.cashbacks.fields.products.maxPrice')}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[{ required: true, message: intl.get('reviews.validation.required') }]}
                        >
                          <InputNumber />
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ display: campaignReceiptLevel ? 'none' : 'block' }}>
                        <Form.Item
                          name={[name, 'cashback_per_x_product']}
                          fieldKey={[fieldKey, 'cashback_per_x_product']}
                          label={intl.get('campaigns.cashbacks.fields.products.perxProduct')}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: !campaignReceiptLevel,
                              message: intl.get('reviews.validation.required')
                            }
                          ]}
                        >
                          <InputNumber />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item
                          name={[name, 'required']}
                          fieldKey={[fieldKey, 'required']}
                          label={intl.get('campaigns.cashbacks.fields.products.required')}
                          validateTrigger={['onChange', 'onBlur']}
                          help={intl.get('campaigns.cashbacks.fields.products.requiredTip')}
                        >
                          <Switch values={[true, false]} />
                        </Form.Item>
                      </Col>
                      {fields.length > 1 && (
                        <Button onClick={() => remove(name)}>{intl.get('campaigns.cashbacks.actions.remove')}</Button>
                      )}
                    </Row>
                  </ST.Formlist>
                ))}
                <ST.AddProduct>
                  <Button
                    type='primary'
                    onClick={() =>
                      add({
                        required: true
                      })
                    }
                  >
                    {intl.get('campaigns.cashbacks.actions.add')}
                  </Button>
                </ST.AddProduct>
              </>
            )}
          </Form.List>
        </ST.Section>
        <Row gutter={16}>
          <Col className='gutter-row' span={12}>
            <Button type='primary' onClick={handlePrev}>
              {intl.get('campaigns.cashbacks.actions.previous')}
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

ProductsForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  onPublished: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default ProductsForm

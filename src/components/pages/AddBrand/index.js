import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Select, Row, Col } from 'antd'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import useCountries from '../../../data/settings/agt/countries'
import billingPlan from '../../../data/billing/billingPlans'
import billingFormSubmit from '../../../data/billing/billingFormSubmit'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import { ExtendedPrefixHint } from './styles'

export const FormWrapper = styled(Col)`
  padding: 30px;
  background: white;
`
export const H6 = styled.h6`
  border-bottom: 1px solid #ef3d46;
  font-size: 30px;
  font-weight: 700;
  font-family: Roboto;
`
export const H3 = styled.h3`
  font-size: 23px;
  font-weight: 700;
  font-family: Roboto;
`
export const A = styled.a`
  color: rgb(178, 179, 178);
  text-decoration: underline;
  margin: 0 10px;
`
export const P = styled.p`
  position: relative;
  top: -15px;
  color: rgb(178, 179, 178);
`

const { Option } = Select
const validateMessages = {
  required: ' is required!',
  types: {
    email: ' is not a valid email!',
    number: ' is not a valid number!'
  },
  number: {
    range: ' must be between and '
  }
}

const AddBrand = () => {
  const [checked, setChecked] = useState(false)
  const { result: countries } = useCountries()
  const { data } = billingPlan()
  const onFinish = async values => {
    const cloneValues = values
    cloneValues.brand_name = values.brand_name?.split(',')
    const { result: res, error } = await billingFormSubmit(cloneValues)
    if (res?.status) {
      toast.success('successfully saved')
      window.history.back()
    }
    if (error) {
      toast.error(error)
    }
  }
  const [form] = Form.useForm()

  return (
    <div>
      <H6>Add another brand to your account</H6>
      <H3>Brand Details</H3>
      <Form name='nest-messages' onFinish={onFinish} validateMessages={validateMessages} layout='vertical' form={form}>
        <Row>
          <FormWrapper span={12}>
            <Form.Item
              name='company_prefix'
              label='Company Prefix'
              rules={[
                {
                  required: true,
                  message: 'Company prefix is the first 7 digits of company barcode'
                },
                {
                  validator(_, value) {
                    if (!value || (value.length >= 7 && value.length <= 12)) {
                      return Promise.resolve()
                    }
                    return Promise.reject('Company prefix: Must be at between 7 and 12 digits')
                  }
                }
              ]}
            >
              <CustomInputNumber
                style={{ paddingTop: 2, paddingBottom: 2 }}
                placeholder='Please enter the company prefix'
              />
            </Form.Item>
            <Form.Item
              name='name'
              label='Participant Name'
              rules={[
                {
                  required: true,
                  message: 'Participant Name: Required'
                }
              ]}
            >
              <Input placeholder='eg. Main AU, Retailer 2 UK, Grocery' />
            </Form.Item>
            <Form.Item
              name='brand_name'
              label='Brand Names'
              rules={[
                {
                  required: true,
                  message: 'Brand names: Required'
                }
              ]}
            >
              <Input placeholder='eg. Brand1, MyBrand, OtherBrand, Custom Brand Name' />
            </Form.Item>
            <P>Specify brand names separated by coma</P>
            <Form.Item
              name='country'
              label='Assign Country'
              rules={[
                {
                  required: true,
                  message: 'Assigned country: Required'
                }
              ]}
            >
              <Select placeholder='Select Country'>
                {Array.isArray(countries) &&
                  countries.map(country => (
                    <Option key={country.numeric_code} value={country.numeric_code} data={country}>
                      {country.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='gs1_activation_code'
              label='Special Code (optional)'
              // rules={[
              //   {
              //     required: true,
              //     message: 'Special code: Required'
              //   }
              // ]}
            >
              <Input placeholder='Please enter special code if applicable' />
            </Form.Item>
            <Form.Item
              name='pending_plan'
              label='Plan'
              // rules={[
              //   {
              //     required: true,
              //     message: 'Special code: Required'
              //   }
              // ]}
            >
              <Select>
                {data?.list.map(res => (
                  <Option key={res.id} value={res.id} data={res}>
                    {res.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='agreement'
              rules={[
                {
                  validator() {
                    if (checked) {
                      return Promise.resolve()
                    }
                    return Promise.reject('This field: Required')
                  }
                }
              ]}
            >
              <Checkbox onChange={() => setChecked(!checked)}>
                I agree to Shping`s
                <A target='_blank' rel='noopener noreferrer' href='/terms.html'>
                  Terms of Service
                </A>
                and
                <A target='_blank' rel='noopener noreferrer' href='/privacy.html'>
                  Privacy Policy
                </A>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' danger>
                Add Brand To My Account
              </Button>
            </Form.Item>
          </FormWrapper>
          <Col span={1}>
            <ExtendedPrefixHint />
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default AddBrand

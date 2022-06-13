import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Form, Button, Row, Col, Input, Slider, Divider } from 'antd'
import intl from 'react-intl-universal'
import * as ST from './styles'
import IconButton from '../../molecules/IconButton'
import SummaryTemplatePreview from './SummaryTemplatePreview'
import Switch from '../../atoms/Switch'
import PublishConfirmDialog from './PublishConfirmDialog'
import useDisableButton from '../../../hooks/useDisableButton'

const { TextArea } = Input
// const { Option } = Select
const types = [
  { label: 'TEXT', value: 'text' },
  { label: 'TEXTAREA', value: 'textbox' },
  { label: 'RATING', value: 'rating' },
  { label: 'QUESTION', value: 'question' },
  { label: 'IMAGE', value: 'image' },
  { label: 'CONTRACT', value: 'contact' },
  { label: 'RECEIPT', value: 'receipt' },
  { label: 'BANK DETAILS', value: 'cashout_account' },
  { label: 'PHONE VERIFICATION', value: 'phone_verification' }
]
const initialStaging = {}

const CardForm = ({ initialValues, prev, next, onPublished, onSave }) => {
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  const [editStep, setEditStep] = useState(null)
  const [selected, setSelected] = useState('text')
  const [steps, setSteps] = useState(() => {
    if (initialValues.card && initialValues.card.steps)
      return initialValues.card.steps.map(({ type, ...rest }) => ({ [type]: rest }))
    return []
  })
  const [form] = Form.useForm()
  const handleEditStep = i => {
    const step = steps[i]

    setSelected(Object.keys(step)[0])
    setEditStep(i)
    form.setFieldsValue(Object.values(step)[0])
  }

  const handleRemoveStep = i => {
    const clonedSteps = [...steps]
    clonedSteps.splice(i, 1)
    setSteps(clonedSteps)
    toast.success(intl.get('reviews.templates.steps.removeMessage'))
  }

  const handleClickSave = values => {
    let newSteps = []
    if (editStep) {
      newSteps = steps.map((step, i) => {
        if (i === editStep) {
          return { [selected]: values }
        }
        return step
      })
      toast.success(intl.get('reviews.templates.steps.updateMessage'))
    } else {
      newSteps = [...steps, { [selected]: values }]
      toast.success(intl.get('reviews.templates.steps.createMessage'))
    }
    setSteps(newSteps)
    setEditStep(null)
    form.setFieldsValue({ title: '', text: '' })
    setSelected('text')
  }

  const handleClickCancel = () => {
    form.setFieldsValue({ title: '', text: '' })
    setSelected('text')
  }

  const handleClickType = type => () => {
    setEditStep(null)
    setSelected(type)
    if (initialStaging[type]) {
      if (type === 'question') {
        form.setFieldsValue({ answers: [] })
      }
    }
  }

  const handlePrev = () => {
    const convertSteps = steps.map(step => {
      const key = Object.keys(step)[0]
      const value = Object.values(step)[0]
      return {
        ...value,
        type: key
      }
    })
    const data = { card: {} }
    data.card.steps = convertSteps
    prev(data)
  }
  const handleSubmit = () => {
    if (!steps || (steps && steps.length === 0)) {
      toast.error(intl.get('reviews.validation.steps'))
      return
    }
    const convertSteps = steps.map(step => {
      const key = Object.keys(step)[0]
      const value = Object.values(step)[0]
      return {
        ...value,
        type: key
      }
    })
    const data = { card: {} }
    data.card.steps = convertSteps
    next(data)
  }
  const handleChangeCorrect = name => v => {
    if (v === 'active') {
      const { answers } = form.getFieldsValue()
      const newAnswers = answers.map((answer, index) => {
        const newAnswer = answer
        if (name !== index) {
          newAnswer.correct = 'inactive'
        }
        return newAnswer
      })
      form.setFieldsValue({ answers: newAnswers })
    }
  }
  const getFormValues = () => {
    if (!steps || (steps && steps.length === 0)) {
      toast.error(intl.get('reviews.validation.steps'))
      return null
    }
    const convertSteps = steps.map(step => {
      const key = Object.keys(step)[0]
      const value = Object.values(step)[0]
      return {
        ...value,
        type: key
      }
    })
    const data = { card: {} }
    data.card.steps = convertSteps
    return data
  }
  const [publishFormVisible, setPublishFormVisible] = useState(false)
  const [disabledSave, setDisabledSave] = useDisableButton(false)
  const handleSave = () => {
    setDisabledSave(true)
    const values = getFormValues()
    if (values) onSave(values)
  }
  const handlePublish = () => {
    setPublishFormVisible(true)
  }
  const publishedSubmit = () => {
    const values = getFormValues()
    if (values) onPublished(values)
  }
  return (
    <ST.TransBackground>
      <Row>
        <Col span={17}>
          <ST.LeftWrapper>
            {/* <Form
              name='card-edit'
              layout='vertical'
              id='card-edit'
              form={form1}
              onFinishFailed={onFinishFailed}
              initialValues={initialValues}
            >
              <Row>
                <Col span={10}>
                  <Form.Item
                    name={['card', 'icon']}
                    label={intl.get('campaigns.cashbacks.fields.icon')}
                    rules={[{ required: true, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
                  >
                    <Select>
                      <Option value='action'>Action</Option>
                      <Option value='brand'>Brand</Option>
                      <Option value='contact'>Contact</Option>
                      <Option value='fb'>Fb</Option>
                      <Option value='support'>Support</Option>
                      <Option value='verify'>Verify</Option>
                      <Option value='warning'>Warning</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form> */}
            <div>
              <ST.Label>{intl.get('reviews.templates.form.type.header')}</ST.Label>
              <Row align='center'>
                {types &&
                  types.map(type => (
                    <ST.TypeButton
                      key={type.value}
                      size='small'
                      type='primary'
                      htmlType='button'
                      ghost={selected !== type.value}
                      onClick={handleClickType(type.value)}
                    >
                      {type.label}
                    </ST.TypeButton>
                  ))}
              </Row>
            </div>
            <Form
              name='card-step'
              id='card-step'
              layout='vertical'
              form={form}
              onFinish={handleClickSave}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name='title'
                label={intl.get('reviews.templates.form.type.title')}
                rules={[{ required: true, message: intl.get('reviews.validation.required') }]}
              >
                <Input size='large' placeholder={intl.get('reviews.templates.form.type.title')} maxLength={100} />
              </Form.Item>
              {selected === 'text' && (
                <Form.Item
                  name='text'
                  label={intl.get('reviews.templates.form.type.text.label')}
                  rules={[{ required: true, message: intl.get('reviews.validation.required') }]}
                >
                  <TextArea
                    size='large'
                    placeholder={intl.get('reviews.templates.form.type.text.label')}
                    maxLength={500}
                  />
                </Form.Item>
              )}
              {selected === 'rating' && (
                <Form.Item
                  name='text'
                  label={intl.get('reviews.templates.form.type.rating.label')}
                  rules={[{ required: true, message: intl.get('reviews.validation.required') }]}
                >
                  <Slider size='large' max={5} min={1} step={1} />
                </Form.Item>
              )}
              {selected === 'question' && (
                <>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name='question'
                        label={intl.get('reviews.templates.form.question.label')}
                        rules={[{ required: true, message: intl.get('reviews.validation.required') }]}
                      >
                        <Input size='large' placeholder={intl.get('reviews.templates.form.type.question.label')} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.List name='answers'>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, fieldKey }) => (
                          <ST.Formlist key={key}>
                            <Form.Item
                              required={false}
                              label={intl.get('reviews.templates.form.type.question.answer', {
                                number: name + 1
                              })}
                            >
                              {fields.length > 1 && (
                                <Button onClick={() => remove(name)}>
                                  <IconButton type='Close' styleParam={{ fontSize: '25px' }} />
                                </Button>
                              )}
                              <Form.Item
                                name={[name, 'answer']}
                                fieldKey={[fieldKey, 'answer']}
                                noStyle
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[{ required: true, message: intl.get('reviews.validation.required') }]}
                              >
                                <Input
                                  size='large'
                                  placeholder={intl.get('reviews.templates.form.type.question.answer', {
                                    number: name + 1
                                  })}
                                />
                              </Form.Item>
                              <Form.Item
                                name={[name, 'correct']}
                                fieldKey={[fieldKey, 'correct']}
                                noStyle
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[{ required: true, message: intl.get('reviews.validation.required') }]}
                              >
                                <Switch onChange={handleChangeCorrect(name)} values={[true, false]} />
                              </Form.Item>
                            </Form.Item>
                          </ST.Formlist>
                        ))}
                        <ST.AddAnswer>
                          <Button
                            type='button'
                            onClick={() =>
                              add({
                                answer: ''
                              })
                            }
                          >
                            <IconButton type='Plus' styleParam={{ fontSize: '25px' }} />
                          </Button>
                          <p>{intl.get('reviews.templates.form.type.question.addAnswer')}</p>
                        </ST.AddAnswer>
                      </>
                    )}
                  </Form.List>
                </>
              )}
              <Row align='center'>
                <Button size='medium' htmlType='submit' type='primary'>
                  {intl.get('reviews.templates.steps.save')}
                </Button>
                <Button size='medium' type='primary' onClick={handleClickCancel}>
                  {intl.get('reviews.templates.steps.cancel')}
                </Button>
              </Row>
            </Form>
          </ST.LeftWrapper>
        </Col>
        <Col span={6} offset={1}>
          <ST.SummaryContainer id='summaryContainer'>
            <SummaryTemplatePreview
              steps={steps}
              active={editStep}
              onEditStep={handleEditStep}
              onRemoveStep={handleRemoveStep}
            />
          </ST.SummaryContainer>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className='gutter-row' span={12}>
          <Button size='medium' type='primary' htmlType='button' onClick={handlePrev}>
            {intl.get('campaigns.cashbacks.actions.previous')}
          </Button>
        </Col>
        {initialValues.id ? (
          <>
            <Col className='gutter-row' span={4} style={{ textAlign: 'right' }}>
              <Button size='medium' type='primary' htmlType='button' onClick={handleSubmit}>
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
            <Button size='medium' type='primary' htmlType='button' onClick={handleSubmit}>
              {intl.get('campaigns.cashbacks.actions.next')}
            </Button>
          </Col>
        )}
      </Row>
      {initialValues.id && (
        <PublishConfirmDialog
          visible={publishFormVisible}
          setVisible={setPublishFormVisible}
          published={publishedSubmit}
        />
      )}
    </ST.TransBackground>
  )
}

CardForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  onPublished: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default CardForm

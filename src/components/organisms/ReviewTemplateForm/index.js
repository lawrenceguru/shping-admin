import React, { useState } from 'react'
import { toast } from 'react-toastify'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form, Input, Row, Col, InputNumber, Button, Select } from 'antd'
import { useHistory } from 'react-router-dom'

import IconButton from '../../molecules/IconButton'
import SummaryTemplatePreview from './ReviewsEditorPreview'
import * as ST from './styles'

const { TextArea } = Input
const { Option } = Select

const types = ['text', 'textbox', 'rating', 'question', 'image', 'video']
const initialStaging = {
  textbox: {
    coin_weight: 1
  },
  rating: {
    coin_weight: 1
  },
  question: {
    coin_weight: 1
  },
  image: {
    coin_weight: 1
  },
  video: {
    coin_weight: 1
  }
}

const ReviewTemplateForm = ({ template, onFinish }) => {
  const [editStep, setEditStep] = useState(null)
  const [selected, setSelected] = useState('text')
  const [templatName, setTemplateName] = useState(template.name)
  const [active, setActive] = useState(template.active)
  const [steps, setSteps] = useState(() => {
    if (template.steps) return template.steps.map(({ type, ...rest }) => ({ [type]: rest }))
    return []
  })
  const [form] = Form.useForm()
  const handleEditStep = i => {
    const step = steps[i]

    setSelected(Object.keys(step)[0])
    // const selectedStep = Object.keys(step)[0]
    // if (selectedStep === 'question') {
    //   step.answers = step.question.answers
    // }
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
        form.setFieldsValue({ coin_weight: 1, choice: 'single', answers: [''] })
      } else {
        form.setFieldsValue({ coin_weight: 1 })
      }
    }
  }

  const handleSubmit = () => {
    if (!templatName || !steps || (steps && steps.length === 0)) {
      if (!templatName) {
        toast.error(intl.get('reviews.validation.name'))
      } else {
        toast.error(intl.get('reviews.validation.steps'))
      }
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
    onFinish(templatName, active, convertSteps)
  }

  const onFinishFailed = error => {
    console.log(error)
  }
  const history = useHistory()
  const handleCancel = () => {
    history.push('/admin/reviews/templates')
  }
  return (
    <>
      <h2>{intl.get('reviews.templateEditor')}</h2>
      <Row>
        <Col span={15}>
          <ST.LeftWrapper>
            <Form
              name='template-edit'
              id='template-edit'
              layout='vertical'
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
            >
              <Row justify='space-around' align='middle'>
                <Col span={19}>
                  <Form.Item
                    name='name'
                    label={intl.get('reviews.templates.form.nameTitle')}
                    rules={[{ required: true, message: intl.get('reviews.validation.name') }]}
                  >
                    <Input
                      size='large'
                      placeholder={intl.get('reviews.templates.form.namePlaceholder')}
                      defaultValue={templatName}
                      value={templatName}
                      onChange={e => setTemplateName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={4} offset={1}>
                  <ST.StyledSwitch
                    checkedChildren={intl.get('common.active')}
                    unCheckedChildren={intl.get('common.inactive')}
                    checked={active}
                    onChange={v => setActive(v)}
                  />
                </Col>
              </Row>
            </Form>
            <div>
              <ST.Label>{intl.get('reviews.templates.form.type.header')}</ST.Label>
              <Row align='center'>
                {types &&
                  types.map(type => (
                    <ST.TypeButton
                      key={type}
                      size='small'
                      type='primary'
                      htmlType='button'
                      ghost={selected !== type}
                      onClick={handleClickType(type)}
                    >
                      {type}
                    </ST.TypeButton>
                  ))}
              </Row>
            </div>
            <Form
              name='template-step'
              id='template-step'
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
              {selected !== 'text' && (
                <Form.Item
                  name='coin_weight'
                  label={intl.get('reviews.templates.form.type.weight')}
                  rules={[
                    { required: true, message: intl.get('reviews.validation.required') },
                    { min: 0, type: 'number', message: intl.get('reviews.validation.minzero') },
                    { max: 1000, type: 'number', message: intl.get('reviews.validation.maxthousand') }
                  ]}
                >
                  <InputNumber
                    size='large'
                    placeholder={intl.get('reviews.templates.form.type.weight')}
                    maxLength={4}
                  />
                </Form.Item>
              )}
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
              {selected === 'question' && (
                <>
                  <Row>
                    <Col span={20}>
                      <Form.Item
                        name='question'
                        label={intl.get('reviews.templates.form.question.label')}
                        rules={[{ required: true, message: intl.get('reviews.validation.required') }]}
                      >
                        <Input size='large' placeholder={intl.get('reviews.templates.form.type.question.label')} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        name='choice'
                        rules={[{ required: true, message: intl.get('reviews.validation.required') }]}
                      >
                        <Select size='large'>
                          <Option value='single'>Single</Option>
                          <Option value='multiple'>Multiple</Option>
                        </Select>
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
        <Col span={8} offset={1}>
          <ST.SummaryContainer id='summaryContainer'>
            <SummaryTemplatePreview
              values={{ name: templatName, active }}
              steps={steps}
              active={editStep}
              onEditStep={handleEditStep}
              onRemoveStep={handleRemoveStep}
            />
          </ST.SummaryContainer>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={8} offset={8}>
          <Button size='medium' type='primary' htmlType='button' onClick={handleSubmit}>
            {intl.get('reviews.templates.actions.save')}
          </Button>
          <Button size='medium' type='primary' htmlType='button' onClick={handleCancel}>
            {intl.get('reviews.templates.actions.cancel')}
          </Button>
        </Col>
      </Row>
    </>
  )
}
ReviewTemplateForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  template: PropTypes.object,
  onFinish: PropTypes.func.isRequired
}

ReviewTemplateForm.defaultProps = {
  template: {}
}
export default ReviewTemplateForm

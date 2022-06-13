import React, { useState } from 'react'
import intl from 'react-intl-universal'
import { Form, Input, Button, Row, Col } from 'antd'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { PARTICIPANT_API } from 'constants/url'
import { toast } from 'react-toastify'
import { CopyOutlined } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Wrapper, StyledForm } from './styles'
// import Button from '../../atoms/Button'
import Tags from '../../molecules/Tags/form'
import useProfileParticipant from '../../../data/participant/users/participant'
import Loader from '../../templates/Loader'

const ProfileParticipant = () => {
  const ticket = useSelector(({ identity }) => identity.ticket)
  const { result: values, mutate } = useProfileParticipant()
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
  const [copy, setCopy] = useState(false)
  const onCopy = () => {
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 2000)
  }
  return (
    <Wrapper>
      <StyledForm>
        <h3>Public API</h3>
        <p>The public API key helps developers connect open Shping Services to their integrations.</p>
        {values ? (
          <Form layout='vertical' onFinish={onFinish} id='participant' initialValues={values}>
            <Form.Item
              label={intl.get('profileParticipant.fields.allowedWebsites')}
              name='api_domains'
              rules={[{ required: false, message: intl.get('campaigns.cashbacks.requiredMessage') }]}
            >
              <Tags />
            </Form.Item>
            <Row>
              <Col span='21'>
                <Form.Item label={intl.get('profileParticipant.fields.publicApiKey')} name='api_key'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span='2' offset={1} style={{ marginTop: '32px' }}>
                <CopyToClipboard onCopy={onCopy} text={values?.api_key}>
                  {copy ? <Button danger>Copied!</Button> : <Button icon={<CopyOutlined />} />}
                </CopyToClipboard>
              </Col>
            </Row>
            <Button type='danger' size='large' htmlType='submit' form='participant'>
              {intl.get('integration.submitButton')}
            </Button>
          </Form>
        ) : (
          <Loader />
        )}
      </StyledForm>
    </Wrapper>
  )
}

export default ProfileParticipant

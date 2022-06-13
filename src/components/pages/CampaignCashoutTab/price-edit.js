import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { REWARDS_API } from 'constants/url'
import { Form, Button, Input, Row, Col, InputNumber } from 'antd'
import * as ST from './styles'
import Loader from '../../templates/Loader'
import useCashbackSubmission from '../../../data/rewards/submission'
import GTINAutoComplete from '../../atoms/GTINAutoComplete'

const CampaignCashbackSubmissionPriceEditPage = ({ match }) => {
  const { params } = match
  const history = useHistory()
  const { submission, mutate } = useCashbackSubmission(params.submission_id)
  const ticket = useSelector(({ identity }) => identity.ticket)
  const price =
    typeof submission === 'object' &&
    submission.analyzed_receipt.data.expanded_prices.find(item => item.id === params.price_id)

  const onFinish = values => {
    const data = {
      id: params.submission_id,
      expanded_prices: [values]
    }
    axios
      .put(`${REWARDS_API}/cashbacks/submissions/receipt/items`, data, {
        headers: {
          authenticateit_identity_ticket: ticket
        }
      })
      .then(() => {
        toast.success(intl.get('campaigns.cashbacks.submissions.prices.updateSuccess'))
        history.push(`/admin/campaigns/cashbacks/submissions/${params.submission_id}`)
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
          toast.error(intl.get('campaigns.cashbacks.submissions.prices.updateFailed'))
        }
      })
  }
  const handleCancel = () => history.push(`/admin/campaigns/cashbacks/submissions/${params.submission_id}`)
  useEffect(() => {
    mutate()
  }, [])
  return (
    <ST.Wrapper>
      {typeof submission === 'object' ? (
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 6 }}
          name='price-form'
          id='price-form'
          onFinish={onFinish}
          initialValues={price}
        >
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>
          <Form.Item name='gtin' label={intl.get('campaigns.cashbacks.submissions.prices.gtin')}>
            <GTINAutoComplete />
          </Form.Item>
          <Form.Item name='name' label={intl.get('campaigns.cashbacks.submissions.prices.name')}>
            <Input />
          </Form.Item>
          <Form.Item name='value' label={intl.get('campaigns.cashbacks.submissions.prices.amount')}>
            <Input />
          </Form.Item>
          <Form.Item name='quantity' label={intl.get('campaigns.cashbacks.submissions.prices.quantity')}>
            <InputNumber min={0} />
          </Form.Item>
          <Row gutter={16}>
            <Col className='gutter-row' span={3} offset={3}>
              <Button type='primary' htmlType='submit'>
                {intl.get('campaigns.cashbacks.actions.save')}
              </Button>
            </Col>
            <Col className='gutter-row' span={9}>
              <Button type='primary' onClick={handleCancel}>
                {intl.get('common.cancel')}
              </Button>
            </Col>
          </Row>
        </Form>
      ) : (
        <Loader />
      )}
    </ST.Wrapper>
  )
}
CampaignCashbackSubmissionPriceEditPage.propTypes = {
  match: PropTypes.shape({})
}

CampaignCashbackSubmissionPriceEditPage.defaultProps = {
  match: {}
}

export default CampaignCashbackSubmissionPriceEditPage

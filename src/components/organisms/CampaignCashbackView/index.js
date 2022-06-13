import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import moment from 'moment'
import QRCode from 'react-qr-code'
import * as ST from './styles'
import Table from '../../molecules/Table'

const columns = [
  {
    key: 'gtin_name',
    dataIndex: 'name',
    width: '80px',
    title: intl.get('campaigns.cashbacks.tableHeader.name')
  },
  {
    key: 'gtin',
    dataIndex: 'gtin',
    width: '80px',
    title: intl.get('campaigns.cashbacks.fields.products.gtn')
  },
  {
    key: 'min_qty',
    dataIndex: 'min_qty',
    width: '80px',
    title: intl.get('campaigns.cashbacks.fields.products.minQty')
  },
  {
    key: 'max_qty',
    dataIndex: 'max_qty',
    width: '80px',
    title: intl.get('campaigns.cashbacks.fields.products.maxQty')
  },
  {
    key: 'required',
    dataIndex: 'required',
    width: '80px',
    title: intl.get('campaigns.cashbacks.fields.products.required'),
    render: data => {
      return data
        ? intl.get('campaigns.cashbacks.fields.products.requiredTrue')
        : intl.get('campaigns.cashbacks.fields.products.requiredFalse')
    }
  }
]

const formatPrice = value => {
  if (value && !Number.isNaN(value)) {
    return Number(value).toFixed(2)
  }
  return value
}

const CashbackView = ({ cashback }) => {
  const maxValue = cashback.purchased_products.reduce((prev, current) =>
    prev.max_price > current.max_price ? prev : current
  )
  return (
    <>
      <ST.Header>
        {cashback.name}
        <span className='sub-title'>
          {moment(cashback.start_date).format('MMMM DD, YYYY')} - {moment(cashback.end_date).format('MMMM DD, YYYY')}
        </span>
        <span className='sub-status'>{cashback.status}</span>
      </ST.Header>
      <ST.Wrapper>
        <ST.Left>
          <ST.Section>
            <ST.SubHeader>{intl.get('campaigns.cashbacks.subViewTitle')}</ST.SubHeader>
            <ST.Table>
              <tbody>
                <tr>
                  <td colSpan={2}>{intl.get('campaigns.cashbacks.fields.campainName')}</td>
                  <td>{intl.get('campaigns.cashbacks.fields.approveMode')}</td>
                  <td>{intl.get('campaigns.cashbacks.fields.viewRetailers')}</td>
                </tr>
                <tr>
                  <td colSpan={2}>{cashback.name}</td>
                  <td>
                    {cashback.auto_approve
                      ? intl.get('campaigns.cashbacks.fields.moderationModeAutomatic')
                      : intl.get('campaigns.cashbacks.fields.moderationModeManual')}
                  </td>
                  <td>{cashback.options.retailers && cashback.options.retailers.join(', ')}</td>
                </tr>
                <tr>
                  <td colSpan={2}>{intl.get('campaigns.cashbacks.fields.startDate')}</td>
                  <td colSpan={2}>{intl.get('campaigns.cashbacks.fields.endDate')}</td>
                </tr>
                <tr>
                  <td colSpan={2}>{moment(cashback.start_date).format('YYYY-MM-DD HH:mm:ss')}</td>
                  <td colSpan={2}>{moment(cashback.end_date).format('YYYY-MM-DD HH:mm:ss')}</td>
                </tr>
                <tr>
                  <td colSpan={4}>{intl.get('campaigns.cashbacks.fields.status')}</td>
                </tr>
                <tr>
                  <td colSpan={4}>{cashback.status}</td>
                </tr>
                <tr>
                  <td>{intl.get('campaigns.cashbacks.fields.campaignBudget')}</td>
                  <td>{intl.get('campaigns.cashbacks.fields.remainingBudget')}</td>
                  <td>{intl.get('campaigns.cashbacks.fields.cashback')}</td>
                  <td>{intl.get('campaigns.cashbacks.fields.maxProductValue')}</td>
                </tr>
                <tr>
                  <td>${cashback.budget.value}</td>
                  <td>${formatPrice(cashback?.spendings?.remaining_balance)}</td>
                  <td>${cashback.options.cashback.value}</td>
                  <td>{maxValue && `$${maxValue.max_price}`}</td>
                </tr>
                <tr>
                  <td colSpan={4}>{intl.get('campaigns.cashbacks.fields.products.labelProducts')}</td>
                </tr>
                <tr>
                  <td colSpan={4} className='products'>
                    <Table data={cashback.purchased_products} columns={columns} rowKey='gtin' />
                  </td>
                </tr>
              </tbody>
            </ST.Table>
          </ST.Section>
        </ST.Left>
        <ST.Right>
          <ST.Section>
            <ST.QRWrapper>
              <QRCode value={cashback.branch_io_link} />
            </ST.QRWrapper>
          </ST.Section>
          <ST.Label>{intl.get('campaigns.cashbacks.deepLink')}:</ST.Label> {cashback.branch_io_link}
          <div>
            <b>
              {intl.get('campaigns.cashbacks.published')}: {moment(cashback.published_at).format('DD MMM YYYY HH:mm')}
            </b>
          </div>
        </ST.Right>
      </ST.Wrapper>
    </>
  )
}
CashbackView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cashback: PropTypes.object
}

CashbackView.defaultProps = {
  cashback: {}
}

export default CashbackView

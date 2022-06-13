import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Checkbox, Button } from 'antd'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SHOPPINGLISTS_API } from 'constants/url'
import * as ST from './styles'
import IconButton from '../../molecules/IconButton'
import { convertFromUint256 } from '../../../utils/helpers/mathOperations'
import LoadingSpinner from '../../atoms/LoadingSpinner'
import { name } from '../../../utils/consts'
import deleteModal from '../../molecules/DeleteModal'
import useShoppinglistsSettings from '../../../data/shoppinglists/advertisement/settings'
import useBillingCompany from '../../../data/billing/company'
import XeroFormModal from '../XeroSettingsModal'

const CustomerCard = ({
  id,
  customer,
  customerInfoIsLoading,
  customerRemoveParticipant,
  customerDeleteData,
  isUpdating,
  handleRefreshCustomer,
  handleRewardsFeeForm,
  handleSetTimezone,
  handleSetTrialPeriod,
  handleSetPaidPeriod,
  handleSetBudget,
  handleChangeFlags
}) => {
  const notProvided = useMemo(() => intl.get('common.notProvided'), [])
  const ticket = useSelector(({ identity }) => identity.ticket)
  // const participant = useSelector(({ identity }) => identity.current_participant)
  const { result, mutate } = useShoppinglistsSettings(id)
  const [settings, setSetting] = useState({
    category_top_ad: false,
    category_top_listing: false,
    keyword_top_ad: false,
    keyword_top_listing: false,
    main_page_ad: false
  })
  const handleChangeShoppinglistsSetting = (checked, key) => {
    axios
      .post(
        `${SHOPPINGLISTS_API}/advertisement/settings/${id}`,
        {
          type: 'system_settings',
          settings: { ...settings, [key]: checked }
        },
        {
          headers: {
            authenticateit_identity_ticket: ticket
          }
        }
      )
      .then(() => {
        toast.success(intl.get('customer.sagas.setFlagSuccess'))
        mutate(`${SHOPPINGLISTS_API}/advertisement/settings/${id}`)
      })
  }
  useEffect(() => {
    if (result) {
      setSetting(result.display_options.system_settings)
    }
  }, [result])
  const { data: company } = useBillingCompany(id)
  const [xero, setXero] = useState(false)
  const openSettingModal = () => {
    setXero(true)
  }
  const closeXeroModal = () => {
    setXero(false)
  }
  return (
    <ST.CardWrapper>
      <ST.RefreshIconContainer>
        <IconButton
          type='Refresh'
          styleParam={{ opacity: customerInfoIsLoading ? 0.4 : 1, fontSize: '35px' }}
          actionFunction={handleRefreshCustomer}
        />
      </ST.RefreshIconContainer>
      <LoadingSpinner key={id} isLoading={customerInfoIsLoading || isUpdating}>
        <ST.InfoWrapper>
          <ST.User>
            <IconButton type='User' styleParam={{ cursor: 'default', fontSize: '120px', marginRight: '20px' }} />
            <Button type='primary' onClick={openSettingModal}>
              {company?.billings?.xero_contact_id
                ? intl.get('customer.info.xeroUpdateButton')
                : intl.get('customer.info.xeroCreateButton')}
            </Button>
          </ST.User>
          <ST.DescriptionWrapper>
            <ST.Header>{id}</ST.Header>
            <ST.Description>
              <p>
                {intl.get('customer.info.name')}: {(customer && customer.name) || notProvided}
              </p>
              <p>
                {intl.get('customer.info.country')}:{' '}
                {(customer && customer.selectedCountry && customer.selectedCountry[name]) || notProvided}
              </p>
              <p>
                {' '}
                {intl.get('customer.info.city')}: {(customer && customer.city) || notProvided}
              </p>
              <p>
                {intl.get('customer.info.timezone')}:{' '}
                {(customer && customer.selectedTimezone && customer.selectedTimezone.name) || notProvided}
              </p>
              <p>
                {intl.get('customer.info.budget')}:{' '}
                {customer && customer.budget ? `$${customer && customer.budget}.00` : notProvided}
              </p>
            </ST.Description>
            <ST.Header>{intl.get('customer.info.billing')}</ST.Header>
            <ST.Description>
              <p>
                {intl.get('customer.info.paidFrom')}: {(customer && customer.paidFrom) || notProvided}
              </p>
              <p>
                {intl.get('customer.info.paidTo')}: {(customer && customer.paidTo) || notProvided}
              </p>
              {customer && customer.selectedBillingCountry && (
                <p>
                  {intl.get('customer.info.country')}: {customer.selectedBillingCountry[name]}
                </p>
              )}
              {customer && customer.user_email && (
                <p>
                  {intl.get('customer.info.email')}:{' '}
                  {(customer.user_email && customer.user_email[0]) || customer.user_email}
                </p>
              )}
              {customer && customer.plan && (
                <p>
                  {intl.get('customer.info.plan')}: {intl.get(`customer.plans.planNames.${customer.plan}`)}
                </p>
              )}
              {customer && customer.trialPeriod && (
                <p>
                  {intl.get('customer.info.trialPeriod')}: {customer.trialPeriod}
                </p>
              )}
              {customer && customer.rewardsFee && (
                <p>
                  {intl.get('customer.info.rewardsFee')}: {customer.rewardsFee}
                </p>
              )}
            </ST.Description>
            <ST.Header>{intl.get('customer.info.balance')}</ST.Header>
            <ST.Description>
              <p>
                {intl.get('customer.info.balance')}:{' '}
                {intl.get('common.coins', {
                  value: customer && customer.coins ? convertFromUint256(customer.coins) : '0'
                })}
              </p>
              {customer && customer.address && (
                <p>
                  {intl.get('customer.info.ethAddress')}: {customer.address}
                </p>
              )}
            </ST.Description>
          </ST.DescriptionWrapper>
          <ST.DescriptionWrapper>
            <ST.FlagsWrapper>
              <Checkbox
                checked={!!(customer && customer.partner_brand)}
                onChange={event => handleChangeFlags(event.target.checked, 'partner_brand', !!customer.paying_customer)}
              >
                {intl.get('customer.filters.partnerBrand')}
              </Checkbox>
              <Checkbox
                checked={!!(customer && customer.paying_customer)}
                onChange={event => handleChangeFlags(event.target.checked, 'paying_customer', !!customer.partner_brand)}
              >
                {intl.get('customer.filters.payingCustomer')}
              </Checkbox>
            </ST.FlagsWrapper>
            <br />
            <br />
            <ST.FlagsWrapper>
              <Checkbox
                checked={!!settings.category_top_ad}
                onChange={event => handleChangeShoppinglistsSetting(event.target.checked, 'category_top_ad')}
              >
                {intl.get('customer.filters.category_top_ad')}
              </Checkbox>
            </ST.FlagsWrapper>
            <ST.FlagsWrapper>
              <Checkbox
                checked={!!settings.category_top_listing}
                onChange={event => handleChangeShoppinglistsSetting(event.target.checked, 'category_top_listing')}
              >
                {intl.get('customer.filters.category_top_listing')}
              </Checkbox>
            </ST.FlagsWrapper>
            <ST.FlagsWrapper>
              <Checkbox
                checked={!!settings.keyword_top_ad}
                onChange={event => handleChangeShoppinglistsSetting(event.target.checked, 'keyword_top_ad')}
              >
                {intl.get('customer.filters.keyword_top_ad')}
              </Checkbox>
            </ST.FlagsWrapper>
            <ST.FlagsWrapper>
              <Checkbox
                checked={!!settings.keyword_top_listing}
                onChange={event => handleChangeShoppinglistsSetting(event.target.checked, 'keyword_top_listing')}
              >
                {intl.get('customer.filters.keyword_top_listing')}
              </Checkbox>
            </ST.FlagsWrapper>
            <ST.FlagsWrapper>
              <Checkbox
                checked={!!settings.main_page_ad}
                onChange={event => handleChangeShoppinglistsSetting(event.target.checked, 'main_page_ad')}
              >
                {intl.get('customer.filters.main_page_ad')}
              </Checkbox>
            </ST.FlagsWrapper>
          </ST.DescriptionWrapper>
        </ST.InfoWrapper>
        <ST.ActionsWrapper>
          <IconButton
            popText={intl.get('customer.actions.budgetTitle')}
            type='Budget'
            styleParam={{ fontSize: '20px' }}
            actionFunction={() => handleSetBudget(id)}
          />
          <IconButton
            popText={intl.get('customer.actions.paidTitle')}
            type='Reward'
            styleParam={{ fontSize: '20px' }}
            actionFunction={() => handleRewardsFeeForm(id)}
          />
          <IconButton
            popText={intl.get('customer.actions.paidTitle')}
            type='Dollar'
            styleParam={{ fontSize: '20px' }}
            actionFunction={() => handleSetPaidPeriod(id)}
          />
          <IconButton
            popText={intl.get('customer.actions.trialTitle')}
            type='Calendar'
            styleParam={{ fontSize: '20px' }}
            actionFunction={() => handleSetTrialPeriod(id)}
          />
          <IconButton
            popText={intl.get('customer.actions.removeTitle')}
            type='DeleteTrash'
            styleParam={{ fontSize: '20px' }}
            actionFunction={() =>
              deleteModal(
                () => customerDeleteData({ id, isInfo: true }),
                intl.get('customer.dialog.removeCustomerDataHeader')
              )
            }
          />
          <IconButton
            popText={intl.get('customer.actions.timezone')}
            type='Globe'
            styleParam={{ fontSize: '20px' }}
            actionFunction={() => handleSetTimezone(id)}
          />
          <IconButton
            popText={intl.get('customer.actions.removeParticipant')}
            type='DeleteData'
            styleParam={{ fontSize: '20px' }}
            actionFunction={() =>
              deleteModal(
                () => customerRemoveParticipant({ id, isInfo: true }),
                intl.get('customer.dialog.removeParticipant')
              )
            }
          />
        </ST.ActionsWrapper>
      </LoadingSpinner>
      {xero && <XeroFormModal visible={xero} closeModal={closeXeroModal} xero={company} participantId={id} />}
    </ST.CardWrapper>
  )
}

CustomerCard.propTypes = {
  id: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  customer: PropTypes.object,
  customerInfoIsLoading: PropTypes.bool,
  customerRemoveParticipant: PropTypes.func.isRequired,
  customerDeleteData: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool,
  handleRefreshCustomer: PropTypes.func.isRequired,
  handleRewardsFeeForm: PropTypes.func.isRequired,
  handleSetTimezone: PropTypes.func.isRequired,
  handleSetTrialPeriod: PropTypes.func.isRequired,
  handleSetPaidPeriod: PropTypes.func.isRequired,
  handleSetBudget: PropTypes.func.isRequired,
  handleChangeFlags: PropTypes.func.isRequired
}

CustomerCard.defaultProps = {
  id: null,
  customer: null,
  customerInfoIsLoading: false,
  isUpdating: false
}

export default CustomerCard

import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { toast } from 'react-toastify'
import * as ST from './styles'
import IconButton from '../../molecules/IconButton'
import LoadingSpinner from '../../atoms/LoadingSpinner'
import { formatDateTime } from '../../../utils/helpers/date'
import Button from '../../atoms/Button'
import SendTimelineForm from '../../atoms/SendTimelineForm'
import ModalForm from '../../atoms/ModalForm'
import RewardsBanForm from '../../atoms/RewardsBanForm'

const CustomerCard = ({
  id,
  user,
  isLoading,
  isUpdating,
  isUserBlocked,
  isUserRewardsBanned,
  usersSetBlockStatus,
  usersSetRewardsBan,
  usersSendTimelineMessage
}) => {
  const isBanned = useMemo(() => {
    return isUserBlocked || isUserRewardsBanned
  }, [isUserBlocked, isUserRewardsBanned])

  const setBlockStatus = useCallback(() => {
    usersSetBlockStatus({
      id,
      type: isUserBlocked ? 'unset' : 'set'
    })
  }, [id, isUserBlocked])

  const sendTimelineMessage = useCallback(() => {
    let message

    ModalForm(
      () => {
        if (!message) {
          toast.error(intl.get('users.timelineForm.messageError'))
          return false
        }

        usersSendTimelineMessage({
          id,
          message,
          type: 'notification'
        })

        return true
      },
      <SendTimelineForm onChange={value => (message = value)} />,
      '50%',
      intl.get('users.timelineForm.send')
    )
  }, [id])

  const setRewardsBan = useCallback(() => {
    let value

    ModalForm(
      () => {
        if (!value || !value.to) {
          toast.error(intl.get('users.rewardsBanForm.dateError'))
          return false
        }

        if (!value || !value.reason) {
          toast.error(intl.get('users.rewardsBanForm.reasonError'))
          return false
        }

        value.to.set('hour', 12)
        value.to.set('minute', 0)
        value.to.set('second', 0)

        usersSetRewardsBan({
          id,
          reason: value.reason,
          to: `${value.to.format('YYYY-MM-DDTHH:mm:ss')}Z`
        })

        return true
      },
      <RewardsBanForm onChange={val => (value = val)} />,
      '50%',
      intl.get('users.rewardsBanForm.ban')
    )
  }, [id])

  return (
    <ST.CardWrapper>
      <LoadingSpinner key={id} isLoading={isLoading || isUpdating}>
        <ST.InfoWrapper>
          <IconButton
            type={isBanned ? 'UserReject' : 'User'}
            styleParam={{
              cursor: 'default',
              fontSize: '120px',
              marginRight: '20px',
              ...(isBanned && { color: '#ef3d46' })
            }}
          />
          <ST.DescriptionWrapper>
            {isBanned && <ST.BannedHeader> {intl.get('users.form.userBanned')}</ST.BannedHeader>}
            <ST.Header>{id}</ST.Header>
            {user && (
              <ST.DescriptionColumns>
                <ST.Description>
                  <p>
                    {intl.get('users.tableHeaders.firstName')}: {user.first_name || '-'}
                  </p>
                  <p>
                    {intl.get('users.tableHeaders.lastName')}: {user.last_name || '-'}
                  </p>
                  <p>
                    {intl.get('users.tableHeaders.email')}: {user.email || intl.get('no')}
                  </p>
                  <p>
                    {intl.get('users.filter.phoneNumber')}: {user.phone || intl.get('no')}
                  </p>
                  <p>
                    {intl.get('users.tableHeaders.created')}: {formatDateTime(user.created)}
                  </p>
                  <p>
                    {intl.get('users.tableHeaders.lastAccess')}: {formatDateTime(user.last_access)}
                  </p>
                  <p>
                    {intl.get('users.tableHeaders.totalBalance')}:{' '}
                    {intl.get('common.coins', { value: user.total_balance })}
                  </p>
                  <p>
                    {intl.get('users.tableHeaders.accountBalance')}:{' '}
                    {intl.get('common.coins', { value: user.account_balance })}
                  </p>
                  <p>
                    {intl.get('users.filter.totalDaysWithScansHeader')}: {user.total_days_with_scans}
                  </p>
                  <p>
                    {intl.get('users.filter.totalDaysWithoutScansHeader')}: {user.total_days_without_scans}
                  </p>
                  <p>
                    {intl.get('users.filter.totalActiveDaysRatioHeader')}: {user.total_active_days_ratio}
                  </p>
                  <p>
                    {intl.get('users.filter.totalInactiveDaysRatioHeader')}: {user.total_inactive_days_ratio}
                  </p>
                  <p>
                    {intl.get('users.filter.totalBuddiesHeader')}: {user.total_buddies}
                  </p>
                  <p>
                    {intl.get('users.filter.totalCashoutTransactionsHeader')}: {user.total_cashout_transactions}
                  </p>
                  <p>
                    {intl.get('users.filter.totalCashoutValueShpingHeader')}:{' '}
                    {intl.get('common.coins', { value: user.total_cashout_value_shping })}
                  </p>
                  <p>
                    {intl.get('users.filter.totalLinkedBankAccountsHeader')}: {user.total_linked_bank_accounts}
                  </p>
                  <p>
                    {intl.get('users.filter.totalErc20TransactionsHeader')}: {user.total_erc20_transactions}
                  </p>
                  <p>
                    {intl.get('users.filter.totalErc20ValueShpingHeader')}:{' '}
                    {intl.get('common.coins', { value: user.total_erc20_value_shping })}
                  </p>
                  <p>
                    {intl.get('users.filter.totalErc20AccountsHeader')}: {user.total_erc20_accounts}
                  </p>
                  <p>
                    {intl.get('users.filter.totalAvearageScansPerActiveDayHeader')}:{' '}
                    {user.total_avearage_scans_per_active_day}
                  </p>
                  <p>
                    {intl.get('users.filter.totalBuddiesInvitationsAcceptedHeader')}:{' '}
                    {user.total_buddies_invitations_accepted}
                  </p>
                  <p>
                    {intl.get('users.filter.totalBuddiesInvitationsSentHeader')}: {user.total_buddies_invitations_sent}
                  </p>
                  <p>
                    {intl.get('users.filter.totalBuddiesReceivedInvitationsAcceptedHeader')}:{' '}
                    {user.total_buddies_received_invitations_accepted}
                  </p>
                </ST.Description>
                <ST.Description>
                  <p>
                    {intl.get('users.filter.totalReviewsAcceptedHeader')}: {user.total_reviews_accepted}
                  </p>
                  <p>
                    {intl.get('users.filter.totalReviewsPendingHeader')}: {user.total_reviews_pending}
                  </p>
                  <p>
                    {intl.get('users.filter.totalReviewsRejectedHeader')}: {user.total_reviews_rejected}
                  </p>
                  <p>
                    {intl.get('users.filter.totalScansWithUncollectedCoinsHeader')}:{' '}
                    {user.total_scans_with_uncollected_coins}
                  </p>
                  <p>
                    {intl.get('users.filter.totalUncollectedCoinsHeader')}:{' '}
                    {intl.get('common.coins', { value: user.total_uncollected_coins })}
                  </p>
                  <p>
                    {intl.get('users.filter.totalDaysFromLastAccessHeader')}: {user.total_days_from_last_access}
                  </p>
                  <p>
                    {intl.get('users.filter.linkedGoogleFlagHeader')}: {user.linked_google}
                  </p>
                  <p>
                    {intl.get('users.filter.linkedWechatFlagHeader')}: {user.linked_wechat}
                  </p>
                  <p>
                    {intl.get('users.filter.linkedVKFlagHeader')}: {user.linked_vk}
                  </p>
                  <p>
                    {intl.get('users.filter.linkedFBFlagHeader')}: {user.linked_fb}
                  </p>
                  <p>
                    {intl.get('users.filter.linkedEmailFlagHeader')}: {user.linked_email}
                  </p>
                  <p>
                    {intl.get('users.filter.linkedPhoneFlagHeader')}: {user.linked_phone}
                  </p>
                  <p>
                    {intl.get('users.filter.linkedInstagramFlagHeader')}: {user.linked_instagram}
                  </p>
                  <p>
                    {intl.get('users.filter.linkedTwitterFlagHeader')}: {user.linked_twitter}
                  </p>
                  <p>
                    {intl.get('users.form.notifyOnBuddies')} : {user.notify_on_buddies}
                  </p>
                  <p>
                    {intl.get('users.form.notifyOnReviews')}: {user.notify_on_reviews}
                  </p>
                  <p>
                    {intl.get('users.form.notifyOnRewards')}: {user.notify_on_rewards}
                  </p>
                  <p>
                    {intl.get('users.form.remindToScan')}: {user.remind_to_scan}
                  </p>
                  <p>
                    {intl.get('users.form.remindersNotifications')}: {user.reminders_notifications}
                  </p>
                  <p>
                    {intl.get('users.form.brands')}: {user.brands_shoutouts || intl.get('no')}
                  </p>
                  <p>
                    {intl.get('users.filter.totalTimelineProductHeader')}: {user.total_timeline_product}
                  </p>
                  <p>
                    {intl.get('users.filter.totalTimelineVideoHeader')}: {user.total_timeline_video}
                  </p>
                  <p>
                    {intl.get('users.filter.totalTimelineReviewsHeader')}: {user.total_timeline_reviews}
                  </p>
                  <p>
                    {intl.get('users.filter.totalTimelineMinutesHeader')}: {user.total_timeline_minutes}
                  </p>
                  <p>
                    {intl.get('users.filter.systemRewardedVideoHeader')}: {user.system_rewarded_video}
                  </p>
                  <p>
                    {intl.get('users.filter.brandRewardedVideoHeader')}: {user.brand_rewarded_video}
                  </p>
                </ST.Description>
              </ST.DescriptionColumns>
            )}
          </ST.DescriptionWrapper>
        </ST.InfoWrapper>
        <ST.ActionsWrapper>
          <Button type='danger' onClick={sendTimelineMessage}>
            {intl.get('users.form.sendTimelineMessage')}
          </Button>
          <Button type='danger' onClick={setBlockStatus}>
            {intl.get(`users.form.${!isUserBlocked ? 'permanentBanUser' : 'unbunUser'}`)}
          </Button>
          <Button type='danger' onClick={!isUserRewardsBanned ? setRewardsBan : () => usersSetRewardsBan({ id })}>
            {intl.get(`users.form.${!isUserRewardsBanned ? 'rewardsBanUser' : 'clearRewardsBan'}`)}
          </Button>
        </ST.ActionsWrapper>
      </LoadingSpinner>
    </ST.CardWrapper>
  )
}

CustomerCard.propTypes = {
  id: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  isLoading: PropTypes.bool,
  isUpdating: PropTypes.bool,
  isUserBlocked: PropTypes.bool,
  isUserRewardsBanned: PropTypes.bool,
  usersSetBlockStatus: PropTypes.func.isRequired,
  usersSetRewardsBan: PropTypes.func.isRequired,
  usersSendTimelineMessage: PropTypes.func.isRequired
}

CustomerCard.defaultProps = {
  id: null,
  user: null,
  isLoading: false,
  isUpdating: false,
  isUserBlocked: false,
  isUserRewardsBanned: false
}

export default CustomerCard

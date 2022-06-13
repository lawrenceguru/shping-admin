import React from 'react'
import intl from 'react-intl-universal'
import { rewardsShpingLevels } from '../CampaignRewardsTab/consts'
import { formatDate } from '../../../utils/helpers/date'
import { renderStringFromArray } from '../../../utils/render'

const deviceOptions = [
  { label: intl.get('common.ios'), value: 'ios' },
  { label: intl.get('common.android'), value: 'android' },
  { label: intl.get('common.baidu'), value: 'baidu' }
]

const statusOptions = [
  { label: intl.get('campaigns.featured.active'), value: 'active' },
  { label: intl.get('campaigns.featured.inactive'), value: 'inactive' }
]

const booleanOptions = [
  { label: intl.get('yes'), value: 'true' },
  { label: intl.get('no'), value: 'false' },
  { label: intl.get('common.isAbsent'), value: 'none' }
]

// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: 'first_name',
    title: intl.get('users.tableHeaders.firstName'),
    dataIndex: 'first_name',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'last_name',
    title: intl.get('users.tableHeaders.lastName'),
    dataIndex: 'last_name',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'email',
    title: intl.get('users.tableHeaders.email'),
    dataIndex: 'email',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'created',
    title: intl.get('users.tableHeaders.created'),
    dataIndex: 'created',
    align: 'center',
    render: value => <span>{(value && formatDate(value)) || '-'}</span>
  },
  {
    key: 'total_balance',
    title: intl.get('users.tableHeaders.totalBalance'),
    dataIndex: 'total_balance',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'account_balance',
    title: intl.get('users.tableHeaders.accountBalance'),
    dataIndex: 'account_balance',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'device',
    title: intl.get('users.tableHeaders.device'),
    dataIndex: 'device',
    align: 'center',
    render: value => <span>{renderStringFromArray(value, 'common') || '-'}</span>
  },
  {
    key: 'last_access',
    title: intl.get('users.tableHeaders.lastAccess'),
    dataIndex: 'last_access',
    align: 'center',
    render: value => <span>{(value && formatDate(value)) || '-'}</span>
  },
  {
    key: 'level',
    title: intl.get('users.tableHeaders.level'),
    dataIndex: 'level',
    align: 'center',
    render: value => (
      <span>
        {(value &&
          rewardsShpingLevels.find(item => item.value === value) &&
          rewardsShpingLevels.find(item => item.value === value).label) ||
          '-'}
      </span>
    )
  },
  {
    key: 'contributor_status',
    title: intl.get('users.tableHeaders.contributorStatus'),
    dataIndex: 'contributor_status',
    align: 'center',
    render: value => <span>{(value && intl.get(`common.contributorsStatus.${value}`)) || '-'}</span>
  },
  {
    key: 'permanent_ban_status',
    title: intl.get('users.tableHeaders.permanentBanStatus'),
    dataIndex: 'permanent_ban_status',
    align: 'center',
    render: value => <span>{(value && intl.get(`campaigns.featured.${value}`)) || '-'}</span>
  },
  {
    key: 'rewards_ban_status',
    title: intl.get('users.tableHeaders.rewardsBanStatus'),
    dataIndex: 'rewards_ban_status',
    align: 'center',
    render: value => <span>{(value && intl.get(`campaigns.featured.${value}`)) || '-'}</span>
  },
  {
    key: 'total_days_with_scans',
    title: intl.get('users.filter.totalDaysWithScansHeader'),
    dataIndex: 'total_days_with_scans',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_days_without_scans',
    title: intl.get('users.filter.totalDaysWithoutScansHeader'),
    dataIndex: 'total_days_without_scans',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_active_days_ratio',
    title: intl.get('users.filter.totalActiveDaysRatioHeader'),
    dataIndex: 'total_active_days_ratio',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_inactive_days_ratio',
    title: intl.get('users.filter.totalInactiveDaysRatioHeader'),
    dataIndex: 'total_inactive_days_ratio',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_buddies',
    title: intl.get('users.filter.totalBuddiesHeader'),
    dataIndex: 'total_buddies',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_cashout_transactions',
    title: intl.get('users.filter.totalCashoutTransactionsHeader'),
    dataIndex: 'total_cashout_transactions',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_cashout_value_shping',
    title: intl.get('users.filter.totalCashoutValueShpingHeader'),
    dataIndex: 'total_cashout_value_shping',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_linked_bank_accounts',
    title: intl.get('users.filter.totalLinkedBankAccountsHeader'),
    dataIndex: 'total_linked_bank_accounts',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_erc20_transactions',
    title: intl.get('users.filter.totalErc20TransactionsHeader'),
    dataIndex: 'total_erc20_transactions',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_erc20_value_shping',
    title: intl.get('users.filter.totalErc20ValueShpingHeader'),
    dataIndex: 'total_erc20_value_shping',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_erc20_accounts',
    title: intl.get('users.filter.totalErc20AccountsHeader'),
    dataIndex: 'total_erc20_accounts',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_avearage_scans_per_active_day',
    title: intl.get('users.filter.totalAvearageScansPerActiveDayHeader'),
    dataIndex: 'total_avearage_scans_per_active_day',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_buddies_invitations_accepted',
    title: intl.get('users.filter.totalBuddiesInvitationsAcceptedHeader'),
    dataIndex: 'total_buddies_invitations_accepted',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_buddies_invitations_sent',
    title: intl.get('users.filter.totalBuddiesInvitationsSentHeader'),
    dataIndex: 'total_buddies_invitations_sent',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_buddies_received_invitations_accepted',
    title: intl.get('users.filter.totalBuddiesReceivedInvitationsAcceptedHeader'),
    dataIndex: 'total_buddies_received_invitations_accepted',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_reviews_accepted',
    title: intl.get('users.filter.totalReviewsAcceptedHeader'),
    dataIndex: 'total_reviews_accepted',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_reviews_pending',
    title: intl.get('users.filter.totalReviewsPendingHeader'),
    dataIndex: 'total_reviews_pending',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_reviews_rejected',
    title: intl.get('users.filter.totalReviewsRejectedHeader'),
    dataIndex: 'total_reviews_rejected',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_scans_with_uncollected_coins',
    title: intl.get('users.filter.totalScansWithUncollectedCoinsHeader'),
    dataIndex: 'total_scans_with_uncollected_coins',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_uncollected_coins',
    title: intl.get('users.filter.totalUncollectedCoinsHeader'),
    dataIndex: 'total_uncollected_coins',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_days_from_last_access',
    title: intl.get('users.filter.totalDaysFromLastAccessHeader'),
    dataIndex: 'total_days_from_last_access',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'linked_google',
    title: intl.get('users.filter.linkedGoogleFlagHeader'),
    dataIndex: 'linked_google',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'linked_wechat',
    title: intl.get('users.filter.linkedWechatFlagHeader'),
    dataIndex: 'linked_wechat',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'linked_vk',
    title: intl.get('users.filter.linkedVKFlagHeader'),
    dataIndex: 'linked_vk',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'linked_fb',
    title: intl.get('users.filter.linkedFBFlagHeader'),
    dataIndex: 'linked_fb',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'linked_email',
    title: intl.get('users.filter.linkedEmailFlagHeader'),
    dataIndex: 'linked_email',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'linked_phone',
    title: intl.get('users.filter.linkedPhoneFlagHeader'),
    dataIndex: 'linked_phone',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'linked_instagram',
    title: intl.get('users.filter.linkedInstagramFlagHeader'),
    dataIndex: 'linked_instagram',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'linked_twitter',
    title: intl.get('users.filter.linkedTwitterFlagHeader'),
    dataIndex: 'linked_twitter',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'notify_on_buddies',
    title: intl.get('users.tableHeaders.notifyOnBuddies'),
    dataIndex: 'notify_on_buddies',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'notify_on_reviews',
    title: intl.get('users.tableHeaders.notifyOnReviews'),
    dataIndex: 'notify_on_reviews',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'notify_on_rewards',
    title: intl.get('users.tableHeaders.notifyOnRewards'),
    dataIndex: 'notify_on_rewards',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'remind_to_scan',
    title: intl.get('users.tableHeaders.remindToScan'),
    dataIndex: 'remind_to_scan',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'reminders_notifications',
    title: intl.get('users.tableHeaders.remindersNotifications'),
    dataIndex: 'reminders_notifications',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'brands_shoutouts',
    title: intl.get('users.tableHeaders.brandsShoutouts'),
    dataIndex: 'brands_shoutouts',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_timeline_product',
    title: intl.get('users.filter.totalTimelineProductHeader'),
    dataIndex: 'total_timeline_product',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_timeline_video',
    title: intl.get('users.filter.totalTimelineVideoHeader'),
    dataIndex: 'total_timeline_video',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_timeline_reviews',
    title: intl.get('users.filter.totalTimelineReviewsHeader'),
    dataIndex: 'total_timeline_reviews',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'total_timeline_minutes',
    title: intl.get('users.filter.totalTimelineMinutesHeader'),
    dataIndex: 'total_timeline_minutes',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'system_rewarded_video',
    title: intl.get('users.filter.systemRewardedVideoHeader'),
    dataIndex: 'system_rewarded_video',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  },
  {
    key: 'brand_rewarded_video',
    title: intl.get('users.filter.brandRewardedVideoHeader'),
    dataIndex: 'brand_rewarded_video',
    align: 'center',
    render: value => <span>{value || value === 0 ? value : '-'}</span>
  }
]

export const filterOptions = [
  {
    fieldId: 'email',
    columnName: intl.get('users.filter.emailLabel')
  },
  {
    fieldId: 'phone',
    columnName: intl.get('users.filter.phoneNumber')
  },
  {
    fieldId: 'device',
    placeholder: intl.get('users.filter.deviceLabel'),
    type: 'select',
    options: deviceOptions
  },
  {
    fieldId: 'transaction_hash',
    columnName: intl.get('users.filter.transactionHash')
  },
  {
    fieldId: 'cashout_account',
    columnName: intl.get('users.filter.cashoutAccount')
  },
  {
    fieldId: 'ethereum_address',
    columnName: intl.get('users.filter.ethAddress')
  },
  {
    fieldId: 'created',
    columnName: intl.get('users.filter.registrationDateLabel'),
    placeholder: [
      intl.get('users.filter.registrationStartDatePlaceholder'),
      intl.get('users.filter.registrationEndDatePlaceholder')
    ],
    type: 'rangePicker',
    format: 'YYYY-MM-DDTHH:mm:ss'
  },
  {
    fieldId: 'last_access',
    columnName: intl.get('users.filter.lastAccessLabel'),
    placeholder: [
      intl.get('users.filter.lastAccessStartPlaceholder'),
      intl.get('users.filter.lastAccessEndPlaceholder')
    ],
    type: 'rangePicker',
    format: 'YYYY-MM-DDTHH:mm:ss'
  },
  {
    fieldId: 'permanent_ban_status',
    placeholder: intl.get('users.filter.banStatusPlaceholder'),
    type: 'select',
    options: statusOptions
  },
  {
    fieldId: 'level',
    placeholder: intl.get('users.filter.levelLabel'),
    type: 'select',
    options: rewardsShpingLevels
  },
  {
    fieldId: 'language',
    placeholder: intl.get('users.filter.languagePlaceholder'),
    type: 'languages',
    mode: 'default'
  },
  {
    fieldId: 'country',
    placeholder: intl.get('users.filter.countryPlaceholder'),
    type: 'countries',
    mode: 'default'
  },
  {
    fieldId: 'total_days_with_scans',
    label: intl.get('users.filter.totalDaysWithScansHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_days_without_scans',
    label: intl.get('users.filter.totalDaysWithoutScansHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_active_days_ratio',
    label: intl.get('users.filter.totalActiveDaysRatioHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_inactive_days_ratio',
    label: intl.get('users.filter.totalInactiveDaysRatioHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_buddies',
    label: intl.get('users.filter.totalBuddiesHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_cashout_transactions',
    label: intl.get('users.filter.totalCashoutTransactionsHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_cashout_value_shping',
    label: intl.get('users.filter.totalCashoutValueShpingHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_linked_bank_accounts',
    label: intl.get('users.filter.totalLinkedBankAccountsHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_erc20_transactions',
    label: intl.get('users.filter.totalErc20TransactionsHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_erc20Value_shping',
    label: intl.get('users.filter.totalErc20ValueShpingHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_erc20_accounts',
    label: intl.get('users.filter.totalErc20AccountsHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_avearage_scans_per_active_day',
    label: intl.get('users.filter.totalAvearageScansPerActiveDayHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_buddies_invitations_accepted',
    label: intl.get('users.filter.totalBuddiesInvitationsAcceptedHeader'),
    type: 'dateFromTo',
    format: 'YYYY-MM-DD'
  },
  {
    fieldId: 'total_buddies_invitations_sent',
    label: intl.get('users.filter.totalBuddiesInvitationsSentHeader'),
    type: 'dateFromTo',
    format: 'YYYY-MM-DD'
  },
  {
    fieldId: 'total_buddies_received_invitations_accepted',
    label: intl.get('users.filter.totalBuddiesReceivedInvitationsAcceptedHeader'),
    type: 'dateFromTo',
    format: 'YYYY-MM-DD'
  },
  {
    fieldId: 'total_reviews_accepted',
    label: intl.get('users.filter.totalReviewsAcceptedHeader'),
    type: 'dateFromTo',
    format: 'YYYY-MM-DD'
  },
  {
    fieldId: 'total_reviews_pending',
    label: intl.get('users.filter.totalReviewsPendingHeader'),
    type: 'dateFromTo',
    format: 'YYYY-MM-DD'
  },
  {
    fieldId: 'total_reviews_rejected',
    label: intl.get('users.filter.totalReviewsRejectedHeader'),
    type: 'dateFromTo',
    format: 'YYYY-MM-DD'
  },
  {
    fieldId: 'total_scans_with_uncollected_coins',
    label: intl.get('users.filter.totalScansWithUncollectedCoinsHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_uncollected_coins',
    label: intl.get('users.filter.totalUncollectedCoinsHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_days_from_last_access',
    label: intl.get('users.filter.totalDaysFromLastAccessHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'linked_google_flag',
    label: intl.get('users.filter.linkedGoogleFlagHeader'),
    type: 'group',
    defaultValue: 'none',
    options: booleanOptions
  },
  {
    fieldId: 'linked_wechat_flag',
    label: intl.get('users.filter.linkedWechatFlagHeader'),
    type: 'group',
    defaultValue: 'none',
    options: booleanOptions
  },
  {
    fieldId: 'linked_vk_flag',
    label: intl.get('users.filter.linkedVKFlagHeader'),
    type: 'group',
    defaultValue: 'none',
    options: booleanOptions
  },
  {
    fieldId: 'linked_fb_flag',
    label: intl.get('users.filter.linkedFBFlagHeader'),
    type: 'group',
    defaultValue: 'none',
    options: booleanOptions
  },
  {
    fieldId: 'linked_email_flag',
    label: intl.get('users.filter.linkedEmailFlagHeader'),
    type: 'group',
    defaultValue: 'none',
    options: booleanOptions
  },
  {
    fieldId: 'linked_phone_flag',
    label: intl.get('users.filter.linkedPhoneFlagHeader'),
    type: 'group',
    defaultValue: 'none',
    options: booleanOptions
  },
  {
    fieldId: 'linked_instagram_flag',
    label: intl.get('users.filter.linkedInstagramFlagHeader'),
    type: 'group',
    defaultValue: 'none',
    options: booleanOptions
  },
  {
    fieldId: 'linked_twitter_flag',
    label: intl.get('users.filter.linkedTwitterFlagHeader'),
    type: 'group',
    defaultValue: 'none',
    options: booleanOptions
  },
  {
    fieldId: 'total_timeline_product',
    label: intl.get('users.filter.totalTimelineProductHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_timeline_video',
    label: intl.get('users.filter.totalTimelineVideoHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_timeline_reviews',
    label: intl.get('users.filter.totalTimelineReviewsHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'total_timeline_minutes',
    label: intl.get('users.filter.totalTimelineMinutesHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'system_rewarded_video',
    label: intl.get('users.filter.systemRewardedVideoHeader'),
    type: 'fromTo'
  },
  {
    fieldId: 'brand_rewarded_video',
    label: intl.get('users.filter.brandRewardedVideoHeader'),
    type: 'fromTo'
  }
]

export const fieldsForMainPanelAdvanced = [
  {
    fieldId: 'id',
    columnName: intl.get('users.filter.userIdLabel')
  },
  {
    fieldId: 'first_name',
    columnName: intl.get('users.filter.firstNameLabel')
  },
  {
    fieldId: 'last_name',
    columnName: intl.get('users.filter.lastNameLabel')
  }
]

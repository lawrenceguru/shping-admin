// eslint-disable-next-line import/prefer-default-export
export const initialState = {
  isLoading: false,
  users: null,
  isUserBlocked: false,
  count: 0,
  banHistory: null,
  isLoadingUserLevels: false,
  isLoadingContributorLevel: false,
  contributorLevel: null,
  userLevels: null,
  isLoadingRewards: false,
  rewards: null,
  buddies: null,
  isLoadingBuddies: false,
  feed: null,
  isLoadingFeed: false,
  countScans: 0,
  isLoadingTransactions: false,
  transactions: null,
  scans: null,
  countRewards: 0,
  filters: {
    limit: 10,
    offset: 0
  }
}

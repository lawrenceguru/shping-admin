import moment from 'moment'

export const currDate =
  // eslint-disable-next-line no-nested-ternary
  moment()
    .startOf('month')
    .format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
    ? moment()
        .subtract(1, 'months')
        .endOf('month')
        .format('YYYY-MM-DD')
    : moment()
        .subtract(1, 'd')
        .startOf('day') <= moment().startOf('month')
    ? moment()
        .startOf('month')
        .format('YYYY-MM-DD')
    : moment()
        .subtract(1, 'd')
        .format('YYYY-MM-DD')
export const prevDate =
  moment()
    .startOf('month')
    .format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
    ? moment()
        .subtract(1, 'months')
        .startOf('month')
        .format('YYYY-MM-DD')
    : moment()
        .startOf('month')
        .format('YYYY-MM-DD')

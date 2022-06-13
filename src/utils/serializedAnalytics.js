import moment from 'moment'

const statisticActionsNames = ['created', 'into_circulation', 'shipped']

const defaultDategroupItem = {
  created: 0,
  into_circulation: 0,
  shipped: 0
}
export const getTotalFromArray = (data, key) => {
  let result = 0

  if (data && data.length) {
    const totalOfProduct = data.find(item => item.type === key)
    result = (totalOfProduct && totalOfProduct.count) || 0
  }

  return result
}

const parseDate = (date, range) => {
  if (range === 'week') {
    return { week: date }
  }

  if (range === 'month') {
    const momentDate = moment(date, 'YYYY-MM')
    return {
      month: momentDate.month() + 1,
      year: momentDate.year()
    }
  }

  const momentDate = moment(date, 'YYYY-MM-DD')
  return {
    day: Number(date.split('-')[2]),
    month: momentDate.month() + 1
  }
}

export const getArrayWithDataFromStatistic = (data, range) => {
  let result = {}

  if (data && data.length) {
    result = data.reduce((currRes, currItem) => {
      const res = { ...currRes }
      if (!res[currItem[range]]) {
        res[currItem[range]] = {
          ...defaultDategroupItem,
          ...parseDate(currItem[range], range),
          [currItem.type]: currItem.count
        }
      } else {
        res[currItem[range]] = {
          ...res[currItem[range]],
          ...parseDate(currItem[range], range),
          [currItem.type]: currItem.count
        }
      }

      return res
    }, {})
  }

  return Object.keys(result).map(key => ({ ...result[key] }))
}

export const getActionsStatisticArrays = data => {
  const result = {
    created: [],
    into_circulation: [],
    shipped: []
  }

  if (data && data.length) {
    data.forEach(item => {
      statisticActionsNames.forEach(name => {
        result[name].push(item[name])
      })
    })
  }

  return result
}

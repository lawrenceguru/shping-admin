import { groupBy, mapValues, omit } from 'lodash'

// eslint-disable-next-line import/prefer-default-export
export const getGroupedItems = items => {
  return mapValues(groupBy(items, 'groupId'), clist => clist.map(car => omit(car, 'groupId')))
}

export const once = func => {
  let done = false
  return (...args) => {
    if (!done) {
      done = true
      func(...args)
    }
  }
}

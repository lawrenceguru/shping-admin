import moment from 'moment'
import { colors } from '../components/organisms/AudienceGraph'
// eslint-disable-next-line import/prefer-default-export
export const proccessServerData = data => {
  return data && data.length
    ? data.map(datum => ({
        ...datum,
        image_big: {
          urls: datum.image_big,
          uploader: [
            {
              content: {
                url: datum.image_big,
                type: 'image'
              }
            }
          ]
        },
        image_small: {
          urls: datum.image_small,
          uploader: [
            {
              content: {
                url: datum.image_small,
                type: 'image'
              }
            }
          ]
        }
      }))
    : []
}

export const proccessRepotDataInformation = (data, filters) => {
  let currentDate
  let stopDate
  const reportData = {
    reports: { graph: [], rate: [], list: [], totalWithNewCards: 0, totalWithCardUsage: 0, totalReceipts: 0 }
  }

  if (data) {
    reportData.reports.rate =
      (data.rate &&
        data.rate.length &&
        data.rate.map((item, index) => ({
          y: item.rate,
          name: item.card_name || item.store_name,
          color: colors[index]
        }))) ||
      []
    reportData.reports.list = data.list.reverse()

    const users = []
    data.list.forEach(item => {
      const id = users.find(i => i === item.user_id)
      if (!id) users.push(item.user_id)
    })

    if (filters && filters.reportType === 'new') {
      reportData.reports.totalWithNewCards = users.length
    } else {
      reportData.reports.totalWithCardUsage = users.length
    }

    if (data.days) {
      let apiData = []

      if (filters && filters.reportType === 'new') {
        apiData = data.days.map(({ day, month, year, novelty }) => ({
          date: moment()
            .year(year)
            .month(month - 1)
            .date(day),
          points: novelty
        }))
      } else {
        apiData = data.days.map(({ day, month, year, quantity }) => ({
          date: moment()
            .year(year)
            .month(month - 1)
            .date(day),
          points: quantity
        }))
      }
      currentDate = moment(data.from_date)
      stopDate = moment(data.to_date)
      while (currentDate <= stopDate) {
        const currentPoints =
          // eslint-disable-next-line no-loop-func
          apiData && apiData.find(m => m.date.format('DD/MM/YYYY') === currentDate.format('DD/MM/YYYY'))
        reportData.reports.graph.push({
          date: currentDate.format('DD/MM'),
          points: currentPoints ? currentPoints.points : 0
        })
        currentDate = moment(currentDate).add(1, 'days')
      }
    }

    if (data.weeks) {
      let apiData = []

      if (filters && filters.reportType === 'new') {
        apiData = data.weeks.map(({ week, year, novelty }) => ({
          date: moment()
            .year(year)
            .week(week),
          points: novelty
        }))
      } else {
        apiData = data.weeks.map(({ week, year, quantity }) => ({
          date: moment()
            .year(year)
            .week(week),
          points: quantity
        }))
      }
      currentDate = moment()
        .year(moment(data.to_date).year())
        .week(moment(data.to_date).week())
      stopDate = moment(data.from_date)
      while (currentDate >= stopDate) {
        const currentPoints =
          // eslint-disable-next-line no-loop-func
          apiData && apiData.find(m => m.date.format('DD/MM/YYYY') === currentDate.format('DD/MM/YYYY'))
        reportData.reports.graph.push({
          date: currentDate.format('DD/MM'),
          points: currentPoints ? currentPoints.points : 0
        })
        currentDate = currentDate.subtract(1, 'weeks')
      }
      reportData.reports.graph = reportData.reports.graph.reverse()
    }

    if (data.months) {
      let apiData = []

      if (filters && filters.reportType === 'new') {
        apiData = data.months.map(({ month, year, novelty }) => ({
          date: moment()
            .year(year)
            .month(month - 1),
          points: novelty
        }))
      } else {
        apiData = data.months.map(({ month, year, quantity }) => ({
          date: moment()
            .year(year)
            .month(month - 1),
          points: quantity
        }))
      }
      currentDate = moment()
        .year(moment(data.to_date).year())
        .month(moment(data.to_date).month())
      stopDate = moment(data.from_date)
      while (currentDate >= stopDate) {
        const currentPoints =
          // eslint-disable-next-line no-loop-func
          apiData && apiData.find(m => m.date.format('DD/MM/YYYY') === currentDate.format('DD/MM/YYYY'))
        reportData.reports.graph.push({
          date: currentDate.format('MMM YYYY'),
          points: currentPoints ? currentPoints.points : 0
        })
        currentDate = currentDate.subtract(1, 'months')
      }
      reportData.reports.graph = reportData.reports.graph.reverse()
    }
  }

  reportData.options = {
    stores: [],
    store: null,
    reportType: filters && filters.reportType
  }

  return reportData
}

export const proccessReportDetailData = (data, cardId) => {
  const details = {}

  if (data) {
    details.currentCard = data.details.cards.find(m => m.id === cardId)
    details.history = data.details.history ? data.details.history : []
    details.otherCards = []

    data.details.cards.forEach(m => {
      if (m.id !== cardId) {
        details.otherCards.push(m)
      }
    })
  }

  return details
}

export const proccessStoreData = data => {
  let stores = []

  if (data) {
    stores = Object.entries(data.rate).map(entry => {
      return { label: entry[1].store_name, value: entry[1].store_id }
    })
  }

  return stores
}

export const processCountriesData = data => {
  return data && data.data
    ? Object.entries(data.data).map(entry => {
        return { label: entry[1].country_info.name, value: entry[0] }
      })
    : []
}

export const proccessReceiptDetails = (data, receiptId) => {
  const details = {}

  if (data) {
    details.currentReceipt = data.details.receipts.find(m => m.receipt_id === receiptId)
    details.otherReceipts = []
    data.details.receipts.forEach(m => {
      if (m.receipt_id !== receiptId) {
        details.otherReceipts.push(m)
      }
    })
  }

  return details
}

export const createRequestParamsForLocationChange = (storeId, storeName, receiptId, userId, location) => {
  let id = null
  let arr = null

  if (storeId) {
    id = storeId
    if (id.indexOf(':') > 0) {
      arr = id.split(':')
      id = arr[arr.length - 1]
    }
  }

  let name = location

  if (storeName) {
    name = storeName
    if (name.indexOf('   - ') > 0) {
      arr = name.split('   - ')
      // eslint-disable-next-line prefer-destructuring
      name = arr[0]
    }
  }

  return {
    user_id: userId,
    receipt_id: receiptId,
    location: name,
    store_id: id
  }
}

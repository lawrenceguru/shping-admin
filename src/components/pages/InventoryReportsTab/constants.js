import intl from 'react-intl-universal'
import moment from 'moment'

export const columns = [
  {
    title: intl.get('trackAndTrace.inventory.dateTime'),
    dataIndex: 'ts'
  },
  {
    title: intl.get('trackAndTrace.inventory.operator'),
    dataIndex: 'user_name'
  },
  {
    title: intl.get('trackAndTrace.inventory.pallet'),
    dataIndex: 'pallet_gs1'
  },
  {
    title: intl.get('trackAndTrace.inventory.carton'),
    dataIndex: 'carton_gs1'
  },
  {
    title: intl.get('trackAndTrace.inventory.vendorCode'),
    dataIndex: 'sku'
  },
  {
    title: intl.get('trackAndTrace.inventory.presented'),
    dataIndex: 'presented'
  },
  {
    title: intl.get('trackAndTrace.inventory.scanned'),
    dataIndex: 'scanned'
  },
  {
    title: intl.get('trackAndTrace.inventory.valid'),
    dataIndex: 'valid'
  },
  {
    title: intl.get('trackAndTrace.inventory.difference'),
    dataIndex: 'not_valid'
  }
]

export const exportConverter = fullData => {
  if (fullData.length) {
    const prepareArrData = fullData && fullData.length && typeof fullData !== 'object' ? JSON.parse(fullData) : fullData

    const sortOrder = {
      ts: 1,
      user_name: 2,
      pallet_gs1: 3,
      carton_gs1: 4,
      sku: 5,
      presented: 6,
      scanned: 7,
      valid: 8,
      carton: 9,
      doc_id: 10,
      gtin: 11,
      id: 12,
      pallet: 13,
      participant_id: 14,
      user_id: 15
    }

    const arrData = prepareArrData.map(o =>
      Object.assign(
        {},
        ...Object.keys(o)
          .sort((a, b) => sortOrder[a] - sortOrder[b])
          .map(x => {
            return { [x]: o[x] }
          })
      )
    )

    let CSV = ''

    if (arrData) {
      let row = ''
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (let index in arrData[0]) {
        if (index === 'sku') {
          index = 'Vendor code'
        }
        if (index === 'ts') {
          index = 'Date'
        }
        if (index === 'user_name') {
          index = 'Operator'
        }
        if (
          index === 'carton' ||
          index === 'doc_id' ||
          index === 'gtin' ||
          index === 'id' ||
          index === 'pallet' ||
          index === 'participant_id' ||
          index === 'user_id' ||
          index === 'user_last_name' ||
          index === 'user_first_name'
        ) {
          index = ''
        }
        if (index) {
          row += `${index
            .split('_')
            .map(item => item[0].toUpperCase() + item.slice(1))
            .join(' ')},`
        }
      }
      row = row.slice(0, -1)
      CSV += `${row}\r\n`
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arrData.length; i++) {
      let row = ''
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (let index in arrData[i]) {
        if (
          index === 'carton' ||
          index === 'doc_id' ||
          index === 'gtin' ||
          index === 'id' ||
          index === 'pallet' ||
          index === 'participant_id' ||
          index === 'user_id' ||
          index === 'user_last_name' ||
          index === 'user_first_name'
        ) {
          index = ''
        }
        if (index) {
          row += `"${arrData[i][index]}",`
        }
      }
      row.slice(0, row.length - 1)
      CSV += `${row}\r\n`
    }

    if (CSV === '') {
      return
    }

    const link = document.createElement('a')
    link.href = `data:text/csv;charset=utf-8,${escape(CSV)}`

    link.style = 'visibility:hidden'
    link.download = `${moment().format('YYYYMMDDHHmmss')}.txt`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

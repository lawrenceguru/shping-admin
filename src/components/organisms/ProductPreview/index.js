import React, { useMemo } from 'react'
import CustomTable from '../../molecules/Table'

const ProductPreview = ({ preview }) => {
  const columns = useMemo(() => {
    return preview && preview.header && preview.header.length
      ? preview.header.map((item, index) => {
          return {
            key: item.id,
            dataIndex: index,
            title: item.header
          }
        })
      : []
  }, [preview])

  const data = useMemo(() => {
    const result = []
    if (preview && preview.rows && preview.rows.length) {
      preview.rows.forEach((item, indexElement) => {
        const record = {}
        item.forEach((element, indexItem) => {
          record[indexItem] = element
        })
        record.key = indexElement
        result.push(record)
      })
    }

    return result
  }, [preview])

  return <CustomTable scroll={{ x: 1200 }} columns={columns} data={data} rowKey='key' />
}

export default ProductPreview

import intl from 'react-intl-universal'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import IconButton from '../../molecules/IconButton'
import { ActionWrapper } from './styles'

export const slGtinColumns = [
  {
    title: intl.get('serializationTasks.action'),
    dataIndex: 'actions',
    render: (i, data) => {
      return (
        <ActionWrapper>
          <Link
            to={{
              pathname: '/admin/track-and-trace/serialized-products',
              state: { task: { value: data.task_id, option: true } }
            }}
          >
            <IconButton type='SearchPlus' styleParam={{ fontSize: 19 }} />
          </Link>
          <IconButton
            type='Download'
            styleParam={{ fontSize: 19 }}
            actionFunction={() => {
              const name = '-'
              if (data && data.link) {
                axios
                  .get(data.link)
                  .then(response => {
                    try {
                      const filename = `shpingexport-${name}-${data.gtin}-${i}.csv`
                      const blob = new Blob([response.data], { type: 'text/plain' })
                      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(blob, filename)
                      } else {
                        const e = document.createEvent('MouseEvents')
                        const a = document.createElement('a')
                        a.download = filename
                        a.href = window.URL.createObjectURL(blob)
                        a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':')
                        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
                        a.dispatchEvent(e)
                      }
                    } catch (e) {
                      console.log(e)
                    }
                  })
                  .catch(() => {
                    toast.error(intl.get('serializationTasks.fileDl'))
                  })
              } else {
                toast.error(intl.get('serializationTasks.exportUnavailable'))
              }
            }}
          />
        </ActionWrapper>
      )
    }
  },
  {
    title: intl.get('serializationTasks.status'),
    dataIndex: 'status'
  },
  {
    title: intl.get('serializationTasks.dateCreated'),
    dataIndex: 'start_time',
    flag: 'data'
  },
  {
    title: intl.get('serializationTasks.gtins'),
    dataIndex: 'gtin'
  },
  {
    title: intl.get('serializationTasks.name'),
    dataIndex: 'name'
  }
]

export const ssccColumns = [
  {
    title: intl.get('serializationTasks.sequence'),
    dataIndex: 'sequence'
  },
  {
    title: intl.get('serializationTasks.status'),
    dataIndex: 'status'
  },
  {
    title: intl.get('serializationTasks.ssccCreated'),
    dataIndex: 'count'
  },
  {
    title: intl.get('serializationTasks.startTime'),
    dataIndex: 'start_time',
    flag: 'data'
  },
  {
    title: intl.get('serializationTasks.endTime'),
    dataIndex: 'end_time',
    flag: 'data'
  }
]

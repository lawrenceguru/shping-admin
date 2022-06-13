import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Select, DatePicker, Table } from 'antd'
import moment from 'moment'
import intl from 'react-intl-universal'
import useForm from 'react-hook-form'
import { RHFInput } from 'react-hook-form-input'
import axios from 'axios'
import PropTypes from 'prop-types'
import * as ST from './styles'
import Error from '../../atoms/Error'
import Button from '../../atoms/Button'
import { getDataInFormatUTCToAPi, formatDateTime } from '../../../utils/helpers/date'
import IconButton from '../../molecules/IconButton'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import { TableWrapper } from '../../molecules/Table/styles'
import CustomPagination from '../../atoms/CustomPagination'
import { useWindowSize } from '../../molecules/Table/utils'
import LoadingSpinner from '../../atoms/LoadingSpinner'
import Loader from '../../templates/Loader'

const { RangePicker } = DatePicker
const { Option } = Select

const INITIAL_VALUES = {
  delivery_id: undefined,
  to_time: null,
  from_time: null
}

const TodoCardsExport = ({
  todoGetTodoExportTasks,
  todoGetStatusExportTask,
  todoGetStatusAllExportTasks,
  todoGetTodoDeliveries,
  isTodoDeliveriesLoading,
  todoDeliveries,
  isTasksForExportLoading,
  isTaskForExportLoadingId,
  exportTasksStatus,
  participants
}) => {
  const { watch, errors, getValues, setValue, register, unregister, clearError, triggerValidation, reset } = useForm({
    defaultValues: INITIAL_VALUES,
    reValidateMode: 'onChange'
  })
  const all = watch()
  const fromTimeWatcher = watch('from_time')
  const toTimeWatcher = watch('from_time')
  const deliveryIdWatcher = watch('delivery_id')

  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [localTasks, setLocalTasks] = useState([])

  const totalItems = useMemo(() => {
    return (exportTasksStatus && exportTasksStatus.length) || 0
  }, [exportTasksStatus])

  const lastPage = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit])

  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [all])
  const [width] = useWindowSize()

  const dataTable = useMemo(() => {
    return localTasks && localTasks.length ? localTasks.slice((page - 1) * limit, limit * page) : []
  }, [localTasks, page, limit])

  useEffect(() => {
    todoGetTodoDeliveries()
    todoGetStatusAllExportTasks()

    register({ name: 'from_time' }, { required: intl.get('todo.cards.form.required') })
    register({ name: 'to_time' }, { required: intl.get('todo.cards.form.required') })

    return () => {
      unregister(['from_time', 'to_time'])
      reset(null)
    }
  }, [])

  useEffect(() => {
    if (fromTimeWatcher && errors.from_time) {
      clearError('from_time')
    }
  }, [fromTimeWatcher])

  useEffect(() => {
    if (toTimeWatcher && errors.to_time) {
      clearError('to_time')
    }
  }, [toTimeWatcher])

  useEffect(() => {
    if (!deliveryIdWatcher) {
      setValue('delivery_id', undefined)
    }
  }, [deliveryIdWatcher])

  const getTableTasks = useCallback((exportTasks, deliveries) => {
    return exportTasks && exportTasks.length
      ? exportTasks.map(task => {
          const cardDelivery = deliveries && deliveries.length && deliveries.find(elem => elem.id === task.delivery_id)
          const participant =
            participants && participants.length && participants.find(element => element.id === task.owner)
          return {
            key: task.id,
            id: task.id,
            name: cardDelivery && cardDelivery.name,
            owner: participant && participant.name,
            created: task.created && moment(task.created, 'YYYY-MM-DD').format('M/DD/YYYY'),
            startTime:
              task.start_time && formatDateTime(task.start_time, { outputFormat: 'dd MMM yyyy h:mm:ss a' }, true),
            endTime: task.end_time && formatDateTime(task.end_time, { outputFormat: 'dd MMM yyyy h:mm:ss a' }, true),
            link: task.link,
            status: task.status
          }
        })
      : []
  }, [])

  useEffect(() => {
    setLocalTasks(getTableTasks(exportTasksStatus, todoDeliveries))
  }, [exportTasksStatus, todoDeliveries])

  const downloadCsv = url => {
    axios.get(url).then(response => {
      const blob = new Blob([`\uFEFF${response.data}`], { type: 'text/csv; charset=utf-18' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `${moment().format('YYYYMMDDHHmmss')}.txt`
      link.click()
    })
  }

  const handleRangePicker = useCallback(data => {
    if (data[0] && data[1]) {
      setValue('from_time', moment(data[0]).format('D/MM/YYYY'))
      setValue('to_time', moment(data[1]).format('D/MM/YYYY'))
    }
  }, [])

  const onSubmit = useCallback(() => {
    todoGetTodoExportTasks({
      delivery_id: values.delivery_id,
      to_time: getDataInFormatUTCToAPi(values.to_time, 'D/MM/YYYY', false, true),
      from_time: getDataInFormatUTCToAPi(values.from_time, 'D/MM/YYYY', false)
    })
  }, [values])

  const startOnClickHandler = useCallback(() => {
    triggerValidation().then(isValid => {
      if (isValid) {
        onSubmit()
      }
    })
  }, [onSubmit])

  const setDefaultSort = useCallback(() => {
    setLocalTasks(getTableTasks(exportTasksStatus, todoDeliveries))
  }, [exportTasksStatus, todoDeliveries])

  const tableColumns = [
    {
      title: intl.get('todo.export.delivery'),
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: intl.get('todo.export.created'),
      dataIndex: 'created',
      key: 'created',
      align: 'center'
    },
    {
      title: intl.get('todo.export.owner'),
      dataIndex: 'owner',
      key: 'owner',
      align: 'center'
    },
    {
      title: intl.get('todo.export.startTime'),
      dataIndex: 'startTime',
      key: 'startTime',
      align: 'center'
    },
    {
      title: intl.get('todo.export.endTime'),
      dataIndex: 'endTime',
      key: 'endTime',
      align: 'center'
    },
    {
      key: 'download',
      align: 'center',
      render: data => {
        // eslint-disable-next-line no-nested-ternary
        return isTaskForExportLoadingId && isTaskForExportLoadingId === data.id ? (
          <LoadingSpinner isLoading />
        ) : data.status === 'done' ? (
          <IconButton type='Download' actionFunction={() => downloadCsv(data.link)} />
        ) : (
          <IconButton type='Refresh' actionFunction={() => todoGetStatusExportTask(data.id)} />
        )
      }
    }
  ]

  const optionsForSort = useMemo(() => {
    return tableColumns && tableColumns.length && tableColumns.filter(column => column.key !== 'download')
  }, [tableColumns])

  return (
    <ST.Wrapper>
      <ST.StyledForm>
        <ST.FieldsWrapper>
          <Form.Item label={intl.get('todo.export.delivery')}>
            <RHFInput
              as={
                <Select
                  showSearch
                  size='large'
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder={intl.get('todo.export.selectDelivery')}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  loading={isTodoDeliveriesLoading}
                >
                  {todoDeliveries && todoDeliveries.length && !isTodoDeliveriesLoading
                    ? todoDeliveries.map(delivery => (
                        <Option style={{ fontSize: 16 }} key={delivery.id} value={delivery.id}>
                          {delivery.name}
                        </Option>
                      ))
                    : null}
                </Select>
              }
              name='delivery_id'
              rules={{ required: intl.get('todo.cards.form.required') }}
              register={register}
              unregister={unregister}
              setValue={setValue}
              defaultValue={values && values.delivery_id}
              mode='onChange'
            />
            <Error errors={errors} destination='delivery_id' />
          </Form.Item>
          <Form.Item label={intl.get('todo.export.date')}>
            <RangePicker
              size='large'
              allowClear={false}
              defaultValue={
                values && [
                  values.start_date && moment(values.from_time, 'D/MM/YYYY'),
                  values.end_date && moment(values.to_time, 'D/MM/YYYY')
                ]
              }
              locale={{
                lang: {
                  rangePlaceholder: [
                    intl.get('trackAndTrace.inventory.startDate'),
                    intl.get('trackAndTrace.inventory.endDate')
                  ],
                  yearFormat: 'YYYY',
                  dateFormat: 'D/MM/YYYY',
                  dayFormat: 'DD'
                }
              }}
              onChange={handleRangePicker}
            />
            <Error errors={errors} destination='to_time' />
          </Form.Item>
        </ST.FieldsWrapper>
        <ST.ButtonWrapper>
          <Button type='primary' onClick={startOnClickHandler}>
            {intl.get('start')}
          </Button>
        </ST.ButtonWrapper>
      </ST.StyledForm>
      {dataTable && dataTable.length !== 0 && (
        <ST.RefreshPanel>
          <Button type='primary' onClick={() => todoGetStatusAllExportTasks()}>
            {intl.get('todo.export.refreshBtn')}
          </Button>
        </ST.RefreshPanel>
      )}
      <TableHeaderOptions
        totalItems={totalItems}
        itemsForSort={localTasks}
        setCurrItemsForSort={setLocalTasks}
        setDefaultSort={setDefaultSort}
        optionsForSort={optionsForSort}
        paginationSize={limit}
        handleChangePaginationSize={value => {
          setPage(1)
          setLimit(value)
        }}
      />
      {isTasksForExportLoading ? (
        <Loader />
      ) : (
        dataTable &&
        dataTable.length !== 0 && (
          <TableWrapper>
            <Table
              columns={tableColumns}
              dataSource={dataTable}
              pagination={false}
              scroll={{ x: width <= 1500 ? 1200 : null }}
            />
            {lastPage > 1 ? (
              <CustomPagination
                currentPaginationPage={page}
                paginationSize={limit}
                handlePagination={currPage => {
                  setPage(currPage)
                }}
                count={totalItems}
                lastPage={lastPage}
                size='small'
              />
            ) : null}
          </TableWrapper>
        )
      )}
    </ST.Wrapper>
  )
}

TodoCardsExport.propTypes = {
  todoGetTodoExportTasks: PropTypes.func.isRequired,
  todoGetStatusExportTask: PropTypes.func.isRequired,
  todoGetStatusAllExportTasks: PropTypes.func.isRequired,
  todoGetTodoDeliveries: PropTypes.func.isRequired,
  isTodoDeliveriesLoading: PropTypes.bool,
  todoDeliveries: PropTypes.arrayOf(
    PropTypes.shape({
      auto_approve: PropTypes.bool,
      description: PropTypes.string,
      icon: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
      owner: PropTypes.string,
      result: PropTypes.shape({ coins: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }),
      steps: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          title: PropTypes.string,
          type: PropTypes.string,
          answers: PropTypes.arrayOf(
            PropTypes.shape({
              answer: PropTypes.string,
              correct: PropTypes.bool
            })
          )
        })
      )
    })
  ),
  isTasksForExportLoading: PropTypes.bool,
  isTaskForExportLoadingId: PropTypes.bool,
  exportTasksStatus: PropTypes.arrayOf(PropTypes.object),
  participants: PropTypes.arrayOf(PropTypes.object)
}

TodoCardsExport.defaultProps = {
  todoDeliveries: [],
  isTasksForExportLoading: false,
  isTaskForExportLoadingId: false,
  isTodoDeliveriesLoading: false,
  exportTasksStatus: [],
  participants: []
}

export default withRouter(TodoCardsExport)

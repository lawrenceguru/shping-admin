import React, { useEffect, useState, useMemo, useCallback } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import RemoveIcon from '../../molecules/RemoveIcon'
import CustomPagination from '../CustomPagination'
import Loader from '../../templates/Loader'
import RadioGroup from '../RadioGroup'
import { TableWrapper, HeaderBlock, HeaderBlockProductTable, Header, Footer, Test, RadioWrapper } from './styles'

const TopTable = ({
  columns,
  columnsData,
  headerText,
  isFooter,
  setItem,
  rowKey,
  widgetName,
  setViewAllSize,
  viewAll,
  setViewAll,
  scroll,
  pagination,
  setCurrentData,
  isLoadingNewFiltersInfo,
  radioOptions,
  radioValue,
  isLoading,
  handleRadio,
  children,
  dataIndex,
  ...props
}) => {
  // eslint-disable-next-line no-nested-ternary
  const data = viewAll ? columnsData : columnsData ? columnsData.slice(0, 4) : columnsData
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1)

  const tableTotalCounts = useMemo(() => {
    return columnsData && columnsData.length
  }, [columnsData])

  const isTableLoading = useMemo(() => ({ spinning: isLoading, indicator: <Loader /> }), [isLoading])

  const dataSource = useMemo(() => {
    return data && data.length ? data.slice((currentPaginationPage - 1) * 4, 4 * currentPaginationPage) : []
  }, [data, currentPaginationPage, 4])

  const lastPage = useMemo(() => Math.ceil(tableTotalCounts / 4), [tableTotalCounts, 4])

  useEffect(() => {
    if (currentPaginationPage > lastPage) {
      setCurrentPaginationPage(1)
    }
  }, [lastPage])

  useEffect(() => {
    setViewAllSize(viewAll, data || [])
  }, [viewAll])

  useEffect(() => {
    if (setCurrentData) {
      setCurrentData(dataSource)
    }
  }, [dataSource])

  useEffect(() => {
    if (isLoadingNewFiltersInfo) {
      setCurrentPaginationPage(1)
    }
  }, [isLoadingNewFiltersInfo])

  const stopPropagation = event => {
    event.stopPropagation()
  }

  const renderPagination = useCallback(
    () =>
      lastPage > 1 ? (
        <CustomPagination
          currentPaginationPage={currentPaginationPage}
          paginationSize={4}
          handlePagination={page => {
            setCurrentPaginationPage(page)
          }}
          count={tableTotalCounts}
          lastPage={lastPage}
          size='small'
        />
      ) : null,
    [lastPage, tableTotalCounts, currentPaginationPage]
  )
  if (isFooter && data && data.length !== 0) {
    return (
      <TableWrapper pagination={pagination} {...props}>
        <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
          <Table
            title={() => (
              <HeaderBlockProductTable>
                <Header>{headerText}</Header>
                <RadioWrapper>
                  {handleRadio && (
                    <RadioGroup
                      group={radioOptions}
                      value={radioValue}
                      isButtons
                      onChange={event => {
                        event.stopPropagation()
                        event.preventDefault()
                        handleRadio(event.target.value)
                      }}
                    />
                  )}
                  <RemoveIcon setItem={setItem} />
                </RadioWrapper>
              </HeaderBlockProductTable>
            )}
            pagination={false}
            className='table-product'
            columns={columns}
            loading={isTableLoading}
            dataSource={pagination ? dataSource : data}
            rowKey={rowKey}
            scroll={scroll}
            footer={() =>
              !pagination ? (
                <Footer>
                  <Test
                    onClick={() => setViewAll(!viewAll)}
                    onMouseDown={stopPropagation}
                    onTouchStart={stopPropagation}
                  >
                    {viewAll
                      ? `${intl.get('overviewPage.hide')}`.toUpperCase()
                      : `${intl.get('overviewPage.viewAll')}`.toUpperCase()}
                  </Test>
                </Footer>
              ) : (
                renderPagination()
              )
            }
          >
            {children}
          </Table>
        </div>
      </TableWrapper>
    )
  }
  return (
    <TableWrapper {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <Table
          title={() => (
            <HeaderBlock>
              <Header>{headerText}</Header>
              <RadioWrapper>
                {handleRadio && (
                  <RadioGroup
                    group={radioOptions}
                    value={radioValue}
                    isButtons
                    onChange={event => {
                      event.stopPropagation()
                      event.preventDefault()
                      handleRadio(event.target.value)
                    }}
                  />
                )}
                <RemoveIcon setItem={setItem} />
              </RadioWrapper>
            </HeaderBlock>
          )}
          pagination={false}
          loading={isTableLoading}
          className={widgetName === 'brandSales' ? 'sales-table' : ''}
          columns={columns}
          scroll={scroll}
          dataSource={isFooter ? data : columnsData}
          rowKey={rowKey}
        >
          {children}
        </Table>
      </div>
    </TableWrapper>
  )
}

TopTable.propTypes = {
  widgetName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  columns: PropTypes.arrayOf(PropTypes.object),
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  columnsData: PropTypes.arrayOf(PropTypes.object),
  headerText: PropTypes.string,
  isFooter: PropTypes.bool,
  setItem: PropTypes.func.isRequired,
  setViewAllSize: PropTypes.func,
  viewAll: PropTypes.bool,
  setViewAll: PropTypes.func,
  scroll: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  pagination: PropTypes.bool,
  setCurrentData: PropTypes.func,
  isLoadingNewFiltersInfo: PropTypes.bool,
  radioOptions: PropTypes.arrayOf(PropTypes.object),
  radioValue: PropTypes.string,
  handleRadio: PropTypes.func,
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  dataIndex: PropTypes.string
}

TopTable.defaultProps = {
  columns: null,
  headerText: '',
  columnsData: null,
  isFooter: false,
  setViewAllSize: () => null,
  viewAll: false,
  setViewAll: () => null,
  scroll: false,
  pagination: false,
  setCurrentData: null,
  isLoadingNewFiltersInfo: false,
  radioOptions: [],
  radioValue: null,
  handleRadio: null,
  isLoading: false,
  children: null,
  dataIndex: null
}

export default TopTable

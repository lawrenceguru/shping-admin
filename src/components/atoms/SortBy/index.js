import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import intl from 'react-intl-universal'
import { SortByWrapper, StyledSortText } from './styles'
import IconButton from '../../molecules/IconButton'

const { Option } = Select

const SortBy = ({
  isHaveOrderIcon,
  handleSort,
  handleChangeOrder,
  defaultValue,
  sortedOptions,
  style,
  order,
  isAsc,
  orderPostfix
}) => {
  const customValue = useMemo(() => {
    let result = order ? order.split('-')[0] : null

    if (result && sortedOptions) {
      const selectedOption = sortedOptions.find(item => item.fieldId === result)
      result = selectedOption.title
    }

    return result
  }, [order, sortedOptions])
  const [sortOrder, setSortOrder] = useState(orderPostfix || '-desc')
  const [value, setValue] = useState('Do not sort')
  const handleSetOrder = useCallback(() => {
    if (handleChangeOrder) {
      handleChangeOrder((orderPostfix || sortOrder) === '-asc' ? '-desc' : '-asc')
    }

    setSortOrder((orderPostfix || sortOrder) === '-asc' ? '-desc' : '-asc')
  }, [orderPostfix, sortOrder, handleChangeOrder])

  return (
    <SortByWrapper>
      <StyledSortText>{intl.get('tableSettings.sortBy')}</StyledSortText>
      {isHaveOrderIcon && (
        <IconButton
          styleParam={{ marginRight: '10px', fontSize: '16px' }}
          type={(orderPostfix || sortOrder) === '-asc' ? 'ArrowUp' : 'ArrowDown'}
          actionFunction={handleSetOrder}
        />
      )}
      <Select
        defaultValue={defaultValue}
        value={customValue || value}
        style={style}
        onChange={val => {
          handleSort(val)
          setValue(val)
        }}
        getPopupContainer={trigger => trigger.parentNode}
      >
        {sortedOptions &&
          sortedOptions
            .filter(el => {
              if (order) {
                return `${el.value}${isAsc ? '-asc' : orderPostfix || sortOrder}` !== order
              }
              return el.value
            })
            .map(el => (
              <Option
                key={`${el.customFieldId}`}
                style={{
                  color: el.fieldId === 'Do not sort' ? 'rgb(145, 145, 145)' : 'rgb(178,179,178)',
                  fontFamily: 'Roboto',
                  fontWeight: el.fieldId === 'Do not sort' ? 900 : 600,
                  fontSize: 14
                }}
                value={el.fieldId}
              >
                {el.title}
              </Option>
            ))}
      </Select>
    </SortByWrapper>
  )
}

SortBy.propTypes = {
  defaultValue: PropTypes.string,
  handleSort: PropTypes.func,
  sortedOptions: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  order: PropTypes.string,
  isAsc: PropTypes.bool,
  isHaveOrderIcon: PropTypes.bool,
  handleChangeOrder: PropTypes.func,
  orderPostfix: PropTypes.string
}

SortBy.defaultProps = {
  defaultValue: 'Do not sort',
  handleSort: null,
  sortedOptions: [],
  style: {},
  order: '',
  isAsc: false,
  isHaveOrderIcon: false,
  handleChangeOrder: null,
  orderPostfix: null
}

export default SortBy

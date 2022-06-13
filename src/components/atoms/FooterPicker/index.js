import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'antd'
import moment from 'moment'

const ButtonWrapper = styled.div`
  display: inline-block;
  padding: 0 5px;

  & .ant-btn-danger {
    border: 1px solid #d9d9d9;
    background-color: #fff;
    color: #b3b3b3;
    box-shadow: none;
  }
  & .ant-btn-danger:hover {
    background-color: #ff4d4f !important;
    color: #fff;
  }
  & .ant-btn-danger:focus {
    background-color: #ff4d4f !important;
    color: #fff;
  }
  & .ant-btn-danger[disabled] {
    color: rgba(0, 0, 0, 0.25) !important;
    background-color: #f5f5f5 !important;
    border-color: #d9d9d9 !important;
    text-shadow: none !important;
    box-shadow: none !important;
  }
  & .ant-btn-danger[disabled]:hover {
    color: rgba(0, 0, 0, 0.25) !important;
    background-color: #f5f5f5 !important;
    border-color: #d9d9d9 !important;
    text-shadow: none !important;
    box-shadow: none !important;
  }
`

const FooterPicker = ({ ranges, onChange }) => {
  const disabled = useCallback(item => {
    let isDisabled = false

    if (
      item === 'This Month' &&
      moment().startOf('month') >=
        moment()
          .subtract(1, 'days')
          .startOf('day')
    ) {
      isDisabled = true
    } else if (
      item === 'This Week' &&
      moment().startOf('week') >=
        moment()
          .subtract(1, 'days')
          .startOf('day')
    ) {
      isDisabled = true
    }

    return isDisabled
  }, [])

  return (
    <div>
      {ranges &&
        Object.keys(ranges).map(item => {
          return (
            <ButtonWrapper key={item}>
              <Button disabled={disabled(item)} type='danger' size='small' onClick={() => onChange(ranges[item])}>
                {item}
              </Button>
            </ButtonWrapper>
          )
        })}
    </div>
  )
}

FooterPicker.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ranges: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

FooterPicker.defaultProps = {
  ranges: null
}

export default FooterPicker

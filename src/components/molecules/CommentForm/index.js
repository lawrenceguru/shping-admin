import React, { useState, useMemo, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Form, Input } from 'antd'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import WidgetRemaining from '../../atoms/WidgetRemaining'

const { TextArea } = Input

const Wrapper = styled.div`
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  & .ant-form-item-label > label {
    color: rgba(0, 0, 0, 0.85);
  }
  & .ant-select {
    & .ant-select-selection-selected-value {
      color: rgba(0, 0, 0, 0.65);
      font-weight: 400;
    }
  }
  & .ant-form-item-children {
    position: initial;
  }
`

const CommentForm = ({ onChange, commentText }) => {
  const [value, setValue] = useState()
  const remainingValue = useMemo(() => {
    return 250 - ((value && value.length) || 0)
  }, [value])

  useEffect(() => {
    if (commentText) {
      setValue(commentText)
    }
  }, [])

  const handleOnChange = useCallback(event => {
    if (event.target.value && event.target.value.length > 250) {
      const subValue = event.target.value.slice(0, 250)
      onChange(subValue)
      setValue(subValue)
    } else {
      onChange(event.target.value)
      setValue(event.target.value)
    }
  }, [])

  return (
    <Wrapper>
      <Form.Item label={intl.get('reviews.comments.label')}>
        <WidgetRemaining value={remainingValue} />
        <TextArea
          style={{ width: '100%' }}
          onChange={handleOnChange}
          value={value}
          onKeyPress={event => {
            if (event.target.value && event.target.value.length > 250) {
              event.stopPropagation()
              event.preventDefault()
            }
          }}
          rows={4}
          placeholder={intl.get('reviews.comments.placeholder')}
        />
      </Form.Item>
    </Wrapper>
  )
}

CommentForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  commentText: PropTypes.string
}

CommentForm.defaultProps = {
  commentText: null
}

export default CommentForm

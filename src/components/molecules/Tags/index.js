import React, { useState, useRef, useEffect } from 'react'
import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'
import intl from 'react-intl-universal'
import { PlusOutlined } from '@ant-design/icons'
import * as ST from './styles'

function EditableTagGroup({ initialTags, onChangeVaue, newTagLabel }) {
  const [tags, setTags] = useState(() => {
    if (Array.isArray(initialTags)) {
      return initialTags.filter(item => !Array.isArray(item))
    }
    return []
  })
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [editInputIndex, setEditInputIndex] = useState(false)
  const [editInputValue, setEditInputValue] = useState('')

  const handleClose = removedTag => {
    setTags(tags.filter(tag => tag !== removedTag))
    onChangeVaue(tags.filter(tag => tag !== removedTag))
  }

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    let clonedTags = [...tags]
    if (inputValue && clonedTags.indexOf(inputValue) === -1) {
      clonedTags = [...clonedTags, inputValue]
    }
    setTags(clonedTags)
    onChangeVaue(clonedTags)
    setInputVisible(false)
    setInputValue('')
  }

  const handleEditInputChange = e => {
    setEditInputValue(e.target.value)
  }

  const handleEditInputConfirm = () => {
    const newTags = [...tags]
    newTags[editInputIndex] = editInputValue
    setTags(newTags)
    onChangeVaue(newTags)
    setEditInputIndex(-1)
    setEditInputValue('')
  }

  const inputRef = useRef()
  const editInputRef = useRef()

  const showInput = () => {
    setInputVisible(true)
  }
  useEffect(() => {
    if (inputVisible && inputRef.current) inputRef.current.focus()
  }, [inputVisible])
  useEffect(() => {
    if (inputVisible > -1 && editInputRef.current) editInputRef.current.focus()
  }, [editInputIndex])

  const isLong = tag => tag.length > 20
  const tagElem = (tag, index) => (
    <ST.EditTag className='edit-tag' closable={index !== -1} onClose={() => handleClose(tag)}>
      <span
        onDoubleClick={e => {
          setEditInputIndex(index)
          setEditInputValue(tag)
          e.preventDefault()
        }}
      >
        {isLong(tag) ? `${tag.slice(0, 20)}...` : tag}
      </span>
    </ST.EditTag>
  )
  return (
    <>
      {tags.map((tag, index) => (
        <React.Fragment key={tag}>
          {editInputIndex === index ? (
            <ST.TagInput
              ref={editInputRef}
              size='small'
              className='tag-input'
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          ) : (
            <>
              {editInputIndex !== index && isLong(tag) && <Tooltip title={tag}>{tagElem(tag, index)}</Tooltip>}
              {editInputIndex !== index && !isLong(tag) && tagElem(tag, index)}
            </>
          )}
        </React.Fragment>
      ))}
      {inputVisible && (
        <ST.TagInput
          ref={inputRef}
          type='text'
          size='small'
          className='tag-input'
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <ST.SiteTagPlus onClick={showInput}>
          <PlusOutlined /> {newTagLabel}
        </ST.SiteTagPlus>
      )}
    </>
  )
}

EditableTagGroup.propTypes = {
  initialTags: PropTypes.arrayOf(PropTypes.string),
  newTagLabel: PropTypes.string,
  onChangeVaue: PropTypes.func
}

EditableTagGroup.defaultProps = {
  initialTags: [],
  newTagLabel: intl.get('categoryTab.newKeyword'),
  onChangeVaue: undefined
}

export default EditableTagGroup

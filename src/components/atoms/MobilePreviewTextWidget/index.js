import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { Editor } from 'react-draft-wysiwyg'
import { ContentState, EditorState } from 'draft-js'

const TextWidgetWrapper = styled.div`
  color: black;
  font-weight: 400;
  font-size: 12px;
  text-align: justify;
  padding-left: 10px;
  & .rdw-editor-main {
    height: initial;
  }
`

const ProductPreviewTextWidget = ({ text }) => {
  const editorText = useMemo(() => {
    if (text && typeof text !== 'string') {
      return text
    }
    if (text && typeof text === 'string') {
      const newContent = ContentState.createFromText(text)
      return EditorState.createWithContent(newContent)
    }
    return EditorState.createEmpty()
  }, [text])

  return (
    <TextWidgetWrapper>
      <div>{editorText.getCurrentContent().getPlainText()}</div>
    </TextWidgetWrapper>
  )
}

ProductPreviewTextWidget.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  // eslint-disable-next-line react/no-unused-prop-types
  markdown: PropTypes.bool
}

ProductPreviewTextWidget.defaultProps = {
  text: null,
  markdown: false
}

export default ProductPreviewTextWidget

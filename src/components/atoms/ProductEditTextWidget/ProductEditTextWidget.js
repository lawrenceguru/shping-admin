import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RHFInput } from 'react-hook-form-input'
import { Form, Input, Checkbox, Select } from 'antd'
import intl from 'react-intl-universal'
import { EditorState, convertToRaw, ContentState, ContentBlock } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { draftToMarkdown } from 'markdown-draft-js'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import { StyledError } from '../ProductEditInfoWidget/styles'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import WidgetRemaining from '../WidgetRemaining'

const EditorWrapper = styled.div`
  min-height: 200px;
  border: 1px solid rgb(178, 179, 178);
  border-radius: 5px;
  padding: 6px 11px;
  font-weight: 400;
  & .rdw-editor-main {
    max-height: 200px;
  }
`
export const TITLE_TEXT_LENGTH = 200
const TEXT_TEXT_LENGTH = 2000
const { TextArea } = Input
const { Option } = Select
const currentLocale = localStorage.getItem('lang')

const ProductEditTextWidget = ({
  register,
  setValue,
  clearError,
  setError,
  errors,
  data,
  sources,
  activeSource,
  widgetIndex,
  isSelectsDisable,
  textTypes,
  settingsGetTextTypes,
  isLoadingTextTypes
}) => {
  const editorText = () => {
    if (data.text && data.text.text && typeof data.text.text !== 'string') {
      return data.text.text
    }
    if (data.text && data.text.text) {
      return EditorState.createWithContent(ContentState.createFromText(data.text.text))
    }
    return EditorState.createEmpty()
  }

  const [plainText, setPlainText] = useState(
    editorText()
      .getCurrentContent()
      .getPlainText()
  )

  const setSources = (field, value) => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].text[field] = value
    setValue('sources', newSources)
  }

  const validationFieldValue = (field, value) => {
    clearError(`sources[${activeSource}].data[${widgetIndex}].text.${field}`)
    if (!value) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].text.${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }

  const parseText = value => {
    const string = draftToMarkdown(convertToRaw(value.getCurrentContent()))
    validationFieldValue('text', string)
  }

  useEffect(() => {
    if (!data.text || !data.text.text) {
      setError(
        `sources[${activeSource}].data[${widgetIndex}].text.text`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }

    if (!textTypes || !textTypes.length) {
      settingsGetTextTypes()
    }
  }, [])

  useEffect(() => {
    setPlainText(
      editorText()
        .getCurrentContent()
        .getPlainText()
    )
  }, [activeSource, data])

  const handleChangeEditorState = value => {
    if (
      value.getCurrentContent().getPlainText() ===
      editorText()
        .getCurrentContent()
        .getPlainText()
    ) {
      setSources('text', value)
      setPlainText(value.getCurrentContent().getPlainText())
      return
    }
    parseText(value)
    const contentState = value.getCurrentContent()
    if (contentState.getPlainText().length > TEXT_TEXT_LENGTH) {
      const newBlocks = []
      let newLength = 0
      value
        .getCurrentContent()
        .getBlocksAsArray()
        .forEach(block => {
          if (newLength < TEXT_TEXT_LENGTH) {
            if (block.getText().length + newLength < TEXT_TEXT_LENGTH) {
              const newBlock = new ContentBlock({
                key: block.getKey(),
                type: block.getType(),
                text: block.getText(),
                characterList: block.getCharacterList()
              })
              newLength += block.getText().length
              newBlocks.push(newBlock)
            } else {
              const newText = block.getText().substr(0, TEXT_TEXT_LENGTH - newLength)
              const newBlock = new ContentBlock({
                key: block.getKey(),
                type: block.getType(),
                text: newText,
                characterList: block.getCharacterList()
              })
              newLength += newText.length
              newBlocks.push(newBlock)
            }
          }
        })
      const newStateWithBlocks = EditorState.moveFocusToEnd(
        EditorState.createWithContent(ContentState.createFromBlockArray(newBlocks))
      )
      setSources('text', newStateWithBlocks)
      setPlainText(newStateWithBlocks.getCurrentContent().getPlainText())
    } else {
      setSources('text', value)
      setPlainText(value.getCurrentContent().getPlainText())
    }
  }

  const handleChangeTitle = value => {
    let newValue = value.trimLeft().replace('  ', ' ')
    if (newValue.length > TITLE_TEXT_LENGTH) {
      newValue = newValue.substring(0, TITLE_TEXT_LENGTH)
    }
    validationFieldValue('title', newValue)
    setSources('title', newValue)
  }

  const remainingValue = TITLE_TEXT_LENGTH - (data.text && data.text.title && data.text.title.length) || 0

  return (
    <ProductEditWidgetWrapper
      headerText={intl.get('widgets.text.title')}
      id={data.id}
      HeaderPanel={() => (
        <WidgetHeaderSwitchMode
          setValue={setValue}
          data={data}
          sources={sources}
          activeSource={activeSource}
          widgetIndex={widgetIndex}
          isSelectsDisable={isSelectsDisable}
        />
      )}
    >
      <Form.Item label={intl.get('widgets.text.titleField')}>
        <WidgetRemaining value={remainingValue} />
        <RHFInput
          as={<Input size='large' disabled={isSelectsDisable} />}
          rules={{ required: true }}
          register={register}
          setValue={setValue}
          value={data && data.text && data.text.title}
          onChange={e => {
            const { value } = e.target
            handleChangeTitle(value)
          }}
        />
        <StyledError
          style={{
            visibility: errors[`sources[${activeSource}].data[${widgetIndex}].text.title`] ? 'visible' : 'hidden'
          }}
        >
          {errors[`sources[${activeSource}].data[${widgetIndex}].text.title`] &&
            errors[`sources[${activeSource}].data[${widgetIndex}].text.title`].message}
        </StyledError>
      </Form.Item>
      <Form.Item label='Text'>
        <p
          style={{
            marginBottom: 20,
            position: 'absolute',
            top: '-28px',
            right: '-5px'
          }}
        >
          <RHFInput
            as={
              <Checkbox
                size='large'
                disabled={isSelectsDisable}
                defaultChecked={(data.text && data.text.markdown) || false}
              />
            }
            register={register}
            value={(data.text && data.text.markdown) || false}
            onChange={e => {
              if (e.target.checked) {
                const newContent = ContentState.createFromText(plainText)
                setSources('text', EditorState.createWithContent(newContent))
              }
              setSources('markdown', e.target.checked)
              validationFieldValue('text', plainText)
            }}
            setValue={setValue}
          >
            Markdown
          </RHFInput>
        </p>
        {!sources[activeSource].data[widgetIndex].text.markdown && (
          <RHFInput
            as={<TextArea size='large' disabled={isSelectsDisable} rows={12} maxLength={TEXT_TEXT_LENGTH} />}
            register={register}
            value={plainText}
            setValue={setValue}
            onChange={value => {
              validationFieldValue('text', value.target.value)
              setSources('text', value.target.value)
              setPlainText(value.target.value)
            }}
          />
        )}
        {sources[activeSource].data[widgetIndex].text.markdown && (
          <div id='editor-container' className='c-editor-container js-editor-container'>
            <EditorWrapper>
              <Editor
                readOnly={isSelectsDisable}
                toolbarHidden={data.text && data.text && !data.text.markdown}
                editorState={editorText()}
                onEditorStateChange={handleChangeEditorState}
                editorClassName={isSelectsDisable && 'disabled'}
                toolbar={{
                  options: ['inline', 'blockType', 'list', 'remove', 'history'],
                  inline: {
                    options: ['bold', 'italic']
                  },
                  blockType: {
                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']
                  },
                  list: {
                    options: ['unordered', 'ordered']
                  }
                }}
              />
            </EditorWrapper>
          </div>
        )}
        <StyledError
          style={{
            visibility: errors[`sources[${activeSource}].data[${widgetIndex}].text.text`] ? 'visible' : 'hidden'
          }}
        >
          {errors[`sources[${activeSource}].data[${widgetIndex}].text.text`] &&
            errors[`sources[${activeSource}].data[${widgetIndex}].text.text`].message}
        </StyledError>
      </Form.Item>
      <Form.Item label={intl.get('widgets.text.subtype')}>
        <Select
          style={{ width: '100%' }}
          getPopupContainer={trigger => trigger.parentNode}
          value={(data.text && data.text.sub_type) || undefined}
          placeholder={intl.get('widgets.text.subtypePlaceholder')}
          onChange={value => {
            setSources('sub_type', value)
          }}
          loading={isLoadingTextTypes}
        >
          {textTypes.map(el => (
            <Option style={{ fontSize: 16 }} key={el.id} value={el.id}>
              {currentLocale !== 'en' ? el[`name_${currentLocale}`] : el.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </ProductEditWidgetWrapper>
  )
}

ProductEditTextWidget.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  activeSource: PropTypes.number.isRequired,
  widgetIndex: PropTypes.number.isRequired,
  sources: PropTypes.arrayOf(PropTypes.object),
  isSelectsDisable: PropTypes.bool,
  settingsGetTextTypes: PropTypes.func.isRequired,
  textTypes: PropTypes.arrayOf(PropTypes.object),
  isLoadingTextTypes: PropTypes.bool
}

ProductEditTextWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  isSelectsDisable: false,
  isLoadingTextTypes: false,
  textTypes: []
}

export default ProductEditTextWidget

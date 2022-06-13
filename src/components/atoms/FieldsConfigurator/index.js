import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import Checkbox from '../Checkbox'
import IconButton from '../../molecules/IconButton'
import ModalWithHeader from '../ModalWithHeader'
import { FieldWrapper, NameWrapper, ModalFooterWrapper } from './styles'
import CustomButton from '../../molecules/Button'

const FieldsConfigurator = ({ fields, isAdvancedOptionsConfigurate, setModalVisible, saveConfigInLocalStorage }) => {
  const [allFields, setAllFields] = useState(fields)

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    setAllFields(reorder(allFields, result.source.index, result.destination.index))
  }

  const handleChangeCheckbox = (value, id) => {
    const index = allFields.findIndex(f => f.fieldId === id)
    if (index || index === 0) {
      const newArr = [...allFields]
      newArr[index].isDisabled = !value
      setAllFields(newArr)
    }
  }

  const saveFields = () => {
    saveConfigInLocalStorage(allFields)
  }

  const handleOk = () => {
    saveFields()
    setModalVisible(false)
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  return (
    <ModalWithHeader
      title={
        isAdvancedOptionsConfigurate
          ? intl.get('serializedProductsPage.configureAdvancedFields')
          : intl.get('serializedProductsPage.configure')
      }
      footer={
        <ModalFooterWrapper>
          <CustomButton
            color='rgb(179, 179, 179)'
            borderColor='rgb(217, 217, 217)'
            backgroundColor='#fff'
            handleClick={handleCancel}
            text={intl.get('cancel')}
          />
          <CustomButton handleClick={handleOk} text={intl.get('save')} />
        </ModalFooterWrapper>
      }
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {allFields.map((el, index) => (
                <Draggable key={el.fieldId} draggableId={el.fieldId} index={index}>
                  {provideds => (
                    <FieldWrapper ref={provideds.innerRef} {...provideds.draggableProps}>
                      <NameWrapper>
                        <Checkbox
                          defaultChecked={!el.isDisabled}
                          handleChange={e => handleChangeCheckbox(e.target.checked, el.fieldId)}
                        />
                        {el.title || el.columnName}
                      </NameWrapper>
                      <div {...provideds.dragHandleProps}>
                        <IconButton
                          type='List'
                          styleParam={{ fontSize: 20, marginRight: 10, cursor: 'pointer' }}
                          visible={false}
                        />
                      </div>
                    </FieldWrapper>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ModalWithHeader>
  )
}

FieldsConfigurator.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object),
  modalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  saveConfigInLocalStorage: PropTypes.func,
  isAdvancedOptionsConfigurate: PropTypes.bool
}

FieldsConfigurator.defaultProps = {
  fields: [],
  modalVisible: false,
  setModalVisible: null,
  saveConfigInLocalStorage: null,
  isAdvancedOptionsConfigurate: false
}

export default FieldsConfigurator

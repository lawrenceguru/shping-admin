import React, { useMemo } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import Scroll from 'react-scroll'
import * as ST from './styles'
import IconButton from '../IconButton'
import { widgetOptions } from './consts'

const ProfileBuilderSelectedWidgets = ({
  clearError,
  setValue,
  sourceWidgets,
  sources,
  activeSource,
  isSelectsDisable,
  postUploadClear,
  modalVisible,
  setModalVisible
}) => {
  const widgetIcons = useMemo(() => {
    return sourceWidgets.map(el => {
      return {
        [Object.keys(el)[0]]: el[Object.keys(el)[0]].text && el.text ? el.text.text.title : null,
        id: el[Object.keys(el)[0]].id
      }
    })
  }, [sourceWidgets])

  const clearErrors = index => {
    if (Object.keys(sources[activeSource].data[index]).includes('certificates')) {
      clearError(`sources[${activeSource}].data[${index}].certificates.title`)
      if (
        sources[activeSource].data[index].certificates.list &&
        sources[activeSource].data[index].certificates.list.length
      ) {
        sources[activeSource].data[index].certificates.list.forEach((el, indexs) => {
          clearError(`sources[${activeSource}].data[${index}].certificates.list[${indexs}].img_url`)
        })
      }
      return
    }

    if (Object.keys(sources[activeSource].data[index]).includes('image')) {
      clearError(`sources[${activeSource}].data[${index}].image`)
      return
    }

    Object.keys(sources[activeSource].data[index])
      .filter(item => !['private', 'id'].includes(item))
      .forEach(item => {
        Object.keys(sources[activeSource].data[index][item]).forEach(element => {
          clearError(`sources[${activeSource}].data[${index}].${item}.${element}`)
        })
      })
  }

  const deleteWidget = index => {
    clearErrors(index)
    postUploadClear()
    const newSources = [...sources]
    newSources[activeSource].data.splice(index, 1)
    setValue('sources', sources)
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const reorderWidgets = items => {
    const reorderedWidgets = []
    sourceWidgets.forEach(el => {
      const widgetIndex = items.findIndex(widget => widget.id === el[Object.keys(el)[0]].id)
      reorderedWidgets[widgetIndex] = el[Object.keys(el)[0]]
    })
    const newSources = [...sources]
    newSources[activeSource].data = reorderedWidgets
    setValue('sources', newSources)
  }

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }
    const items = reorder(widgetIcons, result.source.index, result.destination.index)
    reorderWidgets(items)
  }

  return (
    <ST.SelectedWidgetsWrapper id='container2'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable' isDropDisabled={isSelectsDisable}>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {widgetIcons.map((el, index) => {
                const name = Object.keys(el)[0]
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Draggable key={`${el}${index}`} draggableId={`${el}${index}`} index={index}>
                    {provideds => (
                      <ST.SelectedItem ref={provideds.innerRef} {...provideds.draggableProps}>
                        <Scroll.Link to={el.id} offset={-200} spy smooth duration={500} containerId='container1'>
                          <div {...provideds.dragHandleProps}>
                            <IconButton
                              type='List'
                              styleParam={{ fontSize: 20, marginRight: 10, cursor: 'move' }}
                              actionFunction={() => setModalVisible(!modalVisible)}
                              visible
                            />
                          </div>
                          <div>
                            <>
                              <div>{widgetOptions[name]}</div>
                              <ST.WidgetTitle>
                                {name === 'video' ? sources[activeSource].data[index].video.title : el[name]}
                              </ST.WidgetTitle>
                            </>
                          </div>
                          <IconButton
                            type='Delete'
                            actionFunction={() => {
                              return !isSelectsDisable ? deleteWidget(index) : null
                            }}
                            className={isSelectsDisable ? 'disabled' : ''}
                            styleParam={{
                              fontSize: 25,
                              cursor: 'pointer',
                              marginRight: 10,
                              color: '#b3b3b3',
                              marginLeft: 10
                            }}
                          />
                        </Scroll.Link>
                      </ST.SelectedItem>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ST.SelectedWidgetsWrapper>
  )
}

ProfileBuilderSelectedWidgets.propTypes = {
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  unregister: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  modalWidget: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  sourceWidgets: PropTypes.array,
  sources: PropTypes.arrayOf(PropTypes.object),
  activeSource: PropTypes.number.isRequired,
  isSelectsDisable: PropTypes.bool.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  postUploadClear: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired
}

ProfileBuilderSelectedWidgets.defaultProps = {
  errors: {},
  modalWidget: {},
  sourceWidgets: [],
  sources: []
}

export default ProfileBuilderSelectedWidgets

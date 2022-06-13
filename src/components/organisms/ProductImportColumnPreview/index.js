import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Checkbox, Select } from 'antd'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import * as ST from './styles'
import { widgetOptions, fieldsAttributes, columns } from './consts'
import IconButton from '../../molecules/IconButton'
import { useWindowSize } from '../../molecules/Table/utils'

const { Option } = Select

const ProductImportColumnPreview = ({ header, fields, setFields, onDragEnd }) => {
  const [widgetGroupOptions, setWidgetGroupOptions] = useState([{ value: 1, label: 'Group 1' }])
  const [width] = useWindowSize()

  const dataSource = useMemo(() => {
    return header && header.length
      ? header.map(item => {
          return {
            csvColumn: item.header,
            id: item.id
          }
        })
      : []
  }, [header])

  useEffect(() => {
    if (!fields.length) {
      setFields(
        header.map(item => ({
          [item.id]: {
            column: item.header
          }
        }))
      )
    }
  }, [header, fields])

  const isRowNotExist = useCallback(
    (field, index, rowDirectionId) => {
      return !fields || !fields[index] || !fields[index][rowDirectionId] || !fields[index][rowDirectionId][field]
    },
    [fields]
  )

  const disabledCheckboxs = useMemo(() => {
    return fields && fields.length
      ? fields.map((item, index) => {
          const key = Object.keys(item)
          let isRow
          let isImageUrl = true
          let isUrlNotLink = true
          if (key.length) {
            isRow = isRowNotExist('field', index, key[0])
            if (item && item[key[0]] && item[key[0]].field) {
              isImageUrl = ['img_url', 'image'].includes(item[key[0]].field)
              isUrlNotLink = item[key[0]].field === 'url' && !['social_networks', 'link'].includes(item[key[0]].widget)
            }
          }
          return isRow || !(isImageUrl || isUrlNotLink)
        })
      : header.map(() => {
          return true
        })
  }, [fields, header, isRowNotExist])

  const getCurrentGroup = useCallback(
    (widgetValue, key, id) => {
      if (!fields[key] || !fields[key][id] || !widgetValue) {
        return undefined
      }

      const previousWidgets = fields.slice(0, key)

      if (!previousWidgets) {
        return widgetGroupOptions[0].value
      }
      const previousWidgetsRev = previousWidgets.reverse()

      const previousElement = previousWidgetsRev.find(el => {
        return fields[key] && fields[key][Object.keys(el)[0]] && fields[key][Object.keys(el)[0]].widget === widgetValue
      })

      if (!previousElement) {
        return widgetGroupOptions[0].value
      }
      return previousElement.group
    },
    [fields, widgetGroupOptions]
  )

  const addGroup = useCallback(() => {
    const currOptions = [...widgetGroupOptions]
    const newOptionNumber = currOptions.length + 1

    setWidgetGroupOptions([...currOptions, { value: newOptionNumber, label: `Group ${newOptionNumber}` }])
  }, [widgetGroupOptions])

  const checkFieldSelect = useCallback(
    (widget, prevField) => {
      let newField

      if (prevField && widget) {
        newField = fieldsAttributes[widget].filter(elem => elem.value === prevField).length ? prevField : undefined
      }

      return newField
    },
    [fieldsAttributes]
  )

  const selectOnChange = useCallback(
    (value, editIndex, id, name) => {
      if (value === 'AddGroup') {
        return
      }

      setFields(prevState =>
        prevState.map((item, index) => {
          if (index === editIndex) {
            return {
              [id]: {
                ...item[id],
                field: name === 'widget' ? checkFieldSelect(value, item[id].field) : item[id].field,
                group:
                  name === 'widget' && ['image', 'social_networks'].includes(value)
                    ? item[id].group || getCurrentGroup(value, editIndex, id)
                    : item[id].group,
                [name]: value
              }
            }
          }
          return { ...item }
        })
      )
    },
    [getCurrentGroup, checkFieldSelect]
  )

  return (
    <>
      <ST.Header>{intl.get('importProducts.mapping.otherColumns.title')}</ST.Header>
      <ST.TableWrapper>
        <ST.List countItems={dataSource && dataSource.length} width={width}>
          <ST.ListHeaderRow>
            {columns &&
              columns.length &&
              columns.map(item =>
                [
                  intl.get('importProducts.mapping.otherColumns.widgetGroup'),
                  intl.get('importProducts.mapping.otherColumns.widget'),
                  intl.get('importProducts.mapping.otherColumns.field')
                ].includes(item) ? (
                  <ST.ListHeadSelect key={item}>{item}</ST.ListHeadSelect>
                ) : (
                  <ST.ListHead key={item}>{item}</ST.ListHead>
                )
              )}
          </ST.ListHeaderRow>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {dataSource &&
                    dataSource.length &&
                    dataSource.map((field, fieldIndex) => (
                      <Draggable key={field.id} draggableId={field.id} index={fieldIndex}>
                        {provideds => (
                          <ST.ListRow key={field.id} ref={provideds.innerRef} {...provideds.draggableProps}>
                            <ST.ListItem>
                              <Checkbox
                                size='large'
                                defaultChecked={
                                  fields &&
                                  fields[fieldIndex] &&
                                  fields[fieldIndex][field.id] &&
                                  fields[fieldIndex][field.id].isImport
                                }
                                checked={
                                  fields &&
                                  fields[fieldIndex] &&
                                  fields[fieldIndex][field.id] &&
                                  fields[fieldIndex][field.id].isImport
                                }
                                onChange={event => {
                                  setFields(prevState =>
                                    prevState.map((item, index) => {
                                      if (index === fieldIndex) {
                                        return { [field.id]: { ...item[field.id], isImport: event.target.checked } }
                                      }
                                      return { ...item }
                                    })
                                  )
                                }}
                              />
                            </ST.ListItem>
                            <ST.ListItemSelect>
                              <Select
                                showSearch
                                disabled={
                                  isRowNotExist('widget', fieldIndex, field.id) ||
                                  !['image', 'social_networks'].includes(fields[fieldIndex][field.id].widget)
                                }
                                size='large'
                                placeholder={intl.get('importProducts.mapping.selectPlaceholder')}
                                filterOption={(input, option) =>
                                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                defaultValue={
                                  fields &&
                                  fields[fieldIndex] &&
                                  fields[fieldIndex][field.id] &&
                                  fields[fieldIndex][field.id].group
                                }
                                value={
                                  fields &&
                                  fields[fieldIndex] &&
                                  fields[fieldIndex][field.id] &&
                                  fields[fieldIndex][field.id].group
                                }
                                onChange={value => selectOnChange(value, fieldIndex, field.id, 'group')}
                              >
                                {widgetGroupOptions && widgetGroupOptions.length
                                  ? widgetGroupOptions.map(option => (
                                      <Option style={{ fontSize: 16 }} key={option.value} value={option.value}>
                                        {option.label}
                                      </Option>
                                    ))
                                  : null}
                                <Option key='AddGroup' onClick={addGroup}>
                                  <ST.WrapperOptionContent>
                                    <IconButton type='Add' />
                                    <span>Add Group</span>
                                  </ST.WrapperOptionContent>
                                </Option>
                              </Select>
                            </ST.ListItemSelect>
                            <ST.ListItemSelect>
                              <Select
                                showSearch
                                size='large'
                                placeholder={intl.get('importProducts.mapping.selectPlaceholder')}
                                filterOption={(input, option) =>
                                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                defaultValue={
                                  fields &&
                                  fields[fieldIndex] &&
                                  fields[fieldIndex][field.id] &&
                                  fields[fieldIndex][field.id].widget
                                }
                                value={
                                  fields &&
                                  fields[fieldIndex] &&
                                  fields[fieldIndex][field.id] &&
                                  fields[fieldIndex][field.id].widget
                                }
                                onChange={value => selectOnChange(value, fieldIndex, field.id, 'widget')}
                              >
                                {widgetOptions && widgetOptions.length
                                  ? widgetOptions.map(option => (
                                      <Option style={{ fontSize: 16 }} key={option.value} value={option.value}>
                                        {option.label}
                                      </Option>
                                    ))
                                  : null}
                              </Select>
                            </ST.ListItemSelect>
                            <ST.ListItem>{field.csvColumn}</ST.ListItem>
                            <ST.ListItemSelect>
                              <Select
                                showSearch
                                size='large'
                                placeholder={intl.get('importProducts.mapping.selectPlaceholder')}
                                filterOption={(input, option) =>
                                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                defaultValue={
                                  fields &&
                                  fields[fieldIndex] &&
                                  fields[fieldIndex][field.id] &&
                                  fields[fieldIndex][field.id].field
                                }
                                value={
                                  fields &&
                                  fields[fieldIndex] &&
                                  fields[fieldIndex][field.id] &&
                                  fields[fieldIndex][field.id].field
                                }
                                onChange={value => selectOnChange(value, fieldIndex, field.id, 'field')}
                              >
                                {fieldsAttributes &&
                                fieldsAttributes[
                                  fields &&
                                    fields[fieldIndex] &&
                                    fields[fieldIndex][field.id] &&
                                    fields[fieldIndex][field.id].widget
                                ]
                                  ? fieldsAttributes[fields[fieldIndex][field.id].widget].map(option => (
                                      <Option style={{ fontSize: 16 }} key={option.value} value={option.value}>
                                        {option.label}
                                      </Option>
                                    ))
                                  : null}
                              </Select>
                            </ST.ListItemSelect>
                            <ST.ListItem>
                              <Checkbox
                                disabled={disabledCheckboxs[fieldIndex]}
                                size='large'
                                defaultChecked={
                                  fields &&
                                  fields[fieldIndex] &&
                                  fields[fieldIndex][field.id] &&
                                  fields[fieldIndex][field.id].copy_to_cdn
                                }
                                checked={
                                  fields &&
                                  fields[fieldIndex] &&
                                  fields[fieldIndex][field.id] &&
                                  fields[fieldIndex][field.id].copy_to_cdn
                                }
                                onChange={() => {
                                  setFields(prevState =>
                                    prevState.map((item, index) => {
                                      if (index === fieldIndex) {
                                        return {
                                          [field.id]: { ...item[field.id], copy_to_cdn: !item[field.id].copy_to_cdn }
                                        }
                                      }
                                      return { ...item }
                                    })
                                  )
                                }}
                              >
                                {intl.get('importProducts.isCDN')}
                              </Checkbox>
                            </ST.ListItem>
                            <ST.ListItem {...provideds.dragHandleProps}>
                              <IconButton type='List' styleParam={{ cursor: 'pointer' }} />
                            </ST.ListItem>
                          </ST.ListRow>
                        )}
                      </Draggable>
                    ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </ST.List>
      </ST.TableWrapper>
    </>
  )
}

ProductImportColumnPreview.propTypes = {
  header: PropTypes.arrayOf(PropTypes.object),
  fields: PropTypes.arrayOf(PropTypes.object),
  setFields: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired
}

ProductImportColumnPreview.defaultProps = {
  header: [],
  fields: []
}

export default ProductImportColumnPreview

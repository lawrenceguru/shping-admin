import React, { useEffect, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { Input, Button } from 'antd'
import { toast } from 'react-toastify'
import { isEqual } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Row, RowStart, ButtonsWrapper, Buttons, StyledTitle, CustomInputs } from './styles'
import IconButton from '../IconButton'

const IndexFields = ({ defaultIndexFields, isLoadingIndexInfo, customIndexFields, indexPostIndexInfo }) => {
  const notify = () => toast.error('Please, fill in all input field!')
  const [inputFields, setInputFields] = useState(customIndexFields)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setInputFields(customIndexFields)
  }, [customIndexFields])

  const saveIndexFields = () => {
    if (JSON.parse(localStorage.getItem('indexFields'))) {
      const compareitems = JSON.parse(localStorage.getItem('indexFields'))
      if (isEqual(compareitems, inputFields)) {
        return
      }
    }
    const isValfieldIdsValue = inputFields.some(field => !field.columnName || !field.fieldName)
    if (!isValfieldIdsValue) {
      const res = {}
      inputFields.forEach(field => {
        res[field.fieldName] = field.columnName
      })
      indexPostIndexInfo({ payload: res })
    } else {
      notify()
    }
  }

  const changeInputValue = (value, fieldName, id) => {
    const fieldIndex = inputFields.findIndex(i => i.fieldId === id)

    if (fieldIndex < 0) {
      return
    }

    const newInputFields = [...inputFields]
    newInputFields[fieldIndex][fieldName] = value

    setInputFields(newInputFields)
  }

  const addIndexField = () => {
    setInputFields([...inputFields, { columnName: '', fieldName: '', fieldId: count }])
    setCount(count + 1)
  }

  const deleteIndexField = id => {
    const newInputFields = [...inputFields].filter(el => el.fieldId !== id)
    setInputFields(newInputFields)
  }
  return (
    <>
      <div>
        <StyledTitle>
          <span>{intl.get('indexFieldsPage.defaultIndexFields')}</span>
        </StyledTitle>
        {defaultIndexFields.map(field => (
          <Row key={field.fieldId}>
            <Input
              size='large'
              onChange={e => changeInputValue(e.target.value, 'fieldName', field.fieldName)}
              value={field.fieldName}
              placeholder='Field name'
              disabled
            />
            <Input
              size='large'
              onChange={e => changeInputValue(e.target.value, 'columnName', field.columnName)}
              value={field.columnName}
              placeholder='Column name'
              disabled
            />
          </Row>
        ))}
      </div>
      <div>
        <>
          <StyledTitle>
            <span>{intl.get('indexFieldsPage.customIndexFields')}</span>
          </StyledTitle>
          {inputFields &&
            !!inputFields.length &&
            // eslint-disable-next-line array-callback-return,consistent-return
            inputFields.map(field => {
              return (
                <RowStart key={field.fieldId}>
                  <CustomInputs>
                    <Input
                      size='large'
                      onChange={e => changeInputValue(e.target.value, 'fieldName', field.fieldId)}
                      value={field.fieldName}
                      placeholder='Field name'
                    />
                    <FontAwesomeIcon style={{ fontSize: 40, color: '#b3b3b3' }} icon={faLongArrowAltRight} />
                    <Input
                      size='large'
                      onChange={e => changeInputValue(e.target.value, 'columnName', field.fieldId)}
                      value={field.columnName}
                      placeholder='Column name'
                    />
                  </CustomInputs>
                  <IconButton
                    type='Delete'
                    actionFunction={() => deleteIndexField(field.fieldId)}
                    popText={intl.get('productCatalogue.deleteField')}
                  />
                </RowStart>
              )
            })}
          <ButtonsWrapper>
            <Buttons>
              <Button className='add-btn' onClick={addIndexField}>
                <FontAwesomeIcon style={{ fontSize: 10, color: '#b3b3b3', marginRight: 5 }} icon={faPlus} />
                Add index field
              </Button>
              <Button className='save-btn' loading={isLoadingIndexInfo} onClick={saveIndexFields}>
                Save
              </Button>
            </Buttons>
            <div className='fake-delete-button' />
          </ButtonsWrapper>
        </>
      </div>
    </>
  )
}

IndexFields.propTypes = {
  defaultIndexFields: PropTypes.arrayOf(PropTypes.object),
  isLoadingIndexInfo: PropTypes.bool,
  customIndexFields: PropTypes.arrayOf(PropTypes.object),
  indexPostIndexInfo: PropTypes.func.isRequired
}

IndexFields.defaultProps = {
  defaultIndexFields: [],
  customIndexFields: [],
  isLoadingIndexInfo: false
}

export default withRouter(IndexFields)

import React, { useState, useMemo } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { Input, Select, Slider, DatePicker, Checkbox, Form } from 'antd'
import moment from 'moment'
import IconButton from '../IconButton'
import Button from '../../atoms/Button'
import * as ST from './styles'
import LocalDatePicker from '../../atoms/LocalDatePicker'
import SwitchOption from '../../atoms/SwitchOption'
import CustomSelect from '../../atoms/CustomSelect'
import CustomInputNumber from '../CustomInputNumber'
import LanguagesSelect from '../LanguagesSelect'
import CountrySelect from '../CountrySelect'
import RadioGroup from '../../atoms/RadioGroup'
import { getMomentLocale, getDatePickerLocale } from '../../../utils/helpers/date'
import { rangePickerPlaceholder } from './consts'

moment.locale(getMomentLocale())

const { RangePicker } = DatePicker

const initialState = {
  id: { value: '', option: true },
  name: { value: '', option: true },
  description: { value: '', option: true }
}

const { Option } = Select

const FiltersPanel = ({
  handleFilterProducts,
  columnsData,
  children,
  defaultInitialState,
  options,
  fieldsForMainPanel,
  noEquals,
  isAdvanced,
  customClear,
  isFillValueCustom,
  fieldsForMainPanelAdvanced,
  isHaveNotPlaceholderForChildren,
  isHaveNotResetButton,
  getValueOnChange
}) => {
  const [inputs, setInputs] = useState({ ...initialState, ...defaultInitialState })
  const [advancedOptions, setAdvancedOptions] = useState(false)

  const handleInputChange = (key, value) => {
    setInputs({
      ...inputs,
      [key]: { ...inputs[key], value }
    })
  }

  const isClearButtonDisabled = useMemo(() => {
    let isFillValue = false
    Object.keys(inputs).forEach(el => {
      if (
        (options && options.length && inputs[el].value === options[0].value) ||
        (Array.isArray(inputs[el].value) ? inputs[el].value.length : String(inputs[el].value).trim()) ||
        (inputs[el].startDate && inputs[el].endDate)
      ) {
        isFillValue = true
      }
    })
    return isFillValueCustom || isFillValue
  }, [inputs, isFillValueCustom])

  const handleCheckboxChange = (key, option) => {
    setInputs({
      ...inputs,
      [key]: { ...inputs[key], option }
    })
  }

  const filterBeforeSend = clearFlag => {
    const filteredInputs = {}

    Object.keys(inputs).forEach(el => {
      if (typeof inputs[el].value === 'string') {
        inputs[el].value = inputs[el].value.trim()
      }
      if (typeof inputs[el].value === 'number') {
        filteredInputs[el] = inputs[el]
      }
      if (typeof inputs[el].value === 'boolean') {
        filteredInputs[el] = inputs[el]
      }
      if ((inputs[el].value && inputs[el].value.length) || (inputs[el].startDate && inputs[el].endDate)) {
        filteredInputs[el] = inputs[el]
      }
    })

    if (clearFlag) {
      handleFilterProducts(filteredInputs, clearFlag)
    } else {
      handleFilterProducts(filteredInputs)
    }
  }

  const clearAllFilters = () => {
    if (!isClearButtonDisabled) {
      return
    }

    const clearedInputs = {}
    Object.keys(inputs).forEach(el => {
      inputs[el].value = ''
      clearedInputs[el] = inputs[el]
    })
    setInputs(clearedInputs)

    if (customClear) {
      customClear()
      filterBeforeSend(true)
    } else {
      filterBeforeSend()
    }
  }

  const renderButtons = () => (
    <>
      <Button type='primary' onClick={() => filterBeforeSend()}>
        {intl.get('apply')}
      </Button>
      {!isHaveNotResetButton && (
        <Button className={!isClearButtonDisabled ? 'clear-all disable' : 'clear-all'} onClick={clearAllFilters}>
          {intl.get('reset')}
        </Button>
      )}
    </>
  )

  const handleSelectChange = (field, value) => {
    if (getValueOnChange) {
      getValueOnChange(field, value)
    }
    setInputs({
      ...inputs,
      [field]: { ...inputs[field], value }
    })
  }

  const getValuesFromMoment = (dates, format) => {
    const result = []

    if (dates && dates.length) {
      result.push(moment(dates[0]).format(format))
      result.push(moment(dates[1]).format(format))
    }

    return result
  }

  const getField = field => {
    if (field.type === 'select') {
      return (
        <CustomSelect
          placeholder={field.placeholder}
          size='large'
          mode={field.mode}
          handleValueChange={value => handleSelectChange(field.fieldId, value)}
          value={(inputs[field.fieldId] && inputs[field.fieldId].value) || null}
        >
          {field.options && field.options.length
            ? field.options.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))
            : null}
        </CustomSelect>
      )
    }

    if (field.type === 'group') {
      return (
        <Form.Item label={field.label}>
          <RadioGroup
            value={(inputs[field.fieldId] && inputs[field.fieldId].value) || field.defaultValue || null}
            onChange={event => handleSelectChange(field.fieldId, event.target.value)}
            group={field.options}
          />
        </Form.Item>
      )
    }

    if (field.type === 'countries') {
      return (
        <CountrySelect
          placeholder={field.placeholder}
          mode={field.mode}
          onChange={value => handleSelectChange(field.fieldId, value)}
          value={(inputs[field.fieldId] && inputs[field.fieldId].value) || null}
        />
      )
    }

    if (field.type === 'languages') {
      return (
        <LanguagesSelect
          placeholder={field.placeholder}
          mode={field.mode}
          onChange={value => handleSelectChange(field.fieldId, value)}
          value={(inputs[field.fieldId] && inputs[field.fieldId].value) || null}
        />
      )
    }

    if (field.type === 'fromTo') {
      const fromName = `${field.fieldId}_from`
      const toName = `${field.fieldId}_to`

      return (
        <Form.Item label={field.label}>
          <ST.FiledsWrapper>
            <CustomInputNumber
              placeholder={intl.get('common.from')}
              onChange={e => handleInputChange(fromName, Number(e.target.value))}
              value={inputs[fromName] && inputs[fromName].value}
            />
            <CustomInputNumber
              placeholder={intl.get('common.to')}
              onChange={e => handleInputChange(toName, Number(e.target.value))}
              value={inputs[toName] && inputs[toName].value}
            />
          </ST.FiledsWrapper>
        </Form.Item>
      )
    }

    if (field.type === 'tags') {
      return (
        <CustomSelect
          placeholder={field.placeholder}
          size='large'
          mode='tags'
          handleValueChange={value => handleSelectChange(field.fieldId, value)}
          value={(inputs[field.fieldId] && inputs[field.fieldId].value) || null}
        />
      )
    }

    if (field.type === 'rangePicker') {
      return (
        <RangePicker
          size='large'
          style={{ width: field.width || 'initial' }}
          placeholder={field.placeholder || rangePickerPlaceholder}
          locale={getDatePickerLocale()}
          value={
            (inputs[field.fieldId] &&
              inputs[field.fieldId].value &&
              inputs[field.fieldId].value.length && [
                moment(inputs[field.fieldId].value[0], field.format),
                moment(inputs[field.fieldId].value[1], field.format)
              ]) ||
            []
          }
          onChange={value => {
            handleSelectChange(field.fieldId, getValuesFromMoment(value, field.format))
          }}
          format='DD/MM/YYYY'
        />
      )
    }

    if (field.type === 'empty') {
      return <div />
    }

    if (field.type === 'checkbox') {
      return (
        <Checkbox
          checked={!!(inputs[field.fieldId] && inputs[field.fieldId].value)}
          onChange={event => handleInputChange(field.fieldId, event.target.checked)}
        >
          {field.columnName}
        </Checkbox>
      )
    }

    if (field.type === 'slider') {
      return (
        <ST.SliderWrapper>
          <Slider
            tipFormatter={null}
            max={75}
            range
            marks={field.options}
            onChange={value => handleSelectChange(field.fieldId, value)}
            step={null}
            value={(inputs[field.fieldId] && inputs[field.fieldId].value) || [0, 0]}
          />
        </ST.SliderWrapper>
      )
    }

    if (field.type === 'datePicker') {
      return (
        <LocalDatePicker
          dateValue={
            inputs[field.fieldId] && inputs[field.fieldId].value && moment(inputs[field.fieldId].value, field.format)
          }
          handleDatePickerChange={date => handleInputChange(field.fieldId, moment(date).format(field.format))}
          placeholder={field.placeholder}
        />
      )
    }

    if (field.type === 'dateFromTo') {
      const fromName = `${field.fieldId}_from`
      const toName = `${field.fieldId}_to`
      const dateName = `${field.fieldId}_date`
      return (
        <Form.Item label={field.label}>
          <ST.ColumnWrapper>
            <RangePicker
              size='large'
              placeholder={field.placeholder || rangePickerPlaceholder}
              style={{ width: field.width || 'initial' }}
              value={
                (inputs[dateName] &&
                  inputs[dateName].value &&
                  inputs[dateName].value.length && [
                    moment(inputs[dateName].value[0], field.format),
                    moment(inputs[dateName].value[1], field.format)
                  ]) ||
                []
              }
              locale={getDatePickerLocale()}
              onChange={value => {
                handleSelectChange(dateName, getValuesFromMoment(value, field.format))
              }}
              format='DD/MM/YYYY'
            />
            <ST.FiledsWrapper>
              <CustomInputNumber
                placeholder={intl.get('common.from')}
                onChange={e => handleInputChange(fromName, Number(e.target.value))}
                value={inputs[fromName] && inputs[fromName].value}
              />
              <CustomInputNumber
                placeholder={intl.get('common.to')}
                onChange={e => handleInputChange(toName, Number(e.target.value))}
                value={inputs[toName] && inputs[toName].value}
              />
            </ST.FiledsWrapper>
          </ST.ColumnWrapper>
        </Form.Item>
      )
    }

    if (field.fieldId === 'start_date') {
      return (
        <LocalDatePicker
          dateValue={inputs[field.fieldId] && inputs[field.fieldId].value && moment(inputs[field.fieldId].value)}
          handleDatePickerChange={(date, dateString) => handleInputChange(field.fieldId, dateString)}
        />
      )
    }

    if (field.fieldId === 'card_auto_approve') {
      return (
        <CustomSelect
          placeholder='Card auto approve'
          size='large'
          handleValueChange={value => handleSelectChange(field.fieldId, value)}
          value={inputs[field.fieldId] && inputs[field.fieldId].value}
        >
          {[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' }
          ].map(el => (
            <Option style={{ fontSize: 16 }} key={`${el.value}`}>
              {el.label}
            </Option>
          ))}
        </CustomSelect>
      )
    }

    if (field.fieldId === 'status') {
      return (
        <CustomSelect
          placeholder='Status'
          size='large'
          handleValueChange={value => {
            handleSelectChange(field.fieldId, value)
          }}
          value={inputs[field.fieldId] && inputs[field.fieldId].value}
        >
          {[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' }
          ].map(el => (
            <Option style={{ fontSize: 16 }} key={`${el.value}`}>
              {el.label}
            </Option>
          ))}
        </CustomSelect>
      )
    }

    if (field.type === 'inputNumber') {
      return (
        <CustomInputNumber
          placeholder={field.placeholder || field.columnName}
          onChange={e => handleInputChange(field.fieldId, e.target.value)}
          value={inputs[field.fieldId] && inputs[field.fieldId].value}
        />
      )
    }

    return (
      <>
        <Input
          size='large'
          placeholder={field.placeholder || field.columnName}
          onChange={e => handleInputChange(field.fieldId, e.target.value)}
          value={inputs[field.fieldId] && inputs[field.fieldId].value}
        />
      </>
    )
  }

  const handleChangeAdvancedOptions = value => {
    const result = {}

    if (value) {
      ;[...columnsData].forEach(el => {
        result[el.fieldId] = { value: '', option: true }
      })
      const newFields = { ...result, ...inputs }
      setInputs(newFields)
    } else {
      Object.keys(inputs).forEach(el => {
        if (!['id', 'name'].includes(el.fieldId)) {
          result[el.fieldId] = { value: '', option: true }
        }
      })

      if (fieldsForMainPanelAdvanced) {
        fieldsForMainPanelAdvanced.forEach(el => {
          if (!['id', 'name'].includes(el.fieldId)) {
            result[el.fieldId] = {
              value: inputs[el.fieldId] && inputs[el.fieldId].value,
              option: inputs[el.fieldId] && inputs[el.fieldId].option
            }
          }
        })
      }

      setInputs({
        id: { ...inputs.id },
        name: { ...inputs.name },
        ...result
      })
    }
    setAdvancedOptions(value)
  }

  return (
    <ST.Wrapper>
      <ST.DefaultFields>
        {children}
        <>
          <ST.DefaultFilterPanelWrapper isHaveNotPlaceholderForChildren={isHaveNotPlaceholderForChildren}>
            <ST.DefaultFilterFieldsWrapper isHaveNotPlaceholderForChildren={isHaveNotPlaceholderForChildren}>
              {fieldsForMainPanelAdvanced
                ? fieldsForMainPanelAdvanced.map(field => (
                    <ST.DefaultField key={`${field.fieldId}`} numberOfFileds={fieldsForMainPanelAdvanced.length}>
                      {!noEquals && (
                        <IconButton
                          type={inputs[field.fieldId].option ? 'Equal' : 'NotEqual'}
                          actionFunction={() => handleCheckboxChange([field.fieldId], !inputs[field.fieldId].option)}
                          popText={
                            inputs[field.fieldId].option
                              ? intl.get('productCatalogue.equal')
                              : intl.get('productCatalogue.notEqual')
                          }
                          styleParam={{ fontSize: 15, marginRight: 10 }}
                        />
                      )}
                      {getField(field)}
                    </ST.DefaultField>
                  ))
                : fieldsForMainPanel.map(el => (
                    <ST.DefaultField key={el}>
                      <IconButton
                        type={inputs[el].option ? 'Equal' : 'NotEqual'}
                        actionFunction={() => handleCheckboxChange(el, !inputs[el].option)}
                        popText={
                          inputs[el].option ? intl.get('productCatalogue.equal') : intl.get('productCatalogue.notEqual')
                        }
                        styleParam={{ fontSize: 15, marginRight: 10 }}
                      />
                      <Input
                        size='large'
                        placeholder={el.charAt(0).toUpperCase() + el.substr(1)}
                        value={inputs[el].value}
                        onChange={e => handleInputChange(el, e.target.value)}
                      />
                    </ST.DefaultField>
                  ))}
            </ST.DefaultFilterFieldsWrapper>
            {renderButtons()}
          </ST.DefaultFilterPanelWrapper>
          {isAdvanced && (
            <SwitchOption
              text={intl.get('trackAndTrace.advancedOpt')}
              onChange={handleChangeAdvancedOptions}
              checked={advancedOptions}
            />
          )}
        </>
      </ST.DefaultFields>
      <ST.IndexFields>
        {advancedOptions && columnsData
          ? [...columnsData]
              .filter(el => !['name'].includes(el.fieldId))
              .map(el => (
                <ST.DefaultField key={`${el.fieldId}`}>
                  {!noEquals && (
                    <IconButton
                      type={inputs[el.fieldId].option ? 'Equal' : 'NotEqual'}
                      actionFunction={() => handleCheckboxChange([el.fieldId], !inputs[el.fieldId].option)}
                      popText={
                        inputs[el.fieldId].option
                          ? intl.get('productCatalogue.equal')
                          : intl.get('productCatalogue.notEqual')
                      }
                      styleParam={{ fontSize: 15, marginRight: 10 }}
                    />
                  )}
                  {getField(el)}
                </ST.DefaultField>
              ))
          : null}
      </ST.IndexFields>
    </ST.Wrapper>
  )
}

FiltersPanel.propTypes = {
  handleFilterProducts: PropTypes.func.isRequired,
  columnsData: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  defaultInitialState: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.object),
  fieldsForMainPanel: PropTypes.arrayOf(PropTypes.string),
  noEquals: PropTypes.bool,
  isAdvanced: PropTypes.bool,
  customClear: PropTypes.func,
  isFillValueCustom: PropTypes.bool,
  fieldsForMainPanelAdvanced: PropTypes.arrayOf(PropTypes.object),
  isHaveNotPlaceholderForChildren: PropTypes.bool,
  isHaveNotResetButton: PropTypes.bool,
  getValueOnChange: PropTypes.func
}

FiltersPanel.defaultProps = {
  fieldsForMainPanelAdvanced: null,
  columnsData: [],
  children: null,
  defaultInitialState: {},
  options: [],
  fieldsForMainPanel: [],
  noEquals: false,
  isAdvanced: false,
  customClear: null,
  isFillValueCustom: false,
  isHaveNotPlaceholderForChildren: false,
  isHaveNotResetButton: false,
  getValueOnChange: null
}

export default withRouter(FiltersPanel)

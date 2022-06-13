import React, { useState, useMemo, useEffect } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { Input, Select, DatePicker } from 'antd'
import moment from 'moment'
import IconButton from '../../molecules/IconButton'
import Button from '../../atoms/Button'
import OwnerSelector from '../../atoms/OwnerSelector'
import LocalDatePicker from '../../atoms/LocalDatePicker'
import SwitchOption from '../../atoms/SwitchOption'
import * as ST from './styles'
import CustomSelect from '../../atoms/CustomSelect'

const { Option } = Select

const { RangePicker } = DatePicker

const initialState = {
  id: { value: '', option: true },
  name: { value: '', option: true },
  brand_id: { value: '', option: true }
}

const AdvancedFiltersPanel = ({
  handleFilterProducts,
  customIndexFields,
  defaultIndexFields,
  brands,
  showBrands,
  indexFieldsProductsGetIndexInfo,
  columnsData,
  currentParticipant,
  children,
  noEquals,
  defaultInitialState,
  options,
  inventory,
  isProductPage,
  idPlaceholder,
  hiddenAdvancedOptions,
  headerOptions
}) => {
  useEffect(() => {
    if (indexFieldsProductsGetIndexInfo) {
      indexFieldsProductsGetIndexInfo()
    }
  }, [])

  const initialOptions = useMemo(() => {
    return defaultInitialState ? Object.keys(defaultInitialState) : Object.keys(initialState)
  }, [defaultInitialState, initialState])
  const mainOpitons = useMemo(() => {
    return headerOptions || ['id', 'name']
  }, [])
  const forbiddenOptions = useMemo(() => {
    return hiddenAdvancedOptions ? [...hiddenAdvancedOptions] : ['gtin', 'datamatrix_code']
  }, [hiddenAdvancedOptions])
  const [inputs, setInputs] = useState({ ...initialState, ...defaultInitialState })
  const [advancedOptions, setAdvancedOptions] = useState(false)

  const isSystemAdmin = useMemo(() => {
    return isProductPage ? currentParticipant === 'urn:authenticateit:participant:1' : true
  }, [currentParticipant])

  const handleInputChange = (key, value) => {
    setInputs({
      ...inputs,
      [key]: { ...inputs[key], value }
    })
  }

  const handleRangePicker = data => {
    setInputs({
      ...inputs,
      ts: { ...inputs.ts, startDate: data[0], endDate: data[1] }
    })
  }

  const handleSelectChange = (value, fieldId) => {
    const key = fieldId || Object.keys(defaultInitialState)[0]
    setInputs({
      ...inputs,
      [key]: { ...(inputs[key] || {}), value }
    })
  }

  const isClearButtonDisabled = useMemo(() => {
    let isFillValue = false
    Object.keys(inputs).forEach(el => {
      if (
        (options && options.length && inputs[el].value === options[0].value) ||
        (Array.isArray(inputs[el].value) ? inputs[el].value.length : inputs[el].value.trim()) ||
        (inputs[el].startDate && inputs[el].endDate)
      ) {
        isFillValue = true
      }
    })
    return isFillValue
  }, [inputs])

  const handleCheckboxChange = (key, option) => {
    setInputs({
      ...inputs,
      [key]: { ...inputs[key], option }
    })
  }

  const filterBeforeSend = () => {
    const filteredInputs = {}
    Object.keys(inputs).forEach(el => {
      if (typeof inputs[el].value === 'string') {
        inputs[el].value = inputs[el].value.trim()
      }
      if (inputs[el].value === 'All brands') {
        inputs[el].value = ''
      }
      if ((inputs[el].value && inputs[el].value.length) || (inputs[el].startDate && inputs[el].endDate)) {
        filteredInputs[el] = inputs[el]
      }
    })
    handleFilterProducts(filteredInputs)
  }

  const clearAllFilters = () => {
    if (!isClearButtonDisabled) {
      return
    }
    const clearedInputs = {}
    Object.keys(inputs).forEach(el => {
      inputs[el].value = ''
      if (el === 'ts') {
        inputs[el].startDate = null
        inputs[el].endDate = null
      }
      if (el === 'operation' || el === 'country') {
        inputs[el].value = []
      }
      clearedInputs[el] = inputs[el]
    })
    setInputs(clearedInputs)
    filterBeforeSend()
  }

  const handleChangeAdvancedOptions = value => {
    const result = {}
    if (value) {
      ;[...defaultIndexFields, ...customIndexFields, ...columnsData].forEach(el => {
        result[el.fieldId] = { value: '', option: true }
      })
      const newFields = { ...result, ...inputs }
      setInputs(newFields)
    } else {
      Object.keys(inputs).forEach(el => {
        if (!initialOptions.includes(el.fieldId)) {
          result[el.fieldId] = { value: '', option: true }
        }
      })
      setInputs({
        id: { ...inputs.id },
        name: { ...inputs.name },
        brand_id: { ...inputs.brand_id },
        ...result
      })
    }
    setAdvancedOptions(value)
  }

  const setOwner = (value, option) => {
    setInputs({
      ...inputs,
      owner_select: { value, option }
    })
  }

  const handleOwnerChange = value => {
    if (value === intl.get('serializedProductsPage.all')) {
      setOwner('', false)
      return
    }
    setOwner(currentParticipant, value === intl.get('serializedProductsPage.me'))
  }

  const renderBrand = () => {
    return (
      showBrands && (
        <ST.DefaultField>
          {isSystemAdmin ? (
            <IconButton
              type={inputs.brand_id.option ? 'Equal' : 'NotEqual'}
              actionFunction={() => handleCheckboxChange('brand_id', !inputs.brand_id.option)}
              popText={
                inputs.brand_id.option ? intl.get('productCatalogue.equal') : intl.get('productCatalogue.notEqual')
              }
              styleParam={{ fontSize: 15, marginRight: 10 }}
            />
          ) : (
            <IconButton type='Search' styleParam={{ fontSize: 15, marginRight: 10 }} />
          )}
          <Select
            showSearch
            optionFilterProp='children'
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            defaultValue={inputs.brand_id.value || 'All brands'}
            getPopupContainer={trigger => trigger.parentNode}
            style={{ width: 200, height: 40, marginRight: 20 }}
            onChange={e => {
              return e === 'All brands' ? handleInputChange('brand_id', '') : handleInputChange('brand_id', e)
            }}
            size='large'
            placeholder='Select brand'
            value={inputs.brand_id.value || 'All brands'}
          >
            {[...brands, { id: 'All brands' }]
              .filter(el => el.id !== inputs.brand_id.value)
              .map(item => (
                <Option
                  key={item.id}
                  value={item.id}
                  style={{ color: 'rgb(178,179,178)', fontFamily: 'Roboto', fontWeight: 400 }}
                >
                  {item.id}
                </Option>
              ))}
          </Select>
        </ST.DefaultField>
      )
    )
  }

  const getValuesFromMoment = (dates, format) => {
    const result = []

    if (dates && dates.length) {
      result.push(moment(dates[0]).format(format))
      result.push(moment(dates[1]).format(format))
    }

    return result
  }

  const getField = (field, columnName, el) => {
    if (el.type === 'select') {
      return (
        <CustomSelect
          placeholder={el.placeholder}
          mode={el.mode}
          handleValueChange={value => handleSelectChange(value, el.fieldId)}
          value={(inputs[el.fieldId] && inputs[el.fieldId].value) || null}
        >
          {el.options && el.options.length
            ? el.options.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))
            : null}
        </CustomSelect>
      )
    }

    if (el.type === 'rangePicker') {
      return (
        <RangePicker
          size='large'
          value={
            (inputs[el.fieldId] &&
              inputs[el.fieldId].value &&
              inputs[el.fieldId].value.length && [
                moment(inputs[el.fieldId].value[0], el.format),
                moment(inputs[el.fieldId].value[1], el.format)
              ]) ||
            []
          }
          onChange={value => {
            handleSelectChange(el.fieldId, getValuesFromMoment(value, el.format))
          }}
          format='DD/MM/YYYY'
        />
      )
    }

    if (el.type === 'datePicker') {
      return (
        <LocalDatePicker
          dateValue={inputs[el.fieldId] && inputs[el.fieldId].value && moment(inputs[el.fieldId].value, el.format)}
          handleDatePickerChange={(date, dateString) =>
            handleInputChange(el.fieldId, el.format ? moment(date).format(el.format) : dateString)
          }
          placeholder={el.placeholder}
        />
      )
    }

    if (field === 'brand_id') {
      return renderBrand()
    }

    if (field === 'owner_select') {
      return (
        <>
          <ST.OwnerTitle>{intl.get('serializedProductsPage.ownerSelect')}</ST.OwnerTitle>
          <OwnerSelector handleChange={value => handleOwnerChange(value)} />
        </>
      )
    }

    return (
      <>
        {/* eslint-disable-next-line no-nested-ternary */}
        {field === 'ts' ? (
          <RangePicker
            size='large'
            allowClear={false}
            value={[inputs.ts.startDate, inputs.ts.endDate]}
            locale={{
              lang: {
                rangePlaceholder: [
                  intl.get('trackAndTrace.inventory.startDate'),
                  intl.get('trackAndTrace.inventory.endDate')
                ],
                yearFormat: 'YYYY',
                dateFormat: 'M/D/YYYY',
                dayFormat: 'D'
              }
            }}
            onChange={handleRangePicker}
          />
        ) : field === 'country' ? (
          <Select
            showSearch
            size='large'
            className='antSelect'
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            placeholder={
              field === 'operation' ? intl.get('supplyChain.selectOperation') : intl.get('supplyChain.selectCountry')
            }
            value={inputs[field].value}
            onChange={handleSelectChange}
          >
            {options.map(item => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        ) : (
          <Input
            size='large'
            placeholder={columnName}
            onChange={e => handleInputChange(field, e.target.value)}
            value={inputs[field].value}
          />
        )}
      </>
    )
  }

  const renderButtons = () => (
    <>
      <Button type='primary' onClick={filterBeforeSend}>
        {intl.get('apply')}
      </Button>
      <Button className={!isClearButtonDisabled ? 'clear-all disable' : 'clear-all'} onClick={clearAllFilters}>
        {intl.get('reset')}
      </Button>
    </>
  )

  return (
    <ST.Wrapper>
      <ST.DefaultFields>
        {children}
        {inventory && (
          <>
            <ST.DefaultFilterPanelWrapper>
              <ST.DefaultFilterFieldsWrapper>
                <Select
                  showSearch
                  size='large'
                  className='antSelect'
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder={intl.get('supplyChain.selectOperation')}
                  value={(inputs && inputs.operation && inputs.operation.value) || 'pack_products'}
                  onChange={handleSelectChange}
                >
                  {options.map(item => (
                    <Option key={item.value} value={item.value}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
                {renderBrand()}
              </ST.DefaultFilterFieldsWrapper>
              {renderButtons()}
            </ST.DefaultFilterPanelWrapper>
          </>
        )}
        {columnsData && !columnsData.length >= 1 && (
          <>
            <ST.DefaultFilterPanelWrapper>
              <ST.DefaultFilterFieldsWrapper>
                {mainOpitons.map(el => (
                  <ST.DefaultField key={el}>
                    {isSystemAdmin ? (
                      <IconButton
                        type={inputs[el].option ? 'Equal' : 'NotEqual'}
                        actionFunction={() => handleCheckboxChange(el, !inputs[el].option)}
                        popText={
                          inputs[el].option ? intl.get('productCatalogue.equal') : intl.get('productCatalogue.notEqual')
                        }
                        styleParam={{ fontSize: 15, marginRight: 10 }}
                      />
                    ) : (
                      <IconButton type='Search' styleParam={{ fontSize: 15, marginRight: 10 }} />
                    )}
                    <Input
                      size='large'
                      placeholder={
                        el === 'id' ? idPlaceholder || intl.get('tableSettings.gtin') : intl.get('tableSettings.name')
                      }
                      value={inputs[el].value}
                      onChange={e => handleInputChange(el, e.target.value)}
                    />
                  </ST.DefaultField>
                ))}
                {renderBrand()}
              </ST.DefaultFilterFieldsWrapper>
              {renderButtons()}
            </ST.DefaultFilterPanelWrapper>
          </>
        )}
        {isSystemAdmin && (
          <SwitchOption
            text={intl.get('trackAndTrace.advancedOpt')}
            onChange={handleChangeAdvancedOptions}
            checked={advancedOptions}
          />
        )}
      </ST.DefaultFields>
      <ST.IndexFields>
        {advancedOptions
          ? [...defaultIndexFields, ...customIndexFields, ...columnsData]
              .filter(el => !forbiddenOptions.includes(el.fieldId))
              .map(el =>
                el.fieldId === 'brand_id' ? (
                  showBrands && (
                    <ST.DefaultField key={`${el.fieldId}`}>
                      <>
                        {!noEquals && (
                          <IconButton
                            type={inputs[el.fieldId] && inputs[el.fieldId].option ? 'Equal' : 'NotEqual'}
                            actionFunction={() =>
                              handleCheckboxChange([el.fieldId], inputs[el.fieldId] && !inputs[el.fieldId].option)
                            }
                            popText={
                              inputs[el.fieldId] && inputs[el.fieldId].option
                                ? intl.get('productCatalogue.equal')
                                : intl.get('productCatalogue.notEqual')
                            }
                            styleParam={{ fontSize: 15, marginRight: 10 }}
                          />
                        )}
                        {getField(el.fieldId, el.columnName, el)}
                      </>
                    </ST.DefaultField>
                  )
                ) : (
                  <ST.DefaultField key={`${el.fieldId}`}>
                    {!noEquals && el.fieldId !== 'owner_select' && (
                      <IconButton
                        type={inputs[el.fieldId] && inputs[el.fieldId].option ? 'Equal' : 'NotEqual'}
                        actionFunction={() =>
                          handleCheckboxChange([el.fieldId], inputs[el.fieldId] && !inputs[el.fieldId].option)
                        }
                        popText={
                          inputs[el.fieldId] && inputs[el.fieldId].option
                            ? intl.get('productCatalogue.equal')
                            : intl.get('productCatalogue.notEqual')
                        }
                        styleParam={{ fontSize: 15, marginRight: 10 }}
                      />
                    )}
                    {getField(el.fieldId, el.columnName, el)}
                  </ST.DefaultField>
                )
              )
          : null}
        {advancedOptions && columnsData && columnsData.length && !inventory ? (
          <ST.FilterPanelWrapperButtons>{renderButtons()}</ST.FilterPanelWrapperButtons>
        ) : null}
      </ST.IndexFields>
    </ST.Wrapper>
  )
}

AdvancedFiltersPanel.propTypes = {
  handleFilterProducts: PropTypes.func.isRequired,
  customIndexFields: PropTypes.arrayOf(PropTypes.object),
  defaultIndexFields: PropTypes.arrayOf(PropTypes.object),
  brands: PropTypes.arrayOf(PropTypes.object),
  indexFieldsProductsGetIndexInfo: PropTypes.func,
  showBrands: PropTypes.bool,
  columnsData: PropTypes.arrayOf(PropTypes.object),
  currentParticipant: PropTypes.string,
  children: PropTypes.node,
  noEquals: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  defaultInitialState: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.object),
  inventory: PropTypes.bool,
  isProductPage: PropTypes.bool,
  idPlaceholder: PropTypes.string,
  hiddenAdvancedOptions: PropTypes.arrayOf(PropTypes.string),
  headerOptions: PropTypes.arrayOf(PropTypes.string)
}

AdvancedFiltersPanel.defaultProps = {
  customIndexFields: [],
  defaultIndexFields: [],
  showBrands: false,
  brands: [],
  columnsData: [],
  currentParticipant: null,
  indexFieldsProductsGetIndexInfo: null,
  children: null,
  noEquals: null,
  defaultInitialState: {},
  options: [],
  inventory: false,
  isProductPage: false,
  idPlaceholder: null,
  hiddenAdvancedOptions: null,
  headerOptions: null
}

export default withRouter(AdvancedFiltersPanel)

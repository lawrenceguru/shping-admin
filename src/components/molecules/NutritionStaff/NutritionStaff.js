import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { RHFInput } from 'react-hook-form-input'
import { Input, Select, Checkbox, Form } from 'antd'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import intl from 'react-intl-universal'
import IconButton from '../IconButton'
import Error from '../../atoms/Error'
import CustomSelect from '../../atoms/CustomSelect'
import CustomInputNumber from '../CustomInputNumber'
import * as ST from './styles'

const packUnit = ['cals', 'kj', 'kg', 'g', 'mg', 'L', 'ml', 'oz']

const { Option } = Select
const NutritionStaff = ({
  register,
  setValue,
  name,
  gdti,
  currValue,
  unit,
  rdi,
  lessThan,
  index,
  subIndex,
  isSelectsDisable,
  addNutritionStaffSubItem,
  deleteNutritionStaff,
  isSubItem,
  handleValueChange,
  getGdtiNutritions,
  nutritions,
  isLoadingGdtiNutritions,
  errors,
  activeSource,
  widgetIndex,
  handleChangeNutritionNameType,
  isAdvancedMode,
  hasGdti
}) => {
  useEffect(() => {
    if (!nutritions || !nutritions.length) {
      getGdtiNutritions()
    }
  }, [])

  const errorDestination = useMemo(() => {
    if (isSubItem) {
      // eslint-disable-next-line max-len
      return `sources[${activeSource}].data[${widgetIndex}].nutrition_info.nutrition_staff[${index}].nutrition_staff[${subIndex}]`
    }
    return `sources[${activeSource}].data[${widgetIndex}].nutrition_info.nutrition_staff[${index}]`
  }, [isSubItem, activeSource, widgetIndex, index, subIndex])

  return (
    <ST.ThirdRowWrapper isAdvancedMode={isAdvancedMode}>
      <ST.NutritionStaffWrapper isAdvancedMode={isAdvancedMode} isSubItem={isSubItem}>
        {isAdvancedMode && (
          <ST.AdvancedTitleWrapper isSubItem={isSubItem}>
            <div>
              {isSubItem
                ? intl.get('widgets.nutrition_info.advancedSubItemTitle', { number: subIndex + 1 })
                : intl.get('widgets.nutrition_info.advancedItemTitle', { number: index + 1 })}
            </div>
            <IconButton
              type='Delete'
              popText={intl.get('widgets.nutrition_info.delete')}
              visible={!isSelectsDisable}
              actionFunction={() => (isSubItem ? deleteNutritionStaff(index, subIndex) : deleteNutritionStaff(index))}
            />
          </ST.AdvancedTitleWrapper>
        )}
        <ST.NameGdtiWrapper isAdvancedMode={isAdvancedMode}>
          <div>
            {/* eslint-disable-next-line no-nested-ternary */}
            <ST.NameWrapper isPadding={() => (isSubItem ? (isAdvancedMode ? 0 : '20px') : 0)}>
              {isAdvancedMode && <Form.Item label={intl.get('widgets.nutrition_info.name')} />}
              {hasGdti ? (
                <CustomSelect
                  value={gdti}
                  handleValueChange={value => handleValueChange('gdti', value, index, subIndex)}
                  loading={isLoadingGdtiNutritions}
                >
                  {nutritions &&
                    nutritions.length &&
                    nutritions.map(el => (
                      <Option style={{ fontSize: 16 }} key={el.value} value={el.value}>
                        {el.label}
                      </Option>
                    ))}
                </CustomSelect>
              ) : (
                <RHFInput
                  as={<Input size='large' disabled={isSelectsDisable} />}
                  register={register}
                  value={name}
                  onChange={e => {
                    const { value } = e.target
                    handleValueChange('name', value, index, subIndex)
                  }}
                  setValue={setValue}
                />
              )}
              <Error
                marginTop='0px'
                errors={errors}
                whiteSpace='nowrap'
                marginBottom='10px'
                destination={`${errorDestination}.name`}
              />
            </ST.NameWrapper>
            <ST.GdtiWrapper isPadding={isAdvancedMode ? '20px' : '10px'} isAdvancedMode={isAdvancedMode}>
              <RHFInput
                as={
                  <Checkbox size='large' disabled={isSelectsDisable}>
                    {isAdvancedMode && intl.get('widgets.nutrition_info.gdti')}
                  </Checkbox>
                }
                checked={hasGdti}
                register={register}
                onChange={e => {
                  handleChangeNutritionNameType(e.target.checked, index, subIndex)
                }}
                setValue={setValue}
              />
            </ST.GdtiWrapper>
          </div>
        </ST.NameGdtiWrapper>
        <ST.UnitWrapper>
          {isAdvancedMode && <Form.Item label={intl.get('widgets.nutrition_info.unit')} />}
          <CustomSelect value={unit} handleValueChange={value => handleValueChange('unit', value, index, subIndex)}>
            {packUnit.map(el => (
              <Option style={{ fontSize: 16 }} key={el} value={el}>
                {el}
              </Option>
            ))}
          </CustomSelect>
          <Error marginTop='0px' errors={errors} destination={`${errorDestination}.unit`} />
        </ST.UnitWrapper>
        <ST.ValueWrapper>
          {isSubItem && errors[`${errorDestination}.total`] && (
            <ST.WarningWrapper>
              <IconButton
                type='Warning'
                popText={errors[`${errorDestination}.total`] && errors[`${errorDestination}.total`].message}
                styleParam={{ marginLeft: '10px', fontSize: '12px' }}
              />
            </ST.WarningWrapper>
          )}
          {isAdvancedMode && <Form.Item label={intl.get('widgets.nutrition_info.value')} />}
          <RHFInput
            as={<CustomInputNumber disabled={isSelectsDisable} />}
            register={register}
            value={`${currValue}`}
            onChange={e => {
              const { value } = e.target
              handleValueChange('value', value, index, subIndex)
            }}
            setValue={setValue}
          />
          <Error marginTop='0px' errors={errors} destination={`${errorDestination}.value`} />
        </ST.ValueWrapper>
        <ST.RdiWrapper>
          {isAdvancedMode && <Form.Item label={intl.get('widgets.nutrition_info.rdi')} />}
          <RHFInput
            as={<CustomInputNumber disabled={isSelectsDisable} />}
            register={register}
            value={rdi}
            onChange={e => {
              const { value } = e.target
              handleValueChange('rdi', value, index, subIndex)
            }}
            setValue={setValue}
          />
          <Error marginTop='0px' errors={errors} destination={`${errorDestination}.rdi`} />
        </ST.RdiWrapper>
        <ST.LessWrapper>
          <RHFInput
            as={
              <Checkbox size='large' disabled={isSelectsDisable}>
                {isAdvancedMode && intl.get('widgets.nutrition_info.less')}
              </Checkbox>
            }
            checked={lessThan}
            register={register}
            onChange={e => {
              handleValueChange('less_than', e.target.checked, index, subIndex)
            }}
            setValue={setValue}
          />
        </ST.LessWrapper>
      </ST.NutritionStaffWrapper>
      {!isAdvancedMode && (
        <ST.ButtonsPanel>
          <IconButton
            type='Delete'
            popText={intl.get('widgets.nutrition_info.delete')}
            visible={!isSelectsDisable}
            actionFunction={() => (isSubItem ? deleteNutritionStaff(index, subIndex) : deleteNutritionStaff(index))}
          />
          {!isSubItem && (
            <IconButton
              type='Add'
              popText={intl.get('widgets.nutrition_info.add')}
              actionFunction={() => addNutritionStaffSubItem(index)}
              styleParam={{ marginLeft: '10px' }}
            />
          )}
        </ST.ButtonsPanel>
      )}
    </ST.ThirdRowWrapper>
  )
}

NutritionStaff.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  isSelectsDisable: PropTypes.bool,
  gdti: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  name: PropTypes.string,
  currValue: PropTypes.number,
  unit: PropTypes.string.isRequired,
  rdi: PropTypes.number,
  lessThan: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  subIndex: PropTypes.number,
  addNutritionStaffSubItem: PropTypes.func.isRequired,
  deleteNutritionStaff: PropTypes.func.isRequired,
  isSubItem: PropTypes.bool.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  getGdtiNutritions: PropTypes.func.isRequired,
  nutritions: PropTypes.arrayOf(PropTypes.object),
  isLoadingGdtiNutritions: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  activeSource: PropTypes.number.isRequired,
  widgetIndex: PropTypes.number.isRequired,
  isAdvancedMode: PropTypes.bool.isRequired,
  handleChangeNutritionNameType: PropTypes.func.isRequired,
  hasGdti: PropTypes.bool.isRequired
}

NutritionStaff.defaultProps = {
  nutritions: [],
  errors: {},
  isSelectsDisable: false,
  subIndex: null,
  isLoadingGdtiNutritions: false,
  gdti: undefined,
  rdi: undefined,
  currValue: null,
  name: undefined
}

export default NutritionStaff

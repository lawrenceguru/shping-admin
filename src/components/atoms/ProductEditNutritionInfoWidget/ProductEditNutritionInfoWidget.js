import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { RHFInput } from 'react-hook-form-input'
import { groupBy, isNil, mapValues, omit } from 'lodash'
import { Form, Input, Select } from 'antd'
import intl from 'react-intl-universal'
import uuid from 'uuid4'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import Error from '../Error'
import CustomButton from '../../molecules/Button'
import NutritionStaff from '../../molecules/NutritionStaff'
import NutritionGroup from '../../molecules/NutritionGroup'
import CustomInputNumber from '../../molecules/CustomInputNumber'
import CustomSelect from '../CustomSelect'
import * as ST from './styles'
import { NameWrapper, UnitWrapper, LessWrapper, ValueWrapper, RdiWrapper } from '../../molecules/NutritionStaff/styles'
import IconButton from '../../molecules/IconButton'

const NEW_STAFF = {
  less_than: false,
  unit: null,
  name: null,
  value: null
}

const packUnit = ['cals', 'kj', 'kg', 'g', 'mg', 'L', 'ml', 'oz']

const { Option } = Select
const ProductEditNutritionInfoWidget = ({
  register,
  setValue,
  setError,
  data,
  sources,
  activeSource,
  widgetIndex,
  isSelectsDisable,
  errors,
  clearError,
  getGdtiNutritions,
  nutritions,
  isLoadingGdtiNutritions
}) => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)
  const clearNutritionFieldValue = (field, index, subIndex) => {
    if (isNil(index) || index < 0) {
      clearError(`sources[${activeSource}].data[${widgetIndex}].nutrition_info.${field}`)
      return
    }
    if (!isNil(subIndex) && subIndex >= 0) {
      clearError(
        // eslint-disable-next-line max-len
        `sources[${activeSource}].data[${widgetIndex}].nutrition_info.nutrition_staff[${index}].nutrition_staff[${subIndex}].${field}`
      )
      return
    }
    clearError(`sources[${activeSource}].data[${widgetIndex}].nutrition_info.nutrition_staff[${index}].${field}`)
  }

  const clearIngredientFieldValue = (field, index, groupId) => {
    if (groupId) {
      clearError(`sources[${activeSource}].data[${widgetIndex}].nutrition_info.ingredients.${groupId}`)
    } else {
      clearError(`sources[${activeSource}].data[${widgetIndex}].nutrition_info.ingredients[${index}].${field}`)
    }
  }

  const validateNutritionFieldValue = (field, value, index, subIndex) => {
    clearNutritionFieldValue(field, index, subIndex)
    if (!value) {
      if (isNil(index) || index < 0) {
        setError(
          `sources[${activeSource}].data[${widgetIndex}].nutrition_info.${field}`,
          'notMatch',
          intl.get('validation.requiredField')
        )
        return
      }
      if (!isNil(subIndex) && subIndex >= 0) {
        setError(
          // eslint-disable-next-line max-len
          `sources[${activeSource}].data[${widgetIndex}].nutrition_info.nutrition_staff[${index}].nutrition_staff[${subIndex}].${field}`,
          'notMatch',
          intl.get('validation.requiredField')
        )
        return
      }
      setError(
        `sources[${activeSource}].data[${widgetIndex}].nutrition_info.nutrition_staff[${index}].${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }

  useEffect(() => {
    if (!nutritions || !nutritions.length) {
      getGdtiNutritions()
    }

    if (data && data.nutrition_info) {
      Object.keys(data.nutrition_info).forEach(keyField => {
        if (isNil(data.nutrition_info[keyField])) {
          validateNutritionFieldValue(keyField, '')
        }
      })
      data.nutrition_info.nutrition_staff.forEach((el, index) => {
        if (isNil(el.value)) {
          validateNutritionFieldValue('value', '', index)
        }
        if (el.nutrition_staff && el.nutrition_staff.length) {
          el.nutrition_staff.forEach((subEl, subIndex) => {
            if (isNil(subEl.value)) {
              validateNutritionFieldValue('value', '', index, subIndex)
            }
          })
        }
      })
    }
  }, [])

  const validateIngredientFieldValue = (field, value, index, groupId) => {
    clearIngredientFieldValue(field, index, groupId)
    if (!value) {
      if (groupId) {
        setError(
          `sources[${activeSource}].data[${widgetIndex}].nutrition_info.ingredients.${groupId}`,
          'notMatch',
          intl.get('validation.requiredField')
        )
        return
      }
      setError(
        `sources[${activeSource}].data[${widgetIndex}].nutrition_info.ingredients[${index}].${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }

  const checkTotalSum = index => {
    const newSources = [...sources]
    const staff = newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index]
    const total = Number(staff.value)
    let totalSum = 0
    if (staff.nutrition_staff && staff.nutrition_staff.length) {
      staff.nutrition_staff.forEach((subStaff, subIndex) => {
        clearError(
          // eslint-disable-next-line max-len
          `sources[${activeSource}].data[${widgetIndex}].nutrition_info.nutrition_staff[${index}].nutrition_staff[${subIndex}].total`
        )
        try {
          totalSum += Number(subStaff.value)
        } catch (e) {
          console.log(e)
        }
      })

      if (totalSum > total) {
        staff.nutrition_staff.forEach((subStaff, subIndex) => {
          setError(
            // eslint-disable-next-line max-len
            `sources[${activeSource}].data[${widgetIndex}].nutrition_info.nutrition_staff[${index}].nutrition_staff[${subIndex}].total`,
            'incorrectTotalSum',
            intl.get('validation.invalidSubItem', { item: (staff && staff.name) || null })
          )
        })
      }
    }
  }

  const handleValueChange = useCallback(
    (field, value, index, subIndex) => {
      const newSources = [...sources]
      if (isNil(index) || index < 0) {
        newSources[activeSource].data[widgetIndex].nutrition_info[field] = value
      } else if (!isNil(subIndex) && subIndex >= 0) {
        newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index].nutrition_staff[subIndex][
          field
        ] = value
      } else {
        newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index][field] = value
      }
      setValue('sources', newSources)
      if (field === 'gdti') {
        validateNutritionFieldValue('name', value, index, subIndex)
        return
      }
      validateNutritionFieldValue(field, value, index, subIndex)

      if (field === 'value') {
        checkTotalSum(index)
      }
    },
    [sources]
  )

  const handleChangeIngredientNameType = useCallback(
    (value, index) => {
      const newSources = [...sources]
      if (value) {
        delete newSources[activeSource].data[widgetIndex].nutrition_info.ingredients[index].name
        newSources[activeSource].data[widgetIndex].nutrition_info.ingredients[index].gdti = null
      } else {
        newSources[activeSource].data[widgetIndex].nutrition_info.ingredients[index].name = null
        delete newSources[activeSource].data[widgetIndex].nutrition_info.ingredients[index].gdti
      }
      validateIngredientFieldValue('name', '', index)
      setValue('sources', newSources)
    },
    [sources]
  )

  const handleChangeNutritionNameType = useCallback(
    (value, index, subIndex) => {
      const newSources = [...sources]
      if (!isNil(subIndex) && subIndex >= 0) {
        if (value) {
          delete newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index].nutrition_staff[
            subIndex
          ].name
          newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index].nutrition_staff[
            subIndex
          ].gdti = null
        } else {
          newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index].nutrition_staff[
            subIndex
          ].name = null
          delete newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index].nutrition_staff[
            subIndex
          ].gdti
        }
      } else if (value) {
        delete newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index].name
        newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index].gdti = null
      } else {
        newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index].name = null
        delete newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index].gdti
      }
      validateNutritionFieldValue('name', '', index, subIndex)
      setValue('sources', newSources)
    },
    [sources]
  )

  const handleIngredientValueChange = useCallback(
    (field, value, index, groupId) => {
      const newSources = [...sources]
      if (field === 'group') {
        const newIngredients = newSources[activeSource].data[widgetIndex].nutrition_info.ingredients.map(el => {
          if (el.groupId === groupId) {
            // eslint-disable-next-line no-param-reassign
            el.group = value
          }
          return el
        })
        newSources[activeSource].data[widgetIndex].nutrition_info.ingredients = newIngredients
      } else {
        newSources[activeSource].data[widgetIndex].nutrition_info.ingredients[index][field] = value
      }
      setValue('sources', newSources)
      if (field === 'gdti') {
        validateIngredientFieldValue('name', value, index, groupId)
        return
      }
      validateIngredientFieldValue(field, value, index, groupId)
    },
    [sources]
  )

  const getGroupedIngredients = ingredients => {
    return mapValues(groupBy(ingredients, 'groupId'), clist => clist.map(car => omit(car, 'groupId')))
  }

  const validateNewNutritionStaff = (index, subIndex) => {
    validateNutritionFieldValue('name', '', index, subIndex)
    validateNutritionFieldValue('value', '', index, subIndex)
    validateNutritionFieldValue('unit', '', index, subIndex)
  }

  const addNutritionStaff = () => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff.push(NEW_STAFF)
    const newIndex = newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff.length - 1
    validateNewNutritionStaff(newIndex)
    setValue('sources', newSources)
  }

  const addNutritionStaffSubItem = index => {
    const newSources = [...sources]
    if (newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff.length === index + 1) {
      newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index].nutrition_staff = []
    }
    newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index].nutrition_staff.push(NEW_STAFF)
    const newIndex =
      newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index].nutrition_staff.length - 1
    validateNewNutritionStaff(index, newIndex)
    setValue('sources', newSources)
  }

  const validateEachNutrition = nutritionInfo => {
    if (nutritionInfo.nutrition_staff && nutritionInfo.nutrition_staff.length) {
      nutritionInfo.nutrition_staff.forEach((staff, index) => {
        validateNutritionFieldValue('value', staff.value, index)
        validateNutritionFieldValue('unit', staff.unit, index)
        validateNutritionFieldValue('name', staff.name, index)
        checkTotalSum(index)
        if (staff.nutrition_staff) {
          staff.nutrition_staff.forEach((subStaff, currSubIndex) => {
            validateNutritionFieldValue('value', subStaff.value, index, currSubIndex)
            validateNutritionFieldValue('unit', subStaff.unit, index, currSubIndex)
            validateNutritionFieldValue('name', subStaff.name, index, currSubIndex)
          })
        }
      })
    }
  }

  const clearNutritionError = (index, subIndex) => {
    clearNutritionFieldValue('name', index, subIndex)
    clearNutritionFieldValue('unit', index, subIndex)
    clearNutritionFieldValue('value', index, subIndex)
    clearNutritionFieldValue('total', index, subIndex)
  }

  const clearErrorBeforeDelete = oldSourcesData => {
    if (oldSourcesData.nutrition_staff && oldSourcesData.nutrition_staff.length) {
      oldSourcesData.nutrition_staff.forEach((staff, index) => {
        clearNutritionError(index)
        if (staff.nutrition_staff) {
          staff.nutrition_staff.forEach((subStaff, currSubIndex) => {
            clearNutritionError(index, currSubIndex)
          })
        }
      })
    }
  }

  const deleteNutritionStaff = (index, subIndex) => {
    const newSources = [...sources]
    clearErrorBeforeDelete([...sources][activeSource].data[widgetIndex].nutrition_info)
    if (isNil(subIndex) || subIndex < 0) {
      newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff.splice(index, 1)
    } else {
      newSources[activeSource].data[widgetIndex].nutrition_info.nutrition_staff[index].nutrition_staff.splice(
        subIndex,
        1
      )
    }
    setValue('sources', newSources)
    validateEachNutrition(newSources[activeSource].data[widgetIndex].nutrition_info)
  }

  const newNutritionNumber = useMemo(() => {
    if (data.nutrition_info && data.nutrition_info.nutrition_staff) {
      return data.nutrition_info.nutrition_staff.length + 1
    }

    return 0
  }, [sources])

  const addIngredient = (groupId, groupName) => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].nutrition_info.ingredients.push({
      allergen: false,
      group: groupName || null,
      name: null,
      nano: false,
      groupId: groupId || uuid()
    })
    const newIndex = newSources[activeSource].data[widgetIndex].nutrition_info.ingredients.length - 1
    if (!groupId) {
      validateIngredientFieldValue(
        'group',
        '',
        newIndex,
        newSources[activeSource].data[widgetIndex].nutrition_info.ingredients[newIndex].groupId
      )
    }
    validateIngredientFieldValue('name', '', newIndex)
    setValue('sources', newSources)
  }

  const clearAllIngredientErrors = nutritionInfo => {
    if (nutritionInfo.ingredients && nutritionInfo.ingredients.length) {
      nutritionInfo.ingredients.forEach((ingredient, index) => {
        clearIngredientFieldValue('group', index, ingredient.groupId)
        clearIngredientFieldValue('name', index, null)
      })
    }
  }

  const deleteGroup = groupId => {
    const newSources = [...sources]
    clearAllIngredientErrors(newSources[activeSource].data[widgetIndex].nutrition_info)
    const newIngredients = newSources[activeSource].data[widgetIndex].nutrition_info.ingredients.filter(
      el => el.groupId !== groupId
    )

    newIngredients.forEach((ingredient, newIndex) => {
      validateIngredientFieldValue('group', ingredient.group, newIndex, ingredient.groupId)
      validateIngredientFieldValue('name', ingredient.name, newIndex)
    })

    newSources[activeSource].data[widgetIndex].nutrition_info.ingredients = newIngredients
    setValue('sources', newSources)
  }

  const deleteIngredient = index => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].nutrition_info.ingredients.splice(index, 1)
    clearAllIngredientErrors(newSources[activeSource].data[widgetIndex].nutrition_info)
    setValue('sources', newSources)
  }

  const headerPanel = () => {
    return (
      <ST.HeaderPanel>
        <CustomButton
          text={
            isAdvancedMode ? intl.get('widgets.nutrition_info.default') : intl.get('widgets.nutrition_info.advanced')
          }
          handleClick={() => setIsAdvancedMode(!isAdvancedMode)}
          disabled={isSelectsDisable}
        />
        <WidgetHeaderSwitchMode
          setValue={setValue}
          data={data}
          sources={sources}
          activeSource={activeSource}
          widgetIndex={widgetIndex}
          isSelectsDisable={isSelectsDisable}
        />
      </ST.HeaderPanel>
    )
  }

  return (
    <ProductEditWidgetWrapper
      id={data.id}
      headerText={intl.get('widgets.nutrition_info.title')}
      HeaderPanel={headerPanel}
      smallSize
    >
      <ST.MainRowWrapper>
        <Form.Item label={intl.get('widgets.nutrition_info.displayTitle')}>
          <RHFInput
            as={<Input size='large' disabled={isSelectsDisable} />}
            register={register}
            value={data.nutrition_info && data.nutrition_info.title}
            onChange={e => {
              const { value } = e.target
              handleValueChange('title', value)
            }}
            setValue={setValue}
          />
          <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].nutrition_info.title`} />
        </Form.Item>
        <Form.Item label={intl.get('widgets.nutrition_info.packUnit')}>
          <CustomSelect
            value={data.nutrition_info && data.nutrition_info.package_unit}
            handleValueChange={value => handleValueChange('package_unit', value)}
          >
            {packUnit.map((el, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Option style={{ fontSize: 16 }} key={`${el}${i}`} value={el}>
                {el}
              </Option>
            ))}
          </CustomSelect>
          <Error
            errors={errors}
            destination={`sources[${activeSource}].data[${widgetIndex}].nutrition_info.package_unit`}
          />
        </Form.Item>
      </ST.MainRowWrapper>
      <ST.SecondRowWrapper>
        <Form.Item label={intl.get('widgets.nutrition_info.packSize')}>
          <RHFInput
            as={<CustomInputNumber isSelectsDisable={isSelectsDisable} />}
            register={register}
            value={
              data.nutrition_info && !isNil(data.nutrition_info.package_size)
                ? `${data.nutrition_info.package_size}`
                : null
            }
            onChange={e => {
              const { value } = e.target
              handleValueChange('package_size', value)
            }}
            setValue={setValue}
          />
          <Error
            errors={errors}
            destination={`sources[${activeSource}].data[${widgetIndex}].nutrition_info.package_size`}
          />
        </Form.Item>
        <Form.Item label={intl.get('widgets.nutrition_info.serSize')}>
          <RHFInput
            as={<CustomInputNumber isSelectsDisable={isSelectsDisable} />}
            register={register}
            value={
              data.nutrition_info && !isNil(data.nutrition_info.serving_size)
                ? `${data.nutrition_info.serving_size}`
                : null
            }
            onChange={e => {
              const { value } = e.target
              handleValueChange('serving_size', value)
            }}
            setValue={setValue}
          />
          <Error
            errors={errors}
            destination={`sources[${activeSource}].data[${widgetIndex}].nutrition_info.serving_size`}
          />
        </Form.Item>
        <Form.Item label={intl.get('widgets.nutrition_info.calories')}>
          <RHFInput
            as={<CustomInputNumber size='large' isSelectsDisable={isSelectsDisable} />}
            register={register}
            value={
              data.nutrition_info && !isNil(data.nutrition_info.serving_energy)
                ? `${data.nutrition_info.serving_energy}`
                : null
            }
            onChange={e => {
              const { value } = e.target
              handleValueChange('serving_energy', value)
            }}
            setValue={setValue}
          />
          <Error
            errors={errors}
            destination={`sources[${activeSource}].data[${widgetIndex}].nutrition_info.serving_energy`}
          />
        </Form.Item>
      </ST.SecondRowWrapper>
      {!isAdvancedMode && newNutritionNumber > 1 && (
        <ST.TitlesWrapper isAdvancedMode={isAdvancedMode}>
          <ST.NameGdtiWrapper>
            <NameWrapper>
              <Form.Item label={intl.get('widgets.nutrition_info.name')} />
            </NameWrapper>
            <ST.GdtiWrapper>
              <Form.Item label={intl.get('widgets.nutrition_info.gdti')} style={{ marginRight: '8px' }} />
            </ST.GdtiWrapper>
          </ST.NameGdtiWrapper>
          <UnitWrapper>
            <Form.Item label={intl.get('widgets.nutrition_info.unit')} />
          </UnitWrapper>
          <ValueWrapper>
            <Form.Item label={intl.get('widgets.nutrition_info.value')} />
          </ValueWrapper>
          <RdiWrapper>
            <Form.Item label={intl.get('widgets.nutrition_info.rdi')} />
          </RdiWrapper>
          <LessWrapper>
            <Form.Item label={intl.get('widgets.nutrition_info.less')} />
          </LessWrapper>
        </ST.TitlesWrapper>
      )}
      {data.nutrition_info &&
        data.nutrition_info.nutrition_staff &&
        !!data.nutrition_info.nutrition_staff.length &&
        data.nutrition_info.nutrition_staff.map((staff, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            <NutritionStaff
              register={register}
              setValue={setValue}
              errors={errors}
              name={staff.name}
              gdti={staff.gdti}
              /* eslint-disable-next-line no-prototype-builtins */
              hasGdti={staff.hasOwnProperty('gdti')}
              currValue={staff.value}
              unit={staff.unit}
              rdi={staff.rdi}
              lessThan={staff.less_than}
              index={index}
              isSelectsDisable={isSelectsDisable}
              addNutritionStaffSubItem={addNutritionStaffSubItem}
              deleteNutritionStaff={deleteNutritionStaff}
              isSubItem={false}
              handleValueChange={handleValueChange}
              clearError={clearError}
              setError={setError}
              activeSource={activeSource}
              widgetIndex={widgetIndex}
              isAdvancedMode={isAdvancedMode}
              handleChangeNutritionNameType={handleChangeNutritionNameType}
            />
            {staff.nutrition_staff &&
              !!staff.nutrition_staff.length &&
              staff.nutrition_staff.map((subStaff, subIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <React.Fragment key={subIndex}>
                  <NutritionStaff
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    name={subStaff.name}
                    gdti={subStaff.gdti}
                    /* eslint-disable-next-line no-prototype-builtins */
                    hasGdti={subStaff.hasOwnProperty('gdti')}
                    currValue={subStaff.value}
                    unit={subStaff.unit}
                    rdi={subStaff.rdi}
                    lessThan={subStaff.less_than}
                    index={index}
                    subIndex={subIndex}
                    isSelectsDisable={isSelectsDisable}
                    addNutritionStaffSubItem={addNutritionStaffSubItem}
                    deleteNutritionStaff={deleteNutritionStaff}
                    isSubItem
                    handleValueChange={handleValueChange}
                    clearError={clearError}
                    setError={setError}
                    activeSource={activeSource}
                    widgetIndex={widgetIndex}
                    isAdvancedMode={isAdvancedMode}
                    handleChangeNutritionNameType={handleChangeNutritionNameType}
                  />
                </React.Fragment>
              ))}
            {isAdvancedMode && (
              <ST.ButtonWrapper>
                <CustomButton
                  text={intl.get('widgets.nutrition_info.add')}
                  handleClick={() => addNutritionStaffSubItem(index)}
                  disabled={isSelectsDisable}
                  width='190px'
                  backgroundColor='#fff'
                  color='rgb(179, 179, 179)'
                  borderColor='rgb(217, 217, 217)'
                >
                  <IconButton type='Add' styleParam={{ fontSize: 14 }} />
                </CustomButton>
              </ST.ButtonWrapper>
            )}
          </React.Fragment>
        ))}
      <CustomButton
        text={intl.get('widgets.nutrition_info.addNutrition', { number: newNutritionNumber })}
        width='160px'
        marginBottom='20px'
        handleClick={addNutritionStaff}
        disabled={isSelectsDisable}
      />
      {data.nutrition_info &&
        data.nutrition_info.ingredients &&
        !!data.nutrition_info.ingredients.length &&
        Object.keys(getGroupedIngredients(data.nutrition_info.ingredients)).map((key, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={i}>
            <NutritionGroup
              register={register}
              setValue={setValue}
              errors={errors}
              ingredients={data.nutrition_info.ingredients}
              groupId={key}
              isSelectsDisable={isSelectsDisable}
              deleteGroup={deleteGroup}
              deleteIngredient={deleteIngredient}
              isSubItem
              handleValueChange={handleIngredientValueChange}
              clearError={clearError}
              setError={setError}
              activeSource={activeSource}
              widgetIndex={widgetIndex}
              handleChangeNameTypeChange={handleChangeIngredientNameType}
              addIngredient={addIngredient}
              selectList={nutritions}
              mainName='nutrition_info'
              subName='ingredients'
              isLoading={isLoadingGdtiNutritions}
            />
          </React.Fragment>
        ))}
      <CustomButton
        text={intl.get('widgets.nutrition_info.addIngredient')}
        width='160px'
        handleClick={() => addIngredient(null, null)}
        disabled={isSelectsDisable}
      />
    </ProductEditWidgetWrapper>
  )
}

ProductEditNutritionInfoWidget.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
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
  getGdtiNutritions: PropTypes.func.isRequired,
  nutritions: PropTypes.arrayOf(PropTypes.object),
  isLoadingGdtiNutritions: PropTypes.bool
}

ProductEditNutritionInfoWidget.defaultProps = {
  errors: {},
  data: {},
  nutritions: [],
  sources: [],
  isSelectsDisable: false,
  isLoadingGdtiNutritions: false
}

export default ProductEditNutritionInfoWidget

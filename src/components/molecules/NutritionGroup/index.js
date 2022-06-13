import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { RHFInput } from 'react-hook-form-input'
import { Input, Select, Checkbox, Form } from 'antd'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import intl from 'react-intl-universal'
import IconButton from '../IconButton'
import Error from '../../atoms/Error'
import WidgetRemaining from '../../atoms/WidgetRemaining'
import CustomSelect from '../../atoms/CustomSelect'
import * as ST from './styles'
import CustomButton from '../Button'

const DESCRIPTION_TEXT_LENGTH = 500
const currentLocale = localStorage.getItem('lang')

const { TextArea } = Input
const { Option } = Select
const NutritionGroup = ({
  register,
  setValue,
  isSelectsDisable,
  groupId,
  isLoading,
  handleValueChange,
  deleteIngredient,
  errors,
  errorDestination,
  deleteGroup,
  ingredients,
  handleChangeNameTypeChange,
  addIngredient,
  activeSource,
  widgetIndex,
  mainName,
  subName,
  selectList,
  isNeedToParse
}) => {
  const groupName = useMemo(() => {
    if (ingredients && ingredients.length) {
      const element = ingredients.find(el => el.groupId === groupId)
      if (element) {
        return element.group
      }
      return null
    }
    return null
  }, [groupId, ingredients])

  const remainingValueText = text => {
    return DESCRIPTION_TEXT_LENGTH - (text && text.length) || 500
  }

  return (
    <ST.GroupWrapper>
      <ST.GroupNameWrapper>
        <div>
          <Form.Item label={intl.get('widgets.nutrition_info.group')}>
            <RHFInput
              as={<Input size='large' disabled={isSelectsDisable} />}
              register={register}
              value={groupName || null}
              onChange={e => {
                const { value } = e.target
                handleValueChange('group', value, null, groupId)
              }}
              setValue={setValue}
            />
          </Form.Item>
          <IconButton
            type='Delete'
            styleParam={{ marginTop: '20px' }}
            popText={intl.get('widgets.nutrition_info.deleteGroup')}
            visible={!isSelectsDisable}
            actionFunction={() => deleteGroup(groupId)}
          />
        </div>
        <Error
          errors={errors}
          marginBottom='15px'
          destination={`sources[${activeSource}].data[${widgetIndex}].${mainName}.${subName}.${groupId}`}
        />
      </ST.GroupNameWrapper>
      {ingredients.map((ingredient, index) => {
        if (ingredient.groupId === groupId) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <ST.IngredientWrapper key={`${ingredient.groupId}${index}`}>
              <ST.DeleteIngredientWrapper>
                {ingredients && ingredients.length > 1 && (
                  <IconButton
                    type='Delete'
                    popText={intl.get('widgets.nutrition_info.deleteItem')}
                    visible={!isSelectsDisable}
                    actionFunction={() => deleteIngredient(index)}
                  />
                )}
              </ST.DeleteIngredientWrapper>
              <ST.NameWrapper>
                <Form.Item label={intl.get('widgets.nutrition_info.name')}>
                  {/* eslint-disable-next-line no-prototype-builtins */}
                  {ingredient.hasOwnProperty('gdti') ? (
                    <CustomSelect
                      value={ingredient.gdti}
                      loading={isLoading}
                      handleValueChange={value => handleValueChange('gdti', value, index)}
                    >
                      {selectList && selectList.length && isNeedToParse
                        ? selectList.map(el => {
                            let newTitle = el.title
                            let localeTitle
                            try {
                              newTitle = JSON.parse(el.title)
                              localeTitle = newTitle[currentLocale && currentLocale.value]
                                ? newTitle[currentLocale.value]
                                : newTitle.en
                            } catch (e) {
                              localeTitle = newTitle
                            }
                            return (
                              <Option style={{ fontSize: 16 }} key={el.id} value={el.id}>
                                {localeTitle}
                              </Option>
                            )
                          })
                        : selectList.map(el => (
                            <Option style={{ fontSize: 16 }} key={el.value} value={el.value}>
                              {el.label}
                            </Option>
                          ))}
                    </CustomSelect>
                  ) : (
                    <RHFInput
                      as={<Input size='large' disabled={isSelectsDisable} />}
                      register={register}
                      value={ingredient.name}
                      onChange={e => {
                        const { value } = e.target
                        handleValueChange('name', value, index)
                      }}
                      setValue={setValue}
                    />
                  )}
                </Form.Item>
                <RHFInput
                  as={
                    <Checkbox size='large' disabled={isSelectsDisable}>
                      {intl.get('widgets.nutrition_info.gdti')}
                    </Checkbox>
                  }
                  /* eslint-disable-next-line no-prototype-builtins */
                  checked={ingredient.hasOwnProperty('gdti')}
                  register={register}
                  onChange={e => {
                    const value = e.target.checked
                    handleChangeNameTypeChange(value, index)
                  }}
                  setValue={setValue}
                />
              </ST.NameWrapper>
              <Error
                errors={errors}
                marginBottom='15px'
                destination={`sources[${activeSource}].data[${widgetIndex}].${mainName}.${subName}[${index}].name`}
              />
              {(!ingredient.gdti || !ingredient.gdti.length) && ingredient.name && (
                <Form.Item label={intl.get('widgets.nutrition_info.description')}>
                  <WidgetRemaining value={remainingValueText(ingredient.description)} />
                  <RHFInput
                    as={<TextArea rows={4} disabled={isSelectsDisable} />}
                    rules={{ required: true }}
                    register={register}
                    setValue={setValue}
                    value={ingredient.description}
                    onChange={e => {
                      const { value } = e.target
                      if (value.length > DESCRIPTION_TEXT_LENGTH) {
                        return
                      }
                      handleValueChange('description', value, index)
                    }}
                  />
                  <Error errors={errors} destination={`${errorDestination}.description`} />
                </Form.Item>
              )}
              <ST.PropertiesWrapper>
                <RHFInput
                  as={
                    <Checkbox size='large' disabled={isSelectsDisable}>
                      {intl.get('widgets.nutrition_info.allergen')}
                    </Checkbox>
                  }
                  checked={ingredient.allergen}
                  register={register}
                  onChange={e => {
                    handleValueChange('allergen', e.target.checked, index)
                  }}
                  setValue={setValue}
                />
                <RHFInput
                  as={
                    <Checkbox size='large' disabled={isSelectsDisable}>
                      {intl.get('widgets.nutrition_info.nano')}
                    </Checkbox>
                  }
                  checked={ingredient.nano}
                  register={register}
                  onChange={e => {
                    handleValueChange('nano', e.target.checked, index)
                  }}
                  setValue={setValue}
                />
              </ST.PropertiesWrapper>
            </ST.IngredientWrapper>
          )
        }
        return null
      })}
      <CustomButton
        text={intl.get(`widgets.${mainName}.addItem`)}
        handleClick={() => addIngredient(groupId, groupName)}
        disabled={isSelectsDisable}
      >
        <IconButton type='Add' styleParam={{ fontSize: 14, marginRight: '10px' }} />
      </CustomButton>
    </ST.GroupWrapper>
  )
}

NutritionGroup.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  isSelectsDisable: PropTypes.bool,
  groupId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  handleValueChange: PropTypes.func.isRequired,
  selectList: PropTypes.arrayOf(PropTypes.object),
  deleteIngredient: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  errorDestination: PropTypes.string,
  deleteGroup: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChangeNameTypeChange: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  activeSource: PropTypes.number.isRequired,
  widgetIndex: PropTypes.number.isRequired,
  mainName: PropTypes.string.isRequired,
  subName: PropTypes.string.isRequired,
  isNeedToParse: PropTypes.bool
}

NutritionGroup.defaultProps = {
  isSelectsDisable: false,
  isLoading: false,
  errors: {},
  errorDestination: null,
  selectList: [],
  isNeedToParse: false
}

export default NutritionGroup

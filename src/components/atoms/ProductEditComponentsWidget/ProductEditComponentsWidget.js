import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { RHFInput } from 'react-hook-form-input'
import { isNil } from 'lodash'
import { Form, Input } from 'antd'
import intl from 'react-intl-universal'
import uuid from 'uuid4'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import WidgetHeaderSwitchMode from '../../molecules/WidgetHeaderSwitchMode'
import Error from '../Error'
import CustomButton from '../../molecules/Button'
import NutritionGroup from '../../molecules/NutritionGroup'
import { getGroupedItems } from '../../../utils/grouping'

const ProductEditComponentsWidget = ({
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
  indexFieldsProductsGetIndexInfo,
  getProductsGdti,
  isLoadingProductsGdti,
  gdti
}) => {
  const clearComponentsErrors = () => {
    if (data && data.components) {
      clearError(`sources[${activeSource}].data[${widgetIndex}].components.title`)
      data.components.items.forEach((el, index) => {
        clearError(`sources[${activeSource}].data[${widgetIndex}].components.items[${index}].name`)
        clearError(`sources[${activeSource}].data[${widgetIndex}].components.items.${el.groupId}`)
      })
    }
  }

  const clearFieldValue = (field, index, groupId) => {
    if (groupId) {
      clearError(`sources[${activeSource}].data[${widgetIndex}].components.items.${groupId}`)
    } else if (!groupId && (field === 'name' || field === 'gdti')) {
      clearError(`sources[${activeSource}].data[${widgetIndex}].components.items[${index}].${field}`)
    } else {
      clearError(`sources[${activeSource}].data[${widgetIndex}].components.${field}`)
    }
  }

  const validateComponentFieldValue = (field, value, index, groupId) => {
    clearFieldValue(field, index, groupId)
    if (!value) {
      if (isNil(index) || index < 0) {
        setError(
          `sources[${activeSource}].data[${widgetIndex}].components.${field}`,
          'notMatch',
          intl.get('validation.requiredField')
        )
        return
      }
      if (groupId) {
        setError(
          `sources[${activeSource}].data[${widgetIndex}].components.items.${groupId}`,
          'notMatch',
          intl.get('validation.requiredField')
        )
        return
      }
      setError(
        `sources[${activeSource}].data[${widgetIndex}].components.items[${index}].${field}`,
        'notMatch',
        intl.get('validation.requiredField')
      )
    }
  }

  useEffect(() => {
    if (!gdti || !gdti.length) {
      getProductsGdti()
    }

    if (data && data.components) {
      Object.keys(data.components).forEach(keyField => {
        if (isNil(data.components[keyField])) {
          validateComponentFieldValue(keyField, '')
        }
      })
      data.components.items.forEach((el, index) => {
        validateComponentFieldValue('name', el.name || el.gdti, index)
        validateComponentFieldValue('group', el.group, index, el.groupId)
      })
    }

    if (!gdti.length) {
      indexFieldsProductsGetIndexInfo()
      getProductsGdti()
    }

    return () => {
      clearComponentsErrors()
    }
  }, [])

  const handleValueChange = useCallback(
    (field, value, index, groupId) => {
      const newSources = [...sources]
      if (isNil(index) || index < 0) {
        if (field === 'group') {
          const newItems = newSources[activeSource].data[widgetIndex].components.items.map(el => {
            if (el.groupId === groupId) {
              // eslint-disable-next-line no-param-reassign
              el.group = value
            }
            return el
          })
          newSources[activeSource].data[widgetIndex].components.items = newItems
          validateComponentFieldValue(field, value, index, groupId)
        } else {
          newSources[activeSource].data[widgetIndex].components[field] = value
          validateComponentFieldValue(field, value)
        }
      } else {
        newSources[activeSource].data[widgetIndex].components.items[index][field] = value
        validateComponentFieldValue(field, value, index)
      }

      if (field === 'gdti') {
        validateComponentFieldValue('name', value, index)
        return
      }

      setValue('sources', newSources)
    },
    [sources]
  )

  const handleChangeIngredientNameType = useCallback(
    (value, index) => {
      const newSources = [...sources]
      if (value) {
        delete newSources[activeSource].data[widgetIndex].components.items[index].name
        newSources[activeSource].data[widgetIndex].components.items[index].gdti = null
      } else {
        newSources[activeSource].data[widgetIndex].components.items[index].name = null
        delete newSources[activeSource].data[widgetIndex].components.items[index].gdti
      }
      validateComponentFieldValue('name', '', index)
      setValue('sources', newSources)
    },
    [sources]
  )

  const addItem = (groupId, groupName) => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].components.items.push({
      allergen: false,
      group: groupName || null,
      name: null,
      nano: false,
      groupId: groupId || uuid()
    })
    const newIndex = newSources[activeSource].data[widgetIndex].components.items.length - 1
    if (!groupId) {
      validateComponentFieldValue(
        'group',
        '',
        newIndex,
        newSources[activeSource].data[widgetIndex].components.items[newIndex].groupId
      )
    }
    validateComponentFieldValue('name', '', newIndex)
    setValue('sources', newSources)
  }

  const clearAllErrors = nutritionInfo => {
    if (nutritionInfo.items && nutritionInfo.items.length) {
      nutritionInfo.items.forEach((ingredient, index) => {
        clearFieldValue('group', index, ingredient.groupId)
        clearFieldValue('name', index, null)
      })
    }
  }

  const deleteGroup = groupId => {
    const newSources = [...sources]
    clearAllErrors(newSources[activeSource].data[widgetIndex].components)
    const newItems = newSources[activeSource].data[widgetIndex].components.items.filter(el => el.groupId !== groupId)

    newItems.forEach((ingredient, newIndex) => {
      validateComponentFieldValue('group', ingredient.group, newIndex, ingredient.groupId)
      validateComponentFieldValue('name', ingredient.name, newIndex)
    })

    newSources[activeSource].data[widgetIndex].components.items = newItems
    setValue('sources', newSources)
  }

  const deleteIngredient = index => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex].components.items.splice(index, 1)
    clearAllErrors(newSources[activeSource].data[widgetIndex].components)
    setValue('sources', newSources)
  }

  return (
    <ProductEditWidgetWrapper
      headerText={intl.get('widgets.components.title')}
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
      smallSize
    >
      <Form.Item label={intl.get('widgets.components.displayTitle')}>
        <RHFInput
          as={<Input size='large' disabled={isSelectsDisable} />}
          register={register}
          value={data.components && data.components.title}
          onChange={e => {
            const { value } = e.target
            handleValueChange('title', value)
          }}
          setValue={setValue}
        />
        <Error errors={errors} destination={`sources[${activeSource}].data[${widgetIndex}].components.title`} />
      </Form.Item>
      {data.components &&
        data.components.items &&
        !!data.components.items.length &&
        Object.keys(getGroupedItems(data.components.items)).map((key, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={i}>
            <NutritionGroup
              register={register}
              setValue={setValue}
              errors={errors}
              ingredients={data.components.items}
              groupId={key}
              isSelectsDisable={isSelectsDisable}
              deleteGroup={deleteGroup}
              deleteIngredient={deleteIngredient}
              selectList={gdti}
              isSubItem
              handleValueChange={handleValueChange}
              clearError={clearError}
              setError={setError}
              activeSource={activeSource}
              widgetIndex={widgetIndex}
              handleChangeNameTypeChange={handleChangeIngredientNameType}
              addIngredient={addItem}
              mainName='components'
              subName='items'
              isLoading={isLoadingProductsGdti}
              isNeedToParse
            />
          </React.Fragment>
        ))}
      <CustomButton
        text={intl.get('widgets.components.add')}
        width='160px'
        handleClick={() => addItem(null, null)}
        disabled={isSelectsDisable}
      />
    </ProductEditWidgetWrapper>
  )
}

ProductEditComponentsWidget.propTypes = {
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
  indexFieldsProductsGetIndexInfo: PropTypes.func.isRequired,
  getProductsGdti: PropTypes.func.isRequired,
  gdti: PropTypes.arrayOf(PropTypes.object),
  isLoadingProductsGdti: PropTypes.bool
}

ProductEditComponentsWidget.defaultProps = {
  errors: {},
  data: {},
  sources: [],
  gdti: [],
  isSelectsDisable: false,
  isLoadingProductsGdti: false
}

export default ProductEditComponentsWidget

import React, { useEffect, useState, useMemo } from 'react'
import { Select, Form } from 'antd'
import styled from 'styled-components'
import { isEmpty } from 'lodash'
import intl from 'react-intl-universal'
import ProductEditWidgetWrapper from '../ProductEditWidgetWrapper'
import IconButton from '../../molecules/IconButton'
import CustomButton from '../../molecules/Button'
import { StyledError } from '../ProductEditInfoWidget/styles'
import TradeSelect from '../../molecules/TradeSelect'
import LoadingSpinner from '../LoadingSpinner'

const Attributes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  & > div:not(:last-child) {
    flex-shrink: 0;
    flex-basis: 43%;
    max-width: 43%;
  }
  & > div:nth-child(3) {
    flex-basis: 10%;
    max-width: 10%;
    flex-shrink: 0;
    height: 40px;
  }
`

const AttributeSelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const { Option } = Select

const ProductEditTradeItemWidget = ({
  register,
  setValue,
  getGpsSegments,
  getGpsFamilies,
  getGpsClasses,
  getGpsBricks,
  getGpsAttrKeys,
  getGpsAttrValues,
  getGpsAttrsValues,
  segments,
  families,
  classes,
  bricks,
  keys,
  valuesFromServer,
  gtinInfo,
  errors,
  setError,
  clearError,
  values,
  isLoadingGpcSegments,
  isLoadingGpcFamilies,
  isLoadingGpcClasses,
  isLoadingGpcBricks,
  isLoadingGpcKeys,
  isNewProduct
}) => {
  useEffect(() => {
    if (!isNewProduct) {
      if (gtinInfo && segments && segments.length) {
        if (gtinInfo.gpc_segment) {
          getGpsFamilies(gtinInfo.gpc_segment)
        }
        if (gtinInfo.gpc_family) {
          getGpsClasses(gtinInfo.gpc_family)
        }
        if (gtinInfo.gpc_class) {
          getGpsBricks(gtinInfo.gpc_class)
        }
        if (gtinInfo.gpc_brick) {
          getGpsAttrKeys(gtinInfo.gpc_brick)
        }
      }
    }
  }, [gtinInfo, segments])

  const [counter, setCounter] = useState(0)

  const selectedValues = useMemo(() => {
    const res = {}

    if (segments.length !== 0) {
      const segment = segments.find(s => s.code === values.tradeItem.gpc_segment)
      res[values.tradeItem.gpc_segment] = segment ? segment.title : undefined
    }

    if (families.length !== 0) {
      const family = families.find(s => s.code === values.tradeItem.gpc_family)
      res[values.tradeItem.gpc_family] = family ? family.title : undefined
    }

    if (classes.length !== 0) {
      const class1 = classes.find(s => s.code === values.tradeItem.gpc_class)
      res[values.tradeItem.gpc_class] = class1 ? class1.title : undefined
    }

    if (bricks.length !== 0) {
      const brick = bricks.find(s => s.code === values.tradeItem.gpc_brick)
      res[values.tradeItem.gpc_brick] = brick ? brick.title : undefined
    }

    return res
  }, [segments, families, classes, bricks, values])

  useEffect(() => {
    register({ name: 'tradeItem.gpc_segment' })
    register({ name: 'tradeItem.gpc_family' })
    register({ name: 'tradeItem.gpc_class' })
    register({ name: 'tradeItem.gpc_brick' })
    register({ name: 'tradeItem.gpc_brick_attributes' })
  }, [register])

  useEffect(() => {
    getGpsSegments()
  }, [])

  useEffect(() => {
    if (keys && keys.length && gtinInfo && !isEmpty(gtinInfo.gpc_brick_attributes)) {
      // eslint-disable-next-line array-callback-return
      getGpsAttrsValues({ values: gtinInfo.gpc_brick_attributes, brick: values.tradeItem.gpc_brick })
    }
  }, [gtinInfo, keys])

  const handleDeleteAttribute = index => {
    const oldAttributes = [...values.tradeItem.gpc_brick_attributes]
    clearError(`tradeItems.gpc_brick_attributes[${index}].value`)
    oldAttributes.splice(index, 1)
    setValue('tradeItem.gpc_brick_attributes', oldAttributes)
  }

  const addAttribute = () => {
    setValue('tradeItem.gpc_brick_attributes', [
      ...values.tradeItem.gpc_brick_attributes,
      { key: `def${counter}`, value: undefined }
    ])
    setCounter(prevCounter => prevCounter + 1)
  }

  return (
    <LoadingSpinner isLoading={isLoadingGpcSegments}>
      <ProductEditWidgetWrapper headerText={intl.get('widgets.tradeItem.tradeItem')}>
        <fieldset name='mainInfo' key='mainInfo'>
          <Form.Item label={intl.get('widgets.tradeItem.segment')}>
            <TradeSelect
              isLoading={isLoadingGpcSegments}
              value={selectedValues[values.tradeItem.gpc_segment]}
              placeholder={intl.get('widgets.tradeItem.selectSegment')}
              onChangeFunc={value => {
                if (value) {
                  getGpsFamilies(value)
                  setValue('tradeItem.gpc_segment', value)
                  setValue('tradeItem.gpc_family', '')
                  setValue('tradeItem.gpc_class', '')
                  setValue('tradeItem.gpc_brick', '')
                  setValue('tradeItem.gpc_brick_attributes', [{ key: undefined, value: undefined }])
                }
              }}
              label='title'
            >
              {segments && !isLoadingGpcSegments
                ? segments.map(segment => (
                    <Option style={{ fontSize: 16 }} key={segment.code} value={segment.code}>
                      {segment.title}
                    </Option>
                  ))
                : null}
            </TradeSelect>
          </Form.Item>
          <Form.Item label={intl.get('widgets.tradeItem.family')}>
            <TradeSelect
              isLoading={isLoadingGpcFamilies}
              value={selectedValues[values.tradeItem.gpc_family]}
              disabled={!values.tradeItem.gpc_segment}
              placeholder={intl.get('widgets.tradeItem.selectFamily')}
              onChangeFunc={value => {
                if (value) {
                  getGpsClasses(value)
                  setValue('tradeItem.gpc_family', value)
                  setValue('tradeItem.gpc_class', '')
                  setValue('tradeItem.gpc_brick', '')
                  setValue('tradeItem.gpc_brick_attributes', [{ key: undefined, value: undefined }])
                }
              }}
            >
              {families &&
                !isLoadingGpcFamilies &&
                families.map(family => (
                  <Option style={{ fontSize: 16 }} key={family.code} value={family.code}>
                    {family.title}
                  </Option>
                ))}
            </TradeSelect>
          </Form.Item>
          <Form.Item label={intl.get('widgets.tradeItem.class')}>
            <TradeSelect
              isLoading={isLoadingGpcClasses}
              value={selectedValues[values.tradeItem.gpc_class]}
              disabled={!values.tradeItem.gpc_family}
              placeholder={intl.get('widgets.tradeItem.selectClass')}
              onChangeFunc={value => {
                if (value) {
                  getGpsBricks(value)
                  setValue('tradeItem.gpc_class', value)
                  setValue('tradeItem.gpc_brick', '')
                  setValue('tradeItem.gpc_brick_attributes', [{ key: undefined, value: undefined }])
                }
              }}
              label='title'
            >
              {classes && !isLoadingGpcClasses
                ? classes.map(el => (
                    <Option style={{ fontSize: 16 }} key={el.code} value={el.code}>
                      {el.title}
                    </Option>
                  ))
                : null}
            </TradeSelect>
          </Form.Item>
          <Form.Item label={intl.get('widgets.tradeItem.brick')}>
            <TradeSelect
              isLoading={isLoadingGpcBricks}
              value={selectedValues[values.tradeItem.gpc_brick]}
              disabled={!values.tradeItem.gpc_class}
              placeholder={intl.get('widgets.tradeItem.selectBrick')}
              onChangeFunc={value => {
                if (value) {
                  getGpsAttrKeys(value)
                  setValue('tradeItem.gpc_brick', value)
                  setValue('tradeItem.gpc_brick_attributes', [{ key: undefined, value: undefined }])
                }
              }}
              label='title'
            >
              {bricks && !isLoadingGpcBricks
                ? bricks.map(brick => (
                    <Option style={{ fontSize: 16 }} key={brick.code} value={brick.code}>
                      {brick.title}
                    </Option>
                  ))
                : null}
            </TradeSelect>
          </Form.Item>
          <Form.Item label={intl.get('widgets.tradeItem.attributes')}>
            {values.tradeItem.gpc_brick_attributes.map((attribute, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Attributes key={index}>
                  <TradeSelect
                    isLoading={isLoadingGpcKeys}
                    value={
                      attribute.key &&
                      !attribute.key.startsWith('def') &&
                      attribute.key !== '' &&
                      keys.find(key => key.code === attribute.key.toString())
                        ? keys.find(key => key.code === attribute.key.toString()).title
                        : undefined
                    }
                    disabled={!values.tradeItem.gpc_brick}
                    placeholder={intl.get('widgets.tradeItem.selectKey')}
                    onChangeFunc={value => {
                      if (value && !Object.keys(valuesFromServer).find(el => el === value)) {
                        getGpsAttrValues({ value, brick: values.tradeItem.gpc_brick })
                      }
                      const oldAttributes = [...values.tradeItem.gpc_brick_attributes]
                      oldAttributes[index].key = value
                      oldAttributes[index].value = undefined
                      setError(
                        `tradeItems.gpc_brick_attributes[${index}].value`,
                        'notMatch',
                        intl.get('validation.requiredField')
                      )
                      setValue(`tradeItem.gpc_brick_attributes`, oldAttributes)
                    }}
                    label='title'
                  >
                    {keys
                      ? keys.map(key1 => (
                          <Option style={{ fontSize: 16 }} key={key1.code} value={key1.code}>
                            {key1.title}
                          </Option>
                        ))
                      : null}
                  </TradeSelect>
                  <AttributeSelect>
                    <TradeSelect
                      value={
                        valuesFromServer[attribute.key] &&
                        attribute.value &&
                        valuesFromServer[attribute.key].find(value => value.code === attribute.value.toString()).title
                      }
                      disabled={
                        !values.tradeItem.gpc_brick_attributes[index].key ||
                        values.tradeItem.gpc_brick_attributes[index].key.startsWith('def')
                      }
                      placeholder={intl.get('widgets.tradeItem.selectValue')}
                      onChangeFunc={value => {
                        if (value.trim() !== '') {
                          const oldAttributes = [...values.tradeItem.gpc_brick_attributes]
                          oldAttributes[index].value = value
                          setValue(`tradeItem.gpc_brick_attributes`, oldAttributes)
                          clearError(`tradeItems.gpc_brick_attributes[${index}].value`)
                        }
                      }}
                      label='title'
                    >
                      {valuesFromServer[attribute.key]
                        ? valuesFromServer[attribute.key].map(value => (
                            <Option style={{ fontSize: 16 }} key={value.code} value={value.code}>
                              {value.title}
                            </Option>
                          ))
                        : null}
                    </TradeSelect>
                    <StyledError
                      style={{
                        visibility: errors[`tradeItems.gpc_brick_attributes[${index}].value`] ? 'visible' : 'hidden',
                        height: 10,
                        marginTop: 10
                      }}
                    >
                      {errors[`tradeItems.gpc_brick_attributes[${index}].value`] &&
                        errors[`tradeItems.gpc_brick_attributes[${index}].value`].message}
                    </StyledError>
                  </AttributeSelect>
                  <IconButton
                    type='Delete'
                    popText='Delete attribute'
                    actionFunction={() => handleDeleteAttribute(index)}
                  />
                </Attributes>
              )
            })}
          </Form.Item>
        </fieldset>
        <CustomButton
          disabled={keys && keys.length === 0}
          text={intl.get('widgets.tradeItem.addMore')}
          width='110px'
          handleClick={addAttribute}
        />
      </ProductEditWidgetWrapper>
    </LoadingSpinner>
  )
}

export default ProductEditTradeItemWidget

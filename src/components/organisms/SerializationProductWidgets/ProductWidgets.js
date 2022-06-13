import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Form } from 'antd'
import { isArray } from 'lodash'
import ProfileBuilder from '../ProfileBuilder'
import ProductEditTradeItemWidget from '../../atoms/ProductEditTradeItemWidget'
import ProductEditSourceWidget from '../../atoms/ProductEditSourceWidget'
import ProductSourceWidgets from '../ProductSourceWidgets'
import { EditForm, BottomInfo, WidgetsPanel } from './styles'

const isSelectsDisable = false
const ProductWidgets = ({
  history,
  isLoadingGtinInfo,
  triggerValidation,
  register,
  values,
  containerRef,
  setValue,
  errors,
  unregister,
  setError,
  clearError,
  formState
}) => {
  const isNewProduct = !values || !values.sources || values.sources.length === 0 || values.sources[0].data.length === 0

  const sourceWidgets = useMemo(() => {
    const res = []
    if (
      !values ||
      !values.sources ||
      !values.sources[values.activeSource] ||
      !values.sources[values.activeSource].data
    ) {
      return res
    }

    values.sources[values.activeSource].data.forEach(widget => {
      const widgetName = Object.keys(widget).find(w => w !== 'private')
      if (isArray(widgetName)) {
        if (widgetName.length > 1) {
          res.push({ [widgetName.filter(el => el !== 'text')[0]]: widget })
        } else {
          res.push({ [widgetName[0]]: widget })
        }
      } else {
        res.push({ [widgetName]: widget })
      }
    })
    return res
  }, [values])

  return (
    <EditForm>
      {!isLoadingGtinInfo && (
        <Form layout='vertical'>
          <BottomInfo>
            <WidgetsPanel>
              <ProductEditTradeItemWidget
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                values={values}
                isNewProduct={isNewProduct}
              />
              <ProductEditSourceWidget
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={values.sources}
                activeSource={values.activeSource}
                isNewProduct={isNewProduct}
                isSelectsDisable={isSelectsDisable}
              />
              {sourceWidgets && (
                <ProductSourceWidgets
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  setError={setError}
                  clearError={clearError}
                  sources={values.sources}
                  sourceWidgets={sourceWidgets}
                  activeSource={values.activeSource}
                  triggerValidation={triggerValidation}
                  isSelectsDisable={isSelectsDisable}
                />
              )}
            </WidgetsPanel>
            <ProfileBuilder
              register={register}
              unregister={unregister}
              errors={errors}
              setValue={setValue}
              setError={setError}
              clearError={clearError}
              triggerValidation={triggerValidation}
              sourceWidgets={sourceWidgets}
              isSelectsDisable={isSelectsDisable}
              modalWidget={values && values.modalWidget}
              sources={values && values.sources}
              activeSource={values && values.activeSource}
              history={history}
              formState={formState}
              isNewProduct={isNewProduct}
              containerRef={containerRef}
              isSerializationForm
            />
          </BottomInfo>
        </Form>
      )}
      <div />
    </EditForm>
  )
}

ProductWidgets.propTypes = {
  isLoadingGtinInfo: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  containerRef: PropTypes.object.isRequired
}

ProductWidgets.defaultProps = {
  isLoadingGtinInfo: undefined
}

export default withRouter(React.memo(ProductWidgets))

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ProductEditTextWidget from '../../atoms/ProductEditTextWidget'
import ProductEditTitleWidget from '../../atoms/ProductEditTitleWidget'
import ProductEditHeaderWidget from '../../atoms/ProductEditHeaderWidget'
import ProductEditFBWidget from '../../atoms/ProductEditFBWidget'
import ProductEditPhoneWidget from '../../atoms/ProductEditPhoneWidget'
import ProductEditEmailWidget from '../../atoms/ProductEditEmailWidget'
import ProductEditGdtiWidget from '../../atoms/ProductEditGdtiWidget'
import ProductEditImageWidget from '../../atoms/ProductEditImageWidget'
import ProductEditVideoWidget from '../../atoms/ProductEditVideoWidget'
import ProductEditLinkWidget from '../../atoms/ProductEditLinkWidget'
import ProductEditPopupWidget from '../../atoms/ProductEditPopupWidget'
import ProductEditCertificatesWidget from '../../atoms/ProductEditCertificatesWidget'
import ProductEditHealthstarWidget from '../../atoms/ProductEditHealthstarWidget'
import ProductEditNutritionInfoWidget from '../../atoms/ProductEditNutritionInfoWidget'
import ProductEditSocialNetworksWidget from '../../atoms/ProductEditSocialNetworksWidget'
import ProductEditComponentsWidget from '../../atoms/ProductEditComponentsWidget'
import ProductEditMadeInWidget from '../../atoms/ProductEditMadeInWidget'

const SourceWidgetsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ProductSourceWidgets = ({
  register,
  setValue,
  sourceWidgets,
  errors,
  setError,
  clearError,
  activeSource,
  sources,
  triggerValidation,
  isSelectsDisable
}) => {
  const widgetsList = () => {
    return sourceWidgets.map((el, index) => {
      return Object.keys(el).map(keyWidget => {
        switch (keyWidget) {
          case 'text':
            return (
              <ProductEditTextWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'title':
            return (
              <ProductEditTitleWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'header':
            return (
              <ProductEditHeaderWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'follow_fb':
            return (
              <ProductEditFBWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'phone':
            return (
              <ProductEditPhoneWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'email':
            return (
              <ProductEditEmailWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'image':
            return (
              <ProductEditImageWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'video':
            return (
              <ProductEditVideoWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'gdti':
            return (
              <ProductEditGdtiWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'link':
            return (
              <ProductEditLinkWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'popup':
            return (
              <ProductEditPopupWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'certificates':
            return (
              <ProductEditCertificatesWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'health_star':
            return (
              <ProductEditHealthstarWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'nutrition_info':
            return (
              <ProductEditNutritionInfoWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'made_in':
            return (
              <ProductEditMadeInWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'social_networks':
            return (
              <ProductEditSocialNetworksWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          case 'components':
            return (
              <ProductEditComponentsWidget
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearError={clearError}
                sources={sources}
                activeSource={activeSource}
                data={el[keyWidget]}
                widgetIndex={index}
                triggerValidation={triggerValidation}
                isSelectsDisable={isSelectsDisable}
              />
            )
          default: {
            return null
          }
        }
      })
    })
  }

  return <SourceWidgetsWrapper>{widgetsList()}</SourceWidgetsWrapper>
}

ProductSourceWidgets.propTypes = {
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  activeSource: PropTypes.number.isRequired,
  clearError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sourceWidgets: PropTypes.array,
  sources: PropTypes.arrayOf(PropTypes.object),
  triggerValidation: PropTypes.func.isRequired,
  isSelectsDisable: PropTypes.bool
}

ProductSourceWidgets.defaultProps = {
  errors: {},
  sourceWidgets: [],
  sources: [],
  isSelectsDisable: false
}

export default ProductSourceWidgets

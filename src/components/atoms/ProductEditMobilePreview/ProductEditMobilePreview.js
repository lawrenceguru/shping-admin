import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import * as ST from './styles'
import ClickToScan from '../../molecules/ClickToScan'
import MobilePreviewCertificatesWidget from '../MobilePreviewCertificatesWidget'
import MobilePreviewNutritionInfoWidget from '../MobilePreviewNutritionInfoWidget'
import MobilePreviewWidgetWrapper from '../MobilePreviewWidgetWrapper'
import MobilePreviewImageWidget from '../MobilePreviewImageWidget'
import MobilePreviewHealthStarWidget from '../MobilePreviewHealthStarWidget'
import MobilePreviewIngredient from '../MobilePreviewIngredient'
import MobilePreviewNetworksWidget from '../MobilePreviewNetworksWidget'
import MobilePreviewTextWidget from '../MobilePreviewTextWidget'
import MobilePreviewWidgetsGroups from '../../molecules/MobilePreviewWidgetsGroups'
import MobilePreviewLinkWidget from '../MobilePreviewLinkWidget'
import Barcode from '../Barcode'
import { getCheckDigit } from '../../../utils/validation'
import DocumentDatamatrix from '../../molecules/DocumentDatamatrix'

const currentLocale = localStorage.getItem('lang')
const ProductEditMobilePreview = ({
  register,
  setValue,
  values,
  gtinInfo,
  isNewProduct,
  reset,
  sourceWidgets,
  nutritions,
  gdti,
  getProductsGdti,
  getGdtiNutritions,
  gdtiInfo,
  isDocumentForm
}) => {
  const getSortedByGroupWidgets = (items, index = 0, res = [], el = [], elMode) => {
    const item = items[index]

    if (!item) {
      return res
    }

    if (['follow_fb', 'email', 'phone'].includes(Object.keys(item)[0])) {
      if (!elMode || elMode === 'contacts') {
        return getSortedByGroupWidgets(items, index + 1, res, [...el, item], 'contacts')
      }

      return getSortedByGroupWidgets(items, index + 1, [...res, el], [item], 'contacts')
    }

    if (['link'].includes(Object.keys(item)[0]) && Object.keys(item)[0].link.image) {
      if (!elMode || elMode === 'link') {
        return getSortedByGroupWidgets(items, index + 1, res, [...el, item], 'link')
      }

      return getSortedByGroupWidgets(items, index + 1, [...res, el], [item], 'link')
    }

    if (el.length > 0) {
      return getSortedByGroupWidgets(items, index + 1, [...res, el, item], [])
    }

    return getSortedByGroupWidgets(items, index + 1, [...res, item], [])
  }

  useEffect(() => {
    if (!nutritions || !nutritions.length) {
      getGdtiNutritions()
    }

    if (!gdti || !gdti.length) {
      getProductsGdti()
    }
  }, [])

  const getParsedGdti = useCallback(() => {
    if (!gdti || !gdti.length) {
      return null
    }

    return gdti.map(el => {
      let newTitle = el.title
      let localeTitle
      try {
        newTitle = JSON.parse(el.title)
        localeTitle = newTitle[currentLocale && currentLocale.value] ? newTitle[currentLocale.value] : newTitle.en
      } catch (e) {
        localeTitle = newTitle
      }

      return { label: localeTitle, value: el.id }
    })
  }, [gdti])

  const firstImageWidget = useMemo(() => {
    const widget = sourceWidgets ? sourceWidgets.find(el => Object.keys(el).includes('image')) : null

    if (widget && widget.image && widget.image.image) {
      return widget.image.image
    }
    return null
  }, [sourceWidgets])

  const headerWidget = useMemo(() => {
    const widget = sourceWidgets ? sourceWidgets.find(el => Object.keys(el).includes('header')) : null
    if (widget && widget.header && widget.header.header) {
      return widget.header.header.text
    }
    return null
  }, [sourceWidgets])

  const healthStarWidget = useMemo(() => {
    const widget = sourceWidgets ? sourceWidgets.find(el => Object.keys(el).includes('health_star')) : null

    if (widget && widget.health_star && widget.health_star.health_star) {
      return widget.health_star.health_star
    }
    return null
  }, [sourceWidgets])

  const getWidgets = () => {
    let firstIsRendered = false
    if (!sourceWidgets) {
      return null
    }

    // eslint-disable-next-line consistent-return,array-callback-return
    return getSortedByGroupWidgets(sourceWidgets).map((el, i) => {
      if (Array.isArray(el)) {
        // eslint-disable-next-line react/no-array-index-key
        return <MobilePreviewWidgetsGroups items={el} key={i} />
      }
      if (el.image) {
        if (!firstIsRendered) {
          firstIsRendered = true
          return null
        }

        return (
          // eslint-disable-next-line react/no-array-index-key
          <MobilePreviewWidgetWrapper smallHeader key={i}>
            <MobilePreviewImageWidget images={el.image.image} />
          </MobilePreviewWidgetWrapper>
        )
      }

      return Object.keys(el).map((keyWidget, ind) => {
        switch (keyWidget) {
          case 'title':
            return (
              // eslint-disable-next-line react/no-array-index-key
              <MobilePreviewWidgetWrapper smallHeader isInner key={ind}>
                <>{el[keyWidget] && el[keyWidget].title && el[keyWidget].title.text}</>
              </MobilePreviewWidgetWrapper>
            )
          case 'video':
            return (
              <MobilePreviewWidgetWrapper
                text={el[keyWidget] && el[keyWidget].video && el[keyWidget].video.title}
                isInner
                /* eslint-disable-next-line react/no-array-index-key */
                key={ind}
              >
                <>
                  {el[keyWidget] && el[keyWidget].video && el[keyWidget].video.url && (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video src={el[keyWidget].video.url} poster={el[keyWidget].video.preview || null} controls />
                  )}
                </>
              </MobilePreviewWidgetWrapper>
            )
          case 'text':
            return (
              <MobilePreviewWidgetWrapper
                /* eslint-disable-next-line react/no-array-index-key */
                key={ind}
                text={el[keyWidget] && el[keyWidget].text && el[keyWidget].text.title}
              >
                <MobilePreviewTextWidget
                  text={el[keyWidget] && el[keyWidget].text.text}
                  markdown={el[keyWidget] && el[keyWidget].text.markdown}
                />
              </MobilePreviewWidgetWrapper>
            )
          case 'components':
            return (
              <MobilePreviewIngredient
                /* eslint-disable-next-line react/no-array-index-key */
                key={ind}
                ingredients={el[keyWidget].components.items}
                nutrientList={getParsedGdti(gdti)}
                isComponent
              />
            )
          case 'social_networks':
            return (
              <MobilePreviewWidgetWrapper
                /* eslint-disable-next-line react/no-array-index-key */
                key={ind}
                isInner
              >
                <MobilePreviewNetworksWidget items={el[keyWidget] && el[keyWidget].social_networks} />
              </MobilePreviewWidgetWrapper>
            )
          case 'link':
            return (
              <MobilePreviewWidgetWrapper
                /* eslint-disable-next-line react/no-array-index-key */
                key={ind}
                text={el[keyWidget] && el[keyWidget].link.text}
                isInner
              >
                <MobilePreviewLinkWidget link={el[keyWidget] && el[keyWidget].link} isWithImage />
              </MobilePreviewWidgetWrapper>
            )
          case 'nutrition_info':
            return (
              <>
                <MobilePreviewWidgetWrapper
                  text={el[keyWidget] && el[keyWidget].nutrition_info && el[keyWidget].nutrition_info.title}
                  /* eslint-disable-next-line react/no-array-index-key */
                  key={ind}
                >
                  <MobilePreviewNutritionInfoWidget data={el[keyWidget]} nutrientList={nutritions} />
                </MobilePreviewWidgetWrapper>
                <MobilePreviewIngredient
                  ingredients={el[keyWidget].nutrition_info.ingredients}
                  nutrientList={nutritions}
                />
              </>
            )
          default: {
            return null
          }
        }
      })
    })
  }

  const renderDatamatrix = info => {
    if (info && info.id) {
      const fullId = info.id.split(':')
      const idArr = fullId[fullId && fullId.length - 1].split('.')
      const prefixAndDoctype = `${idArr[0]}${idArr[1]}`
      const checkDigit = getCheckDigit(prefixAndDoctype)
      const gs1Code = `253${prefixAndDoctype}${checkDigit}${idArr[2]}`
      return <DocumentDatamatrix code={gs1Code} id={info.id} bcid='datamatrix' />
    }

    return null
  }
  return (
    <ST.MobilePreviewWrapper>
      <ST.Phone>
        <ST.PhoneHeader>
          <ST.PhoneCamera />
          <span>{headerWidget}</span>
        </ST.PhoneHeader>
        <ST.Screen>
          <ST.ProductMainInfo>
            <MobilePreviewImageWidget images={firstImageWidget} />
            <MobilePreviewCertificatesWidget sourceWidgets={sourceWidgets} />
            <ST.ProductName>{values['mainInfo.name']}</ST.ProductName>
            {healthStarWidget && <MobilePreviewHealthStarWidget data={healthStarWidget} />}
          </ST.ProductMainInfo>
          {getWidgets()}
        </ST.Screen>
        <ST.PhoneFooter>
          <ST.HomeButton />
        </ST.PhoneFooter>
      </ST.Phone>
      {!isDocumentForm && <Barcode value={values && values['mainInfo.barcodeNumber.id']} />}
      {!isNewProduct &&
        (isDocumentForm
          ? renderDatamatrix(gdtiInfo)
          : gtinInfo && (
              <ClickToScan register={register} setValue={setValue} values={values} gtinInfo={gtinInfo} reset={reset} />
            ))}
    </ST.MobilePreviewWrapper>
  )
}

ProductEditMobilePreview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gtinInfo: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  isNewProduct: PropTypes.bool,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  nutritions: PropTypes.arrayOf(PropTypes.object),
  gdti: PropTypes.arrayOf(PropTypes.object),
  getProductsGdti: PropTypes.func.isRequired,
  getGdtiNutritions: PropTypes.func.isRequired,
  sourceWidgets: PropTypes.arrayOf(PropTypes.object),
  isDocumentForm: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  gdtiInfo: PropTypes.object
}

ProductEditMobilePreview.defaultProps = {
  gdtiInfo: {},
  gtinInfo: {},
  values: {},
  isNewProduct: false,
  nutritions: null,
  sourceWidgets: null,
  gdti: null,
  isDocumentForm: false
}

export default ProductEditMobilePreview

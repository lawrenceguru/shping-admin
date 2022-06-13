import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import * as ST from './styles'
import MobilePreviewCertificatesWidget from '../../atoms/MobilePreviewCertificatesWidget'
import MobilePreviewWidgetWrapper from '../../atoms/MobilePreviewWidgetWrapper'
import MobilePreviewImageWidget from '../../atoms/MobilePreviewImageWidget'
import MobilePreviewHealthStarWidget from '../../atoms/MobilePreviewHealthStarWidget'
import MobilePreviewNetworksWidget from '../../atoms/MobilePreviewNetworksWidget'
import MobilePreviewTextWidget from '../../atoms/MobilePreviewTextWidget'
import MobilePreviewWidgetsGroups from '../../molecules/MobilePreviewWidgetsGroups'
import MobilePreviewLinkWidget from '../../atoms/MobilePreviewLinkWidget'
import MobilePreviewNutritionInfoWidget from '../../atoms/MobilePreviewNutritionInfoWidget'
import MobilePreviewIngredient from '../../atoms/MobilePreviewIngredient'

const ProductEditMobilePreview = ({ data }) => {
  const widgets = useMemo(() => {
    const res = []
    if (!data || !data.result || !data.result.length) {
      return res
    }

    data.result.forEach(widget => {
      const widgetName = Object.keys(widget).find(w => !['private', 'no_rewards', 'id'].includes(w))
      if (Array.isArray(widgetName)) {
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
  }, [data])

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

  const firstImageWidget = useMemo(() => {
    const widget = widgets ? widgets.find(el => Object.keys(el).includes('image')) : null

    if (widget && widget.image && widget.image.image) {
      return widget.image.image
    }
    return null
  }, [widgets])

  const headerWidget = useMemo(() => {
    const widget = widgets ? widgets.find(el => Object.keys(el).includes('header')) : null
    if (widget && widget.header && widget.header.header) {
      return widget.header.header.text
    }
    return null
  }, [widgets])

  const healthStarWidget = useMemo(() => {
    const widget = widgets ? widgets.find(el => Object.keys(el).includes('health_star')) : null

    if (widget && widget.health_star && widget.health_star.health_star) {
      return widget.health_star.health_star
    }
    return null
  }, [widgets])

  const getWidgets = () => {
    let firstIsRendered = false
    if (!widgets) {
      return null
    }

    // eslint-disable-next-line consistent-return,array-callback-return
    return getSortedByGroupWidgets(widgets).map((el, i) => {
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
                  <MobilePreviewNutritionInfoWidget data={el[keyWidget]} />
                </MobilePreviewWidgetWrapper>
                <MobilePreviewIngredient ingredients={el[keyWidget].nutrition_info.ingredients} />
              </>
            )
          default: {
            return null
          }
        }
      })
    })
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
            <MobilePreviewCertificatesWidget widgets={widgets} />
            <ST.ProductName>{data.product_name}</ST.ProductName>
            {healthStarWidget && <MobilePreviewHealthStarWidget data={healthStarWidget} />}
          </ST.ProductMainInfo>
          {getWidgets()}
        </ST.Screen>
        <ST.PhoneFooter>
          <ST.HomeButton />
        </ST.PhoneFooter>
      </ST.Phone>
    </ST.MobilePreviewWrapper>
  )
}

ProductEditMobilePreview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object
}

ProductEditMobilePreview.defaultProps = {
  data: null
}

export default ProductEditMobilePreview

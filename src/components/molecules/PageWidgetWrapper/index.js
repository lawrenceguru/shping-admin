/* eslint-disable no-param-reassign */
import React, { useCallback, useState } from 'react'
import uuid from 'uuid4'
import intl from 'react-intl-universal'
import { Modal } from 'antd'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import PropTypes from 'prop-types'
import { radioOptions } from './consts'
import * as ST from './styles'
import {
  getUserConfiguration,
  removeItemFromUserConfiguration,
  setUserConfiguration
} from '../../../utils/localStorage'
import InformationBlockShape from '../InformationBlockShape'
import { proccessLayout } from '../../../utils/analytics'
import Button from '../../atoms/Button'
import ModalForm from '../../atoms/ModalForm'
import OrientationForm from '../../atoms/OrientationForm'
import { dataURItoBlob } from '../../../utils/files'

const PageWidgetWrapper = ({ pageName, children, layout, cols }) => {
  const [widgetModalVisible, setWidgetModalVisible] = useState(false)
  const [invisibleItems, setInvisibleItems] = useState(getUserConfiguration(pageName) || [])
  const [isLoadingPdf, setIsLodaingPdf] = useState(false)

  const removeItemCallback = useCallback(
    item => {
      removeItemFromUserConfiguration(pageName, item)
      setInvisibleItems(invisibleItems.filter(el => el !== item))
    },
    [invisibleItems, removeItemFromUserConfiguration]
  )

  const setInvisibleItemsCallback = useCallback(
    item => {
      if (Array.isArray(item)) {
        item.forEach(element => setUserConfiguration(element))
        setInvisibleItems([...invisibleItems, ...item.map(elem => elem.widgetName)])
      } else {
        setUserConfiguration(item)
        setInvisibleItems([...invisibleItems, item.widgetName])
      }
    },
    [invisibleItems, setUserConfiguration]
  )

  const getModalContent = el => {
    if (
      [
        'Interaction',
        'InteractionClicks',
        'ApprovedReviews',
        'CompletedVideoViews',
        'Impressions',
        'ProductsHits',
        'UniqueUsers',
        'Spent',
        'Sales',
        'geography',
        'Reviews',
        'created',
        'into_circulation',
        'shipped',
        'buyingIntentRoi',
        'competitorAdConversion',
        'buyingIntentConversion',
        'reviewsByBrands',
        'reviewRatingScore',
        'buyingIntentRoi',
        'crossMarketPerformanceGraph',
        'buyingIntent',
        'communityGrowth',
        'education'
      ].includes(el)
    ) {
      return (
        <InformationBlockShape
          key={uuid()}
          widgetName={el}
          type='minus-square'
          removeItem={() => removeItemCallback(el)}
        />
      )
    }
    if (['spends', 'engagement', 'statistic'].includes(el)) {
      return (
        <InformationBlockShape
          key={uuid()}
          widgetName={el}
          type='line-chart'
          removeItem={() => removeItemCallback(el)}
        />
      )
    }
    if (
      [
        'crossMarketing',
        'topProducts',
        'topUsers',
        'Videos',
        'Impressions',
        'Interactions',
        'conversionSales',
        'StreamTable',
        'reviewsByBrands'
      ].includes(el)
    ) {
      return (
        <InformationBlockShape key={uuid()} widgetName={el} type='profile' removeItem={() => removeItemCallback(el)} />
      )
    }
    if (
      el === 'campaigns' ||
      el === 'audience' ||
      el === 'Clicks' ||
      el === 'CommunityGrowth' ||
      el === 'crossMarketingPerformance' ||
      el === 'crossMarketPerformanceGraph'
    ) {
      return (
        <InformationBlockShape
          key={uuid()}
          widgetName={el}
          type='bar-chart'
          removeItem={() => removeItemCallback(el)}
        />
      )
    }
    if (
      el === 'brandSales' ||
      el === 'ExtendedClicks' ||
      el === 'buyingIntent' ||
      el === 'communityGrowth' ||
      el === 'education'
    ) {
      return (
        <InformationBlockShape key={uuid()} widgetName={el} type='fund' removeItem={() => removeItemCallback(el)} />
      )
    }
    if (
      ['gender', 'ageProfile', 'generation', 'retailers', 'totalUsers', 'country', 'state', 'definedPeriod'].includes(
        el
      )
    ) {
      return (
        <InformationBlockShape
          key={uuid()}
          widgetName={el}
          type='pie-chart'
          removeItem={() => removeItemCallback(el)}
        />
      )
    }
    return null
  }

  const onStartPdfExport = useCallback(
    async orientation => {
      setIsLodaingPdf(true)
      const svgElements = document.body.querySelectorAll('svg')

      svgElements.forEach(item => {
        item.setAttribute('width', item.getBoundingClientRect().width)
        item.setAttribute('height', item.getBoundingClientRect().height)
        item.style.width = null
        item.style.height = null
      })
      const items = Array.from(document.querySelectorAll('.pdf-export'))
      const xSapce = 5
      const fieldMargin = 15
      const ySpace = 5
      const pageHeight = orientation === 'p' ? 300 : 210
      const pageWidth = orientation === 'p' ? 210 : 300
      const proccessedLayout = proccessLayout(layout, xSapce, cols)
      const contentHeight = pageHeight - fieldMargin * 2

      // eslint-disable-next-line new-cap
      const pdf = new jsPDF(orientation, 'mm')

      let count = 0

      const widthUnit = (pageWidth - fieldMargin * 2) / cols
      const heightUnit = orientation === 'p' ? 30 : 43
      pdf.setFillColor('#F4F4F4')
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')
      let pageYOffset = 0
      let startPageFlag = true

      while (count !== proccessedLayout.length) {
        // eslint-disable-next-line no-loop-func
        const renderItem = items.find(item => item.dataset.index === proccessedLayout[count].i)
        if (renderItem) {
          // eslint-disable-next-line no-await-in-loop
          const canvas = await html2canvas(renderItem, {
            useCORS: true,
            backgroundColor: '#F4F4F4'
          })

          const image = canvas.toDataURL('image/png')
          const widthXOffset = widthUnit - (xSapce * (cols - 1)) / cols
          const imgWidth =
            (widthUnit - (proccessedLayout[count].offset ? proccessedLayout[count].offset / cols : 0)) *
            proccessedLayout[count].w
          const imgHeight = heightUnit * proccessedLayout[count].h
          const xOffset = proccessedLayout[count].x
            ? fieldMargin + widthXOffset * proccessedLayout[count].x + xSapce * proccessedLayout[count].x
            : fieldMargin
          const ySpaceOnPage = proccessedLayout[count].y - pageYOffset === 0 ? 0 : ySpace
          let yOffset =
            fieldMargin +
            (proccessedLayout[count].y ? heightUnit * (proccessedLayout[count].y - pageYOffset) + ySpaceOnPage : 0)

          if (!startPageFlag && yOffset + imgHeight > contentHeight) {
            pageYOffset = proccessedLayout[count].y
            yOffset = fieldMargin
            pdf.addPage()
            pdf.setFillColor('#F4F4F4')
            pdf.rect(0, 0, pageWidth, pageHeight, 'F')
          }

          startPageFlag = false
          const correctHeight = imgHeight > contentHeight ? imgHeight - (imgHeight - contentHeight) : imgHeight
          pdf.addImage(image, 'PNG', xOffset, yOffset, imgWidth, correctHeight)
          count += 1
        }
      }

      const blob = dataURItoBlob(pdf.output('datauristring'))
      const fileUrl = window.URL.createObjectURL(blob)
      window.open(fileUrl, '_blank')
      setIsLodaingPdf(false)
    },
    [layout, cols]
  )

  const showModalDialog = useCallback(() => {
    let orientation = 'p'

    ModalForm(
      () => {
        onStartPdfExport(orientation)
        return true
      },
      <OrientationForm onChange={value => (orientation = value)} radioOptions={radioOptions} />,
      '25%'
    )
  }, [onStartPdfExport])

  return (
    <ST.ContentWrapper>
      <Modal
        title={intl.get('widgetsNames.chooseWidgets')}
        centered
        visible={widgetModalVisible}
        footer={null}
        onOk={() => setWidgetModalVisible(false)}
        onCancel={() => setWidgetModalVisible(false)}
      >
        <ST.StyledWidgetsInfo>
          {invisibleItems.length
            ? invisibleItems.map(el => getModalContent(el))
            : `${intl.get('widgetsNames.noWidgets')}`}
        </ST.StyledWidgetsInfo>
      </Modal>
      <ST.ButtonWrapper>
        <Button loading={isLoadingPdf} onClick={showModalDialog}>
          {intl.get('overviewPage.pdf.export')}
        </Button>
      </ST.ButtonWrapper>
      {children(invisibleItems, setInvisibleItemsCallback, setWidgetModalVisible)}
    </ST.ContentWrapper>
  )
}

PageWidgetWrapper.propTypes = {
  pageName: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  layout: PropTypes.arrayOf(PropTypes.object),
  cols: PropTypes.number.isRequired
}

PageWidgetWrapper.defaultProps = {
  layout: null
}

export default PageWidgetWrapper

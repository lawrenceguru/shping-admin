import React from 'react'
import PropTypes from 'prop-types'
import { WidgetInfoWrapper, WidgetInfoWrapperBlock, WidgetInnerWrapper } from './styles'
import MobilePreviewHeader from '../MobilePreviewHeader'

const MobilePreviewWidgetWrapper = ({ text, children, smallHeader, isInner }) => {
  return (
    <WidgetInfoWrapper>
      <MobilePreviewHeader text={text} />
      {isInner ? <WidgetInnerWrapper>{children}</WidgetInnerWrapper> : children}
      <WidgetInfoWrapperBlock smallHeader={smallHeader} />
    </WidgetInfoWrapper>
  )
}

MobilePreviewWidgetWrapper.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  smallHeader: PropTypes.bool,
  isInner: PropTypes.bool
}

MobilePreviewWidgetWrapper.defaultProps = {
  text: null,
  children: null,
  smallHeader: false,
  isInner: false
}

export default MobilePreviewWidgetWrapper

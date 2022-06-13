import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import MobilePreviewWidgetWrapper from '../../atoms/MobilePreviewWidgetWrapper'
import MobilePreviewLinkWidget from '../../atoms/MobilePreviewLinkWidget'
import MobilePreviewEmailWidget from '../../atoms/MobilePreviewEmailWidget'
import MobilePreviewPhoneWidget from '../../atoms/MobilePreviewPhoneWidget'
import MobilePreviewFollowFBWidget from '../../atoms/MobilePreviewFollowFBWidget'

const MobilePreviewWidgetsGroups = ({ items, i }) => {
  const isLink = useMemo(() => {
    return !!items[0].link
  }, [items])

  const renderContacts = useCallback(() => {
    return items.map((item, index) => {
      switch (Object.keys(item)[0]) {
        case 'email':
          // eslint-disable-next-line react/no-array-index-key
          return <MobilePreviewEmailWidget key={index} data={item && item.email && item.email.email} />
        case 'follow_fb':
          // eslint-disable-next-line react/no-array-index-key
          return <MobilePreviewFollowFBWidget key={index} data={item && item.follow_fb && item.follow_fb.follow_fb} />
        case 'phone':
          // eslint-disable-next-line react/no-array-index-key
          return <MobilePreviewPhoneWidget key={index} data={item && item.phone && item.phone.phone} />
        default: {
          return null
        }
      }
    })
  }, [items])

  return (
    <MobilePreviewWidgetWrapper
      text={isLink ? intl.get('mobilePreview.links').toUpperCase() : intl.get('mobilePreview.contacts').toUpperCase()}
      key={i}
    >
      {isLink ? items.map(el => <MobilePreviewLinkWidget link={el.link && el.link.link} />) : renderContacts()}
    </MobilePreviewWidgetWrapper>
  )
}

MobilePreviewWidgetsGroups.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  i: PropTypes.number
}

MobilePreviewWidgetsGroups.defaultProps = {
  items: null,
  i: undefined
}

export default MobilePreviewWidgetsGroups

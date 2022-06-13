import React from 'react'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { Button, Row, Col } from 'antd'
import { CopyOutlined, InfoCircleFilled } from '@ant-design/icons'
import buddiesLink from '../../../data/buddies/buddiesLink'

const BlueColor = styled('div')`
  color: #004085 !important;
  svg {
    width: 1.5em;
    height: 1.5em;
  }
`
const StyledButton = styled(Button)`
  min-width: auto;
  border: 0 !important;
  svg {
    width: 1.5em;
    height: 1.5em;
  }
`

const InviteBuddyLink = () => {
  const { result } = buddiesLink()
  // componentDidMount() {
  //   this.props.getInviteBuddyLink()
  // }
  const copyToClipboard = toCopy => {
    const textArea = document.createElement('textarea')
    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed'
    textArea.style.top = 0
    textArea.style.left = 0

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em'
    textArea.style.height = '2em'

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0

    // Clean up any borders.
    textArea.style.border = 'none'
    textArea.style.outline = 'none'
    textArea.style.boxShadow = 'none'

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent'

    textArea.value = toCopy

    document.body.appendChild(textArea)

    textArea.select()

    document.execCommand('copy')

    document.body.removeChild(textArea)

    toast.success(`Invite link has been copied to clipboard`)
  }
  return (
    <>
      {result && (
        <BlueColor>
          <Row gutter={[8, 24]}>
            <Col span={1} style={{ textAlign: 'center', marginTop: '5px' }}>
              <InfoCircleFilled />
            </Col>
            <Col span={23} style={{ fontWeight: '700' }}>
              {intl.get('buddiesTable.inviteBuddyLink.header')}
            </Col>
          </Row>
          <Row gutter={[8, 24]}>
            <Col span={23} offset={1}>
              {result?.link}
            </Col>
          </Row>
          <Row gutter={[8, 24]} style={{ marginBottom: '10px' }}>
            <Col span={2} offset={22} justify='end'>
              <StyledButton onClick={() => copyToClipboard(result?.link)}>
                <CopyOutlined />
              </StyledButton>
            </Col>
          </Row>
        </BlueColor>
      )}
    </>
  )
}

export default InviteBuddyLink

import React from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'
import intl from 'react-intl-universal'
import MobilePreview from '../MobilePreview'

const { info } = Modal

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const MobilePreviewModal = data =>
  info({
    icon: null,
    content: (
      <Wrapper>
        <MobilePreview data={data} />
      </Wrapper>
    ),
    okText: intl.get('common.back'),
    okType: 'danger',
    centered: true
  })

export default MobilePreviewModal

import React from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'
import intl from 'react-intl-universal'

const { info } = Modal

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: Roboto;
  color: rgba(0, 0, 0, 0.65);
  font-weight: 600;
`

const InfoForm = (content, title) =>
  info({
    icon: null,
    title,
    content: <Wrapper>{content}</Wrapper>,
    okText: intl.get('overviewPage.lang.ok'),
    okType: 'danger',
    centered: true
  })

export default InfoForm

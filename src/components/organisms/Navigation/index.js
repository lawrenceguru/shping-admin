/* eslint-disable no-shadow */
import React from 'react'
import styled from 'styled-components'
import LanguageSelector from '../../molecules/LanguageSelector'
import ParticipantSelector from '../../molecules/ParticipantsSelector'

import { Actions, StyledPageHeader, Wrapper } from './styles'

const StyledDivider = styled.span`
  border-left: 1px solid #f4f4f4;
  height: 40px;
  margin-top: 18px;
`

const Navigation = () => {
  return (
    <Wrapper>
      <StyledPageHeader title='Dashboard' />
      <Actions>
        <ParticipantSelector />
        <StyledDivider />
        <LanguageSelector />
      </Actions>
    </Wrapper>
  )
}

export default Navigation

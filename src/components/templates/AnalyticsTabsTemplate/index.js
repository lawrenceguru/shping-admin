import React, { useState } from 'react'
import { Icon, Typography } from 'antd'
import styled from 'styled-components'

const TabsHeader = styled.section`
  background-color: white;
  height: 96px;
  display: grid;
  gap: 32px;
  grid-template-columns: auto 144px 144px 144px 144px auto;
`

const TabItem = styled.div`
  span {
    color: #fd3842;
  }
  border-bottom: 1px solid transparent;
  box-sizing: border-box;
  cursor: pointer;
  align-self: center;
  display: grid;
  grid-template-columns: 64px auto;
  height: 100%;
  align-items: center;
  border-bottom: ${props => (props.isActive ? '2px solid #fd3842' : 'none')};
`

export const StyledIcon = styled(Icon)`
  margin-left: 8px;
  font-size: 1.5rem;
  color: ${props => (props.isActive ? '#fd3842' : '#d8d8d8')};
`

const MainPage = ({ children }) => {
  const [isActive, setActive] = useState('overview')

  return (
    <>
      <TabsHeader>
        <span />
        <TabItem isActive={isActive === 'overview'} onClick={() => setActive('overview')}>
          <StyledIcon type='appstore' theme='filled' isActive={isActive === 'overview'} />
          <Typography.Text strong>Overview</Typography.Text>
        </TabItem>
        <TabItem isActive={isActive === 'audience'} onClick={() => setActive('audience')}>
          <StyledIcon type='user' isActive={isActive === 'audience'} />
          <Typography.Text strong>Audience</Typography.Text>
        </TabItem>
        <TabItem isActive={isActive === 'geography'} onClick={() => setActive('geography')}>
          <StyledIcon type='global' isActive={isActive === 'geography'} />
          <Typography.Text strong>Geography</Typography.Text>
        </TabItem>
        <TabItem isActive={isActive === 'conversion'} onClick={() => setActive('conversion')}>
          <StyledIcon type='rise' isActive={isActive === 'conversion'} />
          <Typography.Text strong>Conversion</Typography.Text>
        </TabItem>
        <span />
      </TabsHeader>
      <div>{children}</div>
    </>
  )
}

export default MainPage

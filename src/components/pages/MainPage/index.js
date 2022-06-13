import React, { useState } from 'react'
import intl from 'react-intl-universal'
import { Icon, Typography } from 'antd'
import styled from 'styled-components'

const TabsHeader = styled.section`
  background-color: #fff;
  height: 96px;
  display: grid;
  gap: 32px;
  grid-template-columns: auto 144px 144px 144px 144px auto;
`

const TabItem = styled.div`
  span {
    color: #fd3842;
  }
  cursor: pointer;
  align-self: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  border-bottom: ${props => (props.isActive ? '2px solid #fd3842' : 'none')};
  & span {
    align-self: center;
  }
`

export const StyledIcon = styled(Icon)`
  margin-left: 8px;
  font-size: 1.5rem;
  color: ${props => (props.isActive ? '#fd3842' : '#d8d8d8')};
`

const MainPage = () => {
  const [isActive, setActive] = useState('overview')

  return (
    <>
      <TabsHeader>
        <span />
        <TabItem isActive={isActive === 'overview'} onClick={() => setActive('overview')}>
          <StyledIcon type='appstore' theme='filled' isActive={isActive === 'overview'} />
          <Typography.Text strong>{intl.get('navigation.overview')}</Typography.Text>
        </TabItem>
        <TabItem isActive={isActive === 'audience'} onClick={() => setActive('audience')}>
          <StyledIcon type='user' isActive={isActive === 'audience'} />
          <Typography.Text strong>{intl.get('navigation.audience')}</Typography.Text>
        </TabItem>
        <TabItem isActive={isActive === 'geography'} onClick={() => setActive('geography')}>
          <StyledIcon type='global' isActive={isActive === 'geography'} />
          <Typography.Text strong>{intl.get('navigation.geography')}</Typography.Text>
        </TabItem>
        <TabItem isActive={isActive === 'conversion'} onClick={() => setActive('conversion')}>
          <StyledIcon type='rise' isActive={isActive === 'conversion'} />
          <Typography.Text strong>{intl.get('navigation.conversion')}</Typography.Text>
        </TabItem>
        <span />
      </TabsHeader>
      <div>
        Scroll to load images.
        <div className='filler' />
      </div>
    </>
  )
}

export default MainPage

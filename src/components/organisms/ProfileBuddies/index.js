import React from 'react'
import styled from 'styled-components'

import BuddiesTable from './BuddiesTable'

import InviteBuddyLink from './InviteBuddyLink'

const StyledPanel = styled('div')`
  padding: 10px;
  background-color: white;
`
const ProfileBuddies = () => {
  return (
    <StyledPanel>
      <InviteBuddyLink key='InviteBuddyLink' />
      <BuddiesTable />
    </StyledPanel>
  )
}

export default ProfileBuddies

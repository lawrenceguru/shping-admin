import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Input } from 'antd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Wrapper, TableWrapper, ButtonsWrapper, ButtonWrapper } from './styles'
import { columns, roles } from './constants'
import TabPagesWrapper from '../../atoms/TabPagesWrapper'
import CustomTable from '../../molecules/Table'

const InviteUserTab = ({ inviteUser, identity, isLoading, myTeamGetMyTeam, history }) => {
  const [selected, setSelected] = useState(['Admin'])
  const [allUserInviteInfo, setAllUserInviteInfo] = useState({})
  const [isDisabled, setIsDisabled] = useState(true)

  const isSystemAdmin = identity.current_participant === 'urn:authenticateit:participant:1'
  const notSystemRoles = role => {
    return role.filter(el => el.role !== 'Moderator')
  }

  const handleInputChange = (key, value) => {
    // eslint-disable-next-line no-unused-expressions
    value === '' ? setIsDisabled(true) : setIsDisabled(false)
    setAllUserInviteInfo({
      ...allUserInviteInfo,
      [key]: { ...allUserInviteInfo[key], value }
    })
  }

  const handleRadioSelect = keys => {
    setSelected(keys)
    setAllUserInviteInfo({
      ...allUserInviteInfo,
      access_type: keys[0]
    })
  }

  const handleButtonClick = () => {
    if (allUserInviteInfo && !allUserInviteInfo.access_type) {
      const noRadioSelectAllUserInviteInfo = {
        ...allUserInviteInfo,
        access_type: 'Admin'
      }
      inviteUser(noRadioSelectAllUserInviteInfo)
    } else {
      inviteUser(allUserInviteInfo)
    }
  }

  const handleBackButtonClick = () => {
    history.push('/admin/settings/my-team')
    myTeamGetMyTeam()
  }

  return (
    <TabPagesWrapper>
      <ButtonWrapper>
        <Button type='danger' size='large' onClick={handleBackButtonClick}>
          {intl.get('myTeamPage.backToMyTeam')}
        </Button>
      </ButtonWrapper>
      <Wrapper>
        <Input
          size='default'
          placeholder={intl.get('myTeamPage.invite.plhId')}
          onChange={e => handleInputChange('id', e.target.value)}
        />
        <TableWrapper>
          <CustomTable
            rowSelection={{
              type: 'radio',
              selectedRowKeys: selected,
              onChange: keys => handleRadioSelect(keys)
            }}
            loading={isLoading}
            columns={columns}
            data={isSystemAdmin ? roles : notSystemRoles(roles)}
            pagination={false}
            rowKey='key'
          />
        </TableWrapper>
        <ButtonsWrapper>
          <Button type='danger' size='large' onClick={handleButtonClick} disabled={isDisabled}>
            {intl.get('myTeamPage.invite.inviteBtn')}
          </Button>
        </ButtonsWrapper>
      </Wrapper>
    </TabPagesWrapper>
  )
}

InviteUserTab.propTypes = {
  inviteUser: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  identity: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  myTeamGetMyTeam: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
}
InviteUserTab.defaultProps = {
  isLoading: false
}

export default withRouter(InviteUserTab)

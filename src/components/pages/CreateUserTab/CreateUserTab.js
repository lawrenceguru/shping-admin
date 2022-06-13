import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Input, Select } from 'antd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import * as ST from './styles'
import { columns, roles } from './utils'
import CustomTable from '../../molecules/Table'
import TabPagesWrapper from '../../atoms/TabPagesWrapper'
import CustomSelect from '../../atoms/CustomSelect'

const { Option } = Select
const CreateUserTab = ({ createUser, isLoading, identity, myTeamGetMyTeam, history, context, myTeamGetContext }) => {
  const [selected, setSelected] = useState(['Admin'])
  const [localContext, setLocalContext] = useState(null)
  const [allUserCreateInfo, setAllUserCreateInfo] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)
  const [selectedLocalContext, setSelectedLocalContext] = useState([])

  useEffect(() => {
    myTeamGetContext()
  }, [])

  useEffect(() => {
    setLocalContext(context.map(el => ({ value: el.id, label: el.id })))
  }, [context])

  const isSystemAdmin = identity.current_participant === 'urn:authenticateit:participant:1'
  const notSystemRoles = role => {
    return role.filter(el => el.role !== 'Moderator')
  }

  const handleRadioSelect = keys => {
    setSelected(keys)
    setAllUserCreateInfo({
      ...allUserCreateInfo,
      access_type: keys[0]
    })
  }

  const handleInputChange = (key, value) => {
    const copyAllUserCreateInfo = { ...allUserCreateInfo }
    if (value) {
      copyAllUserCreateInfo[key] = { ...copyAllUserCreateInfo[key], value }
    } else {
      delete copyAllUserCreateInfo[key]
    }
    // eslint-disable-next-line no-unused-expressions
    copyAllUserCreateInfo && Object.keys(copyAllUserCreateInfo).length < 4 ? setIsDisabled(true) : setIsDisabled(false)
    setAllUserCreateInfo(copyAllUserCreateInfo)
  }

  const handleButtonClick = () => {
    if (allUserCreateInfo && !allUserCreateInfo.access_type) {
      const noRadioSelectAllUserInviteInfo = {
        ...allUserCreateInfo,
        access_type: 'Admin',
        context: selectedLocalContext
      }
      createUser(noRadioSelectAllUserInviteInfo)
    } else {
      createUser({ ...allUserCreateInfo, context: selectedLocalContext })
    }
  }

  const handleBackButtonClick = () => {
    history.push('/admin/settings/my-team')
    myTeamGetMyTeam()
  }

  const handleContextListChange = values => {
    setSelectedLocalContext(values)
  }

  return (
    <TabPagesWrapper>
      <ST.Wrapper>
        <ST.ButtonWrapper>
          <Button type='danger' size='large' onClick={handleBackButtonClick}>
            {intl.get('myTeamPage.backToMyTeam')}
          </Button>
        </ST.ButtonWrapper>
        <ST.InputWrapper>
          <ST.StyledDiv>
            <Input
              size='default'
              placeholder={intl.get('myTeamPage.create.userName')}
              onChange={e => handleInputChange('nickname', e.target.value)}
            />
          </ST.StyledDiv>
          <ST.StyledDiv>
            <Input
              size='default'
              placeholder={intl.get('myTeamPage.create.firstName')}
              onChange={e => handleInputChange('first_name', e.target.value)}
            />
          </ST.StyledDiv>
          <ST.StyledDiv>
            <Input
              size='default'
              placeholder={intl.get('myTeamPage.create.lastName')}
              onChange={e => handleInputChange('last_name', e.target.value)}
            />
          </ST.StyledDiv>
          <ST.StyledDiv>
            <Input.Password
              size='default'
              placeholder={intl.get('myTeamPage.create.password')}
              onChange={e => handleInputChange('password', e.target.value)}
            />
          </ST.StyledDiv>
        </ST.InputWrapper>
        <ST.TableWrapper>
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
          {selected[0] === 'T&T Operator' && (
            <ST.SelectContextWrapper>
              <p>Context</p>
              <CustomSelect
                mode='multiple'
                handleValueChange={handleContextListChange}
                placeholder='Choose a context'
                value={selectedLocalContext}
              >
                {localContext &&
                  // eslint-disable-next-line react/destructuring-assignment
                  localContext.map((el, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Option key={i} value={el.value}>
                      {el.label}
                    </Option>
                  ))}
              </CustomSelect>
            </ST.SelectContextWrapper>
          )}
        </ST.TableWrapper>
        <ST.ButtonsWrapper>
          <Button type='danger' size='large' onClick={handleButtonClick} disabled={isDisabled}>
            {intl.get('myTeamPage.create.createBtn')}
          </Button>
        </ST.ButtonsWrapper>
      </ST.Wrapper>
    </TabPagesWrapper>
  )
}

CreateUserTab.propTypes = {
  createUser: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  identity: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  myTeamGetMyTeam: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  context: PropTypes.arrayOf(PropTypes.object),
  myTeamGetContext: PropTypes.func.isRequired
}
CreateUserTab.defaultProps = {
  isLoading: false,
  context: []
}

export default withRouter(CreateUserTab)

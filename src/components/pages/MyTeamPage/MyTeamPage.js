import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Button, Checkbox } from 'antd'
import intl from 'react-intl-universal'
import moment from 'moment'
import CustomButton from '../../molecules/Button'
import TabPagesWrapper from '../../atoms/TabPagesWrapper'
import CustomTable from '../../molecules/Table'
import IconButton from '../../molecules/IconButton'
import deleteModal from '../../molecules/DeleteModal'
import SortBy from '../../atoms/SortBy'
import { ButtonsWrapper, ModalFooterWrapper, CheckboxesWrapper, SortByWrapper } from './styles'
import SwitchOption from '../../atoms/SwitchOption'
import RadioGroup from '../../atoms/RadioGroup'
import ModalWithHeader from '../../atoms/ModalWithHeader'
import TeamsFiltersPanel from '../../organisms/TeamsFiltersPanel'

const RADIO_GROUP = [
  {
    label: 1,
    value: 1
  },
  {
    label: 2,
    value: 2
  },
  {
    label: 3,
    value: 3
  }
]
const currentLocale = localStorage.getItem('lang')
const MyTeamPage = ({
  myTeamGetMyTeam,
  isLoadingTeam,
  team,
  isNotificationChanging,
  myTeamPostNotificationOn,
  myTeamPostNotificationOff,
  currentParticipant,
  myTeamPostLevel,
  myTeamDeleteTeammate,
  isTeammateDeleting,
  isChangingParticipant,
  history,
  identity,
  myTeamSetContext,
  isChangingContext,
  myTeamGetContext,
  context
}) => {
  const [levels, setLevels] = useState(null)
  const [localTeam, setLocalTeam] = useState(null)
  const [localContext, setLocalContext] = useState([])
  const [userContext, setUserContext] = useState([])
  const [isShowModal, setIsShowModal] = useState(false)
  const [currId, setCurrId] = useState(null)

  useEffect(() => {
    if (!team || !team.length) {
      myTeamGetMyTeam()
    }
    myTeamGetContext()
  }, [])

  useEffect(() => {
    setLocalContext(context && context.map(el => el.id.charAt(0).toUpperCase() + el.id.substr(1)))
  }, [context])

  useEffect(() => {
    setLocalTeam(team)
  }, [team])

  const handleSwitchChange = (id, roles) => {
    if (roles.includes('notifications_recipient')) {
      myTeamPostNotificationOff({ participant: currentParticipant, id })
      return
    }

    myTeamPostNotificationOn({ participant: currentParticipant, id, role: [...roles, 'notifications_recipient'] })
  }

  const handleLevelChange = (level, id, index) => {
    myTeamPostLevel({ id, level })
    setLevels({ ...levels, [index]: level })
  }

  const handleDeleteTeammate = id => {
    myTeamDeleteTeammate({ id })
  }

  const handleContextButton = (id, currContext) => {
    setUserContext(currContext || [])
    setCurrId(id)
    setIsShowModal(!isShowModal)
  }

  const handleOk = () => {
    myTeamSetContext({ id: currId, context: userContext, access_type: 'T&T Operator' })
    setCurrId(null)
    setUserContext(null)
    setIsShowModal(false)
  }

  const handleCancel = () => {
    setCurrId(null)
    setUserContext(null)
    setIsShowModal(false)
  }

  const tableColumns = [
    {
      title: intl.get('myTeamPage.name'),
      dataIndex: 'last_name',
      key: 'last_name',
      render: (i, data) =>
        !data.first_name && !data.last_name
          ? intl.get('myTeamPage.noname')
          : `${data.first_name || ''} ${data.last_name || ''}`
    },
    {
      title: intl.get('myTeamPage.operationActivities'),
      dataIndex: 'roles',
      align: 'center',
      key: 'roles',
      render: (i, data) => (
        <SwitchOption
          checked={i.includes('notifications_recipient')}
          onChange={() => handleSwitchChange(data.id, data.roles)}
        />
      )
    },
    {
      title: intl.get('myTeamPage.trustedLevel'),
      dataIndex: 'trustedLevel',
      key: 'trustedLevel',
      align: 'center',
      render: (i, data, index) => (
        <RadioGroup
          onChange={e => handleLevelChange(e.target.value, data.id, index)}
          value={(levels && levels[index]) || data.trusted_level}
          group={RADIO_GROUP}
          isButtons
        />
      )
    },
    {
      title: intl.get('myTeamPage.accessType'),
      dataIndex: 'access_type',
      key: 'access_type',
      align: 'center'
    },
    {
      title: intl.get('myTeamPage.lastAccess'),
      dataIndex: 'ts',
      key: 'ts',
      align: 'center',
      render: i => {
        if (!i) {
          return ''
        }
        return moment(i)
          .locale(currentLocale || 'en')
          .format('DD MMMM YYYY')
      }
    },
    {
      title: '',
      dataIndex: 'context',
      key: 'context',
      align: 'center',
      render: (i, data) => {
        // eslint-disable-next-line react/destructuring-assignment
        if (!data || !data.access_type || data.access_type !== 'T&T Operator' || !context || !context.length) {
          return ''
        }
        return (
          <CustomButton
            handleClick={() => {
              handleContextButton(data.id, i)
            }}
            text='E'
          />
        )
      }
    },
    {
      title: '',
      dataIndex: 'deletion',
      key: 'deletion',
      align: 'center',
      render: (i, data) => {
        const name =
          !data.first_name && !data.last_name
            ? intl.get('myTeamPage.noname')
            : `${data.first_name || ''} ${data.last_name || ''}`
        return (
          <IconButton
            type='Delete'
            popText={intl.get('myTeamPage.deletePop')}
            actionFunction={() =>
              deleteModal(() => handleDeleteTeammate(data.id), intl.get('myTeamPage.deleteModalMessage', { name }))
            }
          />
        )
      }
    }
  ]
  const isSystemAdmin = identity.current_participant === 'urn:authenticateit:participant:1'
  const notSystemRoles = tableColumn => {
    return tableColumn.filter(el => el.dataIndex !== 'trustedLevel')
  }

  const handleSort = value => {
    const sortedTeam = [...team]
    if (value === 'no-sort') {
      setLocalTeam(sortedTeam)
      return
    }

    sortedTeam.sort((a, b) => {
      if (a.access_type < b.access_type) {
        return -1
      }
      if (a.access_type > b.access_type) {
        return 1
      }
      return 0
    })
    setLocalTeam(sortedTeam)
  }
  const filterContext = useCallback((searchArray, searchContext, equal) => {
    let result = []
    if (equal) {
      result = searchArray.filter(
        person =>
          person.context &&
          person.context.findIndex(contextName => contextName.toLowerCase().includes(searchContext.toLowerCase())) !==
            -1
      )
    } else {
      result = searchArray.filter(
        person =>
          !person.context ||
          person.context.findIndex(contextName => contextName.toLowerCase().includes(searchContext.toLowerCase())) ===
            -1
      )
    }
    return result
  }, [])

  const filterName = useCallback((searchArray, searchName, equal) => {
    let result = []
    if (equal) {
      result = searchArray.filter(person =>
        `${person.first_name.toLowerCase()} ${person.last_name.toLowerCase()}`.includes(searchName.toLowerCase())
      )
    } else {
      result = searchArray.filter(
        person =>
          !`${person.first_name.toLowerCase()} ${person.last_name.toLowerCase()}`.includes(searchName.toLowerCase())
      )
    }
    return result
  }, [])

  const handleFilterTeam = useCallback(
    filters => {
      if (!filters.name && !filters.context) {
        setLocalTeam(team)
        return
      }
      let findPersons = [...team]
      if (filters.name) {
        findPersons = filterName(team, filters.name.value, filters.name.option)
      }
      if (filters.context) {
        findPersons = filterContext(findPersons, filters.context.value, filters.context.option)
      }
      setLocalTeam(findPersons)
    },
    [filterContext, filterName, team]
  )

  return (
    <TabPagesWrapper>
      <ButtonsWrapper>
        <Button type='danger' size='large' onClick={() => history.push('/admin/settings/my-team/invite')}>
          Invite a user
        </Button>
        {identity && !!identity.modules.find(el => el === 'serialization') && (
          <Button type='danger' size='large' onClick={() => history.push('/admin/settings/my-team/create')}>
            Create a user
          </Button>
        )}
      </ButtonsWrapper>
      <TeamsFiltersPanel handleFilterTeam={handleFilterTeam} options={[]} context={localContext} />
      <SortByWrapper>
        <SortBy
          handleSort={handleSort}
          sortedOptions={[
            { value: 'no-sort', label: 'Do not sort' },
            { value: 'acc_type', label: intl.get('myTeamPage.accessType') }
          ]}
        />
      </SortByWrapper>
      <CustomTable
        columns={isSystemAdmin ? tableColumns : notSystemRoles(tableColumns)}
        data={localTeam}
        loading={
          isLoadingTeam || isNotificationChanging || isTeammateDeleting || isChangingParticipant || isChangingContext
        }
      />
      {isShowModal && (
        <ModalWithHeader
          title='Change a context'
          okText='Change'
          handleOk={handleOk}
          handleCancel={handleCancel}
          footer={
            <ModalFooterWrapper>
              <CustomButton
                color='rgb(179, 179, 179)'
                borderColor='rgb(217, 217, 217)'
                backgroundColor='#fff'
                handleClick={handleCancel}
                text={intl.get('cancel')}
              />
              <CustomButton handleClick={handleOk} text='Change' />
            </ModalFooterWrapper>
          }
          isBottomBorder
        >
          <CheckboxesWrapper>
            {localContext &&
              localContext.map((el, index) => (
                <Checkbox
                  /* eslint-disable-next-line react/no-array-index-key */
                  key={index}
                  value={el}
                  onChange={e => {
                    const { checked } = e.target
                    const selected = [...userContext]
                    if (checked && !selected.includes(el.toLowerCase())) {
                      selected.push(el.toLowerCase())
                    } else {
                      const currIndex = selected.indexOf(el.toLowerCase())
                      if (currIndex > -1) {
                        selected.splice(currIndex, 1)
                      }
                    }
                    setUserContext(selected)
                  }}
                  checked={userContext && userContext.includes(el.toLowerCase())}
                >
                  {el}
                </Checkbox>
              ))}
          </CheckboxesWrapper>
        </ModalWithHeader>
      )}
    </TabPagesWrapper>
  )
}

MyTeamPage.propTypes = {
  myTeamGetMyTeam: PropTypes.func.isRequired,
  isLoadingTeam: PropTypes.bool,
  team: PropTypes.arrayOf(PropTypes.object),
  isNotificationChanging: PropTypes.bool,
  myTeamPostNotificationOn: PropTypes.func.isRequired,
  myTeamPostNotificationOff: PropTypes.func.isRequired,
  currentParticipant: PropTypes.string.isRequired,
  myTeamPostLevel: PropTypes.func.isRequired,
  myTeamDeleteTeammate: PropTypes.func.isRequired,
  isTeammateDeleting: PropTypes.bool,
  isChangingParticipant: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  identity: PropTypes.object.isRequired,
  myTeamSetContext: PropTypes.func.isRequired,
  isChangingContext: PropTypes.bool,
  myTeamGetContext: PropTypes.func.isRequired,
  context: PropTypes.arrayOf(PropTypes.object)
}

MyTeamPage.defaultProps = {
  isLoadingTeam: false,
  team: [],
  isNotificationChanging: false,
  isTeammateDeleting: false,
  isChangingParticipant: false,
  context: [],
  isChangingContext: false
}

export default withRouter(MyTeamPage)

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const { Option } = Select

const UsersSelect = ({ value, mode, size, onChange, myTeamGetMyTeam, placeholder, team, isLoadingTeam }) => {
  useEffect(() => {
    if ((!team || !team.length) && !isLoadingTeam) {
      myTeamGetMyTeam()
    }
  }, [])

  return (
    <Select
      showSearch
      mode={mode}
      size={size}
      value={value || (mode === 'multiple' ? [] : undefined)}
      loading={isLoadingTeam}
      onChange={onChange}
      placeholder={placeholder}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      getPopupContainer={trigger => trigger.parentNode}
    >
      {team && team.length && !isLoadingTeam
        ? team.map(user => (
            <Option style={{ fontSize: 16 }} key={user.id} value={user.id}>
              {user.first_name || user.last_name ? `${user.first_name || null} ${user.last_name || null}` : user.id}
            </Option>
          ))
        : null}
    </Select>
  )
}

UsersSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  myTeamGetMyTeam: PropTypes.func.isRequired,
  team: PropTypes.arrayOf(PropTypes.object),
  isLoadingTeam: PropTypes.bool,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  mode: PropTypes.string
}

UsersSelect.defaultProps = {
  value: [],
  team: null,
  isLoadingTeam: false,
  size: 'large',
  placeholder: null,
  mode: 'multiple'
}

export default UsersSelect

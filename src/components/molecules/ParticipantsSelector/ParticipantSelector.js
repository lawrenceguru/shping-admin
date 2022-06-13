import React, { useCallback, useEffect, useState } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Loader from '../../templates/Loader'
import { StDiv, Loading, StyledLangMenu, StyledLangText } from './styles'

let interval

const ParticipantSelector = ({
  participants,
  currentParticipant,
  identityChangeParticipant,
  history,
  isChangingParticipant,
  isHaveSystem
}) => {
  const [localCurrentParticipant, setLocalCurrentParticipant] = useState(null)
  useEffect(() => {
    interval = setInterval(() => {
      const session = JSON.parse(localStorage.getItem('session'))

      if (session && session.current_participant) {
        setLocalCurrentParticipant(session.current_participant)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const onSelectParticipant = useCallback(
    value => {
      if (value === 'add_brand') {
        history.push('/admin/customers/add-brand')
      } else {
        identityChangeParticipant(value)
        history.push(isHaveSystem ? '/admin/analytics/roi' : '/admin/products')
      }
    },
    [isHaveSystem]
  )
  const { Option } = Select

  return (
    <StDiv>
      <Loading>{isChangingParticipant ? <Loader /> : null}</Loading>
      <Select
        defaultValue={currentParticipant}
        value={localCurrentParticipant || currentParticipant}
        style={{ width: 300, margin: 20, marginLeft: 0 }}
        getPopupContainer={trigger => trigger.parentNode}
        onChange={onSelectParticipant}
      >
        <Option style={{ width: 300, padding: '15px 15px' }} value='add_brand'>
          <StyledLangMenu>
            <img src='/add-brand-icon.png' alt='' style={{ width: 20, height: 20, borderRadius: 4, marginRight: 15 }} />
            <StyledLangText>Add Brand</StyledLangText>
          </StyledLangMenu>
        </Option>
        {participants &&
          participants.map(item => (
            <Option
              key={item.id}
              value={item.id}
              style={{
                borderBottom: '1px solid #EFEFF4',
                display: `${item.id === currentParticipant ? 'none' : ''}`
              }}
            >
              <StyledLangMenu>
                <div>
                  <img
                    src={item.logo ? item.logo : '/no-image-product.jpg'}
                    style={{ width: 30, height: 30, borderRadius: 4 }}
                    alt='logo'
                  />
                </div>
                <StyledLangText>{item.name}</StyledLangText>
              </StyledLangMenu>
            </Option>
          ))}
      </Select>
    </StDiv>
  )
}

ParticipantSelector.propTypes = {
  currentParticipant: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.object),
  isChangingParticipant: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  identityChangeParticipant: PropTypes.func.isRequired,
  isHaveSystem: PropTypes.bool.isRequired
}

ParticipantSelector.defaultProps = {
  currentParticipant: '',
  isChangingParticipant: false,
  participants: []
}

export default withRouter(ParticipantSelector)

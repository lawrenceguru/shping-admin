import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import * as ST from './styles'
import CreateForm from '../../organisms/TariffForm'
import { create } from '../../organisms/TariffForm/actions'

const TariffCreatePage = ({ match }) => {
  const id = match?.params?.id
  const ticket = useSelector(({ identity }) => identity.ticket)
  const history = useHistory()
  const onFinish = data => {
    create(data, id, ticket, history)
  }
  return (
    <ST.Wrapper>
      <CreateForm onFinish={onFinish} id={id} />
    </ST.Wrapper>
  )
}
TariffCreatePage.propTypes = {
  match: PropTypes.shape({ id: PropTypes.string }).isRequired
}

export default TariffCreatePage

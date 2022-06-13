import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import * as ST from './styles'
import CreateForm from '../../organisms/TariffForm'
import Loader from '../../templates/Loader'
import useTariff from '../../../data/billing/tariff'
import { update } from '../../organisms/TariffForm/actions'

const TariffEditPage = ({ match }) => {
  const { params } = match
  const { tariff } = useTariff(params.id, params.tariff)
  const ticket = useSelector(({ identity }) => identity.ticket)
  const onFinish = data => {
    update(data, params.id, params.tariff, ticket)
  }

  return (
    <ST.Wrapper>
      {typeof tariff === 'object' && !Array.isArray(tariff) ? (
        <CreateForm tariff={tariff} onFinish={onFinish} id={params.id} update />
      ) : (
        <Loader />
      )}
    </ST.Wrapper>
  )
}

TariffEditPage.propTypes = {
  match: PropTypes.shape({ id: PropTypes.string, tariff: PropTypes.string }).isRequired
}

export default TariffEditPage

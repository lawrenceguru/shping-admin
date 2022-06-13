import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import CustomerEditor from '../../organisms/CustomerEditor'
import * as ST from './styles'
import ConstrainsForm from '../../organisms/ConstrainsForm'
import TariffsList from '../../organisms/TariffsList'
import BrandsList from '../../organisms/BrandsList'
import PortfoliosList from '../../organisms/PortfoliosList'

const CustomerInfo = ({ match, customerList }) => {
  const id = useMemo(() => {
    return match && match.params && match.params.id
  }, [match])

  const isProduct360 = useMemo(() => {
    const customer =
      customerList &&
      customerList.find(
        customerL =>
          customerL.id === id && customerL.participant_type && customerL.participant_type.includes('product360')
      )
    return !!customer
  }, [customerList])

  return (
    <ST.Wrapper>
      <CustomerEditor id={id} />
      <TariffsList id={id} />
      {isProduct360 && <ConstrainsForm id={id} />}
      <BrandsList id={id} />
      <PortfoliosList id={id} />
    </ST.Wrapper>
  )
}

CustomerInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  customerList: PropTypes.arrayOf(PropTypes.object)
}

CustomerInfo.defaultProps = {
  customerList: null
}

export default CustomerInfo

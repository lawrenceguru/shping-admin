import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import * as ST from './styles'
import CreateForm from '../../organisms/ShippingListAdForm'
import { create } from '../../organisms/ShippingListAdForm/actions'

const ShoppingListAdCreatePage = () => {
  const ticket = useSelector(({ identity }) => identity.ticket)
  const history = useHistory()
  const onFinish = (data, audience) => {
    create(data, audience, ticket, history)
  }
  return (
    <ST.Wrapper>
      <CreateForm onFinish={onFinish} />
    </ST.Wrapper>
  )
}

export default ShoppingListAdCreatePage

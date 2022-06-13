import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SHOPPINGLISTS_API } from 'constants/url'
import * as ST from './styles'
import CreateForm from '../../organisms/ShippingListAdForm'
import Loader from '../../templates/Loader'
import useAds from '../../../data/shoppinglists/advertisement'
import { update } from '../../organisms/ShippingListAdForm/actions'

const ShoppingListAdEditPage = ({ match }) => {
  const { params } = match
  const { ads, mutate } = useAds(0, 1, params.id)
  // eslint-disable-next-line no-underscore-dangle
  const ad = ads && ads.find(item => item._id === params.id)
  const ticket = useSelector(({ identity }) => identity.ticket)
  const onFinish = (data, audience) => {
    update(data, audience, ticket, mutate)
  }
  useEffect(() => {
    mutate(`${SHOPPINGLISTS_API}/advertisement?offset=0&limit=1&id=${params.id}`)
  }, [])
  return <ST.Wrapper>{ad ? <CreateForm ad={ad} onFinish={onFinish} /> : <Loader />}</ST.Wrapper>
}

export default ShoppingListAdEditPage

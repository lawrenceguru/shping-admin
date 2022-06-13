import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import * as ST from './styles'
import CreateForm from '../../organisms/ReviewTemplateForm'
import { create } from '../../organisms/ReviewTemplateForm/actions'

const ReviewTemplateCreatePage = () => {
  const ticket = useSelector(({ identity }) => identity.ticket)
  const history = useHistory()
  const onFinish = (name, status, steps) => {
    create({ name, status, steps }, ticket, history)
  }
  return (
    <ST.Wrapper>
      <CreateForm onFinish={onFinish} />
    </ST.Wrapper>
  )
}

export default ReviewTemplateCreatePage

import React from 'react'
import { useSelector } from 'react-redux'
import * as ST from './styles'
import CreateForm from '../../organisms/ReviewTemplateForm'
import Loader from '../../templates/Loader'
import useTemplates from '../../../data/review/templates'
import { update } from '../../organisms/ReviewTemplateForm/actions'

const ReviewTemplateEditPage = () => {
  const id = window.location.pathname.substr(25)
  const { reviewTemplates, mutate } = useTemplates()
  const template = reviewTemplates && reviewTemplates.find(item => item.id === id)
  const ticket = useSelector(({ identity }) => identity.ticket)
  const onFinish = (name, status, steps) => {
    update({ name, status, steps }, ticket, template, mutate)
  }
  return <ST.Wrapper>{template ? <CreateForm template={template} onFinish={onFinish} /> : <Loader />}</ST.Wrapper>
}

export default ReviewTemplateEditPage

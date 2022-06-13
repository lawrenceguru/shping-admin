import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import intl from 'react-intl-universal'
import { useSWRConfig } from 'swr'

import * as ST from './styles'
import IconButton from '../../molecules/IconButton'
import deleteModal from '../../molecules/DeleteModal'
import { remove } from '../ReviewTemplateForm/actions'

const ReviewTemplateCard = ({ template, setDeleting }) => {
  const { active, created, owner } = template
  const participants = useSelector(({ identity }) => identity.participants)
  const ownerInformation = participants && participants.find(({ id }) => id === owner)
  const history = useHistory()
  const editForm = item => () => {
    history.push(`/admin/reviews/templates/${item.id}`)
  }
  const ticket = useSelector(({ identity }) => identity.ticket)
  const { mutate } = useSWRConfig()
  const handleDeleteTemplate = () => {
    setDeleting(false)
    remove(template, ticket, mutate)
  }
  const showConfirm = item => {
    deleteModal(() => handleDeleteTemplate(), `Are you sure delete ${item.name}`)
  }

  return (
    <ST.CardWrapper onClick={editForm(template)}>
      <ST.CardHeader>{template.name}</ST.CardHeader>
      <ST.CardBody>
        <ST.DeleteIcon>
          <IconButton
            type='DeleteTrash'
            actionFunction={e => {
              e.stopPropagation()
              e.preventDefault()
              showConfirm(template)
            }}
            popText={intl.get('reviews.deleteTemplate')}
          />
        </ST.DeleteIcon>
        <ST.Description>
          <ST.StrongLabel>{intl.get('reviews.statusLabel')}:</ST.StrongLabel>
          {intl.get(`common.${active ? 'active' : 'inactive'}`)}
        </ST.Description>
        <ST.Description>
          <ST.StrongLabel>{intl.get('reviews.dateCreatedLabel')}:</ST.StrongLabel>
          {moment
            .utc(created)
            .local()
            .format('L')}
        </ST.Description>
        <ST.Description>
          <ST.StrongLabel>{intl.get('reviews.ownerLabel')}:</ST.StrongLabel>
          {ownerInformation.name}
        </ST.Description>
      </ST.CardBody>
    </ST.CardWrapper>
  )
}

export default ReviewTemplateCard

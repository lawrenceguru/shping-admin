import React, { useCallback, useMemo, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
import { isNil } from 'lodash'
import { toast } from 'react-toastify'
import IconButton from '../IconButton'
import CardProductImage from '../../atoms/CardProductImage'
import * as ST from './styles'
import SwitchOption from '../../atoms/SwitchOption'
import LoadingSpinner from '../../atoms/LoadingSpinner'
import { convertFromUint256 } from '../../../utils/helpers/mathOperations'

const Card = ({
  items,
  showConfirm,
  isDeleteIconExist,
  redirectOnClick,
  isAdditionalFields,
  currentParticipant,
  depositCoins,
  todoSetStatusTodoDelivery
}) => {
  const [status, setStatusChanged] = useState({})
  const [downloads, setDownloads] = useState({})

  const isSystemAdmin = useMemo(() => {
    return currentParticipant === 'urn:authenticateit:participant:1'
  }, [currentParticipant])

  const reformattedCoint = useCallback(coins => {
    return `${Math.ceil(convertFromUint256(coins))} SHPING`
  }, [])

  const isCanBeActivatedByAccount = budget => {
    if (budget) {
      const totalBudget = convertFromUint256(budget)
      return totalBudget < convertFromUint256(depositCoins)
    }
    return true
  }

  const isCanBeActivatedByCard = ({ budget, cardBudget }) => {
    if (budget) {
      const deliveryCoins = convertFromUint256(budget)
      const cardCoins = convertFromUint256(cardBudget)
      return deliveryCoins > convertFromUint256(cardCoins)
    }
    return true
  }

  const handleChangeDeliveryStatus = useCallback(
    // eslint-disable-next-line consistent-return
    ({ value, id, budget = 0, cardBudget = 0 }) => {
      if (value && !isSystemAdmin && !isCanBeActivatedByAccount(budget)) {
        toast.error(intl.get('todo.delivery.notEnoughCoins'))
        return null
      }

      if (value && !isCanBeActivatedByCard({ budget, cardBudget })) {
        toast.error(intl.get('todo.delivery.incorrectCoins'))
        return null
      }

      todoSetStatusTodoDelivery({ id, status: value ? 'active' : 'inactive' })
      setDownloads({ ...downloads, [id]: true })
      setTimeout(() => {
        setStatusChanged({
          ...status,
          [id]: value ? intl.get('todo.delivery.pendingActivation') : intl.get('todo.delivery.pendingDeactivation')
        })
        setDownloads({ ...downloads, [id]: false })
        if (value) {
          toast.success(intl.get('todo.delivery.activating'))
        } else {
          toast.success(intl.get('todo.delivery.deactivating'))
        }
      }, 3000)
    },
    [todoSetStatusTodoDelivery]
  )

  const renderIntervals = (firstValue, secondValue) => {
    let fromValue = '∞'
    let toValue = '∞'
    if (firstValue) {
      fromValue = moment(firstValue).format(moment.localeData().longDateFormat('L'))
    }
    if (secondValue) {
      toValue = moment(secondValue).format(moment.localeData().longDateFormat('L'))
    }
    return `${fromValue} - ${toValue}`
  }

  return (
    <ST.Wrapper>
      {items.map(item => (
        <LoadingSpinner key={item.id} isLoading={downloads[item.id]}>
          <ST.ProductInfoWrapper key={item.id} onClick={() => redirectOnClick(item.id)}>
            <ST.StyledProductIcon>
              <CardProductImage imageSrc={item.image_src || item.icon} />
            </ST.StyledProductIcon>
            <ST.StyledProductMainInfo isAdditionalFields={isAdditionalFields}>
              <ST.StyledMainProductText>{item.name}</ST.StyledMainProductText>
              <SwitchOption
                text={status[item.id] || intl.get(`todo.delivery.${item.status}`)}
                textMarginLeft='0px'
                justifyContent='flex-start'
                checked={item.status === 'active' || item.status === 'Pending activation'}
                onChange={(value, e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleChangeDeliveryStatus({
                    value,
                    id: item.id,
                    budget: item.budget,
                    cardBudget: item.card_result_coins
                  })
                }}
              />
              <span>Date: {renderIntervals(item.start_date, item.end_date)}</span>
              {item.budget && <span>Budget: {reformattedCoint(item.budget)} </span>}
            </ST.StyledProductMainInfo>
            <ST.IndexFieldsInfo>
              <ST.StyledMainProductText>Todo card: {item.card && item.card.name}</ST.StyledMainProductText>
              <span>Auto approve: {item.card && item.card.auto_approve ? 'Yes' : 'No'}</span>
              {item.card && item.card.result && !isNil(item.card.result.coins) && (
                <span>
                  Coins{' '}
                  {item.card && item.card.result && item.card.result.coins && reformattedCoint(item.card.result.coins)}
                </span>
              )}
              <span>Total submissions: {item.submissions_made || 0}</span>
            </ST.IndexFieldsInfo>
            {isDeleteIconExist && (
              <ST.DeleteIcon>
                <IconButton
                  type='DeleteTrash'
                  actionFunction={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    showConfirm(item)
                  }}
                  popText={intl.get('todo.delivery.delete')}
                />
              </ST.DeleteIcon>
            )}
          </ST.ProductInfoWrapper>
        </LoadingSpinner>
      ))}
    </ST.Wrapper>
  )
}

Card.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  showConfirm: PropTypes.func.isRequired,
  isDeleteIconExist: PropTypes.bool,
  redirectOnClick: PropTypes.func,
  isAdditionalFields: PropTypes.bool,
  todoSetStatusTodoDelivery: PropTypes.func.isRequired,
  currentParticipant: PropTypes.string,
  depositCoins: PropTypes.string
}

Card.defaultProps = {
  isDeleteIconExist: false,
  redirectOnClick: null,
  isAdditionalFields: false,
  currentParticipant: null,
  depositCoins: '0'
}

export default withRouter(Card)

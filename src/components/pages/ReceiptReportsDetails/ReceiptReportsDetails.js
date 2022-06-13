import React, { useMemo, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Select, Form } from 'antd'
import { createRequestParamsForLocationChange } from '../../../utils/storeCards'
import * as ST from './styles'
import Loader from '../../templates/Loader'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'
import StoreCard from '../../molecules/StoreCard'
import ModalForm from '../../atoms/ModalForm'

const { Option } = Select

const ReceiptReportsDetails = ({
  match,
  isLoadingReceiptReportDetails,
  receiptReportDetails,
  storeCardsGetReceiptReportDetails,
  storeCardsSetRecepitLocation,
  isLocationChanging
}) => {
  const userId = useMemo(() => {
    return (match && match.params && match.params.user) || null
  }, [match])

  const receiptId = useMemo(() => {
    return (match && match.params && match.params.receipt) || null
  }, [match])

  useEffect(() => {
    if (userId && receiptId) {
      storeCardsGetReceiptReportDetails({ userId, receiptId })
    }
  }, [userId, receiptId])

  const handleOnChangeLocation = useCallback(() => {
    let store =
      receiptReportDetails &&
      receiptReportDetails.currentReceipt &&
      receiptReportDetails.currentReceipt.store_id &&
      `urn:authenticateit:location_point:${receiptReportDetails.currentReceipt.store_id}`

    ModalForm(
      () => {
        const selectedStoreItem = receiptReportDetails.currentReceipt.nearestStores.find(item => item.value === store)
        const request = createRequestParamsForLocationChange(
          selectedStoreItem.value,
          selectedStoreItem.label,
          receiptId,
          userId,
          receiptReportDetails.currentReceipt.location_name
        )
        storeCardsSetRecepitLocation(request)
        return true
      },
      <>
        <ST.ModalHeader>Change Location</ST.ModalHeader>
        <Form.Item label='Enter the store below where products were purchased from'>
          <Select
            showSearch
            onChange={value => (store = value)}
            defaultValue={
              receiptReportDetails &&
              receiptReportDetails.currentReceipt &&
              receiptReportDetails.currentReceipt.store_id &&
              `urn:authenticateit:location_point:${receiptReportDetails.currentReceipt.store_id}`
            }
            size='large'
            style={{ width: '100%' }}
            getPopupContainer={trigger => trigger.parentNode}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            placeholder='Location'
          >
            {receiptReportDetails &&
              receiptReportDetails.currentReceipt &&
              receiptReportDetails.currentReceipt.nearestStores &&
              receiptReportDetails.currentReceipt.nearestStores.length !== 0 &&
              receiptReportDetails.currentReceipt.nearestStores.map(nearStore => (
                <Option key={nearStore.value} value={nearStore.value}>
                  {nearStore.label}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </>,
      '30%'
    )
  }, [receiptReportDetails, receiptId, userId])

  return (
    <ST.Wrapper>
      {isLoadingReceiptReportDetails || isLocationChanging ? (
        <Loader />
      ) : (
        <>
          <ST.Header>Receipt details</ST.Header>
          <ST.InfoWrapper>
            <ST.SubHeader>
              <span>{`User id: ${userId}`}</span>
            </ST.SubHeader>
            <ST.SubHeader>
              <span>{`Receipt id: ${receiptId}`}</span>
            </ST.SubHeader>
            {receiptReportDetails && receiptReportDetails.currentReceipt ? (
              <>
                <StoreCard
                  handleOnChangeLocation={handleOnChangeLocation}
                  isReceipt
                  card={receiptReportDetails.currentReceipt}
                  isDefault
                />
                {receiptReportDetails &&
                  receiptReportDetails.otherReceipts &&
                  receiptReportDetails.otherReceipts.length !== 0 &&
                  receiptReportDetails.otherReceipts.map(item => <StoreCard key={item.id} card={item} />)}
              </>
            ) : (
              <ST.NoDataPlaceholderWrapper>
                <NoDataPlaceholder />
              </ST.NoDataPlaceholderWrapper>
            )}
          </ST.InfoWrapper>
        </>
      )}
    </ST.Wrapper>
  )
}

ReceiptReportsDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  isLoadingReceiptReportDetails: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  receiptReportDetails: PropTypes.object,
  storeCardsGetReceiptReportDetails: PropTypes.func.isRequired,
  storeCardsSetRecepitLocation: PropTypes.func.isRequired,
  isLocationChanging: PropTypes.bool
}

ReceiptReportsDetails.defaultProps = {
  isLoadingReceiptReportDetails: false,
  receiptReportDetails: null,
  isLocationChanging: false
}

export default ReceiptReportsDetails

import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import ModalForm from './ModalForm'
import IconButton from '../IconButton'
import deleteModal from '../DeleteModal'
import CustomPagination from '../../atoms/CustomPagination'
import * as ST from './styles'
import { copyToClipboard } from '../../../utils/copyToClipBoard'
import NoContent from '../../atoms/NoContent'

const ClickToScan = ({
  gtinInfo,
  register,
  setValue,
  lists,
  getCodeLink,
  createCodeLink,
  removeCodeLink,
  totalCounts,
  limit,
  offset,
  values,
  reset
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [clickToScanFormValue, setClickToScanFormValue] = useState(null)
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1)
  const lastPage = useMemo(() => Math.ceil(totalCounts / limit), [totalCounts, limit])

  useEffect(() => {
    const date = clickToScanFormValue && clickToScanFormValue.date
    const hour = clickToScanFormValue && clickToScanFormValue.hour
    const minute = clickToScanFormValue && clickToScanFormValue.minute
    const median = clickToScanFormValue && clickToScanFormValue.median
    const currDate = { date, hour, minute, median, offset, limit }

    if (currDate && gtinInfo.id) {
      const gtinCode = gtinInfo.id
      createCodeLink({ gtinCode, currDate })
    }

    if (gtinInfo.id) {
      getCodeLink({ gtinCode: gtinInfo.id, offset, limit })
    }
  }, [clickToScanFormValue, gtinInfo])

  useEffect(() => {
    const gtinCode = gtinInfo.id
    const nextPage = (currentPaginationPage - 1) * limit

    getCodeLink({ offset: nextPage, gtinCode, limit })
  }, [currentPaginationPage])

  const removeCaptureCodeLink = id => {
    const gtinCode = gtinInfo.id

    removeCodeLink({ id, gtinCode, offset, limit })
  }

  return (
    <ST.ClickToScanWrapper>
      <ST.Header>
        <div>Expiration Datetime</div>
        <div>Action</div>
      </ST.Header>
      {lists.length ? (
        lists.map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i}>
            <ST.ContentWrapper>
              <div>{item.expiry_datetime}</div>
              <ST.IconWrapper>
                <IconButton
                  type='Copy'
                  styleParam={{ fontSize: 19, color: '#354052' }}
                  actionFunction={() => copyToClipboard(item.link)}
                />
                <IconButton
                  type='Delete'
                  styleParam={{ fontSize: 19, marginLeft: 10, color: '#354052' }}
                  actionFunction={() =>
                    deleteModal(() => removeCaptureCodeLink(item.id), 'Are you sure to remove this link?')
                  }
                />
              </ST.IconWrapper>
            </ST.ContentWrapper>
          </div>
        ))
      ) : (
        <NoContent text='No any records found.' subText='No Result' iconType='PlusCircle' />
      )}
      {totalCounts > 5 && (
        <ST.PaginationWrapper>
          <CustomPagination
            currentPaginationPage={currentPaginationPage}
            paginationSize={limit}
            handlePagination={page => {
              setCurrentPaginationPage(page)
            }}
            count={totalCounts}
            lastPage={lastPage}
            size='small'
          />
        </ST.PaginationWrapper>
      )}
      <ST.ButtonWrapper>
        <IconButton
          type='InfoCircle'
          styleParam={{ fontSize: 40, color: '#ef3d46e0', marginTop: '20px' }}
          actionFunction={() => setModalVisible(true)}
        />
      </ST.ButtonWrapper>
      <ModalForm
        values={values}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setClickToScanFormValue={setClickToScanFormValue}
        register={register}
        setValue={setValue}
        reset={reset}
      />
    </ST.ClickToScanWrapper>
  )
}

ClickToScan.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  gtinInfo: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  lists: PropTypes.array,
  createCodeLink: PropTypes.func,
  removeCodeLink: PropTypes.func,
  getCodeLink: PropTypes.func,
  totalCounts: PropTypes.number,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
}

ClickToScan.defaultProps = {
  gtinInfo: {},
  lists: [],
  createCodeLink: () => {},
  removeCodeLink: () => {},
  getCodeLink: () => {},
  totalCounts: 0,
  values: {}
}

export default ClickToScan

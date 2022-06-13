import React, { useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Button from '../../atoms/Button'
import { slGtinColumns, ssccColumns } from './consts'
import { Wrapper, ModalBtnWrapper } from './styles'
import ModalWithHeader from '../../atoms/ModalWithHeader'
import SsccTaskTable from '../../organisms/SsccTaskTable'
import SgtinLgtinTaskTable from '../../organisms/SgtinLgtinTaskTable'

const SerializationTasksTab = ({ history }) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <Wrapper>
      <SgtinLgtinTaskTable columns={slGtinColumns} setIsVisible={setIsVisible} />
      <SsccTaskTable columns={ssccColumns} />
      {isVisible && (
        <ModalWithHeader
          title={intl.get('serializationTasks.modal.title')}
          footer={[null, <Button onClick={() => setIsVisible(false)}>{intl.get('cancel')}</Button>]}
          isBottomBorder
        >
          <ModalBtnWrapper>
            <Button
              type='danger'
              size='large'
              onClick={() => {
                history.push('/admin/track-and-trace/serialization-tasks/steps')
                setIsVisible(false)
              }}
            >
              {intl.get('serializationTasks.modal.slgtin')}
            </Button>
            <Button
              type='danger'
              size='large'
              onClick={() => {
                history.push('/admin/track-and-trace/serialization-tasks/sscc-steps')
                setIsVisible(false)
              }}
            >
              {intl.get('serializationTasks.modal.sscc')}
            </Button>
          </ModalBtnWrapper>
        </ModalWithHeader>
      )}
    </Wrapper>
  )
}

SerializationTasksTab.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
}

export default withRouter(SerializationTasksTab)

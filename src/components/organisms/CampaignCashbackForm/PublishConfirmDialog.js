import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import intl from 'react-intl-universal'
import * as ST from './styles'
import useDisableButton from '../../../hooks/useDisableButton'

const PublishConfirmDialog = ({ visible, setVisible, published }) => {
  const handleCancel = () => {
    setVisible(false)
  }
  const [disabledSave, setDisabledSave] = useDisableButton(false)
  const handleOk = () => {
    setDisabledSave(true)
    published()
  }
  return (
    <ST.ModalWrapper
      visible={visible}
      onCancel={handleCancel}
      closable={false}
      footer={[
        <Button key='back' onClick={handleCancel}>
          {intl.get('campaigns.cashbacks.publishConfirm.cancel')}
        </Button>,
        <Button key='submit' onClick={handleOk} type='primary' disabled={disabledSave}>
          {intl.get('campaigns.cashbacks.publishConfirm.confirm')}
        </Button>
      ]}
    >
      <p>{intl.get('campaigns.cashbacks.publishConfirm.description')}</p>
    </ST.ModalWrapper>
  )
}

PublishConfirmDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  published: PropTypes.func.isRequired
}

export default PublishConfirmDialog

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
        <Button key='submit' onClick={handleOk} type='primary' disabled={disabledSave}>
          {intl.get('campaigns.cashbacks.publishConfirm.confirm')}
        </Button>,
        <Button key='back' onClick={handleCancel} style={{ backgroundColor: '#797979', color: 'white' }}>
          {intl.get('campaigns.cashbacks.publishConfirm.cancel')}
        </Button>
      ]}
    >
      <div style={{ textAlign: 'center', padding: '10px 0 20px 0' }}>
        <img alt='' src='/notificationIcon.svg' />
      </div>
      <p>{intl.get('campaigns.cashbacks.publishConfirm.descriptionBoost')}</p>
    </ST.ModalWrapper>
  )
}

PublishConfirmDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  published: PropTypes.func.isRequired
}

export default PublishConfirmDialog

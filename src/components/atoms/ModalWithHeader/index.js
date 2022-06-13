import React from 'react'
import PropTypes from 'prop-types'
import { ModalWrapper } from './styles'

const ModalWithHeader = ({
  title,
  okText,
  handleOk,
  handleCancel,
  bodyStyle,
  children,
  width,
  footer,
  isBottomBorder
}) => {
  return (
    <ModalWrapper
      width={width}
      title={title}
      centered
      visible
      bodyStyle={bodyStyle}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={okText}
      footer={footer}
      okButtonProps={{ type: 'danger' }}
      maskClosable
      closable={false}
      isBottomBorder={isBottomBorder}
    >
      {children}
    </ModalWrapper>
  )
}

ModalWithHeader.propTypes = {
  title: PropTypes.string,
  okText: PropTypes.string,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  bodyStyle: PropTypes.object,
  width: PropTypes.number,
  footer: PropTypes.node,
  isBottomBorder: PropTypes.bool
}

ModalWithHeader.defaultProps = {
  title: null,
  okText: null,
  handleOk: null,
  handleCancel: null,
  children: null,
  bodyStyle: null,
  width: 520,
  footer: false,
  isBottomBorder: false
}

export default ModalWithHeader

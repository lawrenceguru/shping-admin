import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Modal } from 'antd'
import styled from 'styled-components'

const ModalSpan = styled.div`
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-size: 14px;
  line-height: 25px;
`

const { confirm } = Modal

const deleteModal = (onOkFunction, innerText) =>
  confirm({
    title: <ModalSpan>{innerText}</ModalSpan>,
    okText: intl.get('yes'),
    okType: 'danger',
    cancelText: intl.get('no'),
    centered: true,
    onOk() {
      onOkFunction()
    }
  })

deleteModal.propTypes = {
  id: PropTypes.string,
  onOkFunction: PropTypes.func,
  innerText: PropTypes.string
}

deleteModal.defaultProps = {
  onOkFunction: null,
  id: null,
  innerText: null
}

export default deleteModal

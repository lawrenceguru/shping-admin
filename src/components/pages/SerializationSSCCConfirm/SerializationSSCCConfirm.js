import React from 'react'
import intl from 'react-intl-universal'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Wrapper, WrapperText } from './styles'

const SerializationSSCCConfirm = ({ company, sscc, order, serialNumber }) => {
  return (
    <Wrapper>
      <div style={{ marginTop: '30px' }}>
        <h2>{intl.get('serializationTasks.serializationStep.finalStep.header')}</h2>
      </div>
      <WrapperText>
        <div>
          <span>{intl.get('serializationTasks.serializationSSCCOptions.lastStep.sscc')}</span>
          <span>{sscc}</span>
        </div>
        <div>
          <span>{intl.get('serializationTasks.serializationSSCCOptions.lastStep.compPrefix')}</span>
          <span>{company}</span>
        </div>
        <div>
          <span>{intl.get('serializationTasks.serializationSSCCOptions.lastStep.sequence')}</span>
          <span>{order.toUpperCase()}</span>
        </div>
        {order === 'ordered' && (
          <div>
            <span>{intl.get('serializationTasks.serializationSSCCOptions.lastStep.serialNumber')}</span>
            <span>{serialNumber}</span>
          </div>
        )}
      </WrapperText>
    </Wrapper>
  )
}

SerializationSSCCConfirm.propTypes = {
  company: PropTypes.string,
  sscc: PropTypes.string,
  order: PropTypes.string,
  serialNumber: PropTypes.string
}

SerializationSSCCConfirm.defaultProps = {
  company: '',
  sscc: '',
  order: '',
  serialNumber: ''
}

export default withRouter(SerializationSSCCConfirm)

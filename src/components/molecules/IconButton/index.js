import React, { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover } from 'antd'
import PropTypes from 'prop-types'
import getIconByType from './const'
import { Wrapper, StyledPopover } from './styles'
import LoadingSpinner from '../../atoms/LoadingSpinner'

const DeleteIcon = ({
  type,
  isLoading,
  actionFunction,
  popText,
  styleParam,
  visible,
  placement,
  title,
  trigger,
  ...props
}) => {
  const icon = useMemo(
    () => (
      <FontAwesomeIcon
        style={{
          fontSize: styleParam.fontSize || 25,
          color: visible ? styleParam.color || '#b3b3b3' : '#d8d8d8',
          cursor: visible ? styleParam.cursor || 'pointer' : 'default',
          marginLeft: styleParam.marginLeft || 0,
          marginRight: styleParam.marginRight || 0,
          marginTop: styleParam.marginTop || 0,
          position: styleParam.position || undefined,
          opacity: styleParam.opacity || 1
        }}
        icon={getIconByType(type)}
        onClick={actionFunction}
        {...props}
      />
    ),
    [visible, actionFunction, styleParam, type]
  )

  return (
    <Wrapper>
      <LoadingSpinner isLoading={isLoading}>
        {visible && popText ? (
          <Popover
            content={typeof popText === 'string' ? <StyledPopover>{popText}</StyledPopover> : popText}
            getPopupContainer={tr => tr.parentNode}
            placement={placement}
            trigger={trigger}
            title={title}
          >
            {icon}
          </Popover>
        ) : (
          icon
        )}
      </LoadingSpinner>
    </Wrapper>
  )
}

DeleteIcon.propTypes = {
  type: PropTypes.string.isRequired,
  actionFunction: PropTypes.func,
  popText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  // eslint-disable-next-line react/forbid-prop-types
  styleParam: PropTypes.object,
  visible: PropTypes.bool,
  placement: PropTypes.string,
  title: PropTypes.node,
  trigger: PropTypes.string,
  isLoading: PropTypes.bool
}

DeleteIcon.defaultProps = {
  actionFunction: null,
  styleParam: {},
  popText: null,
  placement: 'top',
  visible: true,
  title: null,
  trigger: 'hover',
  isLoading: false
}

export default DeleteIcon

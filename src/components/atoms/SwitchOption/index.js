import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'antd'
import { SwitchOptionWrapper } from './styles'

const SwitchOption = ({ onChange, checked, text, textMarginRight, textMarginLeft, justifyContent }) => {
  return (
    <SwitchOptionWrapper
      textMarginRight={textMarginRight}
      textMarginLeft={textMarginLeft}
      justifyContent={justifyContent}
    >
      {text && <span>{text}</span>}
      <Switch onChange={onChange} checked={checked} />
    </SwitchOptionWrapper>
  )
}

SwitchOption.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  text: PropTypes.string,
  textMarginRight: PropTypes.string,
  textMarginLeft: PropTypes.string,
  justifyContent: PropTypes.string
}

SwitchOption.defaultProps = {
  checked: false,
  text: '',
  textMarginRight: null,
  textMarginLeft: null,
  justifyContent: null,
  onChange: null
}

export default SwitchOption

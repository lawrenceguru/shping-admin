import React from 'react'
import { Radio } from 'antd'
import PropTypes from 'prop-types'
import { LevelButtonsWrapper } from './styles'

const RadioGroup = ({ group, value, onChange, isButtons, disabled }) => {
  return (
    <LevelButtonsWrapper isButtons={isButtons}>
      <Radio.Group value={value} onChange={onChange}>
        {group.map((el, index) =>
          isButtons ? (
            // eslint-disable-next-line react/no-array-index-key
            <Radio.Button disabled={disabled} value={el.value} key={index}>
              {el.label}
            </Radio.Button>
          ) : (
            // eslint-disable-next-line react/no-array-index-key
            <Radio disabled={disabled} key={index} value={el.value}>
              {el.label}
            </Radio>
          )
        )}
      </Radio.Group>
    </LevelButtonsWrapper>
  )
}

RadioGroup.propTypes = {
  onChange: PropTypes.func,
  group: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string,
  isButtons: PropTypes.bool,
  disabled: PropTypes.bool
}

RadioGroup.defaultProps = {
  group: [],
  isButtons: false,
  onChange: null,
  value: null,
  disabled: false
}

export default RadioGroup

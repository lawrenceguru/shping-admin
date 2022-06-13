import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd'
import intl from 'react-intl-universal'
import * as ST from './styles'
import Switch from '../Switch'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const WidgetHeaderSwitchMode = ({ isSystem, setValue, data, sources, activeSource, widgetIndex, isSelectsDisable }) => {
  const handleOnChange = (value, key) => {
    const newSources = [...sources]
    newSources[activeSource].data[widgetIndex][key] = value
    setValue('sources', newSources)
  }
  return (
    <ST.HeaderPanel>
      {isSystem && (
        <Checkbox
          onChange={event => handleOnChange(event.target.checked, 'no_rewards')}
          checked={!!data.no_rewards}
          defaultChecked={!!data.no_rewards}
        >
          {intl.get('widgets.noRewards')}
        </Checkbox>
      )}
      <Switch
        disabled={isSelectsDisable}
        handleChange={value => handleOnChange(value, 'private')}
        checked={data.private}
        popText='Private mode'
        defaultChecked={data.private}
      />
    </ST.HeaderPanel>
  )
}

WidgetHeaderSwitchMode.propTypes = {
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  activeSource: PropTypes.number.isRequired,
  widgetIndex: PropTypes.number.isRequired,
  sources: PropTypes.arrayOf(PropTypes.object),
  isSelectsDisable: PropTypes.bool,
  isSystem: PropTypes.bool
}

WidgetHeaderSwitchMode.defaultProps = {
  data: {},
  sources: [],
  isSelectsDisable: false,
  isSystem: false
}

export default WidgetHeaderSwitchMode

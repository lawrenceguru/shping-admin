import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { name } from '../../../utils/consts'

const { Option } = Select

const LanguagesSelect = ({
  value,
  size,
  mode,
  onChange,
  settingsGetLanguages,
  placeholder,
  languages,
  isLoadingLanguages
}) => {
  useEffect(() => {
    if ((!languages || !languages.length) && !isLoadingLanguages) {
      settingsGetLanguages()
    }
  }, [])

  return (
    <Select
      showSearch
      mode={mode}
      size={size}
      value={value || (mode === 'multiple' ? [] : undefined)}
      loading={isLoadingLanguages}
      onChange={onChange}
      placeholder={placeholder}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      getPopupContainer={trigger => trigger.parentNode}
    >
      {languages && languages.length && !isLoadingLanguages
        ? languages.map(country => (
            <Option style={{ fontSize: 16 }} key={country.code} value={country.code}>
              {country[name]}
            </Option>
          ))
        : null}
    </Select>
  )
}

LanguagesSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.object),
  isLoadingLanguages: PropTypes.bool,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  mode: PropTypes.string
}

LanguagesSelect.defaultProps = {
  value: [],
  languages: null,
  isLoadingLanguages: false,
  size: 'large',
  placeholder: null,
  mode: 'multiple'
}

export default LanguagesSelect

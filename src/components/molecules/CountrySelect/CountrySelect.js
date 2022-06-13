import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { name } from '../../../utils/consts'

const { Option } = Select

const CountrySelect = ({
  value,
  mode,
  size,
  onChange,
  settingsGetCountries,
  placeholder,
  countries,
  isLoadingCountries
}) => {
  useEffect(() => {
    if ((!countries || !countries.length) && !isLoadingCountries) {
      settingsGetCountries()
    }
  }, [])

  return (
    <Select
      showSearch
      mode={mode}
      size={size}
      value={value || (mode === 'multiple' ? [] : undefined)}
      loading={isLoadingCountries}
      onChange={onChange}
      placeholder={placeholder}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      getPopupContainer={trigger => trigger.parentNode}
    >
      {countries && countries.length && !isLoadingCountries
        ? countries.map(country => (
            <Option style={{ fontSize: 16 }} key={country.iso} value={country.iso}>
              {country[name]}
            </Option>
          ))
        : null}
    </Select>
  )
}

CountrySelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  settingsGetCountries: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingCountries: PropTypes.bool,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  mode: PropTypes.string
}

CountrySelect.defaultProps = {
  value: [],
  countries: null,
  isLoadingCountries: false,
  size: 'large',
  placeholder: null,
  mode: 'multiple'
}

export default CountrySelect

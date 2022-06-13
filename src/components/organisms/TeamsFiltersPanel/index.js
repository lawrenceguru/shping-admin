import React, { useMemo, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { Input, Select } from 'antd'
import IconButton from '../../molecules/IconButton'
import Button from '../../atoms/Button'
import * as ST from './styles'

const { Option } = Select

const initialState = {
  name: { value: '', option: true },
  context: { value: '', option: true }
}

const TeamsFiltersPanel = ({ defaultInitialState, handleFilterTeam, context }) => {
  const [inputs, setInputs] = useState({ ...initialState, ...defaultInitialState })

  const handleInputChange = (key, value) => {
    setInputs({
      ...inputs,
      [key]: { ...inputs[key], value }
    })
  }

  const handleCheckboxChange = (key, option) => {
    setInputs({
      ...inputs,
      [key]: { ...inputs[key], option }
    })
  }

  const filterBeforeSend = () => {
    const filteredInputs = {}
    Object.keys(inputs).forEach(el => {
      if (typeof inputs[el].value === 'string') {
        inputs[el].value = inputs[el].value.trim()
      }
      if ((inputs[el].value && inputs[el].value.length) || (inputs[el].startDate && inputs[el].endDate)) {
        filteredInputs[el] = inputs[el]
      }
    })
    handleFilterTeam(filteredInputs)
  }

  const isClearButtonDisabled = useMemo(() => {
    let isFillValue = false
    Object.keys(inputs).forEach(el => {
      if (
        (Array.isArray(inputs[el].value) ? inputs[el].value.length : inputs[el].value.trim()) ||
        (inputs[el].startDate && inputs[el].endDate)
      ) {
        isFillValue = true
      }
    })
    return isFillValue
  }, [inputs])

  const clearAllFilters = () => {
    const clearedInputs = {}
    Object.keys(inputs).forEach(el => {
      inputs[el].value = ''
      if (el === 'ts') {
        inputs[el].startDate = null
        inputs[el].endDate = null
      }
      if (el === 'operation' || el === 'country') {
        inputs[el].value = []
      }
      clearedInputs[el] = inputs[el]
    })
    setInputs(clearedInputs)
    filterBeforeSend()
  }

  const renderButtons = () => (
    <>
      <Button type='primary' onClick={filterBeforeSend}>
        {intl.get('apply')}
      </Button>
      <Button className={!isClearButtonDisabled ? 'clear-all disable' : 'clear-all'} onClick={clearAllFilters}>
        {intl.get('reset')}
      </Button>
    </>
  )

  return (
    <ST.Wrapper>
      <ST.DefaultFilterPanelWrapper>
        <ST.DefaultFilterFieldsWrapper>
          <ST.DefaultField key='name'>
            <IconButton
              type={inputs.name.option ? 'Equal' : 'NotEqual'}
              actionFunction={() => handleCheckboxChange('name', !inputs.name.option)}
              popText={inputs.name.option ? intl.get('productCatalogue.equal') : intl.get('productCatalogue.notEqual')}
              styleParam={{ fontSize: 15, marginRight: 10 }}
            />
            <Input
              size='large'
              placeholder={intl.get('teamsTableSettings.name')}
              value={inputs.name.value}
              onChange={e => handleInputChange('name', e.target.value)}
            />
          </ST.DefaultField>
          <ST.DefaultField>
            <IconButton
              type={inputs.context.option ? 'Equal' : 'NotEqual'}
              actionFunction={() => handleCheckboxChange('context', !inputs.context.option)}
              popText={
                inputs.context.option ? intl.get('productCatalogue.equal') : intl.get('productCatalogue.notEqual')
              }
              styleParam={{ fontSize: 15, marginRight: 10 }}
            />
            <Select
              showSearch
              optionFilterProp='children'
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              defaultValue={inputs.context.value || 'All context'}
              getPopupContainer={trigger => trigger.parentNode}
              onChange={e => {
                return e === 'All context' ? handleInputChange('context', '') : handleInputChange('context', e)
              }}
              size='large'
              placeholder='Select context'
              value={inputs.context.value || 'All context'}
            >
              {[...context, 'All context']
                .filter(el => el.toLowerCase() !== inputs.context.value.toLowerCase())
                .map(item => (
                  <Option
                    key={item}
                    value={item}
                    style={{ color: 'rgb(178,179,178)', fontFamily: 'Roboto', fontWeight: 400 }}
                  >
                    {item}
                  </Option>
                ))}
            </Select>
          </ST.DefaultField>
        </ST.DefaultFilterFieldsWrapper>
        {renderButtons()}
      </ST.DefaultFilterPanelWrapper>
    </ST.Wrapper>
  )
}

TeamsFiltersPanel.propTypes = {
  handleFilterTeam: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  defaultInitialState: PropTypes.object,
  context: PropTypes.arrayOf(PropTypes.string)
}

TeamsFiltersPanel.defaultProps = {
  defaultInitialState: {},
  context: []
}

export default withRouter(TeamsFiltersPanel)

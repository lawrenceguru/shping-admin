import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Select } from 'antd'
import Loader from '../../templates/Loader'
import BudgetForm from '../BudgetForm'

const { Option } = Select

const Header = styled.h3`
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 900;
  font-family: Roboto;
  color: rgba(0, 0, 0, 0.85);
`
const LoaderWrapper = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 100%;
  }
`
const PortfolioForm = ({
  withOwnerField,
  defaultValues,
  portfolioId,
  onChange,
  modalHeading,
  portfolio,
  brands: { brands },
  isLoadingPortfolio,
  customerGetPortfolio,
  customerClearActivePortfolio
}) => {
  const [values, setValues] = useState({ ...defaultValues })

  useEffect(() => {
    if (!isLoadingPortfolio && portfolioId) {
      customerGetPortfolio(portfolioId)
    }
    return () => {
      customerClearActivePortfolio()
    }
  }, [])

  useEffect(() => {
    if (portfolio) {
      const prefillValues = {
        name: portfolio.name,
        brands: portfolio.brands,
        budget: portfolio.budget
      }
      setValues(prefillValues)
      onChange(prefillValues)
    }
  }, [portfolio])

  const handleOnChange = useCallback(
    (value, key) => {
      setValues(state => {
        const newState = { ...state, [key]: value }
        onChange(newState)
        return newState
      })
    },
    [values, onChange]
  )

  return (
    <>
      <Header>{modalHeading}</Header>
      {isLoadingPortfolio ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <>
          <Form.Item required key='name' label='Name'>
            <Input type='text' value={values.name} onChange={event => handleOnChange(event.target.value, 'name')} />
          </Form.Item>

          <BudgetForm defaultValue={values.budget} onChange={value => handleOnChange(Number(value), 'budget')} />

          <Form.Item required key='brands' label='Brands'>
            <Select
              allowClear
              showSearch
              mode='multiple'
              value={values.brands}
              style={{ width: '100%' }}
              loading={isLoadingPortfolio}
              onChange={value => handleOnChange(value, 'brands')}
              getPopupContainer={trigger => trigger.parentNode}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {brands &&
                brands.length !== 0 &&
                brands.map(brand => (
                  <Option key={brand.name} value={brand.name}>
                    {brand.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          {withOwnerField && (
            <Form.Item required key='owner' label='Owner'>
              <Input
                type='text'
                value={values.owner}
                onChange={event => handleOnChange(event.target.value.trim(), 'owner')}
              />
            </Form.Item>
          )}
        </>
      )}
    </>
  )
}

PortfolioForm.propTypes = {
  withOwnerField: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  defaultValues: PropTypes.object,
  modalHeading: PropTypes.string.isRequired,
  portfolioId: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  portfolio: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  brands: PropTypes.object.isRequired,
  isLoadingPortfolio: PropTypes.bool.isRequired,
  customerGetPortfolio: PropTypes.func.isRequired,
  customerClearActivePortfolio: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  onChange: PropTypes.func.isRequired
}

PortfolioForm.defaultProps = {
  defaultValues: {},
  portfolioId: null,
  portfolio: null,
  withOwnerField: false
}

export default PortfolioForm

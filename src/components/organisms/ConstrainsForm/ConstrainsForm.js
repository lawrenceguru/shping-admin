import React, { useEffect, useState, useCallback, useMemo } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import * as ST from './styles'
import CountrySelect from '../../molecules/CountrySelect'
import GtinSelect from '../../molecules/GtinSelect'
import Button from '../../atoms/Button'
import Table from '../../molecules/Table'
import Loader from '../../templates/Loader'
import { columns } from './consts'
import IconButton from '../../molecules/IconButton'
import deleteModal from '../../molecules/DeleteModal'

const ConstrainsForm = ({
  id,
  constraints,
  isUpdatingConstraints,
  isLoadingConstraints,
  customerAddConstraints,
  customerGetConstraints,
  customerDeleteConstraints,
  customerSetConstraints
}) => {
  const [values, setValues] = useState({
    countries: [],
    products: []
  })

  const mergedColumns = useMemo(() => {
    return [
      ...columns,
      {
        key: 'action',
        dataIndex: 'id',
        align: 'center',
        render: value => (
          <IconButton
            type='DeleteTrash'
            actionFunction={() =>
              deleteModal(
                () => customerDeleteConstraints({ participantId: id, id: value }),
                intl.get('customer.dialog.confirmDeleteConstraints')
              )
            }
          />
        )
      }
    ]
  }, [columns])

  useEffect(() => {
    if (!isLoadingConstraints) {
      customerGetConstraints(id)
    }
  }, [])

  useEffect(() => {
    if (constraints && constraints.countries) {
      setValues({
        ...values,
        countries: constraints.countries
      })
    }
  }, [constraints])

  const handleOnChange = useCallback(
    (value, key) => {
      setValues({
        ...values,
        [key]: value
      })
    },
    [values]
  )

  const handleOnSave = useCallback(() => {
    customerAddConstraints({
      id,
      ...(values && values.products && values.products.length !== 0 && { products: values.products })
    })
    customerSetConstraints({
      id,
      countries: values && values.countries && values.countries.length !== 0 ? values.countries : null
    })
  }, [id, values])

  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('customer.list.constrainsHeader')}</ST.Header>
      <ST.ActionsWrapper>
        <ST.TextboxsWrapper>
          <CountrySelect
            value={values.countries}
            onChange={value => handleOnChange(value, 'countries')}
            placeholder={intl.get('todo.deliveries.form.selectCountries')}
          />
          <GtinSelect
            value={values.products}
            onChange={value => handleOnChange(value, 'products')}
            placeholder='Enter name or GTIN'
          />
        </ST.TextboxsWrapper>
        <Button size='large' type='danger' onClick={handleOnSave}>
          {intl.get('save')}
        </Button>
      </ST.ActionsWrapper>
      <ST.TableWrapper>
        {isLoadingConstraints ? (
          <Loader />
        ) : (
          constraints &&
          constraints.products &&
          constraints.products.length !== 0 && (
            <Table
              noScroll
              columns={mergedColumns}
              data={constraints.products}
              rowKey='id'
              loading={isUpdatingConstraints}
            />
          )
        )}
      </ST.TableWrapper>
    </ST.Wrapper>
  )
}

ConstrainsForm.propTypes = {
  id: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  constraints: PropTypes.object,
  isUpdatingConstraints: PropTypes.bool,
  isLoadingConstraints: PropTypes.bool,
  customerAddConstraints: PropTypes.func.isRequired,
  customerGetConstraints: PropTypes.func.isRequired,
  customerDeleteConstraints: PropTypes.func.isRequired
}

ConstrainsForm.defaultProps = {
  id: null,
  constraints: null,
  isUpdatingConstraints: false,
  isLoadingConstraints: false
}

export default ConstrainsForm

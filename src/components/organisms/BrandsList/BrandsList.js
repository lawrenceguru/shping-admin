import React, { useEffect, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import cloneDeep from 'lodash/cloneDeep'
import { Input } from 'antd'
import * as ST from './styles'
import Table from '../../molecules/Table'
import Loader from '../../templates/Loader'
import { columns } from './consts'
import IconButton from '../../molecules/IconButton'
import deleteModal from '../../molecules/DeleteModal'
import ModalForm from '../../atoms/ModalForm'
import Button from '../../atoms/Button'
import BrandForm from '../../molecules/BrandForm'

const BrandsList = ({
  isSystem,
  id,
  brands,
  isUpdatingBrands,
  isLoadingBrands,
  customerAddBrand,
  customerEditBrand,
  customerGetBrands,
  customerDeleteBrand
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredBrands, setFilteredBrands] = useState(cloneDeep(brands ? brands.brands : null))

  useEffect(() => {
    if (!isLoadingBrands) {
      customerGetBrands(id)
    }
  }, [])

  useEffect(() => {
    if (brands && brands.brands) {
      setFilteredBrands(brands.brands)
    }
  }, [brands])

  const onChangeFilter = event => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    if (brands && brands.brands) {
      setFilteredBrands(
        cloneDeep(brands.brands.filter(({ name }) => name.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    }
  }, [searchQuery])

  const handleEditBrand = ({ brandName, participantId }) => {
    let values = filteredBrands && filteredBrands.filter(({ name }) => name === brandName)[0]
    if (!values.budget) {
      values.budget = null
    }

    ModalForm(
      () => {
        if (!participantId) {
          toast.error(intl.get('customer.dialog.customerNotFound'))
          return false
        }

        if (!values.name) {
          toast.error(intl.get('customer.form.brandName.error'))
          return false
        }

        return customerEditBrand({
          id: participantId,
          owner: participantId,
          ...values
        })
      },
      <BrandForm
        mode='EDIT'
        modalHeading={intl.get('customer.dialog.editBrand')}
        defaultValues={values}
        onChange={val => {
          values = val
        }}
      />
    )
  }

  const handleAddBrand = ({ participantId }) => {
    let values = {
      name: null,
      logo: null,
      budget: null,
      owner: participantId
    }

    ModalForm(
      () => {
        if (!participantId) {
          toast.error(intl.get('customer.dialog.customerNotFound'))
          return false
        }

        if (!values.name) {
          toast.error(intl.get('customer.form.brandName.error'))
          return false
        }

        if (isSystem && !values.owner) {
          toast.error(intl.get('customer.form.owner.error'))
          return false
        }

        return customerAddBrand({
          id: participantId,
          ...values
        })
      },
      <BrandForm
        mode='ADD'
        withOwnerField={isSystem}
        modalHeading={intl.get('customer.dialog.addBrand')}
        onChange={newValues => {
          values = newValues
        }}
        defaultValues={values}
      />
    )
  }

  const mergedColumns = [
    ...columns,
    {
      key: 'edit',
      dataIndex: 'name',
      align: 'center',
      render: value => (
        <IconButton type='Edit' actionFunction={() => handleEditBrand({ participantId: id, brandName: value })} />
      )
    },
    {
      key: 'delete',
      dataIndex: 'name',
      align: 'center',
      render: value => (
        <IconButton
          type='DeleteTrash'
          actionFunction={() =>
            deleteModal(
              () => customerDeleteBrand({ participantId: id, name: value }),
              intl.get('customer.dialog.confirmDeleteBrand')
            )
          }
        />
      )
    }
  ]

  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('customer.list.brandsHeader')}</ST.Header>
      <ST.ActionsWrapper>
        <Input onChange={onChangeFilter} value={searchQuery} placeholder='Search brand by name' />
        <Button size='large' type='danger' onClick={() => handleAddBrand({ participantId: id })}>
          {intl.get('customer.actions.addBrand')}
        </Button>
      </ST.ActionsWrapper>
      <ST.TableWrapper>
        {isLoadingBrands ? (
          <Loader />
        ) : (
          <Table noScroll columns={mergedColumns} data={filteredBrands} rowKey='name' loading={isUpdatingBrands} />
        )}
      </ST.TableWrapper>
    </ST.Wrapper>
  )
}

BrandsList.propTypes = {
  isSystem: PropTypes.bool.isRequired,
  id: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  brands: PropTypes.object,
  isUpdatingBrands: PropTypes.bool,
  isLoadingBrands: PropTypes.bool,
  customerGetBrands: PropTypes.func.isRequired,
  customerAddBrand: PropTypes.func.isRequired,
  customerEditBrand: PropTypes.func.isRequired,
  customerDeleteBrand: PropTypes.func.isRequired
}

BrandsList.defaultProps = {
  id: null,
  brands: null,
  isUpdatingBrands: false,
  isLoadingBrands: false
}

export default BrandsList

import React, { useEffect } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import * as ST from './styles'
import Table from '../../molecules/Table'
import Loader from '../../templates/Loader'
import { columns } from './consts'
import IconButton from '../../molecules/IconButton'
import deleteModal from '../../molecules/DeleteModal'
import ModalForm from '../../atoms/ModalForm'
import Button from '../../atoms/Button'
import PortfolioForm from '../../molecules/PortfolioForm'

const PortfoliosList = ({
  isSystem,
  id,
  portfolios,
  isUpdatingPortfolios,
  isLoadingPortfolios,
  customerAddPortfolio,
  customerEditPortfolio,
  customerGetPortfolios,
  customerDeletePortfolio
}) => {
  useEffect(() => {
    if (!isLoadingPortfolios) {
      customerGetPortfolios(id)
    }
  }, [])

  const handleEditPortfolio = ({ portfolioId, participantId }) => {
    let values =
      portfolios && portfolios.portfolios && portfolios.portfolios.filter(({ id: i }) => i === portfolioId)[0]

    ModalForm(
      () => {
        if (!participantId) {
          toast.error(intl.get('customer.dialog.customerNotFound'))
          return false
        }

        if (!values.name) {
          toast.error(intl.get('customer.form.portfolioName.error'))
          return false
        }

        if (values.brands.length === 0) {
          toast.error(intl.get('customer.form.portfolioBrands.error'))
          return false
        }

        return customerEditPortfolio({
          ...values,
          id: portfolioId,
          owner: id
        })
      },
      <PortfolioForm
        modalHeading={intl.get('customer.dialog.editPortfolio')}
        portfolioId={portfolioId}
        defaultValues={values}
        onChange={val => {
          values = val
        }}
      />
    )
  }

  const handleAddPortfolio = ({ participantId }) => {
    let values = {
      owner: participantId,
      name: null,
      logo: null,
      budget: null,
      brands: []
    }

    ModalForm(
      () => {
        if (!participantId) {
          toast.error(intl.get('customer.dialog.customerNotFound'))
          return false
        }

        if (!values.name) {
          toast.error('Name is required')
          return false
        }

        if (values.brands.length === 0) {
          toast.error(intl.get('customer.form.portfolioBrands.error'))
          return false
        }

        if (isSystem && !values.owner) {
          toast.error(intl.get('customer.form.owner.error'))
          return false
        }

        return customerAddPortfolio({
          id: participantId,
          ...values
        })
      },
      <PortfolioForm
        withOwnerField={isSystem}
        defaultValues={values}
        modalHeading={intl.get('customer.dialog.addPortfolio')}
        onChange={newValues => {
          values = newValues
        }}
      />
    )
  }

  const mergedColumns = [
    ...columns,
    {
      key: 'edit',
      dataIndex: 'id',
      align: 'center',
      render: value => (
        <IconButton type='Edit' actionFunction={() => handleEditPortfolio({ participantId: id, portfolioId: value })} />
      )
    },
    {
      key: 'delete',
      dataIndex: 'id',
      align: 'center',
      render: value => (
        <IconButton
          type='DeleteTrash'
          actionFunction={() =>
            deleteModal(
              () => customerDeletePortfolio({ participantId: id, portfolioId: value }),
              intl.get('customer.dialog.confirmDeletePortfolio')
            )
          }
        />
      )
    }
  ]

  return (
    <ST.Wrapper>
      <ST.Header>{intl.get('customer.list.portfoliosHeader')}</ST.Header>
      <ST.ActionsWrapper>
        <Button size='large' type='danger' onClick={() => handleAddPortfolio({ participantId: id })}>
          {intl.get('customer.actions.addPortfolio')}
        </Button>
      </ST.ActionsWrapper>
      <ST.TableWrapper>
        {isLoadingPortfolios ? (
          <Loader />
        ) : (
          <Table
            noScroll
            columns={mergedColumns}
            data={portfolios ? portfolios.list : []}
            rowKey='name'
            loading={isUpdatingPortfolios}
          />
        )}
      </ST.TableWrapper>
    </ST.Wrapper>
  )
}

PortfoliosList.propTypes = {
  isSystem: PropTypes.bool.isRequired,
  id: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  portfolios: PropTypes.object,
  isUpdatingPortfolios: PropTypes.bool,
  isLoadingPortfolios: PropTypes.bool,
  customerAddPortfolio: PropTypes.func.isRequired,
  customerEditPortfolio: PropTypes.func.isRequired,
  customerGetPortfolios: PropTypes.func.isRequired,
  customerDeletePortfolio: PropTypes.func.isRequired
}

PortfoliosList.defaultProps = {
  id: null,
  portfolios: null,
  isUpdatingPortfolios: false,
  isLoadingPortfolios: false
}

export default PortfoliosList

import React, { useEffect, useMemo, useCallback } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form, Select } from 'antd'
import { toast } from 'react-toastify'
import * as ST from './styles'
import { columns } from './consts'
import Button from '../../atoms/Button'
import Table from '../../molecules/Table'
import Loader from '../../templates/Loader'
import deleteModal from '../../molecules/DeleteModal'
import IconButton from '../../molecules/IconButton'
import { name } from '../../../utils/consts'
import ModalForm from '../../atoms/ModalForm'

const { Option } = Select
const Countries = []
const Temp = [false]

const ConfigurationTab = ({
  history,
  storeCardsGetAllEntries,
  storeCardsAddCountry,
  storeCardsDeleteCountry,
  allEntriesIsLoading,
  isUpdatingCountries,
  entries,
  countries,
  isLoadingCountries,
  settingsGetCountries
}) => {
  const mergedColumns = useMemo(() => {
    return [
      ...columns,
      {
        key: 'action',
        align: 'center',
        render: record => (
          <IconButton
            type='DeleteTrash'
            actionFunction={event => {
              event.preventDefault()
              event.stopPropagation()
              deleteModal(
                () => storeCardsDeleteCountry({ id: record.country_info.iso }),
                intl.get('storecards.confirmDelete', { name: record.country_info[name] })
              )
            }}
          />
        )
      }
    ]
  }, [columns])
  useEffect(() => {
    while (Countries.length > 0) {
      Countries.pop()
    }
    countries.forEach(country => {
      entries.forEach(savedCountry => {
        if (country.iso === savedCountry.country_info.iso) {
          Temp[0] = true
        }
      })
      if (!Temp[0]) {
        Countries.push(country)
      }
      Temp[0] = false
    })
  }, [countries, entries])
  useEffect(() => {
    if (!allEntriesIsLoading) {
      storeCardsGetAllEntries()
    }

    if (!isLoadingCountries && (!countries || !countries.length)) {
      settingsGetCountries()
    }
  }, [])

  const handleAddCuntry = useCallback(() => {
    let id
    ModalForm(
      () => {
        if (!id) {
          toast.error(intl.get('storecards.dialog.countryRequired'))
          return false
        }
        storeCardsAddCountry({ id })

        return true
      },
      <>
        <ST.ModalHeader>{intl.get('storecards.dialog.addCountryHeader')}</ST.ModalHeader>
        <Form.Item label={intl.get('storecards.dialog.setCountryHeader')}>
          <Select
            showSearch
            onChange={value => (id = value)}
            size='large'
            style={{ width: '100%' }}
            getPopupContainer={trigger => trigger.parentNode}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            placeholder={intl.get('overviewPage.selectCountry')}
          >
            {Countries &&
              Countries.length > 0 &&
              Countries.map(country => (
                <Option key={country.iso} value={country.iso}>
                  {country[name]}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </>
    )
  }, [Countries])

  const handleOnRowCLick = useCallback(
    record => {
      history.push(`/admin/store-cards/configuration/${record.country_info.iso}/list`)
    },
    [history]
  )

  return (
    <ST.Wrapper>
      {allEntriesIsLoading ? (
        <Loader />
      ) : (
        <>
          <ST.Header>{intl.get('storecards.headerConfiguration')}</ST.Header>
          <ST.ActionsWrapper>
            <Button size='large' type='danger' onClick={() => handleAddCuntry()}>
              {intl.get('storecards.addCountry')}
            </Button>
          </ST.ActionsWrapper>
          <Table
            onRowClick={handleOnRowCLick}
            data={entries}
            noScroll
            columns={mergedColumns}
            loading={isUpdatingCountries}
            rowKey='cards_doc_id'
            limit={10}
            totalCounts={entries.length}
            pagination
            // isNotRenderOnEmptyData
          />
        </>
      )}
    </ST.Wrapper>
  )
}

ConfigurationTab.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  storeCardsGetAllEntries: PropTypes.func.isRequired,
  storeCardsAddCountry: PropTypes.func.isRequired,
  storeCardsDeleteCountry: PropTypes.func.isRequired,
  allEntriesIsLoading: PropTypes.bool,
  isUpdatingCountries: PropTypes.bool,
  entries: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  isLoadingCountries: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired
}

ConfigurationTab.defaultProps = {
  allEntriesIsLoading: false,
  isUpdatingCountries: false,
  entries: [],
  countries: null,
  isLoadingCountries: false
}
export default ConfigurationTab

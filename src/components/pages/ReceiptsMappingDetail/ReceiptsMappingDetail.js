import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Select, Button } from 'antd'
import styled from 'styled-components'
import Axios from 'axios'
import intl from 'react-intl-universal'
import { INDEX_API, DESCRIPTION_API } from 'constants/url'
import useSchemas from '../../../data/index/index-schema'
import useScans from '../../../data/description/receipts/scans'
import EnlargedImage from '../../atoms/EnlargedImage'
import Loader from '../../templates/Loader'

const ReceiptsImages = styled.div`
  padding: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`
const ReceiptsScans = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
`

const ReceiptsScan = styled.div`
  margin: 10px 10px 10px 0;
  cursor: pointer;
  font-size: 16px;
`
const ReceiptsItem = styled.img`
  width: 100%;
  cursor: pointer;
`
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 80px 0;
`
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 80px;
  & .ant-btn-primary {
    height: 40px;
    width: 130px;
    margin-left: 10px;
    border-color: rgb(239, 61, 70);
    background-color: rgb(239, 61, 70);
  }
  & .ant-btn-primary:hover,
  & .ant-btn-primary:focus,
  & .ant-btn-primary:active {
    background-color: #ff7875;
    border-color: #ff7875;
  }
`
const Head = styled.div`
  display: flex;
  align-items: center;
`
const { Option } = Select

const ReceiptsMappingDetail = ({ match }) => {
  const [products, setProducts] = useState([])
  const history = useHistory()
  const { schemas } = useSchemas()
  const { table } = schemas ? schemas.find(indexSchema => indexSchema.type === 'gtin') : { table: undefined }
  const itemId = useMemo(() => {
    return (match && match.params && match.params.id) || null
  }, [match])
  const detail = localStorage.getItem('receipts_mapping_detail')
  if (detail === undefined) history.push('/admin/products/receipts-mapping')
  const record = JSON.parse(detail)
  if (record.id !== itemId) history.push('/admin/products/receipts-mapping')

  const { scans, images } = useScans(record.analyzed_receipt_id)
  const ticket = useSelector(({ identity }) => identity.ticket)
  const handleSearch = async query => {
    if (query && query.trim() !== '') {
      const param = {
        query: `id=like=|${query}|;name=like=|${query}|`,
        order: 'id',
        type: 'data',
        take: 10,
        op: 'OR'
      }
      const { data } = await Axios.post(`${INDEX_API}/rsql/${table}`, param, {
        headers: {
          authenticateit_identity_ticket: ticket,
          'Content-Type': 'application/json'
        }
      })
      const items = data.map(({ id, name }) => ({ label: `${name} [${id}]`, value: id }))
      setProducts(items)
    }
  }

  const [inputSearchValue, setInputSearchValue] = useState(() => {
    if (detail) {
      const item = JSON.parse(detail)
      return item.pending_gtin
    }
    return undefined
  })

  const [pendingItemValue] = useState(() => {
    if (detail) {
      const item = JSON.parse(detail)
      return item.pending_gtin
    }
    return null
  })

  const children = products.map(({ label, value }) => <Option key={value}>{label}</Option>)
  const [isMapping, setIsMapping] = useState(false)
  const [biggerImage, setBiggerImage] = useState('')
  const handleChange = value => {
    setInputSearchValue(value)
  }
  const onAccept = async e => {
    e.preventDefault()
    if (window.confirm(intl.get('receiptsMapping.acceptAction'))) {
      setIsMapping(true)
      await Axios.put(
        `${DESCRIPTION_API}/receipts/names/${itemId}/${inputSearchValue}/confirm`,
        {},
        {
          headers: {
            authenticateit_identity_ticket: ticket
          }
        }
      )
      setIsMapping(false)
      history.push('/admin/products/receipts-mapping')
    }
    return false
  }
  const onReject = async e => {
    e.preventDefault()
    if (window.confirm(intl.get('receiptsMapping.rejectAction'))) {
      setIsMapping(true)
      await Axios.put(
        `${DESCRIPTION_API}/receipts/names/${itemId}/${pendingItemValue}/reject`,
        {},
        {
          headers: {
            authenticateit_identity_ticket: ticket
          }
        }
      )
      setIsMapping(false)
      history.push('/admin/products/receipts-mapping')
    }
    return false
  }
  return (
    <div>
      <h2>{record.name}</h2>
      <Head>
        <Select
          style={{ width: '600px' }}
          showSearch
          onSearch={handleSearch}
          value={inputSearchValue}
          onChange={handleChange}
          placeholder='Enter name or GTIN'
          size='large'
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {children}
        </Select>
        {inputSearchValue && (
          <ButtonGroup>
            <Button onClick={onAccept} type='primary' htmlType='button' size='large'>
              {intl.get('receiptsMapping.accept')}
            </Button>
            {pendingItemValue && (
              <Button onClick={onReject} type='primary' htmlType='button' size='large'>
                {intl.get('receiptsMapping.reject')}
              </Button>
            )}
          </ButtonGroup>
        )}
      </Head>
      {isMapping ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <>
          <ReceiptsImages>
            {Array.isArray(images) &&
              [...new Set(images)]
                .filter(image => typeof image === 'string')
                .map(image => <ReceiptsItem key={image} src={image} onClick={() => setBiggerImage(image)} />)}
          </ReceiptsImages>
          <ReceiptsScans>
            {scans && scans.length > 0 && (
              <>
                <h3>{intl.get('receiptsMapping.scanHeader')}</h3>
                {scans.map(scan => (
                  <ReceiptsScan
                    key={scan.product_id}
                    onClick={() => {
                      setInputSearchValue(scan.product_id)
                      handleSearch(scan.product_id)
                    }}
                  >
                    {scan.product_name}
                  </ReceiptsScan>
                ))}
              </>
            )}
          </ReceiptsScans>
          {biggerImage && <EnlargedImage url={biggerImage} clearUrl={() => setBiggerImage('')} />}
        </>
      )}
    </div>
  )
}

export default ReceiptsMappingDetail

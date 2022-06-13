import React, { useCallback, useMemo } from 'react'
import { Modal } from 'antd'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import IconButton from '../../molecules/IconButton'
import { getValidInteraction, getModalField } from '../../../utils/analytics'

const StyledIcon = styled.img`
  width: 40px;
  color: #e02d2d;
`

const StyledProductInfo = styled.div`
  display: flex;
  flex-direction: row;
  & div {
    flex-basis: 50%;
  }
`

const StyledImageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
`

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
`

const Header = styled.div`
  margin-right: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const FeaturedHeader = styled.div`
  margin-right: 10px;
  display: flex;
  flex-direction: row;
`

const Divider = styled.div`
  border-right: 1px solid #e8e8e8;
  margin: 5px 15px 0 15px;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 0;
  & span {
    flex-basis: 75%;
    font-weight: 900;
  }
  & > div {
    display: flex;
    justify-content: flex-start;
    flex-basis: 20%;
  }
`

const modalHeader = (name, featured) =>
  featured ? (
    <FeaturedHeader>
      <StyledIcon src='/featured-icon.svg' />
      <Divider />
      <Header>
        <span>{name}</span>
      </Header>
    </FeaturedHeader>
  ) : (
    <Header>{name}</Header>
  )

const ImpressionsModal = ({ selectedItemData, modalVisible, setModalVisible }) => {
  if (!selectedItemData) {
    return null
  }
  const iconType = useMemo(() => {
    return selectedItemData.key === 'impressions' ? 'Eye' : 'Interaction'
  }, [selectedItemData])

  const data = useMemo(() => {
    if (!selectedItemData.primaryKey && selectedItemData.key === 'interactions') {
      return selectedItemData && selectedItemData[selectedItemData.key]
        ? getValidInteraction(selectedItemData[selectedItemData.key])
        : null
    }
    return selectedItemData && selectedItemData[selectedItemData.primaryKey || selectedItemData.key]
      ? selectedItemData[selectedItemData.primaryKey || selectedItemData.key]
      : null
  }, [selectedItemData])

  const renderData = useCallback(
    dataFields => {
      const mapsFields = getModalField(selectedItemData.primaryKey || selectedItemData.key)

      return mapsFields.map(filed => (
        <p key={filed} className='modal-text'>
          {intl.get(`conversionPage.${selectedItemData.primaryKey || selectedItemData.key}.fieldsNames.${filed}`)}:{' '}
          <span className='modal-main-text'>{(dataFields && dataFields[filed]) || 0}</span>{' '}
        </p>
      ))
    },
    [selectedItemData]
  )

  return (
    <Modal
      title={modalHeader(selectedItemData.name, selectedItemData.featured)}
      centered
      visible={modalVisible}
      footer={null}
      onOk={() => setModalVisible(false)}
      onCancel={() => setModalVisible(false)}
    >
      <StyledProductInfo>
        <StyledImageContainer>
          <StyledImage src={selectedItemData.image ? selectedItemData.image : '/no-image-product.jpg'} alt='Product' />
        </StyledImageContainer>
        <span className='line' />
        <div>
          <StyledHeader>
            <IconButton type={iconType} />
            <span>
              {intl.get(`widgetsNames.${selectedItemData.key[0].toUpperCase() + selectedItemData.key.slice(1)}`)}
            </span>
          </StyledHeader>
          {renderData(data)}
        </div>
      </StyledProductInfo>
    </Modal>
  )
}

ImpressionsModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectedItemData: PropTypes.object.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired
}

export default ImpressionsModal

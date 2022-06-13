import React, { useState } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import IconButton from '../../molecules/IconButton'
import FieldsConfigurator from '../FieldsConfigurator'

const ConfigureFieldsButton = ({
  hiddenFields,
  fieldNameInLocalStorage,
  indexedFields,
  setIndexedFields,
  currentParticipant,
  isProductPage,
  isAdvancedOptionsConfigurate
}) => {
  const [isModalVisible, setModalVisible] = useState(false)

  const saveConfigInLocalStorage = fields => {
    if (isProductPage) {
      localStorage.setItem(currentParticipant, JSON.stringify(fields))
    } else {
      localStorage.setItem(fieldNameInLocalStorage, JSON.stringify(fields))
    }
    setIndexedFields(fields)
  }

  return (
    <>
      <IconButton
        type={isAdvancedOptionsConfigurate ? 'Tasks' : 'Configuration'}
        actionFunction={() => setModalVisible(!isModalVisible)}
        styleParam={{ fontSize: 24, marginLeft: 10 }}
        popText={
          isAdvancedOptionsConfigurate
            ? intl.get('serializedProductsPage.configureAdvancedFields')
            : intl.get('serializedProductsPage.configure')
        }
      />
      {isModalVisible && (
        <FieldsConfigurator
          isAdvancedOptionsConfigurate={isAdvancedOptionsConfigurate}
          visibleFields={indexedFields}
          fields={indexedFields.filter(el => !hiddenFields.includes(el.fieldId))}
          saveConfigInLocalStorage={saveConfigInLocalStorage}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  )
}

ConfigureFieldsButton.propTypes = {
  hiddenFields: PropTypes.arrayOf(PropTypes.string),
  fieldNameInLocalStorage: PropTypes.string.isRequired,
  indexedFields: PropTypes.arrayOf(PropTypes.object),
  setIndexedFields: PropTypes.func,
  currentParticipant: PropTypes.string,
  isProductPage: PropTypes.bool,
  isAdvancedOptionsConfigurate: PropTypes.bool
}

ConfigureFieldsButton.defaultProps = {
  hiddenFields: [],
  indexedFields: [],
  setIndexedFields: null,
  currentParticipant: '',
  isProductPage: false,
  isAdvancedOptionsConfigurate: false
}

export default ConfigureFieldsButton

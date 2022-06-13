import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  requestImageLabels,
  addImageLabels,
  updateImageLabeling,
  removeImageLabels,
  saveImageLabels
} from 'store/actions'
import ModalImageForm from '../ModalImageForm'

const EnlargedImage = ({ url, clearUrl }) => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [exist, setExist] = useState(false)
  const details = useSelector(({ imageWidget }) => imageWidget.details)
  useEffect(() => {
    if (url) {
      setVisibleModal(true)
      setExist(true)
    } else {
      setVisibleModal(false)
      setExist(false)
    }
  }, [url])
  useEffect(() => {
    if (!visibleModal && exist) clearUrl()
  }, [visibleModal])
  return (
    <>
      {!!url && (
        <ModalImageForm
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          image={{ url }}
          requestImageLabels={requestImageLabels}
          details={details}
          addImageLabels={addImageLabels}
          updateImageLabeling={updateImageLabeling}
          removeImageLabels={removeImageLabels}
          saveImageLabels={saveImageLabels}
        />
      )}
    </>
  )
}

EnlargedImage.propTypes = {
  clearUrl: PropTypes.func.isRequired,
  url: PropTypes.string
}

EnlargedImage.defaultProps = {
  url: null
}

export default EnlargedImage

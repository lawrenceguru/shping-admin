import React, { useEffect, useState } from 'react'
import bwipjs from 'bwip-js'
import PropTypes from 'prop-types'
import CardProductImage from '../CardProductImage'

const Datamatrix = ({ code, id, bcid }) => {
  const [isMatrixError, setIsMatrixError] = useState(false)

  useEffect(() => {
    if (code && id) {
      try {
        bwipjs.toCanvas(id, {
          bcid: bcid || 'gs1datamatrix',
          text: code,
          textxalign: 'center'
        })
      } catch (e) {
        setIsMatrixError(true)
      }
    }
  }, [])

  return isMatrixError ? <CardProductImage /> : <canvas id={id} />
}

Datamatrix.propTypes = {
  code: PropTypes.string,
  id: PropTypes.string,
  bcid: PropTypes.string
}

Datamatrix.defaultProps = {
  code: null,
  id: null,
  bcid: null
}

export default Datamatrix

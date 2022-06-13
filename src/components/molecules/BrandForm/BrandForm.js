import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input } from 'antd'
import intl from 'react-intl-universal'
import ImageDropzone from '../DropZone'
import ExistedImageDropzone from '../ExistedDropZone'
import BudgetForm from '../BudgetForm'

const Header = styled.h3`
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 900;
  font-family: Roboto;
  color: rgba(0, 0, 0, 0.85);
`
const ImagePreview = styled.div`
  width: 120px;
  height: 100px;
`
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const BrandForm = ({ mode, withOwnerField, defaultValues, onChange, lastUploaded, postUpload, modalHeading }) => {
  const [values, setValues] = useState({ ...defaultValues })
  const [isUpdatingLogo, setIsUploadingLogo] = useState(false)

  useEffect(() => {
    if (isUpdatingLogo && lastUploaded && lastUploaded.url) {
      setValues(state => {
        const newState = { ...state, logo: lastUploaded.url }
        onChange(newState)
        return newState
      })
      setIsUploadingLogo(false)
    }
  }, [lastUploaded])

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

  const uploadLogo = files => {
    setIsUploadingLogo(true)
    postUpload({ file: files[0] })
  }

  return (
    <>
      <Header>{modalHeading}</Header>
      <Form.Item key='logo' label='Logo'>
        {!values || !values.logo ? (
          <ImageDropzone onDrop={files => uploadLogo(files)} />
        ) : (
          <ExistedImageDropzone onDrop={files => uploadLogo(files)}>
            <ImagePreview>
              <Image src={values && values.logo} alt='Preview' />
            </ImagePreview>
          </ExistedImageDropzone>
        )}
      </Form.Item>

      {mode === 'ADD' && (
        <>
          <Form.Item required key='name' label='Name'>
            <Input type='text' value={values.name} onChange={event => handleOnChange(event.target.value, 'name')} />
          </Form.Item>

          {withOwnerField && (
            <Form.Item required key='owner' label={intl.get('customer.form.owner.label')}>
              <Input
                type='text'
                value={values.owner}
                onChange={event => handleOnChange(event.target.value.trim(), 'owner')}
              />
            </Form.Item>
          )}
        </>
      )}
      <BudgetForm defaultValue={values.budget} onChange={value => handleOnChange(Number(value), 'budget')} />
    </>
  )
}

BrandForm.propTypes = {
  mode: PropTypes.oneOf(['ADD', 'EDIT']).isRequired,
  withOwnerField: PropTypes.bool,
  modalHeading: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  defaultValues: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  lastUploaded: PropTypes.object,
  postUpload: PropTypes.func.isRequired
}

BrandForm.defaultProps = {
  lastUploaded: null,
  withOwnerField: false
}

export default BrandForm

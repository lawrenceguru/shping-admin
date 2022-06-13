import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import intl from 'react-intl-universal'
import useForm from 'react-hook-form'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import * as ST from './styles'
import Button from '../../atoms/Button'
import ProductImportSettings from '../../organisms/ProductImportSettings'
import ProductImportMapping from '../../organisms/ProductImportMapping'
import { reorder } from '../../../utils/reorder'
import { fieldsLabel } from './consts'
import { name } from '../../../utils/consts'
import Loader from '../../templates/Loader'

const INITIAL_VALUES = {
  has_header: true,
  conditions: {
    countries: [],
    languages: []
  },
  delimiter: ','
}

const ProductImport = ({
  preview,
  postUploadClear,
  productsClearPreview,
  lastUploaded,
  productsPostPreview,
  isImportLoading,
  postUpload,
  productsPutColumn,
  productsPutRows,
  countries,
  languages,
  isLoadingCountries,
  isLoadingLanguages,
  settingsGetCountries,
  settingsGetLanguages,
  productsPostImportStart,
  updated,
  history
}) => {
  const { watch, register, setValue, getValues, unregister } = useForm({
    defaultValues: INITIAL_VALUES
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [fields, setFields] = useState([])
  const [mappingColumns, setMappingColumns] = useState({})
  const [conditions, setConditions] = useState({})

  const all = watch()
  const hasHeaderWatcher = watch('has_header')
  const delimiterWatcher = watch('delimiter')

  const values = useMemo(() => {
    return getValues({ nest: true })
  }, [all])

  useEffect(() => {
    register({ name: `has_header` })
    register({ name: 'link' })

    return () => {
      unregister(['has_header', 'delimiter', 'conditions', 'link'])
      postUploadClear()
      productsClearPreview()
    }
  }, [])

  useEffect(() => {
    if ((!countries || !countries.length) && !isLoadingCountries) {
      settingsGetCountries()
    }

    if ((!languages || !languages.length) && !isLoadingLanguages) {
      settingsGetLanguages()
    }
  }, [])

  useEffect(() => {
    if (updated) {
      history.push('/admin/products/catalogue/import-status')
    }
  }, [updated])

  useEffect(() => {
    if (lastUploaded && lastUploaded.url) {
      setValue('link', lastUploaded.url)
    }
  }, [lastUploaded])

  useEffect(() => {
    if (lastUploaded && lastUploaded.url) {
      productsPostPreview({ link: lastUploaded.url, has_header: hasHeaderWatcher, delimiter: delimiterWatcher })
      Object.keys(mappingColumns).forEach(key => {
        if (!['has_header', 'conditions', 'delimiter'].includes(key)) {
          setMappingColumns(prevState => ({ ...prevState, [key]: undefined }))
        }
      })
    }
  }, [hasHeaderWatcher, delimiterWatcher, lastUploaded])

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const updatedHeader = reorder(preview.header, result.source.index, result.destination.index)
    productsPutColumn(updatedHeader)

    const sortedFields = []

    if (updatedHeader && updatedHeader.length) {
      updatedHeader.forEach(key => {
        const element = fields.find(el => Object.keys(el)[0] === key.id)
        if (element) sortedFields.push({ ...element })
      })
    }
    setFields(sortedFields)
    productsPutRows(preview.rows.map(item => reorder(item, result.source.index, result.destination.index)))
  }

  const getGroupedWidgets = fieldsArray => {
    const newFields = [...fieldsArray]

    return newFields.reduce((resultArray, current) => {
      let newObj = {}

      newObj[current.field] = { column: current.column }

      if (current.copy_to_cdn && ['url', 'img_url'].includes(current.field)) {
        newObj[current.field].copy_to_cdn = current.copy_to_cdn
      }

      if (resultArray.length && !resultArray[resultArray.length - 1][current.field]) {
        newObj = { ...resultArray[resultArray.length - 1], ...newObj }
        const newResult = [...resultArray]
        newResult[resultArray.length - 1] = { ...newObj }
        return newResult
      }

      resultArray.push(newObj)
      return resultArray
    }, [])
  }

  const getCertificates = fieldsArray => {
    const result = []
    let certificatesWithoutTitle = []
    const finalResult = []

    fieldsArray.forEach((item, index) => {
      if (item.field === 'title') {
        if (result.length) {
          result[result.length - 1].push(...certificatesWithoutTitle)
          result.push([{ ...item }])
          certificatesWithoutTitle = []
        } else {
          result.push([{ ...item }, ...certificatesWithoutTitle])
          certificatesWithoutTitle = []
        }
      } else {
        certificatesWithoutTitle.push({ ...item })
      }

      if (index === fieldsArray.length - 1 && certificatesWithoutTitle.length && result.length) {
        result[result.length - 1].push(...certificatesWithoutTitle)
      }
    })

    if (result.length) {
      result.forEach(item => {
        const startObject = { title: { column: item[0] && item[0].column }, list: [] }
        const fieldsWithoutTitle = item.filter((elem, index) => index !== 0)
        startObject.list = getGroupedWidgets(fieldsWithoutTitle)
        finalResult.push(startObject)
      })
    }

    return finalResult
  }

  const getGroups = fieldsArray => {
    const result = []
    const prevGroups = []

    fieldsArray.forEach(field => {
      if (field.group && !prevGroups.includes(field.group)) {
        prevGroups.push(field.group)
        const widgetsWithGroup = fieldsArray.filter(item => item.group === field.group)
        result.push(getGroupedWidgets(widgetsWithGroup))
      }
    })

    return result
  }

  const parseFieldsToServer = (fieldLabel, widgetsWithLabel) => {
    if (fieldLabel === 'certificates') {
      const certificates = getCertificates(widgetsWithLabel)
      return certificates.length ? certificates : null
    }

    if (['image', 'social_networks'].includes(fieldLabel)) {
      return getGroups(widgetsWithLabel)
    }
    return getGroupedWidgets(widgetsWithLabel)
  }

  const getHeaderById = useCallback(
    id => {
      const findElement =
        preview && preview.header && preview.header.length && preview.header.find(head => head.id === id)
      if (findElement) {
        return findElement.header
      }
      return null
    },
    [preview]
  )

  const onSubmit = useCallback(() => {
    if (!mappingColumns.gtin_field) {
      return toast.error(intl.get('importProducts.gtinErrorMessage'))
    }

    if (!mappingColumns.name) {
      return toast.error(intl.get('importProducts.nameErrorMessage'))
    }

    let certificateError = null
    const hasConditions = conditions &&
      ((conditions.languages && conditions.languages.length) ||
        (conditions.countries && conditions.countries.length)) && { ...conditions }
    const allFieldsForImport = fields && fields.filter(field => field[Object.keys(field)[0]].isImport)
    const fieldsForImport = []

    allFieldsForImport.forEach((el, index) => {
      fieldsForImport.push({ ...el[Object.keys(el)[0]], index })
    })

    const isEmptyFields = fieldsForImport.some(el => !el.widget || !el.field)

    if (isEmptyFields) {
      return toast.error(intl.get('importProducts.errorWithWidgets'))
    }

    let widgetsForImport = []

    fieldsLabel.forEach(fieldLabel => {
      const widgetsWithLabel = fieldsForImport.filter(el => fieldLabel === el.widget)
      if (widgetsWithLabel && widgetsWithLabel.length) {
        const result = parseFieldsToServer(fieldLabel, widgetsWithLabel)
        let indexes = widgetsWithLabel.map(item => item.index)
        if (!result) {
          certificateError = intl.get('importProducts.errorCertificates')
        } else {
          result.forEach(el => {
            widgetsForImport = [...widgetsForImport, { [fieldLabel]: el, index: indexes[0] }]
            indexes = indexes.slice(el.length || 1, indexes.length)
          })
        }
      }
    })

    if (certificateError) {
      return toast.error(certificateError)
    }

    if (!widgetsForImport.length) {
      return toast.error(intl.get('importProducts.errorMessage'))
    }

    const sortedWidgetsForImport = widgetsForImport
      .sort((firstItem, secondItem) => {
        if (firstItem.index > secondItem.index) {
          return 1
        }

        if (firstItem.index < secondItem.index) {
          return -1
        }

        return 0
      })
      .map(item => {
        const widget = { ...item }
        delete widget.index
        return widget
      })

    const request = {
      ...values,
      widgets: sortedWidgetsForImport,
      name: [getHeaderById(mappingColumns.name)],
      brand: (mappingColumns.brand && getHeaderById(mappingColumns.brand)) || undefined,
      gtin_field: getHeaderById(mappingColumns.gtin_field),
      gpc_class_field: (mappingColumns.gpc_class_field && getHeaderById(mappingColumns.gpc_class_field)) || undefined,
      gpc_brick_field: (mappingColumns.gpc_brick_field && getHeaderById(mappingColumns.gpc_brick_field)) || undefined,
      gpc_family_field:
        (mappingColumns.gpc_family_field && getHeaderById(mappingColumns.gpc_family_field)) || undefined,
      gpc_segment_field:
        (mappingColumns.gpc_segment_field && getHeaderById(mappingColumns.gpc_segment_field)) || undefined,
      conditions: {
        ...(hasConditions
          ? {
              country: hasConditions.countries.length
                ? hasConditions.countries.map(item => countries.find(country => country[name] === item).iso)
                : undefined
            }
          : null),
        ...(hasConditions
          ? {
              language: hasConditions.languages.length
                ? hasConditions.languages.map(item => languages.find(language => language[name] === item).code)
                : undefined
            }
          : null)
      }
    }

    return productsPostImportStart(request)
  }, [fields, values, getHeaderById])

  return (
    <ST.StyledForm>
      <ST.MainHeader>
        {`${intl.get('importProducts.importWithCsv')}:`}
        &nbsp;
        {currentStep === 1 ? intl.get('importProducts.uploadHeading') : intl.get('importProducts.columnMapping')}
      </ST.MainHeader>
      {isImportLoading ? (
        <Loader />
      ) : (
        <>
          {currentStep === 1 ? (
            <ProductImportSettings
              preview={preview}
              watch={watch}
              register={register}
              setValue={setValue}
              values={values}
              isImportLoading={isImportLoading}
              postUpload={postUpload}
              lastUploaded={lastUploaded}
              countries={countries}
              languages={languages}
              isLoadingCountries={isLoadingCountries}
              isLoadingLanguages={isLoadingLanguages}
              conditions={conditions}
              setConditions={setConditions}
            />
          ) : (
            <ProductImportMapping
              header={preview && preview.header}
              setFields={setFields}
              fields={fields}
              onDragEnd={onDragEnd}
              setMappingColumns={setMappingColumns}
              mappingColumns={mappingColumns}
            />
          )}
          {preview && (
            <ST.ButtonsWrapper>
              <div>
                {currentStep > 1 && (
                  <Button size='large' onClick={() => setCurrentStep(currentStep - 1)}>
                    {intl.get('importProducts.mapping.back')}
                  </Button>
                )}
                <Button
                  type='danger'
                  size='large'
                  onClick={currentStep === 1 ? () => setCurrentStep(currentStep + 1) : onSubmit}
                >
                  {currentStep === 1
                    ? intl.get('importProducts.toFormatLabel')
                    : intl.get('importProducts.mapping.startImport')}
                </Button>
              </div>
            </ST.ButtonsWrapper>
          )}
        </>
      )}
    </ST.StyledForm>
  )
}

ProductImport.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  preview: PropTypes.object,
  postUploadClear: PropTypes.func.isRequired,
  productsClearPreview: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  lastUploaded: PropTypes.object,
  productsPostPreview: PropTypes.func.isRequired,
  isImportLoading: PropTypes.bool,
  postUpload: PropTypes.func.isRequired,
  productsPutColumn: PropTypes.func.isRequired,
  productsPutRows: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  languages: PropTypes.arrayOf(PropTypes.object),
  isLoadingCountries: PropTypes.bool,
  isLoadingLanguages: PropTypes.bool,
  settingsGetCountries: PropTypes.func.isRequired,
  settingsGetLanguages: PropTypes.func.isRequired,
  productsPostImportStart: PropTypes.func.isRequired,
  updated: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
}

ProductImport.defaultProps = {
  countries: [],
  languages: [],
  preview: null,
  lastUploaded: null,
  isImportLoading: false,
  isLoadingCountries: false,
  isLoadingLanguages: false,
  updated: false
}
export default withRouter(ProductImport)

import { connect } from 'react-redux'
import {
  postUploadClear,
  productsClearPreview,
  productsPostPreview,
  postUpload,
  productsPutColumn,
  productsPutRows,
  settingsGetCountries,
  settingsGetLanguages,
  productsPostImportStart
} from 'store/actions'
import ProductsImport from './ProductsImport'

const mapStateToProps = state => ({
  preview: state.productImport.preview,
  isImportLoading: state.productImport.isImportLoading,
  updated: state.productImport.updated,
  lastUploaded: state.upload.lastUploaded,
  countries: state.settings.countries,
  languages: state.settings.languages,
  isLoadingCountries: state.settings.isLoadingCountries,
  isLoadingLanguages: state.settings.isLoadingLanguages
})
export default connect(mapStateToProps, {
  postUploadClear,
  productsClearPreview,
  productsPostPreview,
  postUpload,
  productsPutColumn,
  productsPutRows,
  settingsGetCountries,
  settingsGetLanguages,
  productsPostImportStart
})(ProductsImport)

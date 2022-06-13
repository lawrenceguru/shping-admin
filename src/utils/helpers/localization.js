import intl from 'react-intl-universal'

// eslint-disable-next-line import/prefer-default-export
export const localizationDefaultIndexFields = defaultIndexFields => {
  const localizeFields = defaultIndexFields.map(el => {
    if (el.fieldId === 'company_prefix') {
      return { ...el, columnName: intl.get('serializedProductsPage.companyPrefix') }
    }
    if (el.fieldId === 'num_brand_sources') {
      return { ...el, columnName: intl.get('serializedProductsPage.numBrandSources') }
    }
    if (el.fieldId === 'serial_number') {
      return { ...el, columnName: intl.get('serializedProductsPage.serialNumber') }
    }
    if (el.fieldId === 'date_created') {
      return { ...el, columnName: intl.get('serializedProductsPage.dateCreated') }
    }
    if (el.fieldId === 'issuer') {
      return { ...el, columnName: intl.get('serializedProductsPage.issuer') }
    }
    if (el.fieldId === 'owner') {
      return { ...el, columnName: intl.get('serializedProductsPage.owner') }
    }
    if (el.fieldId === 'task') {
      return { ...el, columnName: intl.get('serializedProductsPage.task') }
    }
    if (el.fieldId === 'aggregation_task') {
      return { ...el, columnName: intl.get('serializedProductsPage.aggregationTask') }
    }
    if (el.fieldId === 'brand_id') {
      return { ...el, columnName: intl.get('serializedProductsPage.brand') }
    }
    if (el.fieldId === 'circulation_status') {
      return { ...el, columnName: intl.get('serializedProductsPage.status') }
    }
    if (el.fieldId === 'code') {
      return { ...el, columnName: intl.get('serializedProductsPage.code') }
    }
    if (el.fieldId === 'custody') {
      return { ...el, columnName: intl.get('serializedProductsPage.custody') }
    }
    if (el.fieldId === 'datamatrix_code') {
      return { ...el, columnName: intl.get('serializedProductsPage.datamatrixCode') }
    }
    if (el.fieldId === 'gpc_brick') {
      return { ...el, columnName: intl.get('serializedProductsPage.gpcBrick') }
    }
    if (el.fieldId === 'gpc_class') {
      return { ...el, columnName: intl.get('serializedProductsPage.gpcClass') }
    }
    if (el.fieldId === 'gpc_family') {
      return { ...el, columnName: intl.get('serializedProductsPage.gpcFamily') }
    }
    if (el.fieldId === 'gpc_segment') {
      return { ...el, columnName: intl.get('serializedProductsPage.gpcSegment') }
    }
    if (el.fieldId === 'num_contributor_sources') {
      return { ...el, columnName: intl.get('serializedProductsPage.numContributorSources') }
    }
    if (el.fieldId === 'num_expert_sources') {
      return { ...el, columnName: intl.get('serializedProductsPage.numExpertSources') }
    }
    if (el.fieldId === 'num_gs1_sources') {
      return { ...el, columnName: intl.get('serializedProductsPage.numGs1Sources') }
    }
    if (el.fieldId === 'num_retailer_sources') {
      return { ...el, columnName: intl.get('serializedProductsPage.numRetailerSources') }
    }
    if (el.fieldId === 'user_reviews') {
      return { ...el, columnName: intl.get('serializedProductsPage.userReviews') }
    }
    if (el.fieldId === 'user_reviews_rate') {
      return { ...el, columnName: intl.get('serializedProductsPage.userReviewsRate') }
    }
    if (el.fieldId === 'user_scans') {
      return { ...el, columnName: intl.get('serializedProductsPage.userScans') }
    }
    return { ...el }
  })
  return localizeFields
}

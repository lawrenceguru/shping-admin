/* eslint-disable import/prefer-default-export */
export const calcTotalConversionRate = ({ advClicks, impressions }) => {
  return Number((parseFloat(advClicks / impressions).toFixed(2) * 100).toFixed())
}

export const calcBuyingIntentConversionRate = ({ whereToBuyClicks = 0, buyNowClicks = 0, productPageHits = 0 }) => {
  return Number((((whereToBuyClicks + buyNowClicks) / productPageHits).toFixed(2) * 100).toFixed())
}

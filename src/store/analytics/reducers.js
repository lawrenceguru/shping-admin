import {
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAIL,
  GET_BRAND_SALES,
  GET_BRAND_SALES_SUCCESS,
  GET_BRAND_SALES_FAIL,
  GET_CAMPAIGNS,
  GET_CAMPAIGNS_SUCCESS,
  GET_CAMPAIGNS_FAIL,
  GET_CAMPAIGNS_CHART,
  GET_CAMPAIGNS_CHART_SUCCESS,
  GET_CAMPAIGNS_CHART_FAIL,
  GET_REWARDS_INDICATORS,
  GET_REWARDS_INDICATORS_SUCCESS,
  GET_REWARDS_INDICATORS_FAIL
} from './actions'
import { convertFromUint256 } from '../../utils/helpers/mathOperations'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state
      }
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: payload.countries
      }
    case GET_COUNTRIES_FAIL:
      return {
        ...state,
        countries: []
      }
    case GET_BRAND_SALES:
      return {
        ...state
      }
    case GET_BRAND_SALES_SUCCESS:
      return {
        ...state,
        infoSales: payload.infoSales
      }
    case GET_BRAND_SALES_FAIL:
      return {
        ...state,
        infoSales: []
      }
    case GET_CAMPAIGNS:
      return {
        ...state
      }
    case GET_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        campaigns: payload.campaigns
      }
    case GET_CAMPAIGNS_FAIL:
      return {
        ...state,
        campaigns: []
      }
    case GET_CAMPAIGNS_CHART:
      return {
        ...state,
        isCharLoading: true
      }
    case GET_CAMPAIGNS_CHART_SUCCESS:
      return {
        ...state,
        chart: payload.data,
        chartGroupBy: payload.by,
        isCharLoading: false
      }
    case GET_CAMPAIGNS_CHART_FAIL:
      return {
        ...state,
        isCharLoading: false
      }
    case GET_REWARDS_INDICATORS:
      return {
        ...state
      }
    case GET_REWARDS_INDICATORS_SUCCESS:
      return {
        ...state,
        indicators: {
          impressions: payload.num_impressions || 0,
          issued: payload.num_issued || 0,
          coins: convertFromUint256(payload.coins) || 0
        }
      }
    case GET_REWARDS_INDICATORS_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}

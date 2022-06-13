import React, { useEffect, useState, useCallback } from 'react'
import { Select, Button, Icon, Input } from 'antd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import moment from 'moment'
import { FilterBlock, InputContainer } from './styles'
import RangePickerWithPeriod from '../../molecules/RangePickerWithPeriod'

const { Option } = Select

const FilterPanel = ({
  selectRange,
  selectBrand,
  selectCountry,
  selectFirstDate,
  selectSecondDate,
  selectGtin,
  selectCity,
  selectState,
  selectPostcode,
  countries,
  filterAnalyticsSetSelectRange,
  filterAnalyticsSetSelectCountry,
  filterAnalyticsGetRangesDates,
  analyticsGetCountries,
  filterAnalyticsSetCity,
  filterAnalyticsSetPostcode,
  filterAnalyticsSetState,
  filterAnalyticsSetSelectBrand,
  setModal,
  isCityInputShow,
  indexFieldsProductsGetBrands,
  brands,
  isHaveGtinFilter,
  completeList,
  completeListIsLoading,
  getProductCompleteLike,
  filterAnalyticsSetSelectGtin,
  hasRangeFilter,
  hasStateFilter,
  hasPostcodeFilter,
  hasBrandFilter
}) => {
  useEffect(() => {
    analyticsGetCountries()
    indexFieldsProductsGetBrands()
  }, [])
  const [city, setCity] = useState(selectCity === 'any' ? '' : selectCity)
  const [isCityInputDisabled, setIsCityInputDisabled] = useState(selectCountry !== 'any')
  const [state, setState] = useState(selectState === 'any' ? '' : selectState)
  const [isStateInputDisabled, setIsStateInputDisabled] = useState(selectCountry !== 'any')
  const [postcode, setPostcode] = useState(selectPostcode === 'any' ? '' : selectPostcode)
  const onChangeRange = value => {
    filterAnalyticsSetSelectRange(value)
  }
  const onChangeBrand = value => {
    filterAnalyticsSetSelectBrand(value)
  }
  const onChangeCountry = value => {
    filterAnalyticsSetSelectCountry(value)
    if (value !== 'any') {
      setIsCityInputDisabled(true)
      setIsStateInputDisabled(true)
    } else {
      filterAnalyticsSetCity('any')
      setIsCityInputDisabled(false)
      setIsStateInputDisabled(false)
    }
  }
  const onChangeGtin = value => {
    filterAnalyticsSetSelectGtin(value)
  }
  const onChangeCity = event => {
    setCity(event.target.value)
  }
  const onChangeState = event => {
    setState(event.target.value)
  }
  const onChangePostcode = event => {
    setPostcode(event.target.value)
  }
  const onEnterCity = () => {
    filterAnalyticsSetCity(city)
  }
  const onEnterState = () => {
    filterAnalyticsSetState(state)
  }
  const onEnterPostcode = () => {
    filterAnalyticsSetPostcode(postcode)
  }

  const handleRangePickerChange = useCallback(dates => {
    if (dates && dates.length) {
      const formatDates = [dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]
      filterAnalyticsGetRangesDates(formatDates)
    }
  }, [])

  const disabledDate = currValue => moment().startOf('day') <= currValue.startOf('day')

  return (
    <FilterBlock>
      <div>
        <RangePickerWithPeriod
          value={[moment(selectFirstDate), moment(selectSecondDate)]}
          onChange={handleRangePickerChange}
          disabledDate={disabledDate}
        />
        {hasRangeFilter && (
          <Select
            showSearch
            style={{ width: 200 }}
            optionFilterProp='children'
            defaultValue={selectRange}
            value={selectRange}
            onChange={onChangeRange}
            getPopupContainer={trigger => trigger.parentNode}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option className='option' value='get_days'>
              {intl.get('overviewPage.daily')}
            </Option>
            <Option className='option' value='get_weeks'>
              {intl.get('overviewPage.weekly')}
            </Option>
            <Option value='get_months'>{intl.get('overviewPage.monthly')}</Option>
          </Select>
        )}
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder={intl.get('overviewPage.selectCountry')}
          optionFilterProp='children'
          defaultValue={selectCountry}
          value={selectCountry}
          onChange={onChangeCountry}
          getPopupContainer={trigger => trigger.parentNode}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value='any'>{intl.get('overviewPage.anyCountry')}</Option>
          {countries
            ? countries.map(country => (
                <Option key={country.iso} value={country.iso}>
                  {localStorage.getItem('lang') === 'en'
                    ? country.name
                    : country[`name_${localStorage.getItem('lang')}`]}
                </Option>
              ))
            : null}
        </Select>
        {hasBrandFilter && (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder={intl.get('overviewPage.selectBrand')}
            optionFilterProp='children'
            defaultValue={selectBrand}
            value={selectBrand}
            onChange={onChangeBrand}
            getPopupContainer={trigger => trigger.parentNode}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value='any'>{intl.get('overviewPage.allBrands')}</Option>
            {brands
              ? brands.map(brand => (
                  <Option key={brand.id} value={brand.id}>
                    {brand.id}
                  </Option>
                ))
              : null}
          </Select>
        )}
        {isCityInputShow && (
          <InputContainer>
            <Input
              placeholder={intl.get('overviewPage.cityPlaceholder')}
              style={{ width: 200 }}
              value={city}
              defaultValue={city}
              onChange={onChangeCity}
              onPressEnter={onEnterCity}
              disabled={!isCityInputDisabled}
            />
          </InputContainer>
        )}
        {hasStateFilter && (
          <InputContainer>
            <Input
              placeholder={intl.get('overviewPage.statePlaceholder')}
              style={{ width: 200 }}
              value={state}
              defaultValue={state}
              onChange={onChangeState}
              onPressEnter={onEnterState}
              disabled={!isStateInputDisabled}
            />
          </InputContainer>
        )}
        {hasPostcodeFilter && (
          <InputContainer>
            <Input
              placeholder={intl.get('overviewPage.postcodePlaceholder')}
              style={{ width: 200 }}
              value={postcode}
              defaultValue={postcode}
              onChange={onChangePostcode}
              onPressEnter={onEnterPostcode}
            />
          </InputContainer>
        )}
        {isHaveGtinFilter && (
          <Select
            showSearch
            mode='multiple'
            style={{ width: 300 }}
            value={selectGtin}
            loading={completeListIsLoading}
            getPopupContainer={trigger => trigger.parentNode}
            placeholder={intl.get('overviewPage.allGtins')}
            onSearch={value => getProductCompleteLike(value)}
            onChange={onChangeGtin}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {completeList.map(product => (
              <Option style={{ fontSize: 16 }} key={product.value} value={product.value}>
                {product.value}
              </Option>
            ))}
          </Select>
        )}
      </div>
      <div>
        <Button onClick={() => setModal(true)}>
          <Icon type='plus' />
          {intl.get('overviewPage.addWidgets')}
        </Button>
      </div>
    </FilterBlock>
  )
}

FilterPanel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectRange: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  filterAnalyticsSetCity: PropTypes.func,
  filterAnalyticsSetSelectRange: PropTypes.func.isRequired,
  filterAnalyticsSetSelectCountry: PropTypes.func.isRequired,
  filterAnalyticsSetSelectBrand: PropTypes.func.isRequired,
  indexFieldsProductsGetBrands: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  analyticsGetCountries: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
  isCityInputShow: PropTypes.bool,
  brands: PropTypes.arrayOf(PropTypes.object),
  selectCity: PropTypes.string,
  filterAnalyticsGetRangesDates: PropTypes.func.isRequired,
  getProductCompleteLike: PropTypes.func.isRequired,
  completeList: PropTypes.arrayOf(PropTypes.object),
  completeListIsLoading: PropTypes.bool,
  isHaveGtinFilter: PropTypes.bool,
  selectGtin: PropTypes.arrayOf(PropTypes.string),
  filterAnalyticsSetSelectGtin: PropTypes.func.isRequired,
  hasRangeFilter: PropTypes.bool,
  hasPostcodeFilter: PropTypes.bool,
  hasStateFilter: PropTypes.bool,
  hasBrandFilter: PropTypes.bool
}

FilterPanel.defaultProps = {
  brands: [],
  countries: [],
  filterAnalyticsSetCity: () => {},
  isCityInputShow: false,
  selectCity: '',
  completeList: [],
  completeListIsLoading: false,
  isHaveGtinFilter: false,
  selectGtin: null,
  hasRangeFilter: false,
  hasPostcodeFilter: false,
  hasStateFilter: false,
  hasBrandFilter: true
}

export default FilterPanel

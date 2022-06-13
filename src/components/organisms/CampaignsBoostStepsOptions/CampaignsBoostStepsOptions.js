import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Form, Select } from 'antd'
import intl from 'react-intl-universal'
import { RHFInput } from 'react-hook-form-input'
import * as ST from './styles'
import Error from '../../atoms/Error'
import {
  boostShpingLevels,
  boostBuddyInviteFirstOptions,
  boostBuddyInviteNextDayEndOptions,
  boostBuddyRepeatOptions,
  boostBuddyRepeatPeriodOptions
} from './consts'
import RadioGroup from '../../atoms/RadioGroup'
import CustomInputNumber from '../../molecules/CustomInputNumber'

const { Option } = Select

const CampaignsBoostStepsOptions = ({
  values,
  register,
  setValue,
  errors,
  unregister,
  productInfo,
  getProductsInfo,
  isLoadingProductInfo,
  getProductCompleteLike,
  completeList,
  completeListIsLoading
}) => {
  useEffect(() => {
    if (values && values.products && values.products.length) {
      getProductsInfo(values.products)
    }
  }, [])

  return (
    <ST.StyledForm>
      {values && values.method === 'scan' ? (
        <>
          <Form.Item label={intl.get('campaigns.boost.settings.periodMinHeader')}>
            <RHFInput
              as={
                <CustomInputNumber
                  isSelectsDisable={!!(values && values.isReadOnly)}
                  size='large'
                  placeholder={intl.get('campaigns.boost.settings.periodMinPlaceholder')}
                />
              }
              name='period_min'
              register={register}
              unregister={unregister}
              setValue={setValue}
              defaultValue={values && values.period_min}
              rules={{ required: intl.get('todo.cards.form.required') }}
              mode='onChange'
            />
            <Error errors={errors} destination='period_min' />
          </Form.Item>
          {values && !values.first_scan && (
            <Form.Item label={intl.get('campaigns.boost.settings.productsHeader')}>
              <RHFInput
                as={
                  <Select
                    disabled={!!(values && values.isReadOnly)}
                    showSearch
                    size='large'
                    mode='multiple'
                    loading={completeListIsLoading || isLoadingProductInfo}
                    getPopupContainer={trigger => trigger.parentNode}
                    placeholder={intl.get('campaigns.boost.settings.productsPlaceholder')}
                    onSearch={value => getProductCompleteLike(value)}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {[
                      ...productInfo,
                      ...completeList.filter(item => !productInfo.find(element => element.value === item.value))
                    ].map(product => (
                      <Option style={{ fontSize: 16 }} key={product.value} value={product.value}>
                        {product.label}
                      </Option>
                    ))}
                  </Select>
                }
                name='products'
                register={register}
                unregister={unregister}
                setValue={setValue}
                defaultValue={(values && values.products) || []}
                mode='onChange'
              />
              <Error errors={errors} destination='products' />
            </Form.Item>
          )}
          {values && (!values.products || !values.products.length) && (
            <Form.Item>
              <Checkbox
                disabled={!!(values && values.isReadOnly)}
                size='large'
                defaultChecked={values && values.first_scan}
                checked={values && values.first_scan}
                onChange={() => {
                  register({ name: `first_scan` })
                  setValue(`first_scan`, !values.first_scan)
                }}
              >
                {intl.get('campaigns.boost.settings.firstScanHeader')}
              </Checkbox>
              <Error errors={errors} destination='first_scan' />
            </Form.Item>
          )}
          <Form.Item label={intl.get('campaigns.boost.settings.levelHeader')}>
            <RHFInput
              as={
                <Select
                  showSearch
                  disabled={!!(values && values.isReadOnly)}
                  size='large'
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder={intl.get('todo.deliveries.form.selectCountries')}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {boostShpingLevels && boostShpingLevels.length
                    ? boostShpingLevels.map(level => (
                        <Option style={{ fontSize: 16 }} key={level.value} value={level.value}>
                          {level.label}
                        </Option>
                      ))
                    : null}
                </Select>
              }
              name='level'
              register={register}
              unregister={unregister}
              setValue={setValue}
              rules={{ required: intl.get('todo.cards.form.required') }}
              defaultValue={values && values.level}
              mode='onChange'
            />
            <Error errors={errors} destination='level' />
          </Form.Item>
        </>
      ) : (
        <>
          <Form.Item label={intl.get('campaigns.boost.settings.firstHeader')}>
            <RHFInput
              as={<RadioGroup disabled={!!(values && values.isReadOnly)} group={boostBuddyInviteFirstOptions} />}
              name='buddy_invite.first'
              rules={{ required: intl.get('todo.cards.form.required') }}
              register={register}
              unregister={unregister}
              setValue={setValue}
              defaultValue={values && values.buddy_invite && values.buddy_invite.first}
              mode='onChange'
            />
            <Error errors={errors} destination='buddy_invite.first' />
          </Form.Item>
          <Form.Item label={intl.get('campaigns.boost.settings.firstPeriodHeader')}>
            <RHFInput
              as={<RadioGroup disabled={!!(values && values.isReadOnly)} group={boostBuddyInviteNextDayEndOptions} />}
              name='buddy_invite.first_period'
              rules={{ required: intl.get('todo.cards.form.required') }}
              register={register}
              unregister={unregister}
              setValue={setValue}
              defaultValue={values && values.buddy_invite && values.buddy_invite.first_period}
              mode='onChange'
            />
            <Error errors={errors} destination='buddy_invite.first_period' />
          </Form.Item>
          <Form.Item label={intl.get('campaigns.boost.settings.ifMaxLevelHeader')}>
            <RHFInput
              as={<RadioGroup disabled={!!(values && values.isReadOnly)} group={boostBuddyInviteNextDayEndOptions} />}
              name='buddy_invite.if_max_level'
              rules={{ required: intl.get('todo.cards.form.required') }}
              register={register}
              unregister={unregister}
              setValue={setValue}
              defaultValue={values && values.buddy_invite && values.buddy_invite.if_max_level}
              mode='onChange'
            />
            <Error errors={errors} destination='buddy_invite.if_max_level' />
          </Form.Item>
          <Form.Item label={intl.get('campaigns.boost.settings.maxRepeatHeader')}>
            <RHFInput
              as={<CustomInputNumber isSelectsDisable={!!(values && values.isReadOnly)} size='large' />}
              name='buddy_invite.max_repeat'
              rules={{ required: intl.get('todo.cards.form.required') }}
              register={register}
              unregister={unregister}
              setValue={setValue}
              defaultValue={values && values.buddy_invite && values.buddy_invite.max_repeat}
            />
            <Error errors={errors} destination='buddy_invite.max_repeat' />
          </Form.Item>
          <Form.Item label={intl.get('campaigns.boost.settings.repeatHeader')}>
            <RHFInput
              as={<RadioGroup disabled={!!(values && values.isReadOnly)} group={boostBuddyRepeatOptions} />}
              name='buddy_invite.repeat'
              rules={{ required: intl.get('todo.cards.form.required') }}
              register={register}
              unregister={unregister}
              setValue={setValue}
              defaultValue={values && values.buddy_invite && values.buddy_invite.repeat}
              mode='onChange'
            />
            <Error errors={errors} destination='buddy_invite.repeat' />
          </Form.Item>
          <Form.Item label={intl.get('campaigns.boost.settings.repeatPeriodHeader')}>
            <RHFInput
              as={<RadioGroup disabled={!!(values && values.isReadOnly)} group={boostBuddyRepeatPeriodOptions} />}
              name='buddy_invite.repeat_period'
              rules={{ required: intl.get('todo.cards.form.required') }}
              register={register}
              unregister={unregister}
              setValue={setValue}
              defaultValue={values && values.buddy_invite && values.buddy_invite.repeat_period}
              mode='onChange'
            />
            <Error errors={errors} destination='buddy_invite.repeat_period' />
          </Form.Item>
        </>
      )}
    </ST.StyledForm>
  )
}

CampaignsBoostStepsOptions.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  productInfo: PropTypes.arrayOf(PropTypes.object),
  getProductsInfo: PropTypes.func.isRequired,
  isLoadingProductInfo: PropTypes.bool,
  getProductCompleteLike: PropTypes.func.isRequired,
  completeList: PropTypes.arrayOf(PropTypes.object),
  completeListIsLoading: PropTypes.bool,
  unregister: PropTypes.func.isRequired
}

CampaignsBoostStepsOptions.defaultProps = {
  completeList: [],
  completeListIsLoading: false,
  values: null,
  errors: null,
  productInfo: [],
  isLoadingProductInfo: false
}

export default CampaignsBoostStepsOptions

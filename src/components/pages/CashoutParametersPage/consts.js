import intl from 'react-intl-universal'

export const sections = [
  'api',
  'cashout',
  'topup',
  'fake_inspector',
  'market_making',
  'cashout_booster',
  'banks_holidays'
]

export const fields = {
  api: [
    {
      type: 'checkbox',
      name: 'api.enabled',
      placeholder: intl.get('cashout.api.enabled')
    },
    {
      type: 'tags',
      name: 'api.cors',
      placeholder: intl.get('cashout.api.cors')
    }
  ],
  cashout: [
    {
      type: 'checkbox',
      name: 'cashout.enabled',
      placeholder: intl.get('cashout.cashout.enabled')
    },
    {
      type: 'checkbox',
      name: 'cashout.fake_mode',
      placeholder: intl.get('cashout.cashout.fake_mode')
    },
    {
      type: 'checkbox',
      name: 'cashout.use_mock_price',
      placeholder: intl.get('cashout.cashout.use_mock_price')
    },
    {
      type: 'input',
      name: 'cashout.shping_eth_mock_price',
      placeholder: intl.get('cashout.cashout.shping_eth_mock_price')
    },
    {
      type: 'input',
      name: 'cashout.eth_usd_mock_price',
      placeholder: intl.get('cashout.cashout.eth_usd_mock_price')
    },
    {
      type: 'tags',
      name: 'cashout.aba_recipients',
      placeholder: intl.get('cashout.cashout.aba_recipients')
    },
    {
      type: 'tags',
      name: 'cashout.uff_recipients',
      placeholder: intl.get('cashout.cashout.uff_recipients')
    },
    {
      type: 'input',
      name: 'cashout.estimate_aud_price_edge',
      placeholder: intl.get('cashout.cashout.estimate_aud_price_edge')
    },
    {
      type: 'input',
      name: 'cashout.own_fee',
      placeholder: intl.get('cashout.cashout.own_fee')
    },
    {
      type: 'input',
      name: 'cashout.gas_percent',
      placeholder: intl.get('cashout.cashout.gas_percent')
    },
    {
      type: 'input',
      name: 'cashout.transaction_fee',
      placeholder: intl.get('cashout.cashout.transaction_fee')
    }
  ],
  topup: [
    {
      type: 'checkbox',
      name: 'topup.enabled',
      placeholder: intl.get('cashout.topup.enabled')
    },
    {
      type: 'checkbox',
      name: 'topup.fake_mode',
      placeholder: intl.get('cashout.topup.fake_mode')
    },
    {
      type: 'tags',
      name: 'topup.alert_recipients',
      placeholder: intl.get('cashout.topup.alert_recipients')
    }
  ],
  fake_inspector: [
    {
      type: 'checkbox',
      name: 'topup.enabled',
      placeholder: intl.get('cashout.topup.enabled')
    },
    {
      type: 'tags',
      name: 'fake_inspector.notification_recipients',
      placeholder: intl.get('cashout.fake_inspector.notification_recipients')
    }
  ],
  market_making: [
    {
      type: 'checkbox',
      name: 'market_making.enabled',
      placeholder: intl.get('cashout.market_making.timex.enabled')
    },
    {
      type: 'checkbox',
      name: 'market_making.fake_mode',
      placeholder: intl.get('cashout.market_making.timex.fake_mode')
    },
    {
      type: 'input',
      name: 'market_making.timer',
      placeholder: intl.get('cashout.market_making.timex.timer')
    },
    {
      type: 'input',
      name: 'market_making.sell_time_counter',
      placeholder: intl.get('cashout.market_making.timex.sell_time_counter')
    },
    {
      type: 'input',
      name: 'market_making.buy_time_counter',
      placeholder: intl.get('cashout.market_making.timex.buy_time_counter')
    },
    {
      type: 'input',
      name: 'market_making.aud_balance',
      placeholder: intl.get('cashout.market_making.timex.aud_balance')
    },
    {
      type: 'input',
      name: 'market_making.buy_order_percent',
      placeholder: intl.get('cashout.market_making.timex.buy_order_percent')
    },
    {
      type: 'input',
      name: 'market_making.balance_check_interval',
      placeholder: intl.get('cashout.market_making.timex.balance_check_interval')
    },
    {
      type: 'input',
      name: 'market_making.balance_threshold_in_percent',
      placeholder: intl.get('cashout.market_making.timex.balance_threshold_in_percent')
    },
    // {
    //   type: 'input',
    //   name: 'market_making.trading_range_min',
    //   placeholder: intl.get('cashout.market_making.trading_range_min')
    // },
    {
      type: 'twoInputs',
      name: 'market_making.trading_range',
      placeholder: intl.get('cashout.market_making.timex.trading_range')
    }
  ],
  market_making_liquid_header: [
    {
      type: 'checkbox',
      name: 'liquid.enabled',
      placeholder: intl.get('cashout.market_making.liquid.enabled')
    },
    {
      type: 'checkbox',
      name: 'liquid.start_bot',
      placeholder: intl.get('cashout.market_making.liquid.start_bot')
    },
    {
      type: 'checkbox',
      name: 'liquid.fake_mode',
      placeholder: intl.get('cashout.market_making.liquid.fake_mode')
    },
    {
      type: 'text',
      name: 'liquid.cors',
      placeholder: intl.get('cashout.market_making.liquid.cors')
    },
    {
      type: 'text',
      name: 'liquid.currencyPairs',
      placeholder: intl.get('cashout.market_making.liquid.currencyPairs')
    }
  ],
  market_making_liquid_default: [
    {
      type: 'input',
      name: 'liquid.default_spread_diff',
      placeholder: intl.get('cashout.market_making.liquid.spread_diff')
    },
    {
      type: 'input',
      name: 'liquid.default_ask_increase',
      placeholder: intl.get('cashout.market_making.liquid.ask_increase')
    },
    {
      type: 'input',
      name: 'liquid.default_min_ask_sum',
      placeholder: intl.get('cashout.market_making.liquid.min_ask_sum')
    },
    {
      type: 'input',
      name: 'liquid.default_max_ask_sum',
      placeholder: intl.get('cashout.market_making.liquid.max_ask_sum')
    },
    {
      type: 'input',
      name: 'liquid.default_bid_decrease',
      placeholder: intl.get('cashout.market_making.liquid.bid_decrease')
    },
    {
      type: 'input',
      name: 'liquid.default_min_bid_sum',
      placeholder: intl.get('cashout.market_making.liquid.min_bid_sum')
    },
    {
      type: 'input',
      name: 'liquid.default_max_bid_sum',
      placeholder: intl.get('cashout.market_making.liquid.max_bid_sum')
    }
  ],
  market_making_liquid_pair1: [
    {
      type: 'input',
      name: 'liquid.pair1_id',
      placeholder: intl.get('cashout.market_making.liquid.id')
    },
    {
      type: 'hidden',
      name: 'liquid.pair1_status'
    },
    {
      type: 'text',
      name: 'liquid.pair1_currencyPair',
      placeholder: intl.get('cashout.market_making.liquid.pair')
    },
    {
      type: 'text',
      name: 'liquid.pair1_currency',
      placeholder: intl.get('cashout.market_making.liquid.currency')
    },
    {
      type: 'input',
      name: 'liquid.pair1_spread_diff',
      placeholder: intl.get('cashout.market_making.liquid.spread_diff')
    },
    {
      type: 'input',
      name: 'liquid.pair1_ask_increase',
      placeholder: intl.get('cashout.market_making.liquid.ask_increase')
    },
    {
      type: 'input',
      name: 'liquid.pair1_min_ask_sum',
      placeholder: intl.get('cashout.market_making.liquid.min_ask_sum')
    },
    {
      type: 'input',
      name: 'liquid.pair1_max_ask_sum',
      placeholder: intl.get('cashout.market_making.liquid.max_ask_sum')
    },
    {
      type: 'input',
      name: 'liquid.pair1_bid_decrease',
      placeholder: intl.get('cashout.market_making.liquid.bid_decrease')
    },
    {
      type: 'input',
      name: 'liquid.pair1_min_bid_sum',
      placeholder: intl.get('cashout.market_making.liquid.min_bid_sum')
    },
    {
      type: 'input',
      name: 'liquid.pair1_max_bid_sum',
      placeholder: intl.get('cashout.market_making.liquid.max_bid_sum')
    }
  ],
  market_making_liquid_pair2: [
    {
      type: 'input',
      name: 'liquid.pair2_id',
      placeholder: intl.get('cashout.market_making.liquid.id')
    },
    {
      type: 'hidden',
      name: 'liquid.pair2_status'
    },
    {
      type: 'text',
      name: 'liquid.pair2_currencyPair',
      placeholder: intl.get('cashout.market_making.liquid.pair')
    },
    {
      type: 'text',
      name: 'liquid.pair2_currency',
      placeholder: intl.get('cashout.market_making.liquid.currency')
    },
    {
      type: 'input',
      name: 'liquid.pair2_spread_diff',
      placeholder: intl.get('cashout.market_making.liquid.spread_diff')
    },
    {
      type: 'input',
      name: 'liquid.pair2_ask_increase',
      placeholder: intl.get('cashout.market_making.liquid.ask_increase')
    },
    {
      type: 'input',
      name: 'liquid.pair2_min_ask_sum',
      placeholder: intl.get('cashout.market_making.liquid.min_ask_sum')
    },
    {
      type: 'input',
      name: 'liquid.pair2_max_ask_sum',
      placeholder: intl.get('cashout.market_making.liquid.max_ask_sum')
    },
    {
      type: 'input',
      name: 'liquid.pair2_bid_decrease',
      placeholder: intl.get('cashout.market_making.liquid.bid_decrease')
    },
    {
      type: 'input',
      name: 'liquid.pair2_min_bid_sum',
      placeholder: intl.get('cashout.market_making.liquid.min_bid_sum')
    },
    {
      type: 'input',
      name: 'liquid.pair2_max_bid_sum',
      placeholder: intl.get('cashout.market_making.liquid.max_bid_sum')
    }
  ],
  cashout_booster: [
    {
      type: 'div',
      name: '',
      placeholder: intl.get('cashout.cashout_booster.div')
    },
    {
      type: 'input',
      name: 'cashout_booster.basic',
      placeholder: intl.get('cashout.cashout_booster.basic')
    },
    {
      type: 'input',
      name: 'cashout_booster.bronze',
      placeholder: intl.get('cashout.cashout_booster.bronze')
    },
    {
      type: 'input',
      name: 'cashout_booster.silver',
      placeholder: intl.get('cashout.cashout_booster.silver')
    },
    {
      type: 'input',
      name: 'cashout_booster.gold',
      placeholder: intl.get('cashout.cashout_booster.gold')
    },
    {
      type: 'input',
      name: 'cashout_booster.platinum',
      placeholder: intl.get('cashout.cashout_booster.platinum')
    },
    {
      type: 'input',
      name: 'cashout_booster.ambassador',
      placeholder: intl.get('cashout.cashout_booster.ambassador')
    }
  ],
  banks_holidays: [
    {
      type: 'datePicker',
      name: 'banks_holidays.AU',
      placeholder: intl.get('cashout.banks_holidays.AU')
    },
    {
      type: 'datePicker',
      name: 'banks_holidays.SG',
      placeholder: intl.get('cashout.banks_holidays.SG')
    }
  ]
}

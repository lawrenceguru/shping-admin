import React from 'react'
import { storiesOf } from '@storybook/react'
import { withState } from '@dump247/storybook-state'
import { Icon } from 'antd'

import Input from './index'

const FancyIcon = <Icon type='mail' theme='filled' />

storiesOf('Input', module)
  .add(
    'base',
    withState({ value: '' })(({ store }) => (
      <Input
        placeholder='Kindly type here'
        input={{ onChange: e => store.set({ value: e.target.value }), value: store.state.value }}
      />
    ))
  )
  .add(
    'with icon',
    withState({ value: '' })(({ store }) => (
      <Input
        placeholder='Fancy icon here'
        input={{ onChange: e => store.set({ value: e.target.value }), value: store.state.value }}
        iconRight={FancyIcon}
      />
    ))
  )

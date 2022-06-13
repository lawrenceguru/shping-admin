import React from 'react'
import { storiesOf } from '@storybook/react'
import { withState } from '@dump247/storybook-state'

import InputPassword from './index'

storiesOf('InputPassword', module).add(
  'base',
  withState({ value: '' })(({ store }) => (
    <InputPassword
      placeholder='Kindly type here'
      input={{ onChange: e => store.set({ value: e.target.value }), value: store.state.value }}
    />
  ))
)

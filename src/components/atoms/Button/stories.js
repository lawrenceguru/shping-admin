import React from 'react'
import { storiesOf } from '@storybook/react'

import Button from './index'

storiesOf('Button', module)
  .add('base', () => <Button>Hello Button</Button>)
  .add('disabled', () => <Button disabled>Hi, Im disabled</Button>)

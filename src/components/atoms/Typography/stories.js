import React from 'react'
import { storiesOf } from '@storybook/react'

import Typography from './index'

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

storiesOf('Typography', module)
  .add('paragraph', () => <Typography.Paragraph>{text}</Typography.Paragraph>)
  .add('text', () => <Typography.Text mark>Ant Design</Typography.Text>)
  .add('title', () => <Typography.Title level={4}>Level 4 Heading here</Typography.Title>)

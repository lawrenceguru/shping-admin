import React from 'react'
import { Typography } from 'antd'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import * as ST from './styles'

const Tabs = ({ linksList }) => {
  return (
    <ST.TabsHeader>
      {linksList &&
        linksList.map(link => (
          <Link to={link.destination} key={link.destination} onClick={link.onClick || (() => {})}>
            <ST.TabItem isActive={link.isActive}>
              {link.iconType && <ST.StyledIcon type='container' isActive={link.isActive} />}
              <Typography.Text strong>{link.title}</Typography.Text>
            </ST.TabItem>
          </Link>
        ))}
    </ST.TabsHeader>
  )
}

Tabs.propTypes = {
  linksList: PropTypes.arrayOf(PropTypes.object)
}

Tabs.defaultProps = {
  linksList: null
}
export default withRouter(Tabs)

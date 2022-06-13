import React from 'react'
import intl from 'react-intl-universal'
import {
  FundOutlined,
  ProfileOutlined,
  MinusSquareOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined
} from '@ant-design/icons'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DefaultText } from '../../../styles'

const icons = (name = 'fund', handler) =>
  ({
    fund: <FundOutlined style={{ fontSize: '50px' }} onClick={handler} />,
    profile: <ProfileOutlined style={{ fontSize: '50px' }} onClick={handler} />,
    'bar-chart': <BarChartOutlined style={{ fontSize: '50px' }} onClick={handler} />,
    'minus-square': <MinusSquareOutlined style={{ fontSize: '50px' }} onClick={handler} />,
    'line-chart': <LineChartOutlined style={{ fontSize: '50px' }} onClick={handler} />,
    'pie-chart': <PieChartOutlined style={{ fontSize: '50px' }} onClick={handler} />
  }[name])

const StyledWidgetTitle = styled(DefaultText)`
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.65);
  margin: 10px 0;
`

const InformationBlockShape = ({ widgetName, type, removeItem }) => {
  return (
    <div>
      <StyledWidgetTitle>{intl.get(`widgetsNames.${widgetName}`)}</StyledWidgetTitle>
      {icons(type, removeItem)}
    </div>
  )
}

InformationBlockShape.propTypes = {
  widgetName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired
}

export default InformationBlockShape

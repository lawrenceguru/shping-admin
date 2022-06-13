import React, { useEffect, useMemo } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import PieChart from '../../atoms/PieChart'
import { colors } from '../GeographyPieCountries/GeographyPieCountries'

const GeographyPieStates = ({ states, analyticsGetStates, setItem, invisibleItems, ...props }) => {
  useEffect(() => {
    analyticsGetStates()
  }, [])
  const pieStatesNew = useMemo(() => {
    const pieStates = states.map(({ state, scans }, index) =>
      state ? { name: state, y: scans, color: colors[index] } : { name: 'Unknown', y: scans, color: colors[index] }
    )
    let total = 0
    let others = 0
    pieStates.forEach(el => (total += el.scans))
    const result = []
    pieStates.forEach(el => (result.length < 9 ? result.push(el) : (others += el.y)))
    if (others !== 0) {
      result.push({ name: 'Others', y: others, color: '#5553ce' })
    }
    return result
  }, [states])
  return (
    <PieChart
      pieName={intl.get('geographyPage.state')}
      widgetName='state'
      pieData={pieStatesNew}
      setItem={() => setItem({ pageName: 'geographyPage', widgetName: 'state' })}
      invisibleItems={invisibleItems}
      {...props}
    />
  )
}

GeographyPieStates.propTypes = {
  states: PropTypes.arrayOf(PropTypes.object),
  analyticsGetStates: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  invisibleItems: PropTypes.arrayOf(PropTypes.string)
}

GeographyPieStates.defaultProps = {
  states: [],
  invisibleItems: []
}
export default GeographyPieStates

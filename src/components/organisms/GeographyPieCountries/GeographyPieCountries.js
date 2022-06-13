import React, { useEffect, useMemo } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import PieChart from '../../atoms/PieChart'

export const colors = [
  '#50d166',
  '#ff4a4b',
  '#1875f0',
  '#5553ce',
  '#f7cb4e',
  '#1875f0',
  '#b3b3b3',
  '#50d166',
  '#1875f0',
  '#3aa4d2',
  '#5553ce'
]

const GeographyPieCountries = ({
  countries,
  countriesNames,
  analyticsGetCountriesTotal,
  setItem,
  invisibleItems,
  ...props
}) => {
  useEffect(() => {
    analyticsGetCountriesTotal()
  }, [])
  const pieCountriesNew = useMemo(() => {
    let total = 0
    let others = 0
    countries.forEach(el => (total += el.scans))
    const pieCountries = countries.map(el => {
      return {
        name: countriesNames.find(item => item.iso === el.country)
          ? countriesNames.find(item => item.iso === el.country).name
          : null,
        y: el.scans
      }
    })
    // eslint-disable-next-line array-callback-return,consistent-return
    const result = []
    pieCountries.forEach((el, index) =>
      (el.y / total) * 100 >= 0.1 && result.length < 8 ? result.push({ ...el, color: colors[index] }) : (others += el.y)
    )
    if (others !== 0) {
      result.push({ name: 'Others', y: others, color: '#5553ce' })
    }
    return result
  }, [countries, countriesNames])
  return (
    <PieChart
      pieName={intl.get('geographyPage.country')}
      widgetName='country'
      pieData={pieCountriesNew}
      setItem={() => setItem({ pageName: 'geographyPage', widgetName: 'country' })}
      invisibleItems={invisibleItems}
      {...props}
    />
  )
}

GeographyPieCountries.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
  countriesNames: PropTypes.arrayOf(PropTypes.object),
  analyticsGetCountriesTotal: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  invisibleItems: PropTypes.arrayOf(PropTypes.string)
}

GeographyPieCountries.defaultProps = {
  countries: [],
  countriesNames: [],
  invisibleItems: []
}
export default GeographyPieCountries

export function getCurrentPercent(currNumber, prevNumber) {
  if (prevNumber && currNumber) {
    return Number((((currNumber - prevNumber) / prevNumber) * 100).toFixed(2))
  }
  if (!prevNumber && currNumber) {
    return 100
  }
  if (prevNumber && !currNumber) {
    return -100
  }
  return 0
}

export function encodeValue(value) {
  let result
  result = value.toLowerCase().replace(/"/g, "'\"'")
  result = result.toLowerCase().replace(/;/g, '";"')
  result = result.toLowerCase().replace(/,/g, '","')
  return result
}

export const trimToSixDecimalPlaces = val => {
  const valArr = val.toString().split('.')
  const newVal = `${valArr[0]}.${valArr[1].substr(0, 6)}`
  const parseStr = parseFloat(newVal).toString()
  const zeroCount = newVal.length - parseStr.length
  let appendStr = zeroCount === 1 ? '1' : ''

  if (zeroCount > 1) {
    // eslint-disable-next-line no-plusplus
    for (let x = 1; x <= zeroCount; x++) {
      appendStr += x !== zeroCount ? 0 : 1
    }
  }

  return Number(`${parseStr}${appendStr}`)
}

export const intToDecimalDegree = val => {
  return val * 0.000001
}

export const getValueFromName = (name, vals) => {
  let result

  if (name && vals) {
    const nameSplit = name.split('.')

    switch (nameSplit.length) {
      case 1:
        return vals[name]
      case 2:
        return vals[nameSplit[0]] && vals[nameSplit[0]][nameSplit[1]]
      case 3:
        return vals[nameSplit[0]] && vals[nameSplit[0]][nameSplit[1]] && vals[nameSplit[0]][nameSplit[1]][nameSplit[2]]
      default:
        return vals[name]
    }
  }
  return result
}

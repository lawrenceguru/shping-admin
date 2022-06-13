export const toReadableNumber = (bigNumber, decimalDigits = 0) => {
  const readableNumber = bigNumber / 1e18
  return decimalDigits === 0 ? readableNumber : readableNumber.toFixed(decimalDigits).replace(/\.?0+$/, '')
}

export const convertFromUint256 = num => {
  return num > 1e10 ? Number(toReadableNumber(num)) : num
}

export const noExponents = floatNumber => {
  if (!floatNumber) {
    return '0'
  }
  const data = floatNumber.toString().split(/[eE]/)
  if (data.length === 1) {
    return data[0]
  }

  let z = ''
  const sign = this < 0 ? '-' : ''
  const str = data[0].replace('.', '')
  let mag = Number(data[1]) + 1

  if (mag < 0) {
    z = `${sign}0.`
    // eslint-disable-next-line no-plusplus
    while (mag++) z += '0'
    // eslint-disable-next-line no-useless-escape
    return z + str.replace(/^\-/, '')
  }
  mag -= str.length
  // eslint-disable-next-line no-plusplus
  while (mag--) z += '0'
  return str + z
}

export const normalizeFloat = value => {
  if (!value) {
    return '0'
  }
  const data = value.toString().split('.')
  let result

  if (data.length > 1) {
    const secondPartLength = data[1].length
    // eslint-disable-next-line no-restricted-properties
    const lengthNulls = Math.pow(10, 18 - secondPartLength)
      .toString()
      .substring(1)
    result = lengthNulls && lengthNulls.length === 18 ? data[0] + data[1] : data[0] + data[1] + lengthNulls
  } else {
    result = `${data.toString()}000000000000000000`
  }

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
      // eslint-disable-next-line no-unused-expressions
      x !== zeroCount ? (appendStr += 0) : (appendStr += 1)
    }
  }

  return Number(`${parseStr}${appendStr}`)
}

export const decimalDegreeToInt = val => {
  return parseInt(val * 1000000, 10)
}

export const intToDecimalDegree = val => {
  return val * 0.000001
}

export const updateLocationVal = pos =>
  pos.toString().indexOf('.') !== -1 ? trimToSixDecimalPlaces(pos) : intToDecimalDegree(pos)

import intl from 'react-intl-universal'

export const isValidString = (str, excludeEmptyString = true) => {
  const isEmpty = excludeEmptyString ? str && str.trim() !== '' : true
  return str ? isEmpty : false
}

export const required = value => {
  if (value) {
    if (Array.isArray(value)) {
      return value.length > 0 ? undefined : intl.get('validation.required')
    }
    return value !== 0 || value.toString().trim() !== '' ? undefined : intl.get('validation.required')
  }

  return intl.get('validation.required')
}

export const a = 1

export const validateEmail = (value, clearError, setError) => {
  clearError('email')
  // eslint-disable-next-line no-useless-escape,max-len
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(String(value).toLowerCase())) {
    setError('email', 'notMatch', intl.get('validation.supplyChain.emailIsNotValid'))
  }
}

export const validatePhone = (value, clearError, setError) => {
  clearError('phone')
  const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
  if (!re.test(String(value).toLowerCase())) {
    setError('phone', 'notMatch', intl.get('validation.supplyChain.phoneIsNotValid'))
  }
}

export const getCheckDigit = number => {
  const reverse = Array.from(number.replace(/,/gi, '')).reverse()
  const multiply = reverse.map((digit, i) => ((i + 2) % 2 === 0 ? digit * 3 : Number(digit)))
  const sum = String(multiply.reduce((acc, digit) => acc + digit, 0))
  const checkDigit = 10 - sum.charAt(sum.length - 1)

  return checkDigit === 10 ? 0 : checkDigit
}

export const checkCompanyPrefixNotRequired = (values, participants, clearError, setError, errors) => {
  clearError('gln')
  const re = /^[0-9]*$/
  if (!re.test(String(values).toLowerCase())) {
    setError('gln', 'notMatch', intl.get('validation.supplyChain.glnIsInvalid'))
    return null
  }
  const companyPrefixes = participants && participants.find(el => el.company_prefix).company_prefix

  if (!values || !companyPrefixes || companyPrefixes.indexOf('*') !== -1) {
    clearError('gln')
  }

  const compare = companyPrefix => values.indexOf(companyPrefix) === 0
  const [firstPrefix] = companyPrefixes
  const msgIfSeveralPrefixes =
    intl.get('validation.supplyChain.severalPrefixesShortDesc', {
      length: firstPrefix.length
    }) + companyPrefixes.join(', ')
  const msgIfOnlyOnePrefix = intl.get('validation.supplyChain.onePrefixShortDesc', {
    length: firstPrefix.length,
    firstPrefix
  })

  if (values.length < 12) {
    if (!companyPrefixes.some(compare)) {
      if (companyPrefixes.length === 1) {
        setError('gln', 'notMatch', msgIfOnlyOnePrefix)
      } else {
        setError('gln', 'notMatch', msgIfSeveralPrefixes)
      }
    }
  }
  if (values.length === 12 || values.length === 13 || values.length === 14) {
    const idIsValid = companyPrefixes.some(cp => values.indexOf(cp) === (values.length === 14 ? 1 : 0))
    if (!idIsValid) {
      if (companyPrefixes.length === 1) {
        setError('gln', 'notMatch', msgIfOnlyOnePrefix)
      } else {
        setError('gln', 'notMatch', msgIfSeveralPrefixes)
      }
    }
  }
  const checkDigit = values
    ? getCheckDigit(
        String(
          values
            .toString()
            .split('')
            .splice(0, [values.length - 1])
        )
      )
    : null
  const blocker = errors && errors.gln && errors.gln.message.includes('First')
  if (!blocker) {
    if (values && values.length > 0 && values.length < 13) {
      setError('gln', 'notMatch', intl.get('validation.supplyChain.glnIsShort'))
    }
  }
  if (values && values.length === 14 && Number(values[values.length - 1]) !== checkDigit) {
    setError('gln', 'notMatch', intl.get('validation.supplyChain.glnIsIncorrect'))
  } else if (values && values.length > 14) {
    setError('gln', 'notMatch', intl.get('validation.supplyChain.glnIsLong'))
  }

  if (values === '') {
    clearError('gln')
  }
  return null
}

export const greaterThanZero = (value, setError, clearError, el, i) => {
  clearError(`serialization.AdditionalTypes[${i}].${el}`)
  const condition = value !== undefined && value !== '' && Number(value) <= 0

  return condition ? setError(`serialization.AdditionalTypes[${i}].${el}`, 'notMatch', 'Not valid') : null
}

export const alphaNumeric = (value, setError, clearError, el, i) => {
  clearError(`serialization.AdditionalTypes[${i}].${el}`)
  if (!value || value.trim() === '') return intl.get('validation.required')

  const condition = typeof value === 'string' && value.match(/^[a-zA-Z0-9]+$/m)

  return condition ? null : setError(`serialization.AdditionalTypes[${i}].${el}`, 'notMatch', 'Latin characters only')
}

export const AdditionalSelectValidation = (values, i) => {
  if (
    values &&
    values.serialization &&
    values.serialization.AdditionalTypes &&
    values.serialization.AdditionalTypes[i].type &&
    values.serialization.AdditionalTypes[i].type.length === 0
  )
    return false
  return !!(values && values.serialization.AdditionalTypes[i].type <= 17)
}

export const maxChar = (limit, value) => {
  if (value.length <= limit) {
    return value
  }

  return value.substring(0, limit)
}

export const onlyFloat = value => {
  const separators = [',', '.']
  const val = value.replace(/[^0-9.,]+$/g, '').replace(/\s+/g, '')

  if (val.includes(separators[0]) && val.includes(separators[1])) {
    return val.substring(0, val.length - 1)
  }

  const separator = val.includes(separators[0]) ? separators[0] : separators[1]
  if (val.split(separator).length < 2) {
    return val
  }

  return val
    .split(separator)
    .slice(0, 2)
    .join(separator)
}

export const floatLimit = (limit, value) => {
  if (value === '') return value

  const val = parseFloat(onlyFloat(value))

  return val <= limit ? onlyFloat(value) : value.substring(0, 6)
}

export const is240 = value => value === '240'

export const is9199 = value => +value > 90 && +value < 100

export const validateAdditionAttr = (el, value, values, setError, clearError, setValue, handleValueChange, i) => {
  if (
    is240(values && values.serialization.AdditionalTypes[i].type) ||
    is9199(values && values.serialization.AdditionalTypes[i].type)
  ) {
    alphaNumeric(value, setError, clearError, el, i)
  } else {
    greaterThanZero(value, setError, clearError, el, i)
  }
  if (is9199(values && values.serialization.AdditionalTypes[i].type)) {
    handleValueChange(maxChar(90, value), el, i)
  }
  if (
    !is240(values && values.serialization.AdditionalTypes[i].type) &&
    !is9199(values && values.serialization.AdditionalTypes[i].type)
  ) {
    handleValueChange(floatLimit(1000000, value), el, i)
  }
  if (is240(values && values.serialization.AdditionalTypes[i].type)) {
    handleValueChange(maxChar(30, value), el, i)
  }
}

export const validateLength = (el, value, number, setValue, handleValueChange) => {
  let val
  if (Number(value) > number) {
    val = ''
  } else {
    val = value
  }
  setValue(el, val)
  handleValueChange(el, val)
  return null
}

export const checkValueLength = (event, maxLength) => {
  if (event.target.value && event.target.value.length && event.target.value.length >= maxLength) {
    event.stopPropagation()
    event.preventDefault()
  }
}

export const validateGraterThenZeroForFloat = value => {
  return value ? parseFloat(value) > 0 || intl.get('todo.cards.form.coinsField.minValueErrorMessage') : true
}

export const validateGraterThenZero = value => {
  return value ? parseInt(value, 10) > 0 || intl.get('todo.cards.form.coinsField.minValueErrorMessage') : true
}

export const validateMaxLengthForFloat = value => {
  if (!value) {
    return true
  }
  const splitValue = value.toString().split('.')
  let valid = true
  if (splitValue.length > 1) {
    valid = splitValue[0].length <= 10 && splitValue[1].length <= 18
  } else {
    valid = splitValue[0].length <= 10
  }
  return valid || intl.get('todo.cards.form.coinsField.minValueErrorMessage')
}

const checkGTINLength = id => (id && id.length < 14 ? intl.get('reviews.validation.gtin.numberTooShort') : undefined)

// eslint-disable-next-line consistent-return
export const validateId = gtin => {
  const checkDigit = gtin
    ? getCheckDigit(
        String(
          gtin
            .toString()
            .split('')
            .splice(0, [gtin.length - 1])
        )
      )
    : null

  if (!gtin) {
    return intl.get('reviews.validation.gtin.barcodeRequired')
  }
  if (gtin.length < 12) {
    return intl.get('reviews.validation.gtin.numberTooShort')
  }
  if (gtin.length === 13 && Number(gtin[gtin.length - 1]) !== checkDigit) {
    return intl.get('reviews.validation.gtin.numberIncorrect')
  }
  if (gtin.length === 14 && Number(gtin[gtin.length - 1]) !== checkDigit) {
    return intl.get('reviews.validation.gtin.numberIncorrect')
  }
  if (gtin.length > 14) {
    return intl.get('reviews.validation.gtin.numberTooLong')
  }
}

// eslint-disable-next-line consistent-return
const validateIfNonEmptyString = (id, funcs) => {
  if (!id) {
    return undefined
  }

  let i = 0

  for (; funcs[i]; i += 1) {
    const validationResult = funcs[i](id)

    if (validationResult) {
      return validationResult
    }
  }
}

export const validateGTIN = id => validateIfNonEmptyString(id, [checkGTINLength, validateId])

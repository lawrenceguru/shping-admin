import React from 'react'
import PropTypes from 'prop-types'
import * as ST from './styles'

const CardImport = ({
  isCursorPointer,
  handleOnCardClick,
  header,
  isAdditionalFields,
  mainInfo,
  indexInfo,
  renderButton,
  children
}) => {
  return (
    <ST.Card onClick={handleOnCardClick} isCursorPointer={isCursorPointer}>
      <ST.MainInfo isAdditionalFields>
        <ST.MainText>{header}</ST.MainText>
        <ST.SubInfoWrapper isAdditionalFields={isAdditionalFields}>
          <ST.InfoRow>{children}</ST.InfoRow>
          {mainInfo && mainInfo.length && mainInfo.map(item => <span key={item}>{item}</span>)}
        </ST.SubInfoWrapper>
      </ST.MainInfo>
      {isAdditionalFields && (
        <ST.SecondaryInfo>
          {indexInfo && indexInfo.length && indexInfo.map(item => <span key={item}>{item}</span>)}
        </ST.SecondaryInfo>
      )}
      {renderButton && <ST.IconWrapper>{renderButton()}</ST.IconWrapper>}
    </ST.Card>
  )
}

CardImport.propTypes = {
  handleOnCardClick: PropTypes.func,
  header: PropTypes.string,
  isAdditionalFields: PropTypes.bool,
  mainInfo: PropTypes.arrayOf(PropTypes.string),
  indexInfo: PropTypes.arrayOf(PropTypes.string),
  renderButton: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array
}

CardImport.defaultProps = {
  handleOnCardClick: null,
  header: undefined,
  isAdditionalFields: false,
  mainInfo: null,
  indexInfo: null,
  renderButton: null,
  children: null
}

export default CardImport

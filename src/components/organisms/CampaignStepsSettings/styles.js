import styled from 'styled-components'
import React from 'react'

export const StyledForm = styled.form`
  flex-basis: 60%;
  margin-top: 25px;
  width: 100%;
  background: #fff;
  padding: 30px;
  margin-bottom: 40px;
  & .ant-form-item {
    margin-bottom: 0px;
  }
  & label {
    font-size: 15px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.65) !important;
  }
  & div > span > span {
    margin: 0;
    height: 40px;
  }
  & div > div > div > .ant-form-item-children > span {
    font-weight: 900;
  }
`
export const FieldsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div {
    flex-basis: ${({ flexBasis }) => flexBasis || '48%'};
  }
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  & > span {
    line-height: 30px;
    font-weight: 900;
  }
`
export const PickersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .ant-calendar-picker {
    flex-basis: 45% !important;
  }
`

export const ConditionsWrapper = styled(({ isVisible, ...rest }) => <div {...rest} />)`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`

export const StyledLink = styled.span`
  color: #fd3842;
  font-weight: 600;
  font-size: 15px;
  font-family: Roboto;
`

import styled from 'styled-components'
import CompanyPrefixHint from './CompanyPrefixHint'

export const ExtendedPrefixHint = styled(CompanyPrefixHint)`
  @media only screen and (min-width: 1000px) {
    position: absolute;
    right: -270px;
    top: -20px;
    width: 234px;
  }
`

export const FormWrapper = styled.div`
  width: 30%;
  margin-left: 30px;
`

export const FormElement = styled.div`
  position: relative;
  margin: 0;
  margin-bottom: 30px;

  &:nth-last-of-type(2) {
    margin-bottom: 15px;
  }

  &:last-of-type {
    margin-bottom: 20px;
  }
`

export const ExtendedFormInfoWrapper = styled.div`
  position: absolute;
  right: -270px;
  top: -20px;
  width: 234px;
`

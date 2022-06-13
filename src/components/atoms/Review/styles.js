import styled from 'styled-components'

export const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: solid 1px #f5f5f5;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.79;
  letter-spacing: normal;
  color: #999999;
`

export const ReviewInfoWrapper = styled.div`
  padding: 25px;
  &:not(:last-child) {
    border-bottom: solid 1px #f5f5f5;
  }
`

export const ReviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`

export const RateNumber = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 15px;
  color: rgb(249, 173, 61);
  font-weight: 900;
  margin: 0 20px;
`

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  & > div:first-child {
    margin-right: 10px;
  }
`

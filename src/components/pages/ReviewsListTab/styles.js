import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-bottom: 20px;
`

export const LoaderWrapper = styled.div`
  position: relative;
  padding: 45px;
`

export const FilterPanelWrapper = styled.div`
  & > div {
    & > div:last-child {
      justify-content: flex-start;
      & > div {
        flex-basis: 30% !important;
        margin-right: 30px;
      }
    }
  }
  .ant-select-lg {
    flex-basis: 100% !important;
  }
  & > div > div > div > div > div {
    ${({ count }) => (count > 2 ? 'flex-basis: 30%;' : 'flex-basis: 45%;')}
  }
`

export const ReviewForWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const ReviewHeader = styled.div`
  position: sticky;
  top: -30px;
  z-index: 1000;
  background-color: #f4f4f4;
`

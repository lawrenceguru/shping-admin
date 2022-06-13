import styled from 'styled-components'

export const StyledContainerProductVideo = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 20px;
  & > video {
    height: 100px;
  }
`

export const CountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  & > div {
    min-width: 40px;
  }
`

export const ConversionVideosWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  & .ant-table-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .ant-table-thead {
    display: none;
  }
`

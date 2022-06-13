import styled from 'styled-components'

export const Header = styled.h2`
  font-size: 20px;
  font-weight: 900;
  margin-top: 0.5em;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: flex;
  justify-content: space-between;
`

export const Column = styled.div`
  background: #fff;
  display: flex;
  flex-basis: 49%;
  flex-direction: column;
  padding: 20px 30px 30px 30px;

  .ant-checkbox-wrapper {
    line-height: 40px;
  }
`

export const DropzoneWrapper = styled.div`
  & > div:focus {
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease-in;
  }
`

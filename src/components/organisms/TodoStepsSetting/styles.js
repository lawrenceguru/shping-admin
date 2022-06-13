import styled from 'styled-components'

export const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 30px;

  > .ant-btn:hover,
  > .ant-btn.active {
    background-color: rgb(239, 61, 70) !important;
    border-color: rgb(239, 61, 70) !important;
    color: #fff !important;
  }
`

export const NavigationWrapper = styled.div`
  display: flex;
  > :first-child {
    padding-left: 0px;
  }
}
`

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
`

export const StepWrapper = styled.div`
  width: 100%;
`

import styled from 'styled-components'

export const Panel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const SelectedWidgetsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  max-height: 530px;
  &::-webkit-scrollbar {
    background-color: inherit;
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background-color: inherit;
  }
  &::-webkit-scrollbar-track:hover {
    background-color: #f4f4f4;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 5px solid #f4f4f4;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    border: 4px solid #f4f4f4;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`

export const SelectedItem = styled.div`
  font-size: 18px;
  line-height: 20px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  height: 55px;
  max-width: 330px;
  margin-bottom: 10px;
  padding-left: 15px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  a {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  a,
  a:hover {
    color: inherit;
  }
`

export const WidgetTitle = styled.div`
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100px;
  text-overflow: ellipsis;
`

import styled from 'styled-components'

export const MobilePreviewWrapper = styled.div`
  height: fit-content;
  position: sticky;
  top: 120px;
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  background: #f4f4f4;
  @media (max-width: 1340px) {
    display: none;
  }
`

export const Phone = styled.div`
  margin-left: auto;
  text-align: center;
  border-radius: 20px;
  border: 5px solid white;
  width: 280px;
  height: 600px;
`

export const PhoneHeader = styled.div`
  background-color: rgba(239, 61, 70, 0.8784313725490196);
  color: white;
  padding: 0;
  margin: 0;
  height: 50px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  span {
    line-height: 50px;
    font-size: 16px;
    padding-left: 30px;
  }
`

export const PhoneCamera = styled.div`
  background-color: rgb(240, 240, 240);
  border: 1px solid gray;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  float: right;
  display: block;
  margin-right: 25px;
  margin-top: 10px;
`

export const PhoneSpeaker = styled.div`
  border: 1px solid gray;
  width: 120px;
  height: 20px;
  border-radius: 10px;
  float: left;
  margin-top: 20px;
  margin-left: 60px;
`

export const Screen = styled.div`
  width: 100%;
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }
  &::-webkit-scrollbar-track:hover {
    background-color: #f4f4f4;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 5px solid #fff;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    border: 4px solid #f4f4f4;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`

export const PhoneFooter = styled.div`
  background-color: white;
  height: 45px;
  bottom: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: auto;
`

export const HomeButton = styled.div`
  margin: 5px auto 0;
  border-radius: 50%;
  border: 2px solid gray;
  width: 35px;
  height: 35px;
`

export const ProductMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding-bottom: 20px;
`

export const ProductName = styled.div`
  margin: 10px 0;
  font-size: 15px;
  color: #354052;
`

import styled from 'styled-components'
import React from 'react'

export const CardWrapper = styled.div`
  position: relative;
  padding: 25px;
  background-color: #ffffff;
  margin-bottom: 25px;
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  line-height: 2;
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    top: 54%;
    left: 2%;
  }
  & .anticon svg,
  & .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    color: rgb(178, 179, 178);
  }
  & .ant-spin-nested-loading > div > .ant-spin {
    max-height: initial;
  }
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: flex;
`

export const CardHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: flex;
`

export const IconContainer = styled.div`
  margin-right: 15px;
  & > img {
    border-radius: 100px;
  }
`

export const CardHeaderRightLabel = styled.span`
  display: flex;
  justify-content: flex-end;
  flex-basis: 15%;
`

export const CardBody = styled.div`
  margin: 30px 0;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`

export const CardMedia = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 170px;
`

export const StyledImgBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 20px 5px 0;
  & > img {
    width: 13.73px;
    height: 13.69px;
    vertical-align: middle;
    margin: 1px 0 0 10px;
    cursor: pointer;
  }
`

export const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
  & :last-child > svg {
    margin-right: 0 !important;
  }
`

export const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0px;
`

export const Video = styled.video`
  cursor: pointer;
  border-radius: 2px;
  transition: box-shadow 250ms ease 0s;
  max-height: 300px;
  max-width: 200px;
  margin-bottom: 15px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
`

export const ImageBlock = styled.div`
  max-width: 150px;
  max-height: 200px;
  margin-bottom: 30px;
`

export const Image = styled.img`
  width: 100%;
  cursor: pointer;
  border-radius: 2px;
  transition: box-shadow 250ms ease 0s;
  object-fit: cover;
  clip: rect(10px, 290px, 190px, 10px);
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
`

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`

export const Info = styled.div`
  display: flex;
`

export const RateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`

export const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`

export const Tags = styled.div`
  display: flex;
  & .ant-tag {
    display: flex;
    align-items: center;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    color: #b3b3b3;
    box-shadow: none;
  }
  & .ant-tag:hover {
    background-color: #ff4d4f !important;
    color: #fff;
    & .anticon {
      color: #fff;
    }
  }
  & .ant-tag:focus {
    background-color: #ff4d4f !important;
    color: #fff;
  }
`
export const CardActions = styled(({ isHaveRadio, ...rest }) => <div {...rest} />)`
  display: flex;
  justify-content: ${({ isHaveRadio }) => (isHaveRadio ? 'space-between;' : 'flex-end')}
  flex-wrap: wrap;
  align-items: center;
`

export const ButtonsWrapper = styled(({ isHaveOneButton, ...rest }) => <div {...rest} />)`
  display: flex;
  justify-content: ${({ isHaveOneButton }) => (isHaveOneButton ? 'flex-end' : 'space-between')};
  flex-basis: 20%;
  & :last-child {
    padding-right: 0;
  }
  & button {
    padding: 0 15px !important;
  }
`

export const StatusIconContainer = styled.div`
  position: absolute;
  top: -15px;
  right: 20px;
  z-index: 5;
`

export const Comments = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const ContentCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 89%;
  & > span {
    color: rgb(178, 179, 178);
    font-family: Roboto;
    font-weight: 600;
    line-height: 2;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-basis: 10%;
  & > :first-child {
    margin-left: 8px;
  }

  & > :last-child {
    margin-left: 8px;
  }
`

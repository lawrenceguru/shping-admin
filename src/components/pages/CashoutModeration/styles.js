import styled from 'styled-components'
import { Modal } from 'antd'

export const Warpper = styled.div`
  padding: 20px;
  margin: 20px;
  background-color: white;
  & .ant-table-pagination-right {
    justify-content: flex-start;
    margin: 20px 50px !important;
  }
  & table td {
    img {
      cusor: pointer;
    }
  }
  & table td:last-child {
    button {
      border: 0;
      background: transparent;
    }
  }
`
export const Header = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 20px;
`
export const SubHeader = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 25px;
`
export const CustomModal = styled(Modal)`
  #progress_bar {
    width: 100%;
    position: relative;
    #bar_gray {
      background-color: #f5f5f5;
      width: 100%;
      height: 10px;
      border-radius: 20px;
      z-index: 1;
    }
    #bar_blue {
      background-color: #1890ff;
      width: 50px;
      height: 10px;
      border-radius: 20px;
      z-index: 4;
    }
    #bar_orange {
      background-color: orange;
      width: 110px;
      height: 10px;
      border-radius: 20px;
      z-index: 3;
    }
    #bar_red {
      background-color: #f5222d;
      width: 150px;
      height: 10px;
      border-radius: 20px;
      z-index: 2;
    }
  }
  #progress_bar > div {
    position: absolute;
  }
  .ml-10 {
    margin-left: 10px;
  }
  .text-center {
    text-align: center;
  }
  button.ant-modal-close {
    display: none;
  }
  div.ant-modal-close {
    padding: 25px;
    svg {
      height: 25px;
      width: 25px;
    }
  }
  .ant-modal-footer {
    display: none !important;
  }
  .modalHeader {
    font-size: 20px;
    font-weight: 500;
    color: #000000;
  }
  .modalSubHeader {
    button {
      border: 0;
      span {
        font-size: 14px;
        font-weight: 400;
        text-decoration: underline;
        margin-bottom: 10px;
      }
    }
  }
  .userTitle {
    .floatLeftPanel {
      img {
        width: 64px;
        height: 64px;
      }
      float: left;
    }
    .floatLeftPanel:last-child {
      margin-left: 10px;
      div:first-child {
        font-size: 20px;
        font-weight: 500;
      }
      div:nth-child(2) {
        span {
          text-decoration: underline;
          color: #1890ff;
          text-transform: capitalize;
        }
      }
      div {
        margin-bottom: 5px;
      }
    }
  }
  .userTitleLimit {
    .floatLeftPanel {
      img {
        width: 47px;
        height: 47px;
      }
      float: left;
    }
    .floatLeftPanel:last-child {
      margin-left: 10px;
      div:first-child {
        font-size: 20px;
        font-weight: 500;
        span {
          color: #1890ff;
          font-size: 14px;
          text-transform: uppercase;
        }
      }
      div:nth-child(2) {
        span:first-child {
          text-transform: capitalize;
        }
        span:nth-child(2) {
          margin-left: 10px;
          margin-right: 3px;
        }
      }
      div {
        margin-bottom: 5px;
      }
    }
  }
`

import React from 'react'
import styled from 'styled-components'
import { CloseOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { BlockText } from '../../../styles'
import { stopPropagation } from '../../../utils/helpers'

const DataBlock = styled.div`
  background-color: white;
  color: rgb(178, 179, 178);
  font-family: Roboto;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 20px;
  padding-bottom: ${({ isHaveFooter }) => (isHaveFooter ? '5px' : '20px')};
  padding-right: 25px;
  padding-left: 25px;
  border-radius: 6px;
  border: 1px solid #f5f5f5;
  border-radius: 10px;
`

const BlockRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
`

const RowText = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  align-items: center;
  text-align: center;
  & > span {
    width: initial;
  }
`

const FooterText = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  text-align: center;
  font-size: 22px;
  font-weight: normal;
  max-height: 15px;
`

const Symbol = styled.span`
  padding-right: 5px;
`
const OverviewInformationBlock = ({
  title,
  footer,
  currScans,
  color,
  symbol,
  setItem,
  dataIndex,
  widgetName,
  ...props
}) => {
  return (
    <DataBlock isHaveFooter={!!footer} {...props} className='pdf-export' data-index={dataIndex}>
      <BlockRow>
        <span>{title}</span>
        <CloseOutlined onMouseDown={stopPropagation} onTouchStart={stopPropagation} onClick={setItem} />
      </BlockRow>
      <RowText isHaveFooter={!!footer}>
        <BlockText style={{ color }}>
          <Symbol>{symbol}</Symbol>
          {(Number.isFinite(currScans) && currScans.toFixed(2)) || 0}
        </BlockText>
      </RowText>
      {footer && (
        <FooterText>
          <span style={{ color }}>{footer}</span>
        </FooterText>
      )}
    </DataBlock>
  )
}

OverviewInformationBlock.propTypes = {
  title: PropTypes.string.isRequired,
  currScans: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  symbol: PropTypes.string,
  setItem: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  widgetName: PropTypes.string.isRequired,
  dataIndex: PropTypes.string,
  footer: PropTypes.string
}

OverviewInformationBlock.defaultProps = {
  currScans: 0,
  symbol: null,
  dataIndex: null,
  footer: null
}

export default OverviewInformationBlock

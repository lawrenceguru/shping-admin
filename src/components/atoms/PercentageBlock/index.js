import React from 'react'
import styled from 'styled-components'
import { CloseOutlined } from '@ant-design/icons'
import { Progress } from 'antd'
import PropTypes from 'prop-types'

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

const Title = styled.div`
  font-weight: bold;
  color: #000000;
  font-size: 1rem;
`

const Value = styled.div`
  font-weight: bold;
  color: #000000a6;
  font-size: 1.8rem;
  padding: 0 1rem;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
`

const PercentageBlock = ({ title, description, value, setItem, dataIndex, widgetName, ...props }) => {
  return (
    <DataBlock {...props} className='pdf-export' data-index={dataIndex}>
      <BlockRow>
        <Title>{title}</Title>
        <CloseOutlined onMouseDown={stopPropagation} onTouchStart={stopPropagation} onClick={setItem} />
      </BlockRow>

      <Body>
        <div>
          <p>{description}</p>
        </div>

        <div style={{ margin: 'auto' }}>
          {value === 'N/A' ? (
            <Value>N/A</Value>
          ) : (
            <Progress type='dashboard' percent={value} width={100} status='normal' />
          )}
        </div>
      </Body>
    </DataBlock>
  )
}

PercentageBlock.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setItem: PropTypes.func.isRequired,
  widgetName: PropTypes.string.isRequired,
  dataIndex: PropTypes.string
}

PercentageBlock.defaultProps = {
  value: 0,
  description: '',
  dataIndex: null
}

export default PercentageBlock

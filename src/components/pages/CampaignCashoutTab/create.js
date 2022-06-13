import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Row, Col } from 'antd'
import * as ST from './styles'
import CreateForm from '../../organisms/CampaignCashoutForm'
import { create, publishCreateAction } from '../../organisms/CampaignCashoutForm/actions'

const CampaignCashbackCreatePage = () => {
  const [leftSideData, setLeftSideData] = useState([])
  const ticket = useSelector(({ identity }) => identity.ticket)
  const history = useHistory()
  const onFinish = data => {
    const temp = {
      ...data,
      product: data.product.split(', ')[0]
    }
    create(temp, ticket, history)
  }
  const onPublished = data => {
    const temp = {
      ...data,
      product: data.product.split(', ')[0]
    }
    publishCreateAction(temp, ticket, history)
  }
  const leftSideDataFun = useCallback((name, val) => {
    if (name === 'product') {
      console.log(val, 'xxxxxxxxxxxx')
      setLeftSideData({
        ...leftSideData,
        product: val
      })
    } else if (name === 'percents') {
      setLeftSideData({
        ...leftSideData,
        percents: val
      })
    } else if (name === 'name') {
      setLeftSideData({
        ...leftSideData,
        name: val
      })
    } else if (name === 'date') {
      setLeftSideData({
        ...leftSideData,
        start_date: val[0].format('YYYY-MM-DD'),
        end_date: val[1].format('YYYY-MM-DD')
      })
    } else if (name === 'image') {
      setLeftSideData({
        ...leftSideData,
        image: val
      })
    } else if (name === 'product_name') {
      setLeftSideData({
        ...leftSideData,
        product_name: val
      })
    }
  })
  return (
    <ST.Wrapper>
      <Row gutter={[48, 16]}>
        <Col span={18}>
          <CreateForm leftSideData={leftSideDataFun} onFinish={onFinish} onPublished={onPublished} />
        </Col>
        <Col span={5}>
          <ST.ProductStyle>
            <section>
              <header>{leftSideData?.product_name ? <>{leftSideData?.product_name}</> : <>Product Name</>}</header>
              <nav>
                <aside>
                  {leftSideData?.image ? (
                    <img src={leftSideData?.image} alt='' />
                  ) : (
                    <img src='/cashoutBoostImageAvatar.svg' alt='' />
                  )}
                </aside>
              </nav>
              <footer>
                <Row>
                  <Col span={12}>Status</Col>
                  <Col span={12}>Active</Col>
                </Row>
                <Row>
                  <Col span={12}>Product Name</Col>
                  <Col span={12}>{leftSideData?.product_name ? <>{leftSideData?.product_name}</> : <>Not set</>}</Col>
                </Row>
                <Row>
                  <Col span={12}>GTIN</Col>
                  <Col span={12}>{leftSideData?.product ? <>{leftSideData?.product}</> : <>Not set</>}</Col>
                </Row>
                <Row>
                  <Col span={12}>Boost</Col>
                  <Col span={12}>{leftSideData?.percents ? <>{leftSideData?.percents}</> : <>0%</>}</Col>
                </Row>
                <Row>
                  <Col span={12}>Start Date</Col>
                  <Col span={12}>{leftSideData?.start_date ? <>{leftSideData?.start_date}</> : <>Not set</>}</Col>
                </Row>
                <Row>
                  <Col span={12}>End Date</Col>
                  <Col span={12}>{leftSideData?.end_date ? <>{leftSideData?.end_date}</> : <>Not set</>}</Col>
                </Row>
              </footer>
            </section>
          </ST.ProductStyle>
        </Col>
        <Col span={1} />
      </Row>
    </ST.Wrapper>
  )
}

export default CampaignCashbackCreatePage

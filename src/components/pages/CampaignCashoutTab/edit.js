import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Row, Col } from 'antd'
// import { REWARDS_API } from 'constants/url'
import * as ST from './styles'
import CreateForm from '../../organisms/CampaignCashoutForm'
import Loader from '../../templates/Loader'
import useCashout from '../../../data/rewards/cashout'
// import useReviewPhoto from '../../../data/rewards/reviewPhoto'
// import useCashbacks from '../../../data/rewards/cashbacks'
import { update, publishUpdateAction } from '../../organisms/CampaignCashoutForm/actions'

const CampaignCashbackEditPage = ({ match }) => {
  // const [userPhoto, setUserPhoto] = useState()
  const [leftSideData, setLeftSideData] = useState([])
  const { params } = match
  const history = useHistory()
  const { cashback, mutate } = useCashout(params.id)
  // const { reviewPhoto } = useReviewPhoto()
  // useEffect(() => {
  //   if (reviewPhoto) {
  //     setUserPhoto(reviewPhoto.list.find(res => res.booster_id === params.id))
  //   }
  // }, [reviewPhoto])
  useEffect(() => {
    setLeftSideData({
      name: cashback?.name,
      product: cashback?.product,
      percents: cashback?.percents,
      start_date: cashback?.start_date,
      end_date: cashback?.end_date,
      status: cashback?.status,
      product_name: '',
      image: ''
    })
  }, [cashback])
  const ticket = useSelector(({ identity }) => identity.ticket)
  const onFinish = data => {
    const changeData = { ...data }
    delete changeData.date
    changeData.start_date = data.date[0].format('YYYY-MM-DD')
    changeData.end_date = data.date[1].format('YYYY-MM-DD')
    const temp = {
      ...changeData,
      product: data.product.split(', ')[0]
    }
    update(temp, ticket, mutate)
  }
  const onPublished = data => {
    const temp = {
      ...data,
      product: data.product.split(', ')[0]
    }
    publishUpdateAction(temp, ticket, history)
  }
  // useEffect(() => {
  //   mutate([`${REWARDS_API}/cashbacks/submissions/get`, params.id])
  // }, [])
  const leftSideDataFun = useCallback((name, val) => {
    if (name === 'product') {
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
      {typeof cashback === 'object' && !Array.isArray(cashback) ? (
        <>
          <Row gutter={[48, 16]}>
            <Col span={17}>
              <CreateForm
                cashback={cashback}
                onFinish={onFinish}
                onPublished={onPublished}
                leftSideData={leftSideDataFun}
              />
            </Col>
            <Col span={5}>
              <ST.ProductStyle>
                <section>
                  {/* {userPhoto?.product_name ? (
                    <header>
                      <div>{userPhoto.product_name}</div>
                    </header>
                  ) : (
                    <header>{leftSideData?.name ? <>{leftSideData?.name}</> : <>Product Name</>}</header>
                  )} */}
                  {leftSideData?.product_name ? (
                    <header>
                      <div>{leftSideData?.product_name}</div>
                    </header>
                  ) : (
                    <header>
                      <div>Product Name</div>
                    </header>
                  )}
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
                      <Col span={12}>Campaign</Col>
                      <Col span={12}>{leftSideData?.name} Boost Campaign</Col>
                    </Row>
                    <Row>
                      <Col span={12}>Status</Col>
                      <Col span={12}>{leftSideData?.status}</Col>
                    </Row>
                    <Row>
                      <Col span={12}>Product Name</Col>
                      <Col span={12}>{leftSideData?.product_name}</Col>
                    </Row>
                    <Row>
                      <Col span={12}>GTIN</Col>
                      <Col span={12}>{leftSideData?.product}</Col>
                    </Row>
                    <Row>
                      <Col span={12}>Boost</Col>
                      <Col span={12}>{leftSideData?.percents}</Col>
                    </Row>
                    <Row>
                      <Col span={12}>Start Date</Col>
                      <Col span={12}>{leftSideData?.start_date}</Col>
                    </Row>
                    <Row>
                      <Col span={12}>End Date</Col>
                      <Col span={12}>{leftSideData?.end_date}</Col>
                    </Row>
                  </footer>
                </section>
              </ST.ProductStyle>
            </Col>
            <Col span={1} />
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </ST.Wrapper>
  )
}

export default CampaignCashbackEditPage

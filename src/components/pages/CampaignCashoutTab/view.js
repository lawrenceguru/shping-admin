import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Row, Col } from 'antd'
import * as ST from './styles'
// import CashbackUserSubmissions from '../../organisms/CampaignCashbackUserSubmissions'
import Loader from '../../templates/Loader'
import useCashout from '../../../data/rewards/cashout'
import useReviewPhoto from '../../../data/rewards/reviewPhoto'
import countries from '../../../data/settings/agt/countries'
import SwitchOption from '../../atoms/SwitchOption'
import { updateReviewAction } from '../../organisms/CampaignCashoutForm/actions'

const CashbackCampaignView = ({ match }) => {
  const ticket = useSelector(({ identity }) => identity.ticket)
  const [userPhoto, setUserPhoto] = useState()
  const { params } = match
  const { cashback, mutate } = useCashout(params.id)
  const { reviewPhoto } = useReviewPhoto()
  const { result: getCountries } = countries()
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthFull = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  useEffect(() => {
    if (reviewPhoto) {
      setUserPhoto(reviewPhoto.list.find(res => res.booster_id === params.id))
    }
  }, [reviewPhoto])
  useEffect(() => {
    mutate()
  }, [])
  const getCountry = _it => {
    const temp = getCountries?.find(res => res.numeric_code === _it)
    return temp?.name
  }
  const changePublishDate = _it => {
    const newDate = new Date(_it)
    return `${newDate.getDay()}
      ${month[newDate.getMonth()]}
      ${newDate.getFullYear()} ${newDate.toLocaleTimeString().slice(0, 5)}`
  }
  const changeDuringDate = (_start, _end) => {
    const start = new Date(_start)
    const end = new Date(_end)
    return `${monthFull[start.getMonth()]} ${start.getDay()}
    ${start.getFullYear()} - ${monthFull[end.getMonth()]} ${end.getDay()} ${end.getFullYear()} `
  }
  const getCountriesArray = () => {
    const temp = []
    if (cashback.locations) {
      cashback.locations.map(data => {
        const d = getCountries?.find(res => res.numeric_code === data.country)
        temp.push(d?.iso2)
        return data
      })
    }
    return temp.join(', ')
  }
  return (
    <ST.Wrapper>
      {cashback ? (
        <>
          <Row gutter={[48, 16]} style={{ paddingBottom: '20px' }}>
            <Col span={17}>
              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <div className='headerTitle'>{cashback.name}</div>
                </Col>
                <Col span={12}>
                  <div className='headerSubTitle'>{changeDuringDate(cashback.start_date, cashback.end_date)}</div>
                </Col>
              </Row>
            </Col>
            <Col span={5}>
              <Row>
                <Col span={18} style={{ textAlign: 'right' }}>
                  {cashback.status === 'active' ? <>Running</> : <>Stop</>}
                </Col>
                <Col span={6}>
                  <SwitchOption
                    checked={cashback.status === 'active'}
                    onChange={() => {
                      // event.preventDefault()
                      // event.stopPropagation()
                      updateReviewAction(cashback, ticket, mutate)
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[48, 16]}>
            <Col span={17}>
              <ST.ViewPage>
                <header>Campaign Overview </header>
                <aside>
                  <Row className='bgGray'>
                    <Col span={8}>Start Date</Col>
                    <Col span={16}>End Date</Col>
                  </Row>
                  <Row>
                    <Col span={8}>{cashback.start_date}</Col>
                    <Col span={16}>{cashback.end_date}</Col>
                  </Row>
                  <Row className='bgGray'>
                    <Col span={24}>Status</Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      {cashback.status === 'active' ? (
                        <div className='activeDot'>
                          <span />
                          <span>Running</span>
                        </div>
                      ) : (
                        <div className='inActiveDot'>
                          <span />
                          <span>Stop</span>
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className='bgGray'>
                    <Col span={24}>Product</Col>
                  </Row>
                  <Row>
                    <Col span={6}>{cashback.product}</Col>
                    <Col span={6}>{userPhoto?.product_name}</Col>
                    <Col span={6}>{cashback.name}</Col>
                    <Col span={6}>{cashback.percents}% Cashout Booster</Col>
                  </Row>
                  <Row className='bgGray'>
                    <Col span={24}>Audience</Col>
                  </Row>
                  <Row className='bgGray'>
                    <Col span={6}>Age</Col>
                    <Col span={6}>Gender</Col>
                    <Col span={6}>Levels</Col>
                    <Col span={6}>Countries</Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      {cashback.audience?.min_age}-{cashback.audience?.max_age}
                    </Col>
                    <Col span={6}>{cashback.audience?.gender}</Col>
                    <Col span={6}>
                      <div>{cashback.audience?.user_levels?.join(', ')}</div>
                    </Col>
                    <Col span={6}>
                      {/* <div>{cashback.audience?.languages?.join(', ')}</div> */}
                      <div>{getCountriesArray()}</div>
                    </Col>
                  </Row>
                  {/* <Row className='bgGray'>
                    <Col span={24}>Countries</Col>
                  </Row> */}
                  <Row className='bgGray'>
                    <Col span={4}>Country</Col>
                    <Col span={5}>State</Col>
                    <Col span={5}>Postcode</Col>
                    <Col span={5}>City</Col>
                    <Col span={5}>Retailers</Col>
                  </Row>
                  {cashback.locations?.map(res => (
                    <Row>
                      <Col span={4}>
                        <div>{getCountry(res.country)}</div>
                      </Col>
                      <Col span={5}>
                        <div>{res.states?.join(', ')}</div>
                      </Col>
                      <Col span={5}>
                        <div>{res.postcodes?.join(', ')}</div>
                      </Col>
                      <Col span={5}>
                        <div>{res.cities?.join(', ')}</div>
                      </Col>
                      <Col span={5}>
                        <div>{res.retailers?.join(', ')}</div>
                      </Col>
                    </Row>
                  ))}
                </aside>
              </ST.ViewPage>
            </Col>
            <Col span={5}>
              <ST.ProductStyle>
                <section>
                  <nav>
                    {userPhoto ? (
                      <div>
                        <img src={userPhoto.image} alt='' />
                      </div>
                    ) : (
                      <aside>
                        <img src='/cashoutBoostImageAvatar.svg' alt='' />
                      </aside>
                    )}
                  </nav>
                  <footer>
                    <Row>
                      <Col span={24} style={{ fontWeight: 'bold' }}>
                        Published: {changePublishDate(cashback?.published_at)}
                      </Col>
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
      {/* <CashbackUserSubmissions cashback={params.id} /> */}
    </ST.Wrapper>
  )
}
CashbackCampaignView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object
}

CashbackCampaignView.defaultProps = {
  match: {}
}

export default CashbackCampaignView

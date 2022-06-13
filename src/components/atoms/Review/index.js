import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import UserInfo from '../UserInfo'
import Rate from '../Rate'
import ProductImage from '../ProductImage'
import { ReviewHeader, ProductWrapper, ReviewWrapper, RateNumber, ReviewInfoWrapper } from './styles'

const Review = ({ userImage, rate, text, productName, productImage, date }) => {
  const dateFormatted = useMemo(() => {
    const momentObj = moment(new Date(date))
    const diffInHours = moment().diff(momentObj, 'hours')

    if (diffInHours < 24) {
      return moment(momentObj).fromNow()
    }

    return momentObj.format('DD MMMM YYYY')
  }, [date])

  return (
    <ReviewWrapper>
      <ReviewInfoWrapper>
        <ReviewHeader>
          <div>
            <UserInfo image={userImage} firstName={false} styles={{ padding: 0, margin: 0 }} />
            <RateNumber>{rate}</RateNumber>
            <Rate rate={rate} />
          </div>
          <div>{dateFormatted}</div>
        </ReviewHeader>
        <div>{text}</div>
      </ReviewInfoWrapper>
      <ReviewInfoWrapper>
        <ProductWrapper>
          <ProductImage image={productImage} />
          {productName}
        </ProductWrapper>
      </ReviewInfoWrapper>
    </ReviewWrapper>
  )
}

Review.propTypes = {
  userImage: PropTypes.string,
  rate: PropTypes.number,
  text: PropTypes.string,
  productName: PropTypes.string,
  productImage: PropTypes.string,
  date: PropTypes.string
}

Review.defaultProps = {
  userImage: null,
  rate: null,
  text: null,
  productName: null,
  date: null,
  productImage: null
}
export default Review

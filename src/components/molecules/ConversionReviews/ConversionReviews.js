import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import Review from '../../atoms/Review'
import GraphHeader from '../GraphHeader'
import { WidgetTemplate } from '../../../styles'
// eslint-disable-next-line no-unused-vars
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'
import useGetConversionReviews from './useGetConversionReviews'

const ReviewsWidgetWrapper = styled.div`
  background-color: #fff;
  flex-basis: calc(50% - 30px);
  border-radius: 6px 6px 6px 6px;
  @media (max-width: 1440px) {
    flex-basis: calc(100% - 30px);
  }
`

const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  overflow: auto;
  height: 720px;
`

const NoDataWrapper = styled.div`
  height: 100%;
  & > div {
    height: 79%;
  }
`

const ConversionReviews = ({
  dataIndex,
  setTableHeight,
  setItem,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  ...props
}) => {
  const { reviews } = useGetConversionReviews({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  useEffect(() => {
    setTableHeight(reviews)
  }, [reviews])

  return (
    <ReviewsWidgetWrapper {...props}>
      <div style={{ height: '100%', backgroundColor: '#ffffff' }} className='pdf-export' data-index={dataIndex}>
        <WidgetTemplate isHaveNotData={!(reviews && reviews.length)}>
          <GraphHeader name={intl.get('conversionPage.reviews')} setItem={setItem} />
          {reviews && reviews.length ? (
            <ReviewsWrapper className='styled-scroll'>
              {reviews.map((review, i) => (
                <Review
                  /* eslint-disable-next-line react/no-array-index-key */
                  key={i}
                  userImage={review.user_image}
                  product={review.product_name}
                  rate={review.rate}
                  text={review.review_text}
                  date={review.ts}
                  productImage={review.product_image}
                />
              ))}
            </ReviewsWrapper>
          ) : (
            <NoDataWrapper>
              <NoDataPlaceholder />
            </NoDataWrapper>
          )}
        </WidgetTemplate>
      </div>
    </ReviewsWidgetWrapper>
  )
}

ConversionReviews.propTypes = {
  setItem: PropTypes.func.isRequired,
  setTableHeight: PropTypes.func.isRequired,
  dataIndex: PropTypes.string,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired
}

ConversionReviews.defaultProps = {
  dataIndex: null
}
export default ConversionReviews

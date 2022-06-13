import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid4'
import intl from 'react-intl-universal'
import TopTable from '../../atoms/TopTable'
import IconButton from '../IconButton'
import { StyledContainerProductVideo, ConversionVideosWrapper, CountWrapper } from './styles'
import useGetConversionVideos from './useGetConversionVideos'

const dataColumns = [
  {
    dataIndex: 'url',
    key: 'url',
    render: url => {
      return (
        <StyledContainerProductVideo>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            controls
            src={url}
            id='video'
            crossOrigin='Anonymous'
            style={{
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </StyledContainerProductVideo>
      )
    }
  },
  {
    dataIndex: 'title',
    key: 'title'
  },
  {
    dataIndex: 'views',
    key: 'views',
    render: data => (
      <CountWrapper>
        <div>{data}</div>
        <IconButton
          width='3000px'
          height='2400px'
          type='Eye'
          styleParam={{ marginLeft: '10px', fontSize: '20px' }}
          visible={false}
        />
      </CountWrapper>
    )
  }
]

const ConversionVideos = ({
  setTableHeight,
  isRangeTooBig,
  setItem,
  realRequestFirstDate,
  dataIndex,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  ...props
}) => {
  const { topVideos } = useGetConversionVideos({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry
  })

  useEffect(() => {
    setTableHeight(topVideos)
  }, [topVideos])

  return (
    <ConversionVideosWrapper {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <TopTable
          widgetName='Videos'
          columns={dataColumns}
          columnsData={topVideos}
          rowKey={() => uuid()}
          headerText={intl.get('conversionPage.videos')}
          isFooter={false}
          setItem={setItem}
        />
      </div>
    </ConversionVideosWrapper>
  )
}

ConversionVideos.propTypes = {
  setItem: PropTypes.func.isRequired,
  setTableHeight: PropTypes.func.isRequired,
  isRangeTooBig: PropTypes.bool,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  realRequestFirstDate: PropTypes.string,
  dataIndex: PropTypes.string
}

ConversionVideos.defaultProps = {
  isRangeTooBig: false,
  realRequestFirstDate: null,
  dataIndex: null
}
export default ConversionVideos

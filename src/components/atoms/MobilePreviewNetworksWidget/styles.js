import styled from 'styled-components'

export const NetworksWidgetWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 0;
  width: 100%;
  & img {
    width: 100%;
    object-fit: contain;
  }
  & > div:nth-child(2) {
    max-width: 200px;
  }
  .slick-slide {
    padding: 0 5px;
  }
  .slick-slider {
    min-width: 230px;
  }
`

export const IconWrapper = styled.div`
  padding: 10px;
  border: 2px solid #f9f9f9;
  height: 45px;
`

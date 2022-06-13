import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import RemoveIcon from '../../molecules/RemoveIcon'
import NoDataPlaceholder from '../../atoms/NoDataPlaceholder'

const StyledChart = styled.div`
  height: 740px;
  border-radius: 0px 0px 6px 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  & span {
    font-family: Roboto;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.88;
    letter-spacing: normal;
  }
`

const TitleChart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  padding: 15px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-weight: bold;
  color: #000000;
  flex-basis: 6%;
  font-size: 1rem;
  & text {
    color: #ffffff;
  }
`

const CircleContainer = styled.div`
  border-bottom: 1px solid #f5f5f5;
  flex-basis: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Circle = styled.svg`
  width: 300px;
  height: 300px;
  align-self: center;
`

const FooterChart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const FooterChartInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  text-align: center;
  margin: 30px 50px;
`

const StyledData = styled.span`
  font-size: 20px;
  color: #808080;
`

const StyledChartText = styled.text`
  height: 40px;
  font-family: Roboto;
  font-size: 50px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
  stroke: #1875f0;
  fill: #1875f0;
`

const StyledText = styled.span`
  font-size: 20px;
  color: #b3b3b3;
`

const AudiencePieUsers = ({
  pieName,
  dataIndex,
  usersAllTime,
  usersOverDefinedPeriod,
  setItem,
  widgetName,
  ...props
}) => {
  return (
    <StyledChart {...props}>
      <div style={{ height: '100%', backgroundColor: '#ffffff' }} className='pdf-export' data-index={dataIndex}>
        <TitleChart>
          <div>{pieName}</div>
          <RemoveIcon setItem={setItem} />
        </TitleChart>
        {usersAllTime ? (
          <>
            <CircleContainer>
              <Circle>
                <circle cx='150' cy='150' r='30%' stroke='#1875f0' fill='none' strokeWidth={2} />
                <StyledChartText x='50%' y='55%' textAnchor='middle'>
                  {usersAllTime}
                </StyledChartText>
              </Circle>
            </CircleContainer>
            <FooterChart>
              <FooterChartInfo>
                <StyledData>{usersOverDefinedPeriod}</StyledData>
                <StyledText>{intl.get(`audiencePage.totalUsers`)}</StyledText>
              </FooterChartInfo>
            </FooterChart>
          </>
        ) : (
          <NoDataPlaceholder />
        )}
      </div>
    </StyledChart>
  )
}

AudiencePieUsers.propTypes = {
  pieName: PropTypes.string,
  setItem: PropTypes.func.isRequired,
  widgetName: PropTypes.string.isRequired,
  usersAllTime: PropTypes.number.isRequired,
  usersOverDefinedPeriod: PropTypes.number.isRequired,
  dataIndex: PropTypes.string
}

AudiencePieUsers.defaultProps = {
  pieName: '',
  dataIndex: null
}

export default AudiencePieUsers

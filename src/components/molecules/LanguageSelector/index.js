import React from 'react'
import styled from 'styled-components'
import { Select } from 'antd'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const StyledLangText = styled.div`
  line-height: 13px;
`

const StyledLangMenu = styled.div`
  width: 100%;
  height: 100%
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  vertical-align: center;
  div {
    font-size: 13px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const StDiv = styled.div`
  & > .ant-select > .ant-select-selection,
  & > .ant-select > .ant-select-selection:focus,
  & > .ant-select > .ant-select-selection:active {
    border: none;
    box-shadow: none;
  }
  .ant-select-selection-selected-value {
    font-weight: normal;
  }
`

const LanguageSelector = ({ location }) => {
  const SUPPOER_LOCALES = [
    {
      name: 'English',
      value: 'en',
      icon: 'gb.svg'
    },
    {
      name: 'Русский',
      value: 'ru',
      icon: 'ru.svg'
    },
    {
      name: '简体中文',
      value: 'zh',
      icon: 'cn.svg'
    }
  ]
  const onSelectLocale = e => {
    localStorage.setItem('lang', e)
    window.location.reload()
  }
  const { Option } = Select
  const currentLocale = localStorage.getItem('lang')
  /* eslint-disable global-require */
  return (
    <StDiv>
      <Select
        disabled={!!(location && location.pathname && location.pathname.includes('add-document'))}
        defaultValue={currentLocale}
        style={{ width: 150, margin: 20 }}
        onChange={onSelectLocale}
        getPopupContainer={trigger => trigger.parentNode}
      >
        {SUPPOER_LOCALES.map(locale => (
          <Option
            key={locale.value}
            value={locale.value}
            style={{
              borderBottom: '1px solid #EFEFF4',
              display: `${locale.value === currentLocale ? 'none' : ''}`
            }}
          >
            <StyledLangMenu>
              <div>
                <img
                  src={require(`assets/flags/${locale.icon}`)} // eslint-disable-line import/no-dynamic-require
                  style={{ width: 30, height: 20 }}
                  alt='flag'
                />
              </div>
              <StyledLangText>{locale.name}</StyledLangText>
            </StyledLangMenu>
          </Option>
        ))}
      </Select>
    </StDiv>
  )
  /* eslint-enable global-require */
}

LanguageSelector.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired
}

export default withRouter(LanguageSelector)

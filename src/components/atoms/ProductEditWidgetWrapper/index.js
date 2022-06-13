import React from 'react'
import PropTypes from 'prop-types'
import { MainInfo, WidgetHeader, Header } from './styles'
import IconButton from '../../molecules/IconButton'

const ProductEditWidgetWrapper = ({
  headerText,
  children,
  HeaderPanel,
  smallSize,
  id,
  maxWidth,
  isHaveDeleteIcon,
  handleDelete,
  index
}) => {
  return (
    <MainInfo height={smallSize ? '200px' : '400px'} id={id} maxWidth={maxWidth || '762px'}>
      <Header>
        <WidgetHeader>{headerText}</WidgetHeader>
        {HeaderPanel ? <HeaderPanel /> : null}
        {isHaveDeleteIcon && (
          <IconButton
            type='Delete'
            styleParam={{ fontSize: '32px' }}
            actionFunction={() => handleDelete && handleDelete(index)}
          />
        )}
      </Header>
      {children}
    </MainInfo>
  )
}

ProductEditWidgetWrapper.propTypes = {
  headerText: PropTypes.string,
  HeaderPanel: PropTypes.func,
  smallSize: PropTypes.bool,
  id: PropTypes.string,
  maxWidth: PropTypes.string,
  children: PropTypes.node,
  isHaveDeleteIcon: PropTypes.bool,
  handleDelete: PropTypes.func,
  index: PropTypes.number
}

ProductEditWidgetWrapper.defaultProps = {
  headerText: null,
  HeaderPanel: null,
  smallSize: false,
  id: null,
  maxWidth: null,
  children: null,
  isHaveDeleteIcon: false,
  handleDelete: null,
  index: null
}

export default ProductEditWidgetWrapper

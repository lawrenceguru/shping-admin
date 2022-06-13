import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { WrapperText, Wrapper, HeaderWrapper } from './styles'
import ProductEditWidgetWrapper from '../../../atoms/ProductEditWidgetWrapper'
import SerializationStepsHeader from '../../../atoms/SerializationStepsHeader'

const Confirm = ({ values }) => {
  const currLocation = useMemo(() => {
    return values.allLocations && values.allLocations.find(el => el.id === values.location)
  }, [values])

  return (
    <Wrapper>
      <HeaderWrapper>
        <SerializationStepsHeader firstHeaderText={intl.get('serializationTasks.serializationStep.finalStep.header')} />
      </HeaderWrapper>
      <ProductEditWidgetWrapper maxWidth='100%'>
        <WrapperText>
          <div>
            <span>{intl.get('serializationTasks.serializationStep.fifthStep.textProdSelected')}</span>
            <span>{values.select.name}</span>
          </div>
          <div>
            <span>{intl.get('serializationTasks.serializationStep.fifthStep.textToBeCreated')}</span>
            <span>{values.serialization.count}</span>
          </div>
          <div>
            <span>{intl.get('serializationTasks.serializationStep.fifthStep.textDeliveryLocation')}</span>
            <span>{values.location ? currLocation && currLocation.name : '-'}</span>
          </div>
          <div>
            <span>{intl.get('serializationTasks.serializationStep.fifthStep.textSubInfo')}</span>
          </div>
        </WrapperText>
      </ProductEditWidgetWrapper>
    </Wrapper>
  )
}

Confirm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object
}

Confirm.defaultProps = {
  values: {}
}

export default Confirm

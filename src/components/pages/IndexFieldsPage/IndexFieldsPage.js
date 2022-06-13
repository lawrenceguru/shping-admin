import React, { useEffect, useState } from 'react'
// import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { Select } from 'antd'
import IndexFieldsProducts from '../../atoms/IndexFieldsProducts'
import IndexFieldsDocuments from '../../atoms/IndexFieldsDocuments'
import IndexFieldsSerialization from '../../atoms/IndexFieldsSerialization'
import { FieldsWrapper, IndexFieldsHeader } from './styles'
import TabPagesWrapper from '../../atoms/TabPagesWrapper'

const { Option } = Select

const IndexFieldsPage = ({ modules }) => {
  const [indexOptions, setIndexOptions] = useState(['Products', 'Documents'])
  const [currentIndexOption, setCurrentIndexOption] = useState(indexOptions[0])

  useEffect(() => {
    if (modules.includes('serialization') && !indexOptions.includes('Track & Trace')) {
      setIndexOptions([...indexOptions, 'Track & Trace'])
    }
  }, [modules])

  const handleChangeIndexFieldsType = value => {
    setCurrentIndexOption(value)
  }

  return (
    <TabPagesWrapper>
      <IndexFieldsHeader>
        <span>Index fields for</span>
        <Select
          defaultValue={indexOptions[0]}
          getPopupContainer={trigger => trigger.parentNode}
          style={{ width: 250, margin: '0 20px', height: '100%', display: 'flex', alignItems: 'center' }}
          onChange={handleChangeIndexFieldsType}
        >
          {indexOptions.map(el => (
            <Option
              key={el}
              value={el}
              style={{ color: 'rgb(178,179,178)', fontFamily: 'Roboto', fontWeight: 600, fontSize: 20 }}
            >
              {el}
            </Option>
          ))}
        </Select>
      </IndexFieldsHeader>
      <FieldsWrapper>
        {/* eslint-disable-next-line no-nested-ternary */}
        {currentIndexOption === 'Products' ? (
          <IndexFieldsProducts />
        ) : currentIndexOption === 'Documents' ? (
          <IndexFieldsDocuments />
        ) : (
          <IndexFieldsSerialization />
        )}
      </FieldsWrapper>
    </TabPagesWrapper>
  )
}

IndexFieldsPage.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.string)
}

IndexFieldsPage.defaultProps = {
  modules: []
}

export default withRouter(IndexFieldsPage)

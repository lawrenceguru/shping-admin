import React from 'react'

const Loader = ({ style }) => {
  return (
    <div className='spinner' style={style}>
      <div className='rect1' />
      <div className='rect2' />
      <div className='rect3' />
      <div className='rect4' />
      <div className='rect5' />
    </div>
  )
}

export default Loader

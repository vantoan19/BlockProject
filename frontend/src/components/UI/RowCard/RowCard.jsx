import React from 'react'
import './rowcard.scss'

const RowCard = (props) => {
  return (
    <div className={'horizontal-card ' + props.className}>
        {props.children}
    </div>
  )
}

export default RowCard
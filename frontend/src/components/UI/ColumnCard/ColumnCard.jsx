import React from 'react'
import './columncard.scss'

const ColumnCard = (props) => {
  return (
    <div className={'vertical-card ' + props.className}>
        {props.children}
    </div>
  )
}

export default ColumnCard
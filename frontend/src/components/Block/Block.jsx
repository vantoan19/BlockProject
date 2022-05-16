import React from 'react'
import './block.scss'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import ColumnCard from '../UI/ColumnCard/ColumnCard'
import RowCard from '../UI/RowCard/RowCard';
import BlockSubList from './BlockSubList/BlockSubList'

const Block = (props) => {
  return (
    <ColumnCard className='block'>
        <RowCard className='header-wrapper'>
            <h2 className='block-content'>{props.content}</h2>
            <ArrowCircleRightIcon className='go-in-icon' onClick={(e) => props.goDownHandler(props.index)}/>
        </RowCard>
        <BlockSubList subBlocks={props.subBlocks}/>
    </ColumnCard>
  )
}

export default Block
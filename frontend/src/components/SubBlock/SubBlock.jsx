import React from 'react'
import DescriptionIcon from '@mui/icons-material/Description'
import './subblock.scss'

import RowCard from '../UI/RowCard/RowCard'
import ColumnCard from '../UI/ColumnCard/ColumnCard'
import SubBlockSubList from './SubBlockSubList/SubBlockSubList'

const SubBlock = (props) => {
  return (
    <RowCard className="sub-block">
        <DescriptionIcon className='article-icon'/>
        <ColumnCard className='sub-block-info'>
            <h4 className='sub-block-content'>{props.block.content}</h4>
            <SubBlockSubList subBlocks={props.block.subBlocks}/>
        </ColumnCard>
    </RowCard>
  )
}

export default SubBlock
import React from 'react'
import './blocksublist.scss'

import ColumnCard from '../../UI/ColumnCard/ColumnCard'
import SubBlock from '../../SubBlock/SubBlock'

const BlockSubList = (props) => {
    const blockList = props.subBlocks 
    const blockListItems = blockList.map(block => {
        return <SubBlock block={block}/>
    })

  return (
    <ColumnCard>
        {blockListItems}
    </ColumnCard>
  )
}

export default BlockSubList
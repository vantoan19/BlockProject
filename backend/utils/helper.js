const getBlockByPath = (page, path) => {
    if (path === 'page')
        return page

    const indexes = path.split('-').slice(1).map(index => +index)
    
    let curBlock = page[indexes[0]]
    indexes.slice(1).forEach(index => {
        curBlock = curBlock.subBlocks[index]
    })

    return curBlock
}

const getParentBlockByPath = (page, path) => {
    if (path === 'page')
        return null

    const indexes = path.split('-').slice(1).map(index => +index)

    if (indexes.length === 1)
        return page

    let curBlock = page[indexes[0]]
    indexes.slice(1, -1).forEach(index => {
        curBlock = curBlock.subBlocks[index]
    })

    return curBlock
}


module.exports = {
    getBlockByPath,
    getParentBlockByPath
}
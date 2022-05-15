const express = require('express')
const { Block } = require('../utils/block')
const App = require('../index')
const { getBlockByPath, getParentBlockByPath } = require('../utils/helper')

const router = express.Router()
const page = []

router.post('/api/insert', (req, res) => {
    try {
        req.body.forEach(block => {
            (!block.path || !block.content) && res.status(400).send('Missing path field or content')
    
            const targetBlock = getBlockByPath(page, block.path)
    
            if (targetBlock === page)
                page.push(new Block(block.content))
            else
                targetBlock.insert(block.content)
        })
    
        res.send('Inserted Successfully')
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/api/delete', (req, res) => {
    try {
        req.body.forEach(block => {
            !block.path && res.status(400).send('Missing path field')

            const targetBlock = getBlockByPath(page, block.path)
            const parentBlock = getParentBlockByPath(page, block.path)

            if (!parentBlock)
                res.status(400).send('Cannot delete a page')

            targetBlock.delete(parentBlock)
        })

        res.send('Deleted successfully')
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.post('/api/duplicate/:path', (req, res) => {
    const path = req.params.path

    // try {
        !path && res.status(400).send('Missing path field')

        const targetBlock = getBlockByPath(page, path)
        const parentBlock = getParentBlockByPath(page, path)

        if (!targetBlock)
            res.status(400).send('Cannot duplicate a page')

        targetBlock.duplicate(parentBlock)

        res.send('Duplicated the block successfully')
    // }
    // catch (error) {
    //     res.status(400).send(error)
    // }
})

router.patch('/api/move', (req, res) => {
    // try {
        if (!req.body.sourcePath || !req.body.targetPath)
            res.status(400).send('Missing source path field or target path field')

        const position = req.body.position ? req.body   .position : 0

        const sourceBlock = getBlockByPath(page, req.body.sourcePath)
        const parentBlock = getParentBlockByPath(page, req.body.sourcePath)
        const targetBlock = getBlockByPath (page, req.body.targetPath)

        if (!parentBlock)
            res.status(400).send('Cannot move a page')

        sourceBlock.move(parentBlock, targetBlock, position)

        res.send('Moved successfully')
    // }
    // catch {
    //     res.status(400).send(error)
    // }
})

router.get('/api/export', (req, res) => {
    try {
        res.send(page)
    }
    catch {
        res.status(400).send(error)
    }
})


module.exports = router
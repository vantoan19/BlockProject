const express = require('express')
const BlockRouter = require('./routers/block_router')


const app = express()
const port = process.env.PORT 

app.use(express.json())

app.use(BlockRouter)

app.listen(4000, () => {
    console.log('Backend server is up on port', 4000)
})
const express = require('express')
const actionsRouter = require('./actions-Router')
const server = express()
const port = 7000

server.use(express.json())

server.use('/', actionsRouter)

server.listen(port, () => {
    console.log(`\n *** Server is listening on port ${port} ***\n`)
})

server.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
})


const express = require('express')
const projectModel = require('./data/helpers/projectModel')
const actionsModel = require('./data/helpers/actionModel')
const router = express.Router()

router.get('/api/actions', async (req,res) => {
    try {
        const actions = await db.find()
        res.status(200).json(actions)
    } catch (error) {
        res
        .status(500)
        .json({ error: 'The actiosn information could not be retrieved.' })
    }
})
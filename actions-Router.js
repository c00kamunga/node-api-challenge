const express = require('express')
const projectModel = require('./data/helpers/projectModel')
const actionsModel = require('./data/helpers/actionModel')
const router = require("express").Router();

router.get('/api/actions', async (req,res) => {
    try {
        const actions = await actionsModel.get()
        res.status(200).json(actions)
    } catch (error) {
        res
        .status(500)
        .json({ error: 'The actions information could not be retrieved.' })
    }
})

module.exports = router
const express = require('express')
const projectModel = require('./data/helpers/projectModel')
const actionsModel = require('./data/helpers/actionModel')
const router = require("express").Router();


//end point for getting actions
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


//endpoint for creating an action for a project
router.post('/api/project/:id/actions', (req, res) => {
    if(!req.body.description && !req.body.notes){
        res
        .json(400)
        .json({ errorMessage: "Please provide description and notes for the action." })
    }
    actionsModel.insert(req.body)
    .then(newAction => {
        return res
        .status(201)
        .json(newAction)
    })
    .catch(error => {
        error: "There was an error while saving the action to the database."
    })
})

module.exports = router
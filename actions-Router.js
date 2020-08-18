const express = require('express')
const actionModel = require('./data/helpers/actionModel')
const projectModel = require("./data/helpers/projectModel");
const dbConfig = require('./data/dbConfig');
const router = require("express").Router();


//end point for getting actions
router.get('/api/actions', async (req,res) => {
    try {
        const actions = await actionModel.get()
        res.status(200).json(actions)
    } catch (error) {
        res
        .status(500)
        .json({ error: 'The actions information could not be retrieved.' })
    }
})


//endpoint for creating an action for a project
router.post('/api/project/:id/actions', (req, res) => {
    newAction = req.body
    if(!req.body.description && !req.body.notes){
        res
        .status(400)
        .json({ errorMessage: "Please provide description and notes for the action." })
    }
    
    actionModel.insert(newAction)
    .then(action => {
        return res
        .status(201)
        .json(action)
    })
    .catch(error => {
        error: "There was an error while saving the action to the database."
    })
})

router.put('/api/project/:id/actions', (req, res) => {
    const changes = req.body
    const id = req.params.id
    
    actionModel.update(id, changes)
    .then(action => {
        res
        .status(200)
        .json(action)
    }) 
    .catch(err => {
        res
        .status(500)
        .json({ errorMessage: "Error editing the action" })
    })
})

router.delete('/api/project/:id/actions', (req, res) => {
    const id = req.params.id

    actionModel.remove(id)
    .then(removedAction => {
        res
        .status(200)
        .json({ message: "Successfully delete action" })
    })
    .catch(err => {
        res
        .status(500)
        .json({ errorMessage: "Error removing action" })
    })
})


///////////////////////////////////////////////////////////////////////


router.get("/api/projects", async (req, res) => {
    try {
        const projects = await projectModel.get()
        res.status(200).json(projects)
    } catch (error) {
        res
        .status(500)
        .json({ error: "The projects information coul not be retrieved." })
    }
  });

  router.post('/api/projects', (req, res) => {
      if (!req.body.name && !req.body.description) {
          return res
          .status(400)
          .json({ errorMessage: "Please provide name and description for project creation." })
      } projectModel.insert(req.body)
      .then(id => {
          res
          .status(201)
          .json(id)
      })
      .catch(error => {
          res
          .status(500)
          .json({ errorMessage: "There was an error while saving to the database." })
      })
  })
  
  router.put('/api/projects/:id', (req, res) => {
      if(!req.body.name && !name.body.description) {
          return res
          .status(400)
          .json({ errorMessage: "Please provide the name and description for the project." })
      } projectModel.update(req.params.id, req.body)
      .then(updatedProject => {
          if (updatedProject) {
              res
              .status(200)
              .json(updatedProject)
          } else {
              res
              .status(404)
              .json({ errorMessage: "The project with the specified ID does not exist" })
          }
      })
      .catch(error => {
          res
          .status(500)
          .json({ errorMessage: "The project with the specified ID could not be modified." })
      })
  })

  router.delete('/api/projects/:id', (req, res) => {
      projectModel.remove(req.params.id)
      .then(removedProject => {
          if(!removedProject) {
              res
              .status(404)
              .json({errorMessage: "The project with the specified ID does not exist." })
          } else {
              res
              .status(200)
              .json(removedProject)
          }
      })
      .catch(error => {
          res
          .status(500)
          .json({ error: "The project could not be removed."})
      })
  })

  router.get('/api/projects/:id/actions', (req, res) => {
    projectModel.getProjectActions(req.params.id)
      .then(actions => {
        if (actions.length === 0) {
          res
            .status(404)
            .json({ message: 'The action with the specified ID does not exist.' })
        } else {
          res.status(200).json(actions)
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: 'The actions information could not be retrieved.' })
      })
  })
  




module.exports = router
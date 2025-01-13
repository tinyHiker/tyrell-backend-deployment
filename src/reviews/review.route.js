const express = require('express')
const router = express.Router()
const Review = require('./review.model')

//const verifyAdminToken = require('../middleware/verifyAdminToken')
//post a book

router.post("/create-review", (req, res) => {
    let body = {...req.body}
    res.send(body.review)
})
router.get("/", (req, res) => {
    res.send("Get all reviews response") 
})
router.get("/:id", (req, res) => {
    res.send("Get single review response")
})

router.put("/edit/:id", (req, res) => {
    res.send("Update a single review response")
})

router.delete("/:id",  (req, res) => {
    res.send("Delete a single review response")
})

module.exports = router
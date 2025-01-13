const express = require('express')
const router = express.Router()
const Book = require('./book.model')
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller')
const verifyAdminToken = require('../middleware/verifyAdminToken')
//post a book

// CORRECT FINAL VERSION WITH TOKEN VERIFICATION: router.post("/create-book", verifyAdminToken, postABook)
router.post("/create-book", postABook)

router.get("/", getAllBooks)
router.get("/:id", getSingleBook)

//CORRECT FINAL VERSION: router.put("/edit/:id", verifyAdminToken, UpdateBook)
router.put("/edit/:id", UpdateBook)


//CORRECT FINAL VERSION: router.delete("/:id", verifyAdminToken, deleteABook)
router.delete("/:id", deleteABook)


module.exports = router
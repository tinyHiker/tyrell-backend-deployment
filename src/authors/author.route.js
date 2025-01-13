const express = require('express')
const router = express.Router()
const Author = require('./author.model')

const verifyAdminToken = require('../middleware/verifyAdminToken')
//post a book

router.post("/create-author", async (req,res) => {
    try{
        console.log("REQUEST BODY")
        console.log({...req.body})

        const newAuthor = await Author({...req.body});
        await newAuthor.save();

        console.log("FINAL NEW AUTHOR")
        console.log(newAuthor)
        
        res.status(200).send({message: "Author posted successfully", author: newAuthor})
        return

    } catch (error) {
        console.error("Error creating author", error);
        res.status(500).send({message: "Failed to create author"})
        return 
    }
})

router.get("/", async (req, res) => {
    try {
        const authors = await Author.find({}).sort({createdAt: -1});
        res.status(200).send(authors)
        return

    } catch (error) {
        console.error("Error fetching authors", error);
        res.status(500).send({message: "Failed to fetch authors"})
        return 
    }
})

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const author = await Author.findById(id);
        if (!author) {
            res.status(404).send({message: "Author not found"})
            return
        }
        res.status(200).send(author)
        return
    } catch (error) {
        console.error("Error fetching author", error);
        res.status(500).send({message: "Failed to fetch author"})
        return
    }
})

router.put("/edit/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, {new:true});
        if(!updatedAuthor){
            res.status(404).send({message: "Author is not Found!"})
            return
        }
        res.status(200).send({
            message: "Author updated successfully",
            author: updatedAuthor
        })
        return 
    } catch (error) {
        console.error("Error updating an author", error)
        res.status(500).send({message: "Failed to update an author"})
        return
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deletedAuthor = await Author.findByIdAndDelete(id)
        if (!deletedAuthor) {
            res.status(404).send({message: "Author is not found"})
            return 
        }

        res.status(200).send({
            message: "Author deleted successfully",
            author: deletedAuthor
        })
        return 
    } catch(error){
        console.error("Error deleting an author", error);
        res.status(500).send({message: "Failed to delete an author"})
        return 
    }
})

//router.put("/edit/:id", verifyAdminToken, UpdateBook)

//router.delete("/:id", verifyAdminToken, deleteABook)

module.exports = router
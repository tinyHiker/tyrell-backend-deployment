const express = require('express')
const router = express.Router()
const Quote = require('./quote.model')

//const verifyAdminToken = require('../middleware/verifyAdminToken')
//post a book

router.post("/create-quote", async (req,res) => {
    try{
        //console.log("REQUEST BODY")
        //console.log({...req.body})

        const newQuote = await Quote({...req.body});
        await newQuote.save();

        //console.log("FINAL NEW QUOTE")
        //console.log(newQuote)
        
        res.status(200).send({message: "Quote posted successfully", quote: newQuote})
        return

    } catch (error) {
        console.error("Error creating quote", error);
        res.status(500).send({message: "Failed to create quote"})
        return 
    }
})

router.get("/", async (req, res) => {
    try {
        const quotes = await Quote.find({}).sort({createdAt: -1});
        res.status(200).send(quotes)
        return

    } catch (error) {
        console.error("Error fetching quotes", error);
        res.status(500).send({message: "Failed to fetch quotes"})
        return 
    }
})


router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const quote = await Quote.findById(id);
        if (!quote) {
            res.status(404).send({message: "Quote not found"})
            return
        }

        res.status(200).send(quote)
        return
    } catch (error) {
        console.error("Error fetching quote", error);
        res.status(500).send({message: "Failed to fetch quote"})
        return
    }
})

router.put("/edit/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const updatedQuote = await Quote.findByIdAndUpdate(id, req.body, {new:true});
        if(!updatedQuote){
            res.status(404).send({message: "Quote is not Found!"})
            return
        }
        res.status(200).send({
            message: "Quote updated successfully",
            author: updatedQuote
        })
        return 
    } catch (error) {
        console.error("Error updating a quote", error)
        res.status(500).send({message: "Failed to update a quote"})
        return
    }
})

router.delete("/:id",  async (req, res) => {
    try {
        const {id} = req.params;
        const deletedQuote = await Quote.findByIdAndDelete(id)
        if (!deletedQuote) {
            res.status(404).send({message: "Quote is not found"})
            return 
        }

        res.status(200).send({
            message: "Quote deleted successfully",
            author: deletedQuote
        })
        return 
    } catch(error){
        console.error("Error deleting a quote", error);
        res.status(500).send({message: "Failed to delete a quote"})
        return 
    }
})

module.exports = router
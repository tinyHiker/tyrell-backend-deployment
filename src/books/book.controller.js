const express = require('express')

const Book = require('./book.model')

const postABook = async (req,res) => {
    try{
        console.log("REQUEST BODY")
        console.log({...req.body})

        const newBook = await Book({...req.body});
        await newBook.save();

        console.log("FINAL NEW BOOK")
        console.log(newBook)
        
        res.status(200).send({message: "Book posted successfully", book: newBook})
        return

    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({message: "Failed to create book"})
        return 
    }
}



const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({}).sort({createdAt: -1});
        res.status(200).send(books)
        return

    } catch (error) {
        console.error("Error fetching books", error);
        
        res.status(500).send({message: "Failed to fetch books"})
        return 
        
        

    }
}

const getSingleBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id).populate('authors').populate("quotes")
        if (!book) {
            res.status(404).send({message: "Book not found"})
            return
        }
        res.status(200).send(book)
        return 
    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({message: "Failed to fetch book"})
        return

    }
}

const UpdateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new:true});
        if(!updatedBook){
            res.status(404).send({message: "Book is not Found!"})
            return
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        })
        return 
    } catch (error) {
        console.error("Error updating a book", error)
        res.status(500).send({message: "Failed to update a book"})
        return 
    }
}

const deleteABook = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id)
        if (!deletedBook) {
            res.status(404).send({message: "Book is not found"})
            return 
        }

        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
        return 
    } catch(error){
        console.error("Error deleting a book", error);
        res.status(500).send({message: "Failed to delete a book"})
        return 
    }
}

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook
}
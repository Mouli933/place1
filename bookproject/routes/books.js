const express = require("express");
const router=express.Router();

const Book = require("../models/book");

// get books

router.get("/",async(req,res)=>{
    try{
        const books= await Book.find();
        res.status(200)
        .json(books);

    }
    catch(error){
        res.status(500)
        .json({
            message:error.message
        });
    }
});

// ADD BOOk
router.post("/",async(req,res)=>{
    try{
        const newBook= new Book(req.body);
        const savedBook= await newBook.save();
        res.status(201)
        .json(savedBook);
    }

   catch(error){
        res.status(500)
        .json({
            message:error.message
        });

    }
});

module.exports= router;


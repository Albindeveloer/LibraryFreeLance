import express  from "express";
import { addBook, createAuther, createBook, createGenre, deleteAuther, deleteBook, deleteGener, deleteSubbook, getAuthers, getBook, getBookByField, getBooks, getGenres, getSubBook, issueBook, returnBook, updateBook } from "../controllers/book.js";
import { verifyAdmin } from "../utils/verifyToken.js";

 const router =express.Router();


router.post("/", verifyAdmin,createBook)

//create Auther
router.post("/auther", verifyAdmin, createAuther)
router.get("/auther",getAuthers)
router.delete("/auther/:id", verifyAdmin, deleteAuther )

//create Genre
router.post("/genre", verifyAdmin, createGenre)
router.get("/genre",getGenres)
router.delete("/genre/:id", verifyAdmin, deleteGener)

//delete book
router.delete("/:id", verifyAdmin, deleteBook)

//update book
router.put("/:id", verifyAdmin, updateBook)
router.put("/addbook/:id", verifyAdmin,addBook)
router.delete("/:subbookid/:bookid", verifyAdmin, deleteSubbook)
router.get("/:subbookid/:bookid",getSubBook)

//get books
router.get("/",getBooks)

router.get("/find/:id",getBook)

router.get("/byfield/book/:id",getBookByField)


//issue book
router.put("/:subbookid/:bookid",issueBook)
router.put("/return/:subbookid/:bookid", verifyAdmin, returnBook)

 export default router

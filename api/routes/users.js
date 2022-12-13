import express  from "express";
import { deleteUser, getOwedBooks, getOwedSubBooks, getSearchUser, getUsers, updateUser } from "../controllers/user.js";

 const router =express.Router();


//getall
router.get("/", getUsers)

//delete user
router.delete("/:id",deleteUser)

//get owed books
router.get("/findBook/:userid",getOwedBooks)        // get all main book details contains specified user (without bookNumber array)
router.get("/findBook/:userid/:bookid",getOwedSubBooks)  //get details with bookNumber array for specified Mainbook


//search user by name
router.post("/searchByName",getSearchUser)

//edit or update user
router.put("/:id",updateUser)

 export default router

import express  from "express";
import { deleteUser, getUsers } from "../controllers/user.js";

 const router =express.Router();


//getall
router.get("/", getUsers)

//delete user
router.delete("/:id",deleteUser)

 export default router

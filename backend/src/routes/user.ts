import express from 'express'
import { deleteUser, getAllUsers, getUser, newUser } from '../controllers/user.js';
import { adminOnly } from '../middlewares/auth.js';

const app = express.Router();

// api/v1/user/new
app.post("/new", newUser)

//api/v1/user/all
app.get("/all", adminOnly, getAllUsers)

//api/v1/user/:id
app.route("/:id").get(getUser).delete(adminOnly, deleteUser); //chaining routes because they have same id


export default app;
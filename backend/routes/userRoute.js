// routes/userRoute.js
import express from "express";
import {
  fetch,
  create,
  update,
  deleted,
  login,
} from "../controller/userController.js"; // Adjust path if necessary

const router = express.Router();

// Define your routes
router.get("/getAllUsers", fetch);
router.post("/create", create);
router.put("/update/:id", update);
router.delete("/delete/:id", deleted);
router.post("/login", login);

export default router;

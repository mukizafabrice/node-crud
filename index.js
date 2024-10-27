import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "../node-crud/routes/userRoute.js"; // Adjust the import path if necessary

dotenv.config(); // Load environment variables

const app = express();
app.use(bodyParser.json()); // Use body-parser middleware

const PORT = process.env.PORT || 3000; // Use a different port if needed
const MONGOURL = process.env.MONGO_URL; // Get MongoDB URL from environment variables

// Connect to MongoDB
mongoose
  .connect(MONGOURL) // The options for useNewUrlParser and useUnifiedTopology are no longer needed
  .then(() => {
    console.log("Database connection established");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("Database connection error:", error)); // Log connection error

// Corrected route usage
app.use("/api/user", route); // Added a forward slash before 'api/user'

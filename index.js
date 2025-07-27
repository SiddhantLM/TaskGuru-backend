const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

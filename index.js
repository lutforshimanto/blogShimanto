const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const multer = require("multer");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {})
    .then(console.log("Connected to MongoDB."))
    .catch( err => console.log(err));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cd(null, "blogImages");
    }, 
    filename: (req, file, cb) => {
        cd(null, req.body.name);
    }
});

const upload = multer({ storage: storage });
app.post("/blog/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use("/blog/auth", authRoute);
app.use("/blog/users", userRoute);
app.use("/blog/posts", postRoute);

app.listen(5000, ()=> {
    console.log("Backend is listening...");
})
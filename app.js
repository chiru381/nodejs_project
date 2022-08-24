const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const userRoute = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("server connected");
});

app.use('/api', userRoute)

mongoose
  .connect('mongodb://127.0.0.1:27017/node_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo DB - Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
});
app.use("/profile", express.static("upload/images"));
app.post("/upload", upload.single("profile"), (req, res) => {
  res.json({
    success: 1,
    profile_url: `http://localhost:3000/profile/${req.file.filename}`,
  });
});

function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message,
    });
  }
}
app.use(errHandler);


app.listen(3000, (err) => {
    if (err) throw err;
    console.log('runnding on port 3000');
});
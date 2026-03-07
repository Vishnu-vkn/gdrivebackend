const express = require('express');
const router = express.Router();
const streamifier = require('streamifier');
const fileModel = require('../models/file.model');
const authMiddleware = require("../middlewares/auth")


const upload = require('../config//multer.config')
const cloudinary = require("../config/cloud.config")

router.get('/home', authMiddleware, async(req, res) => {
  
  /*Display files in frontend */

  const userFiles = await fileModel.find({
      user : req.user.userId 
  })

  
  console.log(userFiles);

  
  res.render('home',{
    files :  userFiles
  });
})

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();
    const newFile = await fileModel.create({
      public_id: result.public_id,
      url: result.secure_url,
      originalname: req.file.originalname,
      size: req.file.size,
      user: req.user.userId
    })

    res.json(newFile)



  } catch (err) {
    res.status(500).json({ error: err.message });
  }


});



module.exports = router;
const express = require('express');
const router = express.Router();
const streamifier = require('streamifier');
const fileModel= require('../models/file.model');


const upload = require('../config//multer.config')
const cloudinary = require("../config/cloud.config")

router.get('/home',(req,res)=>{
    res.render('home'); 
})

router.post("/upload", upload.single("file"), async (req, res) => {
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

    res.json({
      message: "Uploaded Successfully",
      url: result.secure_url,
      public_id: result.public_id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  

});



module.exports=router;
const express = require('express');
const router = express.Router();
const streamifier = require('streamifier');
const fileModel = require('../models/file.model');
const authMiddleware = require("../middlewares/auth")



const upload = require('../config//multer.config')
const cloudinary = require("../config/cloud.config")

router.get('/home', authMiddleware, async(req, res) => {
  
  /*Display files in frontend */
  try{

    
    const userFiles = await fileModel.find({
      user : req.user.userId 
    })
    
    
    console.log(userFiles);
    
    
    res.render('home',{
      files :  userFiles
    });
  
}catch(err){
  console.log(err)
  res.status(500).json({
    message:"Server error"
  })
}
})

  
router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" ,
            type:"private"
          },
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
      format :  result.format,
      resource_type:result.resource_type,
      originalname: req.file.originalname,
      size: req.file.size,
      user: req.user.userId
    })

    res.json(newFile)



  } catch (err) {
    res.status(500).json({ error: err.message });
  }


});


router.get("/download/:_id",authMiddleware,async(req,res)=>{
  
  const loggedInUserId=req.user.userId;
  console.log("Download route triggered");

  const file = await fileModel.findOne({
    user:loggedInUserId,
    _id:req.params._id
  })

  if(!file){
    return res.status(401).json({
      message:'Unauthorized'
    });
  }

  console.log("FILE:", file);

   const signedUrl = cloudinary.utils.private_download_url(
    file.public_id,
    file.format,
    {
      resource_type: file.resource_type,
      // time limit 5 minutes
      attachment:file.originalname,
      expires_at: Math.floor(Date.now() / 1000) + 300
    }
  );

  console.log(signedUrl);
  // cloudinary returns string 
  res.redirect(signedUrl);


})


module.exports = router;
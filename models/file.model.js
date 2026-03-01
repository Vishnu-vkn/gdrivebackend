const mongoose = require('mongoose');

const fileSchema=new mongoose.Schema({
    public_id:{
        type:String,
        required:true
    },

     originalname: {
      type: String,
      required: true
    },


    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: [true,'User is required']
    }


})

module.exports = mongoose.model('file', fileSchema);
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
      ref: 'user',
      required: [true,'User is required']
    },

    format: {type:String,
      required:true
    },

  resource_type: {type:String,
    required:true
  }


})

module.exports = mongoose.model('file', fileSchema);
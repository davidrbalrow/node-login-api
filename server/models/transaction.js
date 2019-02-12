var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
      },
      amount:{
        type: Number,
        default: null,
        required: tru
      },
      postedAt:{
        type: Number,
        default: null
      },
      cycle:{
        type: String,
        required: false,
        minlength: 1,
        trim: true
      }
});

module.exports={TransactionSchema};
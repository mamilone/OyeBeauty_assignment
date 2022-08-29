const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const dataSchema = new mongoose.Schema({
     _id: String,//mongoose.Schema.Types.ObjectId,
    fieldname: {type: String, required: true},
  originalname: {type: String, required: true},
  encoding: {type: String, required: true},
  mimetype: {type: String, required: true},
  buffer:{type: Buffer,required: true},
  size: {type:Number,required:true}
})
dataSchema.plugin(mongoosePaginate);

const counterSchema = new mongoose.Schema({
  id:{
    type: String
  },
  seq:{
    type:Number
  }
})

let model = mongoose.model('data', dataSchema);
let countmodel = mongoose.model('counter',counterSchema)
module.exports = {model,countmodel};
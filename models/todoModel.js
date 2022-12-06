const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    
  id:{type:String},
  description:{type: String},
  status:{type: String},
  
});
  


module.exports = new mongoose.model('todo',todoSchema);
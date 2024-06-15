const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    login:{type: String, required:true, unique:true},
    password:{type:String, required: true},
    name:{type:String, required: true},
    phone:{type:String, required: true},
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client
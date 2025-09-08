const mongoose = require('mongoose')

const NfcTagSchema = new mongoose.Schema({
    tag_id:String,
    state:String,
   
   
},{
    timestamps:true
}
) 
const NfcTagModel= mongoose.model("nfctags",NfcTagSchema)
module.exports = NfcTagModel
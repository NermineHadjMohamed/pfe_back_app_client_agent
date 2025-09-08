const mongoose  =require('mongoose');


const agent = mongoose.model(
    "Agent",
    mongoose.Schema({
        fullName:{
            type: String,
            required:true
        },

        email: {
            type: String,
            required:true,
            unique:true
        },
        password:{
            type: String,
            required:true
        },
        

    },
    {
        toJSON:{
            transform : function  (doc,ret) {
                ret.userId = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                delete ret.password;

            }
        }

    },{
        timestamps:true
    })

);

module.exports={
    agent
}
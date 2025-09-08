const mongoose = require("mongoose");

const cart = mongoose.model(
    "Cart",
    mongoose.Schema({
        userId:{
            type:String,
            required:true
        },
        products:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                    require:true,
                },
                quantity:{
                    type:Number,
                    required:true
                }
            }
        ]
}, {
    toJSON:{
        transform: function (mode, ret){
            ret.cartId = ret._id.toString();
            delete ret._id;
            delete ret.__v;
        }

    }
},{
    timestamps:true
} )

    
);
module.exports = {
    cart
}
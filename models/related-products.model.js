const mongoose =require("mongoose");
const { product } = require("./product.model");

const relatedProduct = mongoose.model("RelatedProduct",
    mongoose.Schema(
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            relatedProduct:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product" 

            }
        },
        {
            toJson:{
                transform: function(doc, ret){
                    delete ret._id;
                    delete ret._v;

                }

            },
            timestamps: true
        }
    )

 );

 module.exports= {
    relatedProduct,
 }
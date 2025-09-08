const mongoose = require("mongoose");

const category = mongoose.model(
  "Categories",
  mongoose.Schema(
    {
      categoryName:{
        type:String,
        required:true,
        unique:true,
      },
      
      categoryDescription: {
        type:String,
        required:false,
    },
     
    categoryImage: {
        type:String,

      },
      
    },
    {
      toJson: {
        transform: function (doc, ret){
          ret.categoryId =ret._id.toStrting();
          delete ret._id;
          delete ret._v;
        },

      },
    }
    //{ timestamps: true }
    
  )
);

module.exports = {
  category,
};
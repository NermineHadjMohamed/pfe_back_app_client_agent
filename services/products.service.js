const { product } = require("../models/product.model");


async function  createProduct(params, callback){
    if(!params.productName){
        return callback(
            {
                message: "Product Name required",               
            },
            ""
        );
    }

    if(!params.category){
        return callback(
            {
                message: "Category required",               
            },
            ""
        );
    }
    const productModel = new product(params);
    productModel.save()
        .then((response) => {
        return callback(null, response);
        })
        .catch((error) => {
        return callback(error);
        });
}

async function getProducts( callback) {
     
    product
    .find()
 
    .then((response) => {
        return callback(null, response);
      })
      .catch((error) => {
        return callback(error);
      });
      
  }

  async function getProductById(params, callback) {
    const productId = params.productId;

    product
    .findById(productId)
    .then((response) => {
        return callback(null, response);
      })
      .catch((error) => {
        return callback(error);
      });
      
  }

  async function updateProduct(params, callback) {
    const productId = params.productId;

    product
    .findByIdAndUpdate(productId, params, {useFindAndModify: false})
    .populate("category", "categoryName categoryImage")
    .then((response) => {
        if(!response) {
            callback(`Cannot update Product with id ${productId}`)
        }
        else  callback(null, response);
      })
      .catch((error) => {
        return callback(error);
      });
      
  }

  async function deleteProduct(params, callback) {
    const productId = params.productId;

    product
    .findByIdAndRemove(productId)
    .then((response) => {
        if(!response) {
            callback(`Cannot delete Product with id ${productId}`)
        }
        else  callback(null, response);
      })
      .catch((error) => {
        return callback(error);
      });
      
  }
  module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
  };

  

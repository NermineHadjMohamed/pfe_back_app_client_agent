const productsServices = require("../services/products.service");
const upload = require("../middleware/product.upload.js");

exports.create = (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        next(err);
      } else {
        const url = req.protocol + "://" + req.get("host");
  
        const path =
          req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
  
        var model = {
          productName: req.body.productName,
          category: req.body.category,
          productShortDescription: req.body.productShortDescription,
          productDescription: req.body.productDescription,
          productPrice: req.body.productPrice,
          productSalePrice: req.body.productSalePrice,
          productSKU: req.body.productSKU,
          productType: req.body.productType,
          stockStatus:req.body.stockStatus,
          productImage: path != "" ? url + "/" + path : "",
        };
  
        productsServices.createProduct(model, (error, results) => {
          if (error) {
            return next(error);
          }
          return res.status(200).send({
            message: "Success",
            data: results,
          });
        });
      }
    });
  };

 
exports.findAll = (req, res, next) => {
  
    productsServices.getProducts( (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    });
  };
 
exports.findOne = (req, res, next) => {
    var model = {
      productId: req.params.id,
    };
  
    productsServices.getProductById(model, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    });
  };
  

  exports.update = (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        next(err);
      } else {
        const url = req.protocol + "://" + req.get("host");
  
        const path =
          req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
  
        var model = {
            productId: req.params.id,
            productName: req.body.productName,
            category: req.body.category,
            productShortDescription: req.body.productShortDescription,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            productSalePrice: req.body.productSalePrice,
            productImage: path != "" ? url + "/" + path : "",
            productSKU: req.body.productSKU,
            productType: req.body.productType,
            stockStatus:req.body.stockStatus,
            
        };
  
        console.log(model);
  
        productsServices.updateProduct(model, (error, results) => {
          if (error) {
            return next(error);
          }
          return res.status(200).send({
            message: "Success",
            data: results,
          });
        });
      }
    });
  };
  
  
  exports.delete = (req, res, next) => {
    var model = {
      productId: req.params.productId,
    };
  
    productsServices.deleteProduct(model, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    });
  };

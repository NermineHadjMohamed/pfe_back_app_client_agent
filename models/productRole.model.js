const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductRoleSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: 'roles',
    required: true
  }
});

const ProductRole = mongoose.model('productroles', ProductRoleSchema);
module.exports = ProductRole

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderProductionSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'orders',
    required: true,
    index: true  
  },
  expectedFinishDate: {
    type: Date,  
    required: true,
  },
  products: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,
      index: true 
    },
    quantity: {
      type: Number,
      required: true
    },
    expectedFinishDate: {
      type: Date,  
      required: true
    },
    selectedNfcTags: [String],
    roles: [{
      roleId: {
        type: Schema.Types.ObjectId,
        ref: 'roles',
        required: true,
        index: true  
      },
      agents: [{
        type: Schema.Types.ObjectId,
        ref: 'Agent',
        index: true  
      }]
    }]
  }]
}, {
  timestamps: true  
});

const OrderProduction = mongoose.model('orderproductions', OrderProductionSchema);
module.exports = OrderProduction;

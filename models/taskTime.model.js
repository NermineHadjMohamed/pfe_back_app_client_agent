const mongoose = require('mongoose');

const taskTimeSchema = new mongoose.Schema({
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    startTime: { type: Date },
    finishTime: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('TaskTime', taskTimeSchema);

const mongoose = require('mongoose');

const ParameterSchema = new mongoose.Schema({
    parameter_name: String,
    parameter_value: String,
}, {
    timestamps: true
});


const ParameterModel = mongoose.model('Parameter', ParameterSchema);
module.exports = ParameterModel;

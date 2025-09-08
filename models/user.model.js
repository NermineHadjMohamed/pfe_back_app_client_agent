const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: false 
        },
        phoneNumber: {
            type: String,
            required: false 
        },
        postalAddress: {
            type: String,
            required: false 
        }
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.userId = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                delete ret.password; 
            }
        },
        timestamps: true
    }
);

const user = mongoose.model("User", userSchema);

module.exports = {
    user
};

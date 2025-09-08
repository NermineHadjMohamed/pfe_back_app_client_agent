const { user } = require('../models/user.model');

const bcrypt = require("bcryptjs");
const auth =require("../middleware/auth");

async function login({email, password}, callback) {
    console.log("HERE" + password);
    
    const userModel = await user.findOne({email : email});
    
    if(userModel != null){
        const isPasswordTheSame = await bcrypt.compare(password, userModel.password);
        console.log("ARE THE SAME ? "+ isPasswordTheSame);
        if(isPasswordTheSame){
            const token = auth.generateAccessToken(userModel.toJSON());
            return callback(null, {...userModel.toJSON(), token});

        }else {
            return callback({
                message:"Invalid Email/Password2"

            });

        }
    }
    else{
        return callback({
            message:"Invalid Email/Password"

        }); 
    }
}

async function register({ email, password, fullName, companyName, phoneNumber, postalAddress }, callback) {
    if (email === undefined) {
        return callback({ message: "Email Required!" });
    }

    let isUserExist = await user.findOne({ email: email });
    if (isUserExist) {
        return callback({ message: "Email already registered!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const userSchema = new user({
        email,
        password: hashedPassword,
        fullName,
        companyName,
        phoneNumber,
        postalAddress
    });

    userSchema.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getUserData(userId, callback) {
    try {
        const userModel = await user.findById(userId).select('-password'); 

        if (!userModel) {
            return callback({ message: "User not found!" });
        }

        return callback(null, userModel);
    } catch (error) {
        return callback(error);
    }
}
module.exports = {
    login,
    register,
    getUserData
}
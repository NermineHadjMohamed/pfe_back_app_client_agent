const userServices = require("../services/users.service")


exports.register = (req, res, next) => {
    const { email, password, fullName, companyName, phoneNumber, postalAddress } = req.body;

    userServices.register({
        email,
        password,
        fullName,
        companyName,
        phoneNumber,
        postalAddress
    }, (error, results) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            message: "Success",
            data: results
        });
    });
};

exports.login =(req, res, next) => {
    const{email, password} = req.body;
    console.log("email "+email)

    userServices.login({email,password}, (error, results) =>{
        if(error){
            return next(error);
        }

        return res.status(200).send({
            message:"Success",
            data: results
        });

    });
    
};
exports.getUserProfile = (req, res, next) => {
    const userId = req.user.userId;  

    userServices.getUserData(userId, (error, results) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            message: "User Data Retrieved Successfully",
            data: results
        });
    });
};

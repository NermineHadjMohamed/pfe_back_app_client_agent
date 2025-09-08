const agentServices = require("../services/agents.service");

exports.loginAgent = (req, res, next) => {
    const { email, password } = req.body;
    console.log("email " + email);

    agentServices.loginAgent({ email, password }, (error, results) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            message: "Success",
            data: results
        });
    });
};


const orderService = require("../services/order.service");

exports.create = async (req, res, next) => {
    try {
        const model = {
            userId: req.body.userId,
        };

        const results = await orderService.createOrder(model);

        return res.status(200).send({
            message: "Success",
            data: results,
        });
    } catch (error) {
        return next(error);
    }
};
exports.findAll = (req, res, next) => {
    const params = {
        userId: req.user.userId 
    };

    orderService.getAllOrders(params, (error, orders) => {
        if (error) {
            return next(error); 
        }

        return res.status(200).send({
            message: "Success",
            data: orders
        });
    });
};









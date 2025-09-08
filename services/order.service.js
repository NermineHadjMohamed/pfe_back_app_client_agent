const { user } = require("../models/user.model");
const { Order } = require("../models/order.model");
const cartService = require("./cart.service");

async function createOrder(params) {
    try {
        const userDB = await user.findOne({ _id: params.userId }).exec();
        if (!userDB) {
            throw new Error('User not found');
        }
        const cartDB = await new Promise((resolve, reject) => {
            cartService.getCart({ userId: userDB.id }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        if (!cartDB || cartDB.products.length === 0) {
            throw new Error('Cart is empty, cannot create order');
        }
        const products = [];
        let grandTotal = 0;

        cartDB.products.forEach(product => {
            products.push({
                product: product.product._id,
                quantity: product.quantity,
                amount: product.product.product_price
            });
            grandTotal += product.product.product_price * product.quantity;
        });

        const orderModel = new Order({
            userId: userDB._id,
            products: products,
            orderStatus: "created", 
            grandTotal: grandTotal
        });

        const savedOrder = await orderModel.save();

        await cartService.clearCart({ userId: userDB._id });

        return {
            id: savedOrder._id,
            userId: savedOrder.userId,
            products: savedOrder.products,
            grandTotal: savedOrder.grandTotal,
            orderStatus: savedOrder.orderStatus
        };
    } catch (error) {
        console.error("Error in createOrder:", error);
        throw error;
    }
}
async function getAllOrders(params, callback) {
    try {
        const orders = await Order.find({ userId: params.userId })
            .populate({
                path: 'products.product', 
                select: 'product_name product_price', 
            });

        if (!orders) {
            return callback(new Error("No orders found for the user"));
        }

        return callback(null, orders); 
    } catch (error) {
        console.error("Error fetching orders:", error);
        return callback(error); 
    }
}





module.exports = {
    createOrder,
    getAllOrders
};
const { cart } = require("../models/cart.model");

async function addCart(params) {
    if (!params.userId) {
        throw new Error("UserId Required");
    }

    const cartDB = await cart.findOne({ userId: params.userId }).exec();

    if (!cartDB) {
        const cartModel = new cart({
            userId: params.userId,
            products: params.products
        });

        return await cartModel.save();
    } else {
        if (cartDB.products.length === 0) {
            cartDB.products = params.products;
            return await cartDB.save();
        } else {
            for (const product of params.products) {
                const itemIndex = cartDB.products.findIndex(p => p.product.equals(product.product));

                if (itemIndex === -1) {
                    cartDB.products.push({
                        product: product.product,
                        quantity: product.quantity
                    });
                } else {
                    cartDB.products[itemIndex].quantity += product.quantity;
                }
            }
            return await cartDB.save();
        }
    }
}

async function getCart(params, callback) {
    return await cart.findOne({ userId: params.userId })
        .populate({
            path: 'products',
            populate: {
                path: 'product',
                model: 'Product',
                select: 'product_name product_price image',
            }
        }).then((response) =>{
             return callback(null, response);
        })
        .catch ((error) => {
            return callback(error);

        });
}

async function removeCartItem(params) {
    const cartDB = await cart.findOne({ userId: params.userId }).exec();

    if (!cartDB || cartDB.products.length === 0) {
        throw new Error("Cart empty!");
    }

    if (params.productId && params.quantity) {
        const productId = params.productId;
        const quantity = params.quantity;
        const itemIndex = cartDB.products.findIndex(p => p.product.equals(productId));

        if (itemIndex === -1) {
            throw new Error("Invalid Product!");
        } else {
            const currentQuantity = cartDB.products[itemIndex].quantity;
            
            if (currentQuantity < quantity) {
                throw new Error(`Enter a lower quantity. Only ${currentQuantity} available.`);
            }

            if (currentQuantity === quantity) {
                cartDB.products.splice(itemIndex, 1);
            } else {
                cartDB.products[itemIndex].quantity -= quantity;
            }
            
            return await cartDB.save();
        }
    } else {
        throw new Error("ProductId and Quantity required");
    }
}


async function clearCart(params) {
    return await cart.findOneAndUpdate(
        { userId: params.userId },
        { $set: { products: [] } }
    ).exec();
}

module.exports = {
    addCart,
    getCart,
    removeCartItem,
    clearCart
};

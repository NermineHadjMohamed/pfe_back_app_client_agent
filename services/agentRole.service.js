const OrderProduction = require('../models/OrderProduction.model');

async function getAgentRolesForOrder(agentId) {
    try {
        console.log('Fetching order productions for agentId:', agentId);

        const orderProductions = await OrderProduction.find({
            'products.roles.agents': agentId
        })
        .populate({
            path: 'products.productId',
            model: 'Product',
            select: 'product_name image description document parameter_types product_price parameters',
            populate: {
                path: 'parameters', 
                model: 'Parameter',
                select: 'parameter_name parameter_value'
            }
        })
        .populate({
            path: 'products.roles.roleId',
            model: 'Role',
            select: 'role_name description'
        });

        if (!orderProductions.length) {
            console.error('No order productions found for this agentId.');
            return [];
        }

        const results = orderProductions.flatMap(order => {
            return order.products.flatMap(product => {
                const roleDetails = product.roles.find(role => role.agents.includes(agentId));

                return roleDetails ? {
                    orderId: order.orderId,
                    productId: product.productId._id,
                    productName: product.productId.product_name,
                    productImage: product.productId.image,
                    productDocument: product.productId.document,
                    productDescription: product.productId.description,
                    productQuantity: product.quantity,
                    productExpectedFinishDate: product.expectedFinishDate,
                    roleId: roleDetails.roleId,
                    parameters: product.productId.parameters
                        ? product.productId.parameters.map(param => ({
                            parameterName: param.parameter_name,
                            parameterValue: param.parameter_value
                        }))
                        : []
                } : null;
            });
        }).filter(Boolean);

        return results;
    } catch (error) {
        console.error('Error fetching agent roles:', error);
        throw new Error('Failed to retrieve agent roles');
    }
}

module.exports = {
    getAgentRolesForOrder
};

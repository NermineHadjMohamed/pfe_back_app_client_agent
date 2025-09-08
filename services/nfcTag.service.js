const NfcTagModel = require('../models/nfcTag.model');
const OrderProduction = require('../models/OrderProduction.model');
const ParameterModel = require('../models/parameter.model');
const RoleModel = require('../models/role.model');

const fetchProductByNfcTag = async (body) => {
    const nfcTagId = body.tagId; 
    console.log(`Received NFC Tag ID: ${nfcTagId}`);

    const nfcTag = await NfcTagModel.findOne({ tag_id: nfcTagId });
    if (!nfcTag) {
        throw new Error("NFC tag not found");
    }
    console.log("Found NFC Tag:", nfcTag._id);
    const order = await OrderProduction.findOne({
        "products.selectedNfcTags": nfcTagId 
    }).populate({ 
        path: 'products.productId',
        model: 'Product',
        select: 'product_name product_price description image document parameters' 
    });

    if (!order) {
        throw new Error("No orders found with this NFC tag");
    }
    console.log("Found Order:", order._id);

    const productDetails = [];
    for (const product of order.products) {
        console.log("Processing Product:", product._id); 

        if (product.productId) {
            const productId = product.productId._id.toString();
            console.log("Processing Product ID:", productId);
            const parametersDetails = await Promise.all(
                product.productId.parameters.map(async (paramId) => {
                    const param = await ParameterModel.findById(paramId); 
                    return {
                        id: param._id, 
                        name: param.parameter_name, 
                        value: param.parameter_value 
                    };
                })
            );

            const agentRoles = await Promise.all(
                product.roles.map(async (role) => {
                    const roleData = await RoleModel.findById(role.roleId); 
                    const agentDetails = await Promise.all(
                        role.agents.map(async (agentId) => {
                            return { agentId }; 
                        })
                    );
                    return {
                        roleId: role.roleId,
                        roleName: roleData.role_name,
                        agents: agentDetails
                    };
                })
            );

            productDetails.push({
                orderId: order._id,
                productId: productId,
                quantity: product.quantity,
                expectedFinishDate: product.expectedFinishDate,
                productDetails: {
                    productName: product.productId.product_name,
                    productPrice: product.productId.product_price,
                    productDescription: product.productId.description,
                    productImage: product.productId.image,
                    productDocument: product.productId.document,
                    parameters: parametersDetails, // Include fetched parameter details
                    roles: agentRoles // Include fetched role details
                }
            });
        } else {
            console.log("Product or productId not defined:", product); // Log if product is missing
        }
    }

    // Check if any product details were collected
    if (productDetails.length === 0) {
        throw new Error("No accessible products found for this NFC tag");
    }

    return {
        success: true,
        data: productDetails // Return only product details
    };
};

module.exports = {
    fetchProductByNfcTag,
};

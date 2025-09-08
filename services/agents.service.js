const { agent } = require('../models/agent.model');
const auth = require("../middleware/auth");

async function loginAgent({ email, password }, callback) {
    try {
        const agentModel = await agent.findOne({ email: email });
        
        if (agentModel) {
         
            if (password === agentModel.password) {
                const token = auth.generateAccessToken(agentModel.toJSON());
                return callback(null, {
                    message: 'Success',
                    data: {
                        fullName: agentModel.fullName,
                        email: agentModel.email,
                        createdAt: agentModel.createdAt,
                        updatedAt: agentModel.updatedAt,
                        agentId: agentModel._id.toString(),
                        token
                    }
                });
            } else {
                return callback({ message: 'Invalid Email/Password' });
            }
        } else {
            return callback({ message: 'Invalid Email/Password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return callback({ message: 'Internal server error' });
    }
}

module.exports = {
    loginAgent
};

const agentRoleService = require('../services/agentRole.service');

exports.getAgentRolesForOrder = async (req, res) => {
    try {
        const agentId = req.user.agentId; 
        if (!agentId) {
            return res.status(400).json({ message: 'Agent ID is required' });
        }

        const roles = await agentRoleService.getAgentRolesForOrder(agentId);

        return res.status(200).json({
            message: 'Success',
            data: roles
        });
    } catch (error) {
        console.error('Error in controller:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

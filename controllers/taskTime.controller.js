const taskTimeService = require('../services/taskTime.service');


async function setStartTime(req, res) {
    const { agentId, roleId, orderId, productId, quantity } = req.body; 
    const { startTime } = req.body; 

    try {
        const updatedTask = await taskTimeService.setStartTime(agentId, roleId, startTime, orderId, productId, quantity);
        res.status(200).json({
            
            success: true, 
            message: 'Start time updated successfully', 
            task: updatedTask 
        });
        

    } catch (error) {
        console.log(error);
        
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
}


async function setFinishTime(req, res) {
    const { agentId, roleId, orderId, productId } = req.body; 
    const { finishTime } = req.body; 
    try {
        const updatedTask = await taskTimeService.setFinishTime(agentId, roleId, finishTime, orderId, productId);
        res.status(200).json({ 
            success: true, 
            message: 'Finish time updated successfully', 
            task: updatedTask 
        });
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
}

module.exports = {
    setStartTime,
    setFinishTime
};

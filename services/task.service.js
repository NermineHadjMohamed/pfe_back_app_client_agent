const TaskModel = require('../models/task.model');

const updateTaskStatus = async (agentId, productId, roleId, taskStatus) => {
    let task = await TaskModel.findOne({
        productId: productId,
        roleId: roleId,
        agentId: agentId
    });

    if (!task && taskStatus === 'started') {
        task = new TaskModel({
            productId: productId,
            roleId: roleId,
            agentId: agentId,
            status: taskStatus
        });
        await task.save();
        return { success: true, message: 'Task successfully started' };
    } else if (task && taskStatus === 'finished') {
        task.status = taskStatus;
        task.finishTime = Date.now(); 
        await task.save();
        return { success: true, message: 'Task successfully finished' };
    } else {
        throw new Error("Invalid task status or task not found for this role and agent");
    }
};

module.exports = {
    updateTaskStatus,
};

const TaskModel = require('../models/taskTime.model');
const OrderModel = require('../models/order.model'); 
const OrderProductionModel = require('../models/OrderProduction.model');
const NfcTagModel = require('../models/nfcTag.model');


async function setStartTime(agentId, roleId, startTime, orderId, productId, quantity) {
    try {
        const orderProduction = await OrderProductionModel.findById(orderId);

        if (!orderProduction) {
            throw new Error('OrderProduction not found');
        }

        let task = await TaskModel.findOne({ agentId, roleId, orderId, productId });

        if (!task) {
            task = await TaskModel.create({
                agentId,
                roleId,
                startTime,
                orderId,
                productId,
                quantity
            });

            let orderp = await OrderProductionModel.findById(orderId);
            const updatedOrder = await OrderModel.findOneAndUpdate(
                { _id: orderp.orderId }, 
                { orderStatus: 'inProduction' },
                { new: true }
            );

            console.log('Updated Order:', updatedOrder);
        } else {
            task.startTime = startTime;
            await task.save();
        }

        return task;
    } catch (error) {
        console.error('Error in setStartTime:', error.message);
        throw new Error(error.message);
    }
}


async function setFinishTime(agentId, roleId, finishTime, orderId, productId) {
    try {
        const task = await TaskModel.findOne({ agentId, roleId, orderId, productId });
        
        if (!task) {
            throw new Error('Task not found');
        }

        task.finishTime = finishTime;
        await task.save();
        const allTasks = await TaskModel.find({ orderId });
        const allFinished = allTasks.every(t => t.finishTime != null);

        if (allFinished) {
            const orderProduction = await OrderProductionModel.findById(orderId);
            if (!orderProduction) {
                throw new Error('OrderProduction not found');
            }
            await OrderModel.findOneAndUpdate(
                { _id: orderProduction.orderId },
                { orderStatus: 'completed' },
                { new: true }
            );
            const nfcTagIds = allTasks.flatMap(task => task.selectedNfcTags);

            if (nfcTagIds.length > 0) {
                await NfcTagModel.updateMany(
                    { _id: { $in: nfcTagIds } },
                    { $set: { state: 'inactive' } },
                    { multi: true }
                );
            }
        }

        return task;
    } catch (error) {
        console.error('Error in setFinishTime:', error.message);
        throw new Error(error.message);
    }
}

module.exports = {
    setStartTime,
    setFinishTime
};

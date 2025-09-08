const OrderProduction = require('../models/OrderProduction.model');
const NfcTagModel = require('../models/nfcTag.model');


class OrderProductionService {
  async startProduction(orderProductionId) {
    const orderProduction = await OrderProduction.findById(orderProductionId).populate('orderId');
    if (!orderProduction) {
      throw new Error('OrderProduction not found');
    }
    const order = orderProduction.orderId; 
    if (order.orderStatus !== 'inProduction') {
      order.orderStatus = 'inProduction';
      await order.save();
    }
  }

  async finishProduction(orderProductionId, agentId) {
    const orderProduction = await OrderProduction.findById(orderProductionId);

    if (!orderProduction) {
      throw new Error('OrderProduction not found');
    }

    const isAgentFound = orderProduction.products.some(product => {
      return product.roles.some(role => {
        return role.agents.includes(agentId);
      });
    });

    if (!isAgentFound) {
      throw new Error('Agent not found in the order production');
    }

    const allFinished = this.checkIfAllAgentsFinished(orderProduction);

    if (allFinished) {
      const order = orderProduction.orderId; 
      order.orderStatus = 'completed';
      await order.save();
      await this.deactivateNfcTags(orderProduction.products);
    }
  }

  checkIfAllAgentsFinished(orderProduction) {
    return orderProduction.products.every(product => {
      return product.roles.every(role => {
        return role.agents.every(agent => agent.finishTime !== null); 
      });
    });
  }
  async deactivateNfcTags(products) {
    const allNfcTagIds = products.reduce((acc, product) => {
      return acc.concat(product.selectedNfcTags);
    }, []);

    await NfcTagModel.updateMany(
      { tag_id: { $in: allNfcTagIds } },
      { state: 'inactive' }
    );
  }
}

module.exports = new OrderProductionService();

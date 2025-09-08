const orderProductionService = require('../services/orderProductionService');

class OrderProductionController {

  async startProduction(req, res) {
    try {
      const { orderProductionId } = req.body; 
      await orderProductionService.startProduction(orderProductionId);
      res.status(200).json({ message: 'Production started successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error starting production', error: error.message });
    }
  }


  async finishProduction(req, res) {
    try {
      const { orderProductionId, agentId } = req.body; 
      await orderProductionService.finishProduction(orderProductionId, agentId);
      res.status(200).json({ message: 'Production finished successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error finishing production', error: error.message });
    }
  }
}

module.exports = new OrderProductionController();

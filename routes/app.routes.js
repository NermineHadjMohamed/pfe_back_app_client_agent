const categoryController = require("../controllers/categories.controller");
const productController = require("../controllers/products.controller");
const userController = require("../controllers/users.controller");
const agentController = require("../controllers/agents.controller");
const cartController = require("../controllers/cart.controller");
const orderController = require("../controllers/order.controller");
const {authenticateToken} = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const { getAgentRolesForOrder } = require('../controllers/agentRole.controller');
const { getProductByNfcTag } = require('../controllers/nfcTag.controller'); // Adjust path as necessary

const orderProductionController = require('../controllers/orderProductionController');

router.post('/start-production', orderProductionController.startProduction);

router.post('/finish-production', orderProductionController.finishProduction);
const taskTimeController = require('../controllers/taskTime.controller');

router.post('/task/start', taskTimeController.setStartTime);

router.post('/task/finish', taskTimeController.setFinishTime);


router.get('/tag/:nfcTagId', authenticateToken, getProductByNfcTag);  


router.get('/agent/roles',authenticateToken, getAgentRolesForOrder);


router.post("/category", categoryController.create);
router.get("/category", categoryController.findAll);
router.get("/category/:id", categoryController.findOne);
router.put("/category/:id", categoryController.update);
router.delete("/category/:id", categoryController.delete);

router.post("/product", productController.create);
router.get("/product", productController.findAll);
router.get("/product/:id", productController.findOne);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.delete);

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile",authenticateToken, userController.getUserProfile);

router.post("/loginAgent", agentController.loginAgent);

router.post("/cart",[authenticateToken],cartController.create);
router.get("/cart", [authenticateToken], cartController.findAll);
router.delete("/cart", [authenticateToken], cartController.delete);

router.post("/order", [authenticateToken], orderController.create);
router.get("/order", authenticateToken, orderController.findAll);




module.exports = router;



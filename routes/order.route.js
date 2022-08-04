const router = require('express').Router();

const {CreateOrder, GetOrders} = require('../controller/order.controller')
const {verifyToken} = require('../middleware/auth')

router.post('/create', verifyToken, CreateOrder);
router.get('/get', verifyToken, GetOrders )

module.exports = router;
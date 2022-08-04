const router = require('express').Router();

const {CreateProduct, GetProducts} = require("../controller/product.controller")

router.post('/create',CreateProduct)
router.get('/get', GetProducts)

module.exports = router;
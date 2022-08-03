const router = require('express').Router();

const {CreateProduct} = require("../controller/product.controller")

router.post('/create',CreateProduct)

module.exports = router;
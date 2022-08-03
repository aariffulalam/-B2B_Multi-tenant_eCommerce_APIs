const router = require('express').Router();
const {CreateUser} = require("../controller/user.controller")

router.post("/create",CreateUser);

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;

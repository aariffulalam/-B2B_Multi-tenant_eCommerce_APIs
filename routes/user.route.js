const router = require('express').Router();
const {SignUp, Login, ViewProfile, UpdateUser, DeleteUser} = require("../controller/user.controller");
const {verifyToken} = require('../middleware/auth')

router.post("/signup",SignUp);
router.get('/login',Login);
router.get('/view', verifyToken,ViewProfile);
router.post('/update', verifyToken, UpdateUser);
router.delete('/delete', verifyToken, DeleteUser);


router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;
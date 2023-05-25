import express from "express";
import { registerController, loginController, userController, refreshController, productController } from "../controller/index.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import Commentcontroller from "../controller/commentscontroller.js";
const router = express.Router()

router.post('/register', registerController.register) // it register a user
router.post('/login', loginController.login) // it allow a user to login
router.get('/me', auth, userController.me) // it fetch user details
 

router.post('/refresh', refreshController.refresh) // it refreshes the token
router.post('/logout', auth, loginController.logout) // it helps a user to logout

router.post('/products', [auth], productController.store)
router.put('/products/:id', [auth], productController.update)
router.delete('/products/:id', [auth], productController.destroy)
router.get('/products', productController.index) // it allow to fet

router.post('/comment', Commentcontroller.commentcontrollnew)
router.get('/comment/:id', Commentcontroller.commentcontrollfetchslugid)
export default router;





















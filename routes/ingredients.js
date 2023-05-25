import express from "express";
import Ingredientcontroller from "../controller/ingredientscontroller.js";
const router = express.Router()

// router.get(`/`,Ingredientcontroller.Ingredientcontroll)

router.get(`/ingredients`, Ingredientcontroller.Ingredientcontrollfetch)

router.get(`/ingredients/:id`, Ingredientcontroller.Ingredientcontrollfetchslugid)

router.get(`/ingredient/:slug`, Ingredientcontroller.Ingredientcontrollfetchslug)


export default router;

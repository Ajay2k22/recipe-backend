import express from "express";
import Ingredientcontroller from "../controller/ingredientscontroller.js";
const router = express.Router()

// router.get(`/`,Ingredientcontroller.Ingredientcontroll)
router.get(`/`, (req, res) => {
    res.json({
        msg: 'i am here'
    })
})

router.post(`/ingredients`, Ingredientcontroller.Ingredientcontrollnew)

router.get(`/ingredients`, Ingredientcontroller.Ingredientcontrollfetch)

router.get(`/ingredients/:id`, Ingredientcontroller.Ingredientcontrollfetchslugid)

router.get(`/ingredient/:slug`, Ingredientcontroller.Ingredientcontrollfetchslug)

router.put(`/ingredients`, Ingredientcontroller.Ingredientcontrollupdate)

router.delete('/ingredients', Ingredientcontroller.IngredientcontrollDelete)

export default router;

import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { Ingredient } from "../models/ingredients.js"

const Ingredientcontroller = {
   

    async Ingredientcontrollfetch(req, res, next) {
        try {
            const data = await Ingredient.find({})
            res.status(200).json({
                sucess: "true",
                data: data
            })
        } catch (error) {
            return next(new CustomErrorHandler(error, 404))
        }
    },
    async Ingredientcontrollfetchslugid(req, res, next) {
        try {
            let mydata = req.params.id
            const data = await Ingredient.find({ _id: mydata })

            if (data.length != 0) {
                res.status(200).json({
                    success: "true",
                    data: data,
                    length: data.length
                })
            }

            else {
                res.status(201).json({
                    success: "false",
                    data: data
                })
            }
        } catch (error) {
            return next(new CustomErrorHandler(error, 404))
        }
    },

    async Ingredientcontrollfetchslug(req, res, next) {
        try {
            let mydata = req.params.slug
            const data = await Ingredient.find({ tag: mydata })

            if (data.length != 0) {
                res.status(200).json({
                    success: "true",
                    data: data
                })
            }

            else {
                res.status(201).json({
                    success: "false",
                    data: data
                })
            }
        } catch (error) {
            return next(new CustomErrorHandler(error, 404))
        }
    },

    

    
}
export default Ingredientcontroller

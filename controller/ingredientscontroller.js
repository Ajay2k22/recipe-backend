import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { Ingredient } from "../models/ingredients.js"

const Ingredientcontroller = {



    async Ingredientcontrollnew(req, res, next) {
        try {
            console.log(req.body)
            const created = await Ingredient.create(req.body);
            console.log(created)
            res.status(200).json({
                success: true,
                msg: 'Ingredient created'
            })
        }
        catch (error) {
            return next(new CustomErrorHandler(error, 404))
        }
    },

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

    async Ingredientcontrollupdate(req, res, next) {
        try {
            const fetch = await Ingredient.findById(req.params.id)
            const Ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                useFindAndModify: true,
                runValidators: true
            })
            console.log(req.body)
            console.log(Ingredient)

            res.status(200).json({
                success: true,
                msg: "updated sucessfully"
            })
        } catch (e) {
            return next(new CustomErrorHandler(e, 404))
        }

    },

    async IngredientcontrollDelete(req, res) {
        try {
            const Ingredient = await Ingredient.findById(req.params.id)
            await Ingredient.remove()

            res.status(200).json({
                success: true,
                msg: "Deleted Sucesssully"
            })
        }
        catch (e) {
            return next(new CustomErrorHandler(e, 404))
        }
    }
}
export default Ingredientcontroller

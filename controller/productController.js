import { Product } from "../models"
import multer from "multer"
import Joi from "joi"
import path from 'path'
import CustomErrorHandler from "../services/CustomErrorHandler"
import fs from "fs"

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    }
})

const handleMultipartData = multer({ storage, limits: { fileSize: 1000000 * 5 } }).single('image')

const productController = {
    async store(req, res, next) {
        //multipart form data

        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(new CustomErrorHandler(err.message, 404))
            }

            const filePath = req.file.path;

            //validate
            const productSchema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().required(),
                size: Joi.string().required(),
            });

            const { error } = productSchema.validate(req.body)

            if (error) {
                console.log('product schema error')
                // Delete the uploaded file
                fs.unlink(`${appRoot}/${filePath}`, (err) => {
                    console.log('file system error')
                    return next(err.message)
                })
                console.log('Validation error')
                return next(new CustomErrorHandler(error.message, 404))
            }
            const { name, price, size } = req.body
            let document;
            try {
                document = await Product.create({
                    name: name,
                    price: price,
                    size: size,
                    image: filePath
                })
            } catch (e) {
                console.log('document')
                return next(e)
            }
            res.status(201).json(document)
        });
        // console.log(filePath)
        // //validation
        // const productSchema = Joi.object({
        //     name: Joi.string().required(),
        //     price: Joi.number().required(),
        //     size: Joi.string().required(),
        // })
        // console.log(req.body)
        // const { error } = productSchema.validate(req.body)

        // if (error) {
        //     // Delete the upload file
        //     fs.unlink(`${appRoot}/${filePath}`, (err) => {
        //         return next(new CustomErrorHandler('delete error', 404))
        //     })
        //     console.log('delete  error')
        //     return next(error)
        // }

        // const { name, price, size } = req.body;

        // let document;
        // try {
        //     document = await Product.create({
        //         name, price, size, image: filePath
        //     })

        // } catch (e) {
        //     console.log('document')
        //     return next(e)
        // }


        // res.status(201).json(document)

    }
}
export default productController
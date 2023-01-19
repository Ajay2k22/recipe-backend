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
        // 3746674586-836534453.png
        cb(null, uniqueName);
    },
})

const handleMultipartData = multer({ storage, limits: { fileSize: 1000000 * 5 } }).single('image')

const productController = {
    async store(req, res, next) {
        //multipart form data
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(new CustomErrorHandler(err.message, 404))
            }
            console.log(req.file.path)
            const filePath = req.file.path;
            console.log(filePath)
            console.log("filePath")

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
                    return next(err)
                })
                console.log('Validation error')
                return next(new CustomErrorHandler(error.message, 404))
            }
            const { name, price, size } = req.body
            let document;
            const file_path = filePath
            // console.log(file_path)
            try {
                document = await Product.create({
                    name: name,
                    price: price,
                    size: size,
                    image: file_path
                })
                // console.log(document)
            } catch (e) {
                console.log('document')
                return next(e)
            }
            res.status(201).json(document)
        });
    }


}
export default productController
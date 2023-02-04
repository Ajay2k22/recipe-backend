import { Product } from "../models"
import multer from "multer"
import Joi from "joi"
import path from 'path'
import CustomErrorHandler from "../services/CustomErrorHandler"
import fs from "fs"
import productSchema from "../validators/productValidator"


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => {
        let uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.name)}`;
        // 3746674586-836534453.png
        cb(null, uniqueName);
    },
})
path.format(storage)
const handleMultipartData = multer({ storage, limits: { fileSize: 1000000 * 5 } }).single('image')

const productController = {

    async store(req, res, next) {
        //multipart form data
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(new CustomErrorHandler('handle multi part data error', 404))
            }
            console.log('request file')
            console.log(req.body)
            // console.log('request file1')
            // console.log(req.file)
            // console.log(filePath)
            // let filePath = req.file.path;
            // filePath = filePath.replace(/\\/g, "/");
            // console.log("filePath")

            // //validate

            // const { error } = productSchema.validate(req.body)
            // console.log('product schema error')
            // if (error) {
            //     //     // Delete the uploaded file
            //     if (err) {
            //         fs.unlink(`${appRoot}/${filePath}`, (err) => {
            //             console.log('file system error')
            //             return next(new CustomErrorHandler(err.message, 401))
            //         }
            //         )
            //     }
            //     console.log('Validation error')
            //     return next(new CustomErrorHandler(error.message, 404))
            // }
            const { name, timeRequired, tag, descriptions, image } = req.body
            let document;
            // const file_path = filePath
            // // // console.log(file_path)
            try {
                document = await Product.create({
                    name: name,
                    author: timeRequired,
                    tag: tag,
                    image: image,
                    descriptions: descriptions,
                })
                //     //     // console.log(document)
            } catch (e) {
                //     console.log('document')
                //     return next(e)
            }
            res.status(201).json(document)
        }
        );
    },

    async update(req, res, next) {
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(new CustomErrorHandler(err.message, 404))
            }
            let filePath

            if (req.file) {
                console.log(req.file)
                filePath = req.file.path;
                console.log(filePath)

                try {
                    const { image } = await Product.findOne({ _id: req.params.id })
                    console.log("image is here")
                    console.log(image)
                    console.log(appRoot)
                    fs.unlink(`${appRoot}/${filePath}`, (err) => {
                        if (err) {
                            console.log('file system error')
                            return next(new CustomErrorHandler(err.message, 401))
                        }
                    })
                }
                catch (e) {
                    return next(CustomErrorHandler('Unbale to delete file', 401))
                }
            }
            //validate
            const { error } = productSchema.validate(req.body)

            if (error) {
                console.log('product schema error')
                // Delete the uploaded file
                if (req.file) {
                    fs.unlink(`${appRoot}/${filePath}`, (err) => {
                        if (err) {
                            console.log('file system error')
                            return next(new CustomErrorHandler(err.message, 401))
                        }
                    })
                }
                console.log('Validation error')
                return next(new CustomErrorHandler(error.message, 404))
            }
            const { name, timeRequired, tag, descriptions } = req.body
            let document;
            const file_path = filePath
            // console.log(file_path)
            try {
                document = await Product.findOneAndUpdate({ _id: req.params.id }, {
                    name: name,
                    timeRequired: timeRequired,
                    tag: tag,
                    descriptions: descriptions,
                    ...(req.file && { image: filePath })
                })
                console.log(document)
            } catch (e) {
                console.log('document')
                return next(e)
            }
            res.status(201).json(document)
        });
    },
    async destroy(req, res, next) {
        const document = await Product.findOneAndRemove({ _id: req.params.id })
        if (!document) {
            console.log('nothing to delete error')
            return next(CustomErrorHandler('nothing to delete'))
        }
        // image delete
        const imagePath = document.image;
        fs.unlink(`${appRoot}/${imagePath}`, (err) => {
            if (err) {
                console.log('image delte error')
                return next(new CustomErrorHandler('server error'))
            }
        });
        res.json(document)
    },

    async index(req, res, next) {
        let documents
        //pagination
        try {
            documents = await Product.find().select('-updatedAt -__v').sort({ _id: -1 });
        } catch (e) {
            console.log('Unable to get all product')
            return next(CustomErrorHandler('Unable to get product', 404))
        }
        console.log(documents[0].image)
        res.json(documents)
    }
}
export default productController
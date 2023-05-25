import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { Comment } from "../models/comments.js"

const Commentcontroller = {
    async commentcontrollnew(req, res, next) {
        try {
            console.log(req.body)
            const created = await Comment.create(req.body);
            console.log(created)
            res.status(200).json({
                success: true,
                msg: 'comment created'
            })
        }
        catch (error) {
            return next(new CustomErrorHandler(error, 404))
        }
    },

    async commentcontrollfetch(req, res, next) {
        try {
            const data = await Comment.find({})
            res.status(200).json({
                sucess: "true",
                data: data
            })
        } catch (error) {
            return next(new CustomErrorHandler(error, 404))
        }
    },

    async commentcontrollfetchslugid(req, res, next) {
        try {
            let mydata = req.params.id
            const data = await Comment.find({ id: mydata })
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

    async commentcontrollfetchslug(req, res, next) {
        try {
            let mydata = req.params.slug
            const data = await Comment.find({ tag: mydata })

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
    async commentcontrollDelete(req, res) {
        try {
            const comment = await Comment.findById(req.params.id)
            await comment.remove()

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
export default Commentcontroller
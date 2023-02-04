import CustomErrorHandler from "../services/CustomErrorHandler"
import JwtService from "../services/JwtService"
import { User } from "../models"

const admin = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user._id })
        console.log(user)
        if (user.role === "admin") {
            next()
        } else {
            console.log('admin.js error user role')
            return next(CustomErrorHandler.unAuthorized())
        }

    } catch (e) {
        return next(e)
    }
}

export default admin


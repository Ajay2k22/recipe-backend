import Joi from "joi"
import { RefreshToken, User } from "../../models"
import { REFRESH_SECRET } from "../../config"

import CustomErrorHandler from "../../services/CustomErrorHandler"
import JwtService from "../../services/JwtService"
const refreshController = {
    async refresh(req, res, next) {
        // validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required()
        })
        const { error } = refreshSchema.validate(req.body)
        if (error) {
            next(error)
        }
        // database
        let refresh_token
        try {
            refresh_token = await RefreshToken.findOne({ token: req.body.refresh_token })
            if (!refresh_token) {
                return next(CustomErrorHandler.unAuthorized('Invalid refresh code'))
            }

            let UserId;
            try {
                const { _id } = JwtService.Verify(refresh_token.token, REFRESH_SECRET)
                UserId = _id
                await User.findOne({token: refresh_token}).remove().exec();

            } catch (e) {
                return next(CustomErrorHandler.unAuthorized('Invalid refresh code'))
            }
            
            const user = await User.findOne({ _id: UserId })
            console.log(user)
            if (!user) {
                return next(CustomErrorHandler.unAuthorized('No user Found'))
            }
            await RefreshToken.findOneAndRemove({})
            const access_token = JwtService.Sign({ _id: user._id, role: user.role })
            refresh_token = JwtService.Sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET)
            await RefreshToken.create({ token: refresh_token })
            res.json({ access_token, refresh_token })

        }
        catch (e) {
            console.log('hi')
            return next(e)
        }
    }
}

export default refreshController
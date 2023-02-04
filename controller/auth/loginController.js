import Joi from 'joi';
import JwtService from '../../services/JwtService.js';
import { REFRESH_SECRET } from '../../config/index.js';
import { User } from '../../models/User';
import { RefreshToken } from '../../models/';
import bcrypt from "bcrypt";
import CustomErrorHandler from '../../services/CustomErrorHandler';
const loginController = {
    async login(req, res, next) {
        // validation
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

        const { error } = loginSchema.validate(req.body)
        if (error) {
            return next(new CustomErrorHandler('Wrong credentials', 401))
        }

        // check email is present in tha database
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return next(new CustomErrorHandler('Wrong Email id', 401))
            }

            // compare password
            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) {
                return next(CustomErrorHandler.wrongCredentials())
            }

            // generate token

            const access_token = JwtService.Sign({ _id: user._id, role: user.role })
            const refresh_token = JwtService.Sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET)
            await RefreshToken.create({ token: refresh_token })
            res.json({ access_token, refresh_token })
        }
        catch (err) {
            next(err)
        }
    },
    async logout(req, res, next) {
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required()
        })
        const { error } = refreshSchema.validate(req.body)
        if (error) {
            return next(new CustomErrorHandler('refresh_token error', 401))
        }
        try {
            await RefreshToken.deleteOne({ token: req.body.refresh_token })
        } catch (e) {
            return next(new CustomErrorHandler('refresh token delete error',401))
        }
        res.json({ status: 1 })
    }
}
export default loginController
import Joi from 'joi';
import JwtService from '../../services/JwtService.js';
import CustomErrorHandler from '../../services/CustomErrorHandler.js';
import { REFRESH_SECRET } from '../../config/index.js';
import bcrypt from "bcrypt";
import { User,RefreshToken } from '../../models/index.js';

const registerController = {
    async register(req, res, next) {

        // validate the request
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        })
        console.log(req.body)

        const { error } = registerSchema.validate(req.body)

        if (error) {
            return next(error)
        }

        //check is user is already in the database
        try {
            const exist = await User.exists({ email: req.body.email })
            if (exist) {
                return next(CustomErrorHandler.alreadyExist('This email is already taken'));
            }
        }
        catch (err) {
            // console.log('exist error')
            return next(err)
        }

        //hash password
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        // prepare the model

        const { name, email } = req.body;

        const user = new User({
            name: name,
            email: email,
            password: hashPassword
        })
        let access_token;
        let refresh_token;
        try {
            const result = await user.save()

            // Token
            access_token = JwtService.Sign({ _id: result._id, role: result.role })
            refresh_token = JwtService.Sign({ _id: result._id, role: result.role },'1y',REFRESH_SECRET)
            await RefreshToken.create({token:refresh_token})
        }
        catch (e) {
            next(CustomErrorHandler('unable to save', 500))
        }


        return res.json({ access_token,refresh_token })

    }
}

export default registerController
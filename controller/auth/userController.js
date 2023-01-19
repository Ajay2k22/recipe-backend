import { User } from "../../models/User"
import CustomErrorHandler from "../../services/CustomErrorHandler"
const userController={
    async me(req,res,next){
        try{
            const user=await User.findOne({_id:req.user._id}).select('-password -updatedAt -__v')
            console.log()
            if(!user){
                return next(CustomErrorHandler.notFound())
            }
            res.json(user)
        }catch(err){
            return next(err)
        }
    }
}
export default userController
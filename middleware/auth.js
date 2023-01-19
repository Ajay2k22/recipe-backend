import CustomErrorHandler from "../services/CustomErrorHandler"
import JwtService from "../services/JwtService"

const auth = async (req, res, next) => {
    let authHeader = req.headers.authorization
    console.log(authHeader)
    if (!authHeader) {
        return next(CustomErrorHandler.notFound)
    }
    const token = authHeader.split(' ')[1]
    // console.log(token)
    try {
        const { _id, role } = JwtService.Verify(token)
        const user = {
            _id,
            role
        }
        req.user = user
        next();
    } catch (e) {
        next(CustomErrorHandler.unAuthorized())
    }
}
export default auth
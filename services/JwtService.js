import { JWT_SECRET } from "../config/index.js";
import jwt from "jsonwebtoken";

class JwtService {
    static Sign(payload, expiry = '60s', secret = JWT_SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiry })
    }

    static Verify(token,secret = JWT_SECRET) {
        return jwt.verify(token, secret)
    }
}
export default JwtService;
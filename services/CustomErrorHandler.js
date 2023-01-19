class CustomErrorHandler extends Error {

    constructor(message, status) {
        super()
        this.status = status;
        this.message = message
    }

    static alreadyExist(message) {
        return new CustomErrorHandler(message, 409)
    }

    static wrongCredentials(message = 'Username or password is wrong') {
        return new CustomErrorHandler(message, 401)
    }

    static unAuthorized(message = 'unAuthorized') {
        return new CustomErrorHandler(message, 401)
    }

    static notFound(message = '404 not Found') {
        return new CustomErrorHandler(message, 404)
    }
}

export default CustomErrorHandler
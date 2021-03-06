import {CustomError} from "../lib/Error";

export class BadPassword extends CustomError {
    constructor() {
        super({
            statusCode:401,
            statusText: "Bad password"
        })
    }
}

export class NoSuchUser extends CustomError {
    constructor() {
        super({
            statusCode:401,
            statusText: "User with such name doesn't exist"
        })
    }
}
export class NoSessionCookie extends CustomError {
    constructor() {
        super({
            statusCode:400,
            statusText: "session cookie is missing"
        })
    }
}
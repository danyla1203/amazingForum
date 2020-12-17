import {CustomError} from "../lib/Error";

export class IncorrectUserData extends CustomError {
    constructor() {
        super({
            statusCode:401,
            statusText: "Incorrect User data"
        })
    }
}

export class IncorrectPassword extends CustomError {
    constructor() {
        super({
            statusCode: 401,
            statusText: "Passwords do not match"
        })
    }
}
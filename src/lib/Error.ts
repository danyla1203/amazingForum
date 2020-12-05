type ErrorData = {
    statusCode: number,
    statusText: string,
}

export class CustomError extends Error{
    errorData: ErrorData;
    constructor(errData: ErrorData) {
        super();
        this.errorData = errData;
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

export class BadPassword extends CustomError {
    constructor() {
        super({
            statusCode:401,
            statusText: "Bad password"
        })
    }
}
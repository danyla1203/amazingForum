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
export class IncorrectUserData extends CustomError {
    constructor() {
        super({
            statusCode:401,
            statusText: "Incorrect user data"
        })
    }
}

export class DatabaseError extends CustomError {
    constructor() {
        super({
            statusCode:500,
            statusText: "Server error"
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
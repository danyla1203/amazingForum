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

export class DatabaseError extends CustomError {
    constructor(e: Error) {
        console.log(e);
        super({
            statusCode:500,
            statusText: "Server error"
        })
    }
}
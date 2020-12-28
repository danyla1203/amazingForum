import {CustomError} from "../lib/Error";

export class BadCommentData extends CustomError {
    constructor() {
        super({
            statusCode: 400,
            statusText: "Invalid data for commentary"
        })
    }
}

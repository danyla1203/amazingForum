import {CustomError} from "../lib/Error";

export class BadCommentData extends CustomError {
    constructor() {
        super({
            statusCode: 400,
            statusText: "Invalid data for commentary"
        })
    }
}
export class BadTopicData extends CustomError {
    constructor() {
        super({
            statusCode: 400,
            statusText: "Invalid data for topic"
        })
    }
}
export class BadAuthor extends CustomError {
    constructor() {
        super({
            statusCode: 400,
            statusText: "You can't update this topic"
        })
    }
}

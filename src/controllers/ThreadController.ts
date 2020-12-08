import {ThreadModel} from "../models/ThreadModel";
import {get} from "../lib/httpMethodDecorators";
import {Request} from "../lib/ExtendContext";

export class ThreadController {
    threadModel: ThreadModel;
    constructor(threadModel) {
        this.threadModel = threadModel;
    }

    @get("/threads")
    async getThreads() {
        return this.threadModel.getAllThreads();
    }

    @get("/thread/:id")
    async getPosts(req: Request) {
        let thread_id = req.params.get("id");
        return this.threadModel.getPostsFromThread(thread_id);
    }
}
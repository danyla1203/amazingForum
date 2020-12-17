import {ThreadModelI} from "./ThreadModel";
import {get} from "../lib/httpMethodDecorators";
import {Request} from "../lib/ExtendContext";

export class ThreadController {
    threadModel: ThreadModelI;
    constructor(threadModel: ThreadModelI) {
        this.threadModel = threadModel;
    }

    @get("/threads")
    async getThreads() {
        return this.threadModel.getAllThreads();
    }

    @get("/Thread/:id")
    async getPosts(req: Request) {
        let thread_id = req.params.get("id");
        return this.threadModel.getPostsFromThread(thread_id);
    }
}
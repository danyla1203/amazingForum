import {get} from "../lib/httpMethodDecorators";
import {Request} from "../lib/ExtendContext";
import {PostModelI} from "./PostModel";

export class PostController {
    postModel: PostModelI;
    constructor(model: PostModelI) {
        this.postModel = model;
    }

    @get("/topic/:post_id")
    public getPost(req: Request) {
        let post_id = req.params.get("post_id");
        return this.postModel.getPost(post_id);
    }

    @get("/topic/:post_id/messages")
    public getMessages(req: Request) {
        let post_id = req.params.get("post_id");
        return this.postModel.getComments(post_id);
    }
}
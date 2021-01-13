import {Delete, get, post, put} from "../lib/httpMethodDecorators";
import {Request} from "../lib/ExtendContext";
import {PostModelI} from "./PostModel";
import {AuthModelI} from "../Authentication/AuthenticationModel";
import {IncomingComment, IncomingTopic, Topic} from "./types";

export class PostController {
    postModel: PostModelI;
    authModel: AuthModelI;
    constructor(model: PostModelI, authModel: AuthModelI) {
        this.postModel = model;
        this.authModel = authModel;
    }

    @get("/topic/:post_id")
    public getPost(req: Request): Promise<Topic> {
        let post_id = req.params.get("post_id");
        return this.postModel.getTopic(post_id);
    }

    @get("/topic/:post_id/messages")
    public getMessages(req: Request) {
        let post_id = req.params.get("post_id");
        return this.postModel.getComments(post_id);
    }

    @post("/topic/:post_id/add-comment")
    public async addComment(req: Request): Promise<void> {
        let { id } = await this.authModel.verifySession(req.cookies.get("s_id"));
        let topic_id = parseInt(req.params.get("post_id"));
        let text = req.body.get("text");

        let comment: IncomingComment = {
            author_id: id,
            topic_id: topic_id,
            text: text
        };
        console.log(comment);
        this.postModel.createComment(comment);
    }
    @Delete("/delete/comment/:comment_id")
    public async deleteComment(req: Request) {
        let { id } = await this.authModel.verifySession(req.cookies.get("s_id"));
        let comment_id = parseInt(req.params.get("comment_id"));
        this.postModel.deleteComment(comment_id, id);
    }

    @post("/topic/create")
    public async createTopic(req: Request): Promise<Topic> {
        let { id } = await this.authModel.verifySession(req.cookies.get("s_id"));
        let topic = {
            author_id: id,
            thread_id: parseInt(req.body.get("thread_id")),
            title: req.body.get("title"),
            text: req.body.get("text"),
        };
        return this.postModel.createTopic(topic);
    }
    @put("/topic/:topic_id")
    public async updateTopic(req: Request): Promise<void> {
        let topic_id = parseInt(req.params.get("topic_id"));
        let { id } = await this.authModel.verifySession(req.cookies.get("s_id"));
        let newTopic = {
            author_id: id,
            title: req.body.get("title"),
            text: req.body.get("text"),
            thread_id: req.body.get("thread_id"),
        };
        this.postModel.updateTopic(topic_id, newTopic);
    }
    @put("/update/comment/:comment_id")
    public async updateComment(req: Request) {
        let comment_id = parseInt(req.params.get("comment_id"));
        let { id } = await this.authModel.verifySession(req.cookies.get("s_id"));
        const newComment = {
            text: req.body.get("text")
        };
        this.postModel.updateComment(comment_id, id, newComment);
    }

    @post("/save/to-draft")
    public async saveTopicToDraft(req: Request) {
        const { id } = await this.authModel.verifySession(req.cookies.get("s_id"));
        const draftData: IncomingTopic = {
            author_id: id,
            thread_id: parseInt(req.body.get("thread_id")),
            text: req.body.get("text"),
            title: req.body.get("title")
        };
        this.postModel.saveToDraft(draftData);
    }

    @Delete("/delete/topic/:topic_id")
    public async deleteTopic(req: Request) {
        const topic_id = parseInt(req.params.get("topic_id"));
        //TODO: decide, where receive provided password
        const providedPassword = "null";
        const { id, password } = await this.authModel.verifySession(req.cookies.get("s_id"));
        this.postModel.deleteTopic(topic_id, id, password, providedPassword);
    }
}
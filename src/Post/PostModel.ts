import {Comment, IncomingComment, IncomingTopic, Topic, UpdatedCommentData} from "./types";
import {BadAuthor, BadCommentData, BadTopicData} from "./errors";
import {BadPassword} from "../Authentication/errors";

export interface PostModelI {
    getTopic(post_id: number): Promise<Topic>
    getComments(post_id: number, sessionString: string): Promise<Comment[]>
    createComment(comment: IncomingComment): void
    createTopic(topic: IncomingTopic): Promise<Topic>
    updateTopic(topic_id: number, newTopicData: IncomingTopic): Promise<void>
    deleteComment(comment_id: number, user_id: number): void
    updateComment(comment_id: number, updater_id: number, newComment: UpdatedCommentData): Promise<void>
    saveToDraft(draft: IncomingTopic): void
    deleteTopic(topic_id: number, user_id: number, password: string, providedPassword: string): void
}

export interface PostRepoI {
    getTopicData(post_id: number): Promise<Topic>
    getCommentsForTopic(post_id: number): Promise<Comment[]>
    insertComment(comment: IncomingComment): void
    createTopic(topic: IncomingTopic): Promise<Topic>
    updateTopic(topic_id: number, newData: IncomingTopic): void
    findComment(comment_id: number): Promise<Comment>
    deleteComment(comment_id: number): void
    updateComment(comment_id: number, updates: UpdatedCommentData): void
    saveToDraft(draft: IncomingTopic): void
    deleteTopic(topic_id: number): void
    getUserId(user_session: string): Promise<undefined | number>
}

export class PostModel implements PostModelI {
    repo: PostRepoI;
    constructor(repo: PostRepoI) {
        this.repo = repo;
    }

    private verifyIncomingCommentData(comment: IncomingComment): boolean {
        let necessaryColumns = ["author_id", "topic_id",  "text"];
        for (let i = 0; i < necessaryColumns.length; i++) {
            if (necessaryColumns[i] in comment) {
                let commentValue = comment[necessaryColumns[i]];
                if (!commentValue) {
                    return false;
                }
                if (commentValue.length < 2 && typeof commentValue == "string") {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true
    }
    private verifyTopicData(topic: IncomingTopic): boolean {
        let necessaryColumns = ["author_id", "thread_id", "title",  "text"];
        for (let i = 0; i < necessaryColumns.length; i++) {
            if (necessaryColumns[i] in topic) {
                let topicValue = topic[necessaryColumns[i]];
                if (!topicValue) {
                    return false;
                }
                if (topicValue.length < 2) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true
    }
    private findUpdates
    (
        newTopic: {[index:string]: any},
        oldTopic: {[index:string]: any}
    ): Object {
        let updatedColumns: { [index:string]: string } = {};
        for(let column in newTopic) {
            if (newTopic[column].length < 2) {
                continue
            }
            if (newTopic[column] != oldTopic[column]) {
                updatedColumns[column] = newTopic[column];
            }
        }
        return updatedColumns;
    }

    public async getTopic(post_id: number): Promise<Topic> {
        return this.repo.getTopicData(post_id);
    }

    private extendsCommentsList(user_id: number, comments: Comment[]) {
        for (let i = 0; i < comments.length; i++) {
            if (user_id == comments[i].author_id) {
                comments[i].isAuthor = true;
            } else {
                comments[i].isAuthor = false;
            }
        }
    }
    public async getComments(post_id: number, sessionString: string): Promise<Comment[]> {
        let comments = await this.repo.getCommentsForTopic(post_id);
        const user_id = await this.repo.getUserId(sessionString);
        if (user_id) {
            this.extendsCommentsList(user_id, comments);
        }
        return comments;
    }
    public createComment(comment: IncomingComment): void {
        let isCommentValid = this.verifyIncomingCommentData(comment);
        if (isCommentValid) {
            this.repo.insertComment(comment)
        } else {
            throw new BadCommentData();
        }
    }
    public createTopic(newTopic: IncomingTopic): Promise<Topic> {
        let isTopicValid = this.verifyTopicData(newTopic);
        if (isTopicValid) {
            return this.repo.createTopic(newTopic);
        } else {
            throw new BadTopicData();
        }
    }

    public async updateTopic
    (
        topic_id: number,
        newTopicData: IncomingTopic
    ): Promise<void> {
        let oldTopic = await this.repo.getTopicData(topic_id);
        if (oldTopic.author_id == newTopicData.author_id) {
            let isValid = this.verifyTopicData(newTopicData);
            if (isValid) {
                let updatedFields = this.findUpdates(newTopicData, oldTopic);
                this.repo.updateTopic(oldTopic.topic_id, updatedFields);
            } else {
                throw new BadTopicData();
            }
        } else {
            throw new BadAuthor();
        }
    }

    public async deleteComment(comment_id: number, user_id: number) {
        const comment = await this.repo.findComment(comment_id);
        if (comment.author_id == user_id) {
            this.repo.deleteComment(comment_id);
        } else {
            throw new BadAuthor();
        }
    }

    public async updateComment(comment_id: number, updater_id: number, newComment: UpdatedCommentData) {
        const oldComment = await this.repo.findComment(comment_id);
        if (oldComment.author_id == updater_id) {
            let updates = this.findUpdates(oldComment, newComment);
            this.repo.updateComment(comment_id, updates);
        }
    }
    public async saveToDraft(draft: IncomingTopic) {
        const isDraftValid = this.verifyTopicData(draft);
        if (isDraftValid) {
            this.repo.saveToDraft(draft);
        } else {
            throw new BadTopicData();
        }
    }
    public async deleteTopic
    (
        topic_id: number,
        user_id: number,
        password: string,
        providedPassword: string
    ) {
        const {author_id} = await this.repo.getTopicData(topic_id);
        if (author_id == user_id) {
            if (password == providedPassword) {
                this.repo.deleteTopic(topic_id);
            } else {
                throw new BadPassword();
            }
        } else {
            throw new BadAuthor();
        }
    }
}

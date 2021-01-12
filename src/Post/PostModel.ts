import {Comment, IncomingComment, IncomingTopic, Topic} from "./types";
import {BadAuthor, BadCommentData, BadTopicData} from "./errors";

export interface PostModelI {
    getTopic(post_id: number): Promise<Topic>
    getComments(post_id: number): Promise<Comment[]>
    createComment(comment: IncomingComment): void
    createTopic(topic: IncomingTopic): Promise<Topic>
    updateTopic(topic_id: number, newTopicData: IncomingTopic): Promise<void>
    deleteComment(comment_id: number, user_id: number): void
}

export interface PostRepoI {
    getTopicData(post_id: number): Promise<Topic>
    getCommentsForTopic(post_id: number): Promise<Comment[]>
    insertComment(comment: IncomingComment): void
    createTopic(topic: IncomingTopic): Promise<Topic>
    updateTopic(topic_id: number, newData: IncomingTopic): void
    findComment(comment_id: number): Promise<Comment>
    deleteComment(comment_id: number): void
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
    public async getComments(post_id: number): Promise<Comment[]> {
        return this.repo.getCommentsForTopic(post_id);
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
            if(isValid) {
                let updatedFields = this.findUpdates(oldTopic, newTopicData);
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
}
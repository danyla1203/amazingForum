export type Comment = {
    id: number
    author_id: number
    topic_id: number
    text: string
    date: string
    isAuthor?: boolean
}
export type IncomingComment = {
    [index:string]: any
    author_id?: number
    topic_id?: number
    text?: string
}

export type IncomingTopic = {
    [index:string]: any
    thread_id?: number,
    author_id?: number,
    title?: string
    text?: string
}

export type Topic = {
    topic_id: number
    author_id: number
    thread_id: number
    title: string
    text: string
    date: string
}

export type UpdatedCommentData = {
    text?: string
}
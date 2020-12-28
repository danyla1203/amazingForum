export type Post = {
    topic_id: number
    author_id: number
    tred_id: number
    text: string
    date: string
}

export type Comment = {
    id: number
    author_id: number
    topic_id: number
    text: string
    date: string
}
export type IncomingComment = {
    author_id?: number
    topic_id?: number
    text?: string
}
export type UserData = {
    user_id: number
    nickname: string
    password: string
    email: string
}

export type UserIncomingData = {
    nickname?: string
    password?: string
    email?: string
    country?: string
}

export type UpdatedUserData = UserIncomingData & {
    prevPassword: string
}
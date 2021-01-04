export type UserData = {
    user_id: number
    nickname: string
    password: string
    email: string
    avatar_path: string
    registration_date: string
}

export type UserIncomingData = {
    nickname?: string
    password?: string
    email?: string
    country?: string
    avatar_path?: string
}

export type UpdatedUserData = UserIncomingData & {
    prevPassword: string
}
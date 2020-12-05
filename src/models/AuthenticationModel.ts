export type UserData = {
    user_id: number,
    nickname: string,
    password: string
    email: string
}

export interface RepositoryI {
    getUserByName(nickname: string): Promise<UserData | undefined>
    createSession(session_id: string, userData: UserData): Promise<any>
    getUserBySession(session_id: string): Promise<UserData | undefined>
    destroySession(session_id: string): Promise<true>
}

export class AuthenticationModel {
    repo: RepositoryI;
    constructor(repo: RepositoryI) {
        this.repo = repo;
    }

    private async createSessionId(nickname: string, email: string): string {
        return "";
    }

    public async verifyCredential(name: string, password: string) {
        let user: UserData | undefined = await this.repo.getUserByName(name);
        if (!user) {
            //user doesn't exist
        } else {
            if (user.password !== password) {
                //password is wrong
            } else {
                //valid credential
            }
        }
    }
    public async createSession(userData: UserData): Promise<string> {
        const session_id = await this.createSessionId(userData.nickname, userData.email);
        await this.repo.createSession(session_id, userData);
        return session_id;
    }

    public async verifySession(session_id: string): Promise<UserData> {
        return this.repo.getUserBySession(session_id);
    }
    public async logout(session_id: string): Promise<true> {
        return await this.repo.destroySession(session_id);
    }
}
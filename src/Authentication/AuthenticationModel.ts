import * as crypto from "crypto";
import {BadPassword, NoSessionCookie, NoSuchUser} from "./errors";
import {UserData} from "./types";

export interface AuthRepositoryI {
    getUserByName(nickname: string): Promise<UserData | undefined>
    createSession(session_id: string, userData: UserData): Promise<any>
    getUserBySession(session_id: string): Promise<UserData>
    destroySession(session_id: string): void
}

export interface AuthModelI {
    verifyCredential(name: string, password: string): Promise<UserData>
    createSession(userData: UserData): Promise<string>
    verifySession(session_id: string): Promise<UserData>
    logout(session_id: string): void

}

export class AuthenticationModel implements AuthModelI{
    repo: AuthRepositoryI;
    constructor(repo: AuthRepositoryI) {
        this.repo = repo;
    }

    private async createSessionId(nickname: string, email: string): Promise<string> {
        return crypto
            .createHash("md5")
            .update(nickname + email)
            .digest("hex");
    }

    public async verifyCredential(name: string, password: string): Promise<UserData> {
        let user: UserData | undefined = await this.repo.getUserByName(name);
        if (!user) {
            throw new NoSuchUser();
        } else {
            if (user.password !== password) {
                throw new BadPassword()
            } else {
                return user;
            }
        }
    }
    public async createSession(userData: UserData): Promise<string> {
        const session_id = await this.createSessionId(userData.nickname, userData.email);
        await this.repo.createSession(session_id, userData);
        return session_id;
    }

    public async verifySession(session_id?: string): Promise<UserData> {
        if (session_id) {
            return this.repo.getUserBySession(session_id);
        } else {
            throw new NoSessionCookie();
        }
    }

    public async logout(session_id: string): Promise<void> {
        if (session_id) {
            this.repo.destroySession(session_id);
        } else {
            throw new NoSessionCookie();
        }
    }
}
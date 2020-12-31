import {IncorrectPassword, IncorrectUserData} from "./errors";
import {UpdatedUserData, UserData, UserIncomingData} from "./types";
import {Comment} from "../Post/types";
import {ShortTopic} from "../Thread/types";

export interface UserRepositoryI {
    deleteUserFromBd(user_id: number): void
    destroySession(session_id: string): void
    createUser(user: UserIncomingData): Promise<UserData>
    updateUser(updates: any, user_id: number): void
    updateSessionData(updates: any): void
    getCommentsForUser(id: number): Promise<Comment[]>
    getTopicsForUser(id: number): Promise<ShortTopic[]>
}

export class UserModel {
    userRepo: UserRepositoryI;
    constructor(repo: UserRepositoryI) {
        this.userRepo = repo;
    }

    private verifyIncomingData(user: UserIncomingData): boolean {
        let necessaryColumns = ["nickname", "password", "email"];
        for (let i = 0; i < necessaryColumns.length; i++) {
            if (necessaryColumns[i] in user) {
                if (user[necessaryColumns[i]].length < 2) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true
    }
    private findUpdates(newUser: Object, prevUser: Object) {
        let updatedColumns = {};
        for(let column in prevUser) {
            if (newUser[column] != prevUser[column]) {
                updatedColumns[column] = newUser[column];
            }
        }
        return updatedColumns;
    }

    public async insertUser(user: UserIncomingData) {
        let isDataCorrect = this.verifyIncomingData(user);
        if (isDataCorrect) {
            return this.userRepo.createUser(user);
        } else {
            throw new IncorrectUserData();
        }
    }

    public async updateUserData(newUser: UpdatedUserData, prevUserData: UserData) {
        if (newUser.prevPassword != prevUserData.password) {
            //if provided incorrect last password
            throw new IncorrectPassword();
        } else {
            let updates = this.findUpdates(newUser, prevUserData);
            this.userRepo.updateUser(updates, prevUserData.user_id);
            this.userRepo.updateSessionData(updates);
        }
    }

    public async deleteUser(s_id: string, user_id: number) {
        this.userRepo.deleteUserFromBd(user_id);
        this.userRepo.destroySession(s_id);
    }

    public getCommentsForUser(user_id: number) {
        return this.userRepo.getCommentsForUser(user_id);
    }
    public getTopicsForUser(user_id: number) {
        return this.userRepo.getTopicsForUser(user_id);
    }
}
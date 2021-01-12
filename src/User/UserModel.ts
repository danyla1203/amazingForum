import {IncorrectPassword, IncorrectUserData} from "./errors";
import {UpdatedUserData, UserData, UserIncomingData} from "./types";
import {Comment} from "../Post/types";
import {ShortTopic} from "../Thread/types";

export interface UserModelI {
    insertUser(user: UserIncomingData): Promise<UserData>
    updateUserData(session_id: string, newUser: UpdatedUserData, prevUserData: UserData): Promise<UserData>
    deleteUser(s_id: string, user_id: number): void
    getCommentsForUser(user_id: number): Promise<Comment[]>
    getTopicsForUser(user_id: number): Promise<ShortTopic[]>
}

export interface UserRepositoryI {
    deleteUserFromBd(user_id: number): void
    destroySession(session_id: string): void
    createUser(user: UserIncomingData): Promise<UserData>
    updateUser(updates: any, user_id: number): void
    updateSessionData(session_id: string, updates: any): Promise<UserData>
    getCommentsForUser(id: number): Promise<Comment[]>
    getTopicsForUser(id: number): Promise<ShortTopic[]>
}

export class UserModel implements UserModelI {
    userRepo: UserRepositoryI;
    constructor(repo: UserRepositoryI) {
        this.userRepo = repo;
    }

    private verifyIncomingData(user: UserIncomingData): boolean {
        let necessaryColumns = ["nickname", "password", "email"];
        let mappedUser = new Map(Object.entries(user));

        for (let i = 0; i < necessaryColumns.length; i++) {
            let column = necessaryColumns[i];
            let valueFromMap = mappedUser.get(column);
            if (valueFromMap) {
                if (valueFromMap.length < 2) {
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
        newUser: {[index:string]: any},
        prevUser: {[index:string]: any}
    ): Object {
        let updatedColumns: { [index:string]: string } = {};
        for(let column in newUser) {
            if (newUser[column].length < 2) {
                continue
            }
            if (newUser[column] != prevUser[column]) {
                updatedColumns[column] = newUser[column];
            }
        }
        return updatedColumns;
    }

    public async insertUser(user: UserIncomingData): Promise<UserData> {
        let isDataCorrect = this.verifyIncomingData(user);
        if (isDataCorrect) {
            return this.userRepo.createUser(user);
        } else {
            throw new IncorrectUserData();
        }
    }

    public async updateUserData
    (
        session_id: string,
        newUser: UpdatedUserData,
        prevUserData: UserData,
    ): Promise<UserData>
    {
        if (newUser.prevPassword != prevUserData.password) {
            //if provided incorrect last password
            throw new IncorrectPassword();
        } else {
            let updates = this.findUpdates(newUser.user, prevUserData);
            this.userRepo.updateUser(updates, prevUserData.id);
            let updatedUserData = this.userRepo.updateSessionData(session_id, updates);
            return updatedUserData;
        }
    }

    public async deleteUser(s_id: string, user_id: number): Promise<void> {
        this.userRepo.deleteUserFromBd(user_id);
        this.userRepo.destroySession(s_id);
    }

    public getCommentsForUser(user_id: number): Promise<Comment[]> {
        return this.userRepo.getCommentsForUser(user_id);
    }
    public getTopicsForUser(user_id: number): Promise<ShortTopic[]> {
        return this.userRepo.getTopicsForUser(user_id);
    }
}
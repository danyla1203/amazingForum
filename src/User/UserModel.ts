import {IncorrectPassword, IncorrectUserData} from "./errors";
import {UpdatedUserData, UserData, UserIncomingData} from "./types";
import {Comment} from "../Post/types";
import {ShortTopic} from "../Thread/types";

export interface UserModelI {
    insertUser(user: UserIncomingData): Promise<UserData>
    updateUserData(newUser: UpdatedUserData, prevUserData: UserData): any
    deleteUser(s_id: string, user_id: number): void
    getCommentsForUser(user_id: number): Promise<Comment[]>
    getTopicsForUser(user_id: number): Promise<ShortTopic[]>
}

export interface UserRepositoryI {
    deleteUserFromBd(user_id: number): void
    destroySession(session_id: string): void
    createUser(user: UserIncomingData): Promise<UserData>
    updateUser(updates: any, user_id: number): void
    updateSessionData(updates: any): void
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
    private findUpdates(newUser: Object, prevUser: Object): Object {
        let updatedColumns: { [index:string]: string } = {};
        let mappedPrevUser = new Map(Object.entries(prevUser));
        let mappedNewUser = new Map(Object.entries(newUser));

        for(let column in prevUser) {
            let newUserColumn = mappedNewUser.get(column);
            let prevUserColumn = mappedPrevUser.get(column);

            if (newUserColumn != prevUserColumn) {
                updatedColumns[column] = newUserColumn;
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
        newUser: UpdatedUserData,
        prevUserData: UserData
    ): Promise<void>
    {
        if (newUser.prevPassword != prevUserData.password) {
            //if provided incorrect last password
            throw new IncorrectPassword();
        } else {
            let updates = this.findUpdates(newUser, prevUserData);
            this.userRepo.updateUser(updates, prevUserData.user_id);
            this.userRepo.updateSessionData(updates);
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
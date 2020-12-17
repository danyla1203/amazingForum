import {IncorrectPassword, IncorrectUserData} from "../lib/Error";

export interface UserRepositoryI {
    deleteUserFromBd(user_id: number)
    destroySession(session_id: string)
    createUser(user: UserIncomingData)
    updateUser(updates: any, user_id: number)
    updateSessionData(updates: any)
}

type UserData = {
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
type UpdatedUserData = UserIncomingData & {
    prevPassword: string
}

export class UserModel {
    userRepo: UserRepositoryI;
    constructor(repo: UserRepositoryI) {
        this.userRepo = repo;
    }

    private verifyIncomingData(user: UserIncomingData): boolean {
        return true;
    }
    private findUpdates(newUser: UpdatedUserData, prevUser: UserData) {
        return {};
    }

    public async insertUser(user: UserIncomingData) {
        let isDataCorrect = this.verifyIncomingData(user);
        if (isDataCorrect) {
            this.userRepo.createUser(user);
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
}
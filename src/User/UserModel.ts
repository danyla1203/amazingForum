import * as crypto from "crypto";

import {IncorectCode, IncorrectPassword, IncorrectUserData} from "./errors";
import {UpdatedUserData, UserData, UserIncomingData} from "./types";
import {Comment} from "../Post/types";
import {ShortTopic} from "../Thread/types";
import {CustomError} from "../lib/Error";

export interface UserRepositoryI {
    deleteUserFromBd(user_id: number): void
    destroySession(session_id: string): void
    createUser(user: UserIncomingData): Promise<UserData>
    saveUserBeforeConfirmation(code: string, user: UserIncomingData): void
    getSavedUser(code: string): Promise<UserIncomingData | undefined>
    updateUser(updates: any, user_id: number): void
    updateSessionData(session_id: string, updates: any): Promise<UserData>
    getCommentsForUser(id: number): Promise<Comment[]>
    getTopicsForUser(id: number): Promise<ShortTopic[]>
}

export interface UserMailer {
    sendVerificationMail(email: string, verificationCode: string): void;
}

export interface UserModelI {
    insertUser(code: string): Promise<UserData>
    saveUserWithUnverifiedEmail(user: UserIncomingData): void;
    updateUserData(session_id: string, newUser: UpdatedUserData, prevUserData: UserData): Promise<UserData>
    deleteUser(s_id: string, user_id: number): void
    getCommentsForUser(user_id: number): Promise<Comment[]>
    getTopicsForUser(user_id: number): Promise<ShortTopic[]>
}
export class UserModel implements UserModelI {
    userRepo: UserRepositoryI;
    mailer: UserMailer;
    constructor(repo: UserRepositoryI, mailer: UserMailer) {
        this.userRepo = repo;
        this.mailer = mailer;
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
        return true;
    }
    private createVerificationCode(user: UserIncomingData): string {
        const hash = crypto.createHmac('md5', `${user.email}${user.nickname}`)
            .update('I love cupcakes')
            .digest('hex');
        return hash;
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

    public async saveUserWithUnverifiedEmail(user: UserIncomingData) {
        const isDataCorrect = this.verifyIncomingData(user);
        if (isDataCorrect) {
            const verificationCode = this.createVerificationCode(user);
            this.userRepo.saveUserBeforeConfirmation(verificationCode, user);
            this.mailer.sendVerificationMail((user.email as string), verificationCode);
        } else {
            throw new IncorrectUserData();
        }
    }

    public async insertUser(code: string): Promise<UserData> {
        const savedUser = await this.userRepo.getSavedUser(code);
        if (savedUser) {
            return this.userRepo.createUser(savedUser);
        } else {
            throw new IncorectCode();
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
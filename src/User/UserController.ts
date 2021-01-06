import {AuthModelI} from "../Authentication/AuthenticationModel";
import {Request, Response} from "../lib/ExtendContext";
import {Delete, get, post, put} from "../lib/httpMethodDecorators";
import {UserModel, UserModelI} from "./UserModel";
import {UpdatedUserData, UserData, UserIncomingData} from "./types";
import {Comment} from "../Post/types";
import {ShortTopic} from "../Thread/types";

export class UserController {
    authModel: AuthModelI;
    userModel: UserModelI;
    constructor(authModel: AuthModelI, userModel: UserModel) {
        this.authModel = authModel;
        this.userModel = userModel;
    }

    @post("/register")
    async register(req: Request, res: Response): Promise<UserData> {
        let userData: UserIncomingData = {
            nickname: req.body.get("name"),
            password: req.body.get("password"),
            email: req.body.get("email"),
            country: req.body.get("country"),
            avatar_path: req.body.get("user_avatar").fileName
        };
        let userWithId = await this.userModel.insertUser(userData);
        let session_id = await this.authModel.createSession(userWithId);

        res.cookie("s_id", session_id);
        return userWithId;
    }

    @get("/user")
    getUser(req: Request): Promise<UserData> {
        let session_id = req.cookies.get("s_id");
        let user = this.authModel.verifySession(session_id);
        return user;
    }

    @put("/user")
    async updateUser(req: Request) {
        let session_id = req.cookies.get("s_id");
        let user: UserIncomingData = {
            nickname: req.body.get("name"),
            password: req.body.get("password"),
            country: req.body.get("country"),
            avatar_path: req.body.get("user_avatar").fileName,
        };
        let updatedUser = {
            user: user,
            prevPassword: req.body.get("prev_password"),
        };
        let prevUser = await this.authModel.verifySession(session_id);
        this.userModel.updateUserData(updatedUser, prevUser);
    }

    @Delete("/user")
    async deleteUser(req: Request): Promise<void> {
        let session_id = req.cookies.get("s_id");
        let user = await this.authModel.verifySession(session_id);
        this.userModel.deleteUser(session_id, user.id);
    }

    @get("/user/:user_id/comments")
    async getCommentsForUser(req: Request): Promise<Comment[]> {
        return this.userModel.getCommentsForUser(req.params.get("user_id"));
    }

    @get("/user/:user_id/topics")
    async getTopicsForUser(req: Request): Promise<ShortTopic[]> {
        return this.userModel.getTopicsForUser(req.params.get("user_id"));
    }
}
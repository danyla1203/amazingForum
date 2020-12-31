import {AuthModelI} from "../Authentication/AuthenticationModel";
import {Request, Response} from "../lib/ExtendContext";
import {Delete, get, post, put} from "../lib/httpMethodDecorators";
import {UserModel} from "./UserModel";
import {UserIncomingData} from "./types";

export class UserController {
    authModel: AuthModelI;
    userModel: UserModel;
    constructor(authModel: AuthModelI, userModel: UserModel) {
        this.authModel = authModel;
        this.userModel = userModel;
    }

    @post("/register")
    async register(req: Request, res: Response) {
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
    getUser(req: Request) {
        let session_id = req.cookies.get("s_id");
        let user = this.authModel.verifySession(session_id);
        return user;
    }

    @put("/user")
    async updateUser(req: Request) {
        let session_id = req.cookies.get("s_id");
        let newUser = req.body.get("newUser");
        let user = await this.authModel.verifySession(session_id);
        this.userModel.updateUserData(newUser, user);
    }

    @Delete("/user")
    async deleteUser(req: Request) {
        let session_id = req.cookies.get("s_id");
        let user = await this.authModel.verifySession(session_id);
        this.userModel.deleteUser(session_id, user.user_id);
    }

    @get("/user/:user_id/comments")
    async getCommentsForUser(req: Request) {
        return this.userModel.getCommentsForUser(req.params.get("user_id"));
    }
}
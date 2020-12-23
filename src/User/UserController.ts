import {AuthModelI} from "../Authentication/AuthenticationModel";
import {Request, Response} from "../lib/ExtendContext";
import {Delete, get, post, put} from "../lib/httpMethodDecorators";
import {UserModel} from "./UserModel";
import {UserData, UserIncomingData} from "./types";

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
            country: req.body.get("coutry"),
        };

        let insertedUserData = await this.userModel.insertUser(userData);
        let session_id = await this.authModel.createSession(insertedUserData);

        res.cookie("s_id", session_id);
        return userData;
    }

    @get("/User")
    getUser(req: Request, res: Response) {
        let session_id = req.cookies.get("s_id");
        let user = this.authModel.verifySession(session_id);
        return user;
    }

    @put("/User")
    async updateUser(req: Request, res: Response) {
        let session_id = req.cookies.get("s_id");
        let newUser = req.body.get("newUser");
        let user = await this.authModel.verifySession(session_id);
        this.userModel.updateUserData(newUser, user);
    }

    @Delete("/User")
    async deleteUser(req: Request, res: Response) {
        let session_id = req.cookies.get("s_id");
        let user = await this.authModel.verifySession(session_id);
        this.userModel.deleteUser(session_id, user.user_id);
    }
}
import {AuthenticationModel, AuthModelI} from "../models/AuthenticationModel";
import {Request, Response} from "../lib/ExtendContext";
import {Delete, get, post, put} from "../lib/httpMethodDecorators";
import {UserModel} from "../models/UserModel";

export class UserController {
    authModel: AuthModelI;
    userModel: UserModel;
    constructor(authModel: AuthModelI, userModel: UserModel) {
        this.authModel = authModel;
        this.userModel = userModel;
    }

    @post("/register")
    async register(req: Request, res: Response) {
        let user = req.body.get("user");
        await this.userModel.insertUser(user);
        let session_id = await this.authModel.createSession(user);

        res.cookie("s_id", session_id);
        return user;
    }

    @get("/user")
    getUser(req: Request, res: Response) {
        let session_id = req.cookies.get("s_id");
        let user = this.authModel.verifySession(session_id);
        return user;
    }

    @put("/user")
    async updateUser(req: Request, res: Response) {
        let session_id = req.cookies.get("s_id");
        let newUser = req.body.get("newUser");
        let user = await this.authModel.verifySession(session_id);
        this.userModel.updateUserData(newUser, user);
    }

    @Delete("/user")
    async deleteUser(req: Request, res: Response) {
        let session_id = req.cookies.get("s_id");
        let user = await this.authModel.verifySession(session_id);
        this.userModel.deleteUser(session_id, user.user_id);
    }
}
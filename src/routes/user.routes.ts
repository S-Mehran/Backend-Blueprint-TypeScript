import * as express from "express";
import { UserController } from "../controllers/user.controller";
import { userValidator } from "../middleware/user.validator";
import  upload  from "../helpers/fileupload.helper";
const Router = express.Router();

Router.get("/users", UserController.getAllUsers);
Router.post("/users", userValidator, UserController.createUser);
Router.put("/users/:id", userValidator, UserController.updateUser);
Router.delete("/users/:id", UserController.deleteUser);
Router.get("/users/:id", UserController.getUserById)

Router.put("/profile-picture-upload/:id", upload, UserController.updateProfilePicture)
export { Router as userRouter };


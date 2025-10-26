import * as express from "express";
import { userValidator, loginValidator, appointmentValidator } from "../middleware/index";
import { appointmentController } from "../controllers/appointment.controller";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";
import { userRoles } from "../enum/user-roles.enum";
const Router = express.Router();

Router.post('/appointment',  authentication, authorization([userRoles.DOCTOR, userRoles.PATIENT]), appointmentValidator,
    appointmentController.createAppointment)

export { Router as appointmentRouter };

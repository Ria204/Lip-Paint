import { Router } from "express";
import { userController } from "./auth.controller";
import { authValidation } from "./auth.validation";
import validateRequest from "../../app/middlewares/validateRequest";
import auth from "../../app/middlewares/auth";
import { userRole } from "./auth.constant";

const router = Router();

router.post("/signup", validateRequest(authValidation.signupValidation as any) ,userController.signup);
router.post("/login", validateRequest(authValidation.loginValidation as any) ,userController.login);
router.post("/refreshToken", validateRequest(authValidation.refreshTokenValidation as any) ,userController.refreshToken);
router.post("/forgotPassword", validateRequest(authValidation.forgotPasswordValidation as any) ,userController.forgotPassword);
router.post("/resetPassword", validateRequest(authValidation.resetTokenValidation as any) ,userController.resetPassword);
router.post("/changePassword", auth(userRole.purchaser, userRole.seller), validateRequest(authValidation.changePasswordValidation as any) ,userController.changePassword);

export const authRoute = router;
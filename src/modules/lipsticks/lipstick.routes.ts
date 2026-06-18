import { Router } from "express";
import { lipstickController } from "./lipstick.controller";
import auth from "../../app/middlewares/auth";
import { userRole } from "../auth/auth.constant";

const router =  Router();

router.post("/add", auth(userRole.seller), lipstickController.addLipstick);

export const lipstickRoute = router;
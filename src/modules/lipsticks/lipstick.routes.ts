import { Router } from "express";
import { lipstickController } from "./lipstick.controller";
import auth from "../../app/middlewares/auth";
import { userRole } from "../auth/auth.constant";

const router =  Router();

router.post("/add", auth(userRole.seller), lipstickController.addLipstick);
router.get("/singleLipstick/:id", auth(userRole.seller, userRole.purchaser), lipstickController.viewSingleLipstick);
router.get("/allLipstick", auth(userRole.seller, userRole.purchaser), lipstickController.viewAllLipstick);

export const lipstickRoute = router;
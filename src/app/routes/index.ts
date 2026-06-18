import { Router } from "express";
import { authRoute } from "../../modules/auth/auth.routes";
import { lipstickRoute } from "../../modules/lipsticks/lipstick.routes";

const router = Router();

const moduleRoutes = [
    {
        path : "/auth",
        route : authRoute
    },
    {
        path : "/lipstick",
        route : lipstickRoute
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
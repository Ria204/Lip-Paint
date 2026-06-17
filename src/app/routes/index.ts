import { Router } from "express";
import { authRoute } from "../../modules/auth/auth.routes";

const router = Router();

const moduleRoutes = [
    {
        path : "/auth",
        route : authRoute
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
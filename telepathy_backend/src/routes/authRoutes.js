import { Router } from "express";
import { 
    authRegister, 
    authLogin, 
    authStatus, 
    authLogout, 
    authSetup2fa, 
    authVerify2fa, 
    authReset2fa 
} from "../controllers/authControllers.js";
import { isAuthenticated } from "../middlewares/authMiddlewares.js";

const router = Router();

router.post("/register", authRegister);

router.post("/login", authLogin);

router.get("/status", isAuthenticated, authStatus);

router.post("/logout", isAuthenticated, authLogout);

router.post("/2fa/setup", authSetup2fa);

router.post("/2fa/verify", authVerify2fa);

router.post("/2fa/reset", authReset2fa);

export default router;
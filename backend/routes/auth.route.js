import express from "express"
const app = express();

// Middleware to parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

import { signup, login, logout, getMe } from "../controllers/auth.controllers.js";
import protectRoute from "../middleware/protectRoute.js";



router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", protectRoute, getMe)


export default router


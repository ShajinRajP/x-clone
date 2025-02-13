import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { createPost, deletePost, createComment, likeUnlikePost, getAllPosts, getLikedPosts, getFollowingPosts, getUsersPosts } from "../controllers/post.controllers.js";

const router = express.Router();

router.post("/create", protectRoute, createPost)
router.post("/like/:id", protectRoute, likeUnlikePost)
router.post("/comment/:id", protectRoute, createComment)
router.delete("/:id", protectRoute, deletePost)


router.get("/all", protectRoute, getAllPosts)
router.get("/likes/:id", protectRoute, getLikedPosts)
router.get("/following", protectRoute, getFollowingPosts)
router.get("/user/:username", protectRoute, getUsersPosts)


export default router;
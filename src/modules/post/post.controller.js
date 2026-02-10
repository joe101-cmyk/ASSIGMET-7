import { Router} from "express";
import * as postService from "./post.service.js";

const router = Router();

router.post("/", postService.createPost);

router.delete("/:postId", postService.deletePost);

router.get("/details", postService.getPostsWithDetails);

router.get("/comment-count", postService.getPostsWithCommentCount);

router.get("/", postService.getAllposts);

export default router;
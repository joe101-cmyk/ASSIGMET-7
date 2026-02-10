
import { postmodel } from "../../DB/modules/post.model.js";
import { usermodel } from "../../DB/modules/user.model.js";
import { commentmodel } from "../../DB/modules/comment.model.js";
import { fn, col } from "sequelize";



export const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        if (!title || !content || !userId) {
            return res.status(400).json({
                message: "Title, content, and userId are required"
            });
        }

        const post = await postmodel.create({
            title,
            content,
            userId
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        console.error("Full Error:", error);
        res.status(500).json({
            message: "Error creating post",
            error: error.message
        });
    }
};


export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await postmodel.findByPk(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.userId !== userId) {
            return res.status(403).json({
                message: "Only the owner of the post can delete it"
            });
        }

        await postmodel.destroy({
            where: { id: postId }
        });

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {
        console.error("Full Error:", error);
        res.status(500).json({
            message: "Error deleting post",
            error: error.message
        });
    }
};


export const getPostsWithDetails = async (req, res) => {
    try {
        const posts = await postmodel.findAll({
            attributes: ["id", "title"],
            include: [
                {
                    model: usermodel,
                    attributes: ["id", "firstname", "lastname"],
                    as: "user"
                },
                {
                    model: commentmodel,
                    attributes: ["id", "content"],
                    as: "comments"
                }
            ]
        });

        if (!posts || posts.length === 0) {
            return res.status(404).json({
                message: "No posts found"
            });
        }

        res.status(200).json({
            message: "Posts retrieved successfully",
            posts
        });

    } catch (error) {
        console.error("Full Error:", error);
        res.status(500).json({
            message: "Error fetching posts",
            error: error.message
        });
    }
};


export const getPostsWithCommentCount = async (req, res) => {
    try {
        const posts = await postmodel.findAll({
            include: [
                {
                    model: commentmodel,
                    attributes: []
                }
            ],
            attributes: {
                include: [
                    [
                        fn("COUNT", col("comments.id")),
                        "commentCount"
                    ]
                ]
            },
            group: ["post.id"],
            subQuery: false,
            raw: true
        });

        if (!posts || posts.length === 0) {
            return res.status(404).json({
                message: "No posts found"
            });
        }

        res.status(200).json({
            message: "Posts with comment count retrieved successfully",
            posts
        });

    } catch (error) {
        console.error("Full Error:", error);
        res.status(500).json({
            message: "Error fetching posts with comment count",
            error: error.message
        });
    }
};


export const getAllposts = (req, res) => {
    res.status(200).json({ message: "All posts" });
};
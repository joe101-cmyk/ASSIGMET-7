import { commentmodel } from "../../DB/modules/comment.model.js";
import { usermodel } from "../../DB/modules/user.model.js";
import { postmodel } from "../../DB/modules/post.model.js";
import { fn, col, Op } from "sequelize";


export const createBulkComments = async (req, res) => {
    try {
        const comments = req.body;

        if (!Array.isArray(comments) || comments.length === 0) {
            return res.status(400).json({
                message: "Please provide an array of comments"
            });
        }

        const createdComments = await commentmodel.bulkCreate(comments);

        res.status(201).json({
            message: "Comments created successfully",
            count: createdComments.length,
            comments: createdComments
        });

    } catch (error) {
        console.error("Full Error:", error);
        res.status(500).json({
            message: "Error creating comments",
            error: error.message
        });
    }
};


export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId, content } = req.body;

        if (!userId || !content) {
            return res.status(400).json({
                message: "userId and content are required"
            });
        }

        const comment = await commentmodel.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.userid !== userId) {
            return res.status(403).json({
                message: "Only the owner of the comment can update it"
            });
        }

        await commentmodel.update(
            { content },
            { where: { id: commentId } }
        );

        res.status(200).json({
            message: "Comment updated successfully"
        });

    } catch (error) {
        console.error("Full Error:", error);
        res.status(500).json({
            message: "Error updating comment",
            error: error.message
        });
    }
};


export const findOrCreateComment = async (req, res) => {
    try {
        const { postid, userid, content } = req.body;

        if (!postid || !userid || !content) {
            return res.status(400).json({
                message: "postid, userid, and content are required"
            });
        }

        const [comment, created] = await commentmodel.findOrCreate({
            where: { postid, userid, content },
            defaults: { postid, userid, content }
        });

        res.status(created ? 201 : 200).json({
            message: created ? "Comment created" : "Comment found",
            comment,
            isNew: created
        });

    } catch (error) {
        console.error("Full Error:", error);
        res.status(500).json({
            message: "Error with find or create comment",
            error: error.message
        });
    }
};


export const searchComments = async (req, res) => {
    try {
        const { word } = req.query;

        if (!word) {
            return res.status(400).json({
                message: "Search word is required"
            });
        }

        const comments = await commentmodel.findAll({
            where: {
                content: {
                    [Op.like]: `%${word}%`
                }
            }
        });

        const count = comments.length;

        res.status(200).json({
            message: "Search completed",
            count,
            comments
        });

    } catch (error) {
        console.error("Full Error:", error);
        res.status(500).json({
            message: "Error searching comments",
            error: error.message
        });
    }
};


export const getNewestComments = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await commentmodel.findAll({
            where: { postid: postId },
            order: [["createdAt", "DESC"]],
            limit: 3
        });

        if (!comments || comments.length === 0) {
            return res.status(404).json({
                message: "No comments found for this post"
            });
        }

        res.status(200).json({
            message: "3 most recent comments retrieved",
            count: comments.length,
            comments
        });

    } catch (error) {
        console.error("Full Error:", error);
        res.status(500).json({
            message: "Error fetching newest comments",
            error: error.message
        });
    }
};


export const getCommentDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await commentmodel.findByPk(id, {
            include: [
                {
                    model: usermodel,
                    attributes: ["id", "firstname", "lastname", "email"],
                    as: "user"
                },
                {
                    model: postmodel,
                    attributes: ["id", "title", "content"],
                    as: "post"
                }
            ]
        });

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        res.status(200).json({
            message: "Comment details retrieved successfully",
            comment
        });

    } catch (error) {
        console.error("Full Error:", error);
        res.status(500).json({
            message: "Error fetching comment details",
            error: error.message
        });
    }
};

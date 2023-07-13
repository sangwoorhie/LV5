const { Comments, CommentLikes, Users, PostLikes } = require('../models') // DB에 접근
const sequelize = require("sequelize");
const { Op } = require("sequelize");


class CommentRepository {

    // 1. 게시글 내 전체 댓글 조회 (댓글전체 조회시) findCommentsById (s붙음)
    findCommentsById = async (postId) => {
        const comments = await Comments.findAll({
            raw: true,
            attribute: ["commentId", "comment", "createdAt", "updatedAt", [sequelize.fn("COUNT", sequelize.col("CommentLikes.commentId")), "likes"]],
            include: [{ model: Users, as:['nickname'], attributes: ['nickname']}, { model: CommentLikes, as:['Likes'], attributes: ['commentId']}],
            where: { postId },
            // group: ["Comments.commentId"],
            order: [["createdAt", "DESC"]],
            })
        // const comments = await Comments.findByPk(commentId)
        // return comments;
        return comments;
    }

    
    // 2. 게시글 내 특정 댓글 조회 (수정, 삭제시) findCommentById
    findCommentById = async(commentId) => {
        const comment = await Comments.findOne({
            raw: true, // 모델 인스턴스가 아닌, 데이터만 반환.
            attributes: ['commentId', 'comment', 'createdAt', 'updatedAt', [sequelize.fn("COUNT", sequelize.col("CommentLikes.commentId")), "likes"]],
            include: [{model: Users, attributes: ['nickname'], as: ['nickname']}, {model: CommentLikes, as:['Likes'], attributes: ['commentId']}],
            where: { commentId },
        })
        return comment;
    }




    // 3. 댓글 생성 createComment
    createComment = async (PostId, UserId, comment) => {
        const createCommentData = await Comments.create({PostId, UserId, comment})
        return createCommentData;
    }


    // 4. 댓글 수정 updateComment
    updateComment = async (postId, commentId, comment) => {
        const updateCommentData = await Comments.update(
            { comment },
            { where: { commentId, postId }}
        )
        return updateCommentData;
    }


    // 5. 댓글 삭제 deleteComment
    deleteComment = async (postId, commentId) => {
        const deleteCommentData = await Comments.destroy({where: {postId, commentId}})
        return deleteCommentData;
    }
};

module.exports = CommentRepository
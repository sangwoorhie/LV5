const { CommentLikes } = require("../models"); // DB에 접근
const { Op } = require("sequelize");
const sequelize = require("sequelize");

class CommentLikeskRepository {
  // 1. 댓글 좋아요 생성
  createLike = async (postId, commentId, userId) => {
    const createCommentLike = await CommentLikes.create({
      PostId: postId,
      commentId: Number(commentId),
      UserId: Number(userId),
    });
    return createCommentLike;
  };

  // 댓글 좋아요 숫자
  likeCount = async (commentId) => {
    const likeCount = await CommentLikes.count({
      where: { commentId: Number(commentId) },
    });
    return likeCount;
  };

  // 댓글에 좋아요 이미 누른 유저 조회
  clickedUser = async (commentId, userId) => {
    const clickedUser = await CommentLikes.findOne({
      where: {
        [Op.and]: [
          { commentId: Number(commentId) },
          { UserId: Number(userId) },
        ],
      },
    });
    return clickedUser;
  };

  // 2. 댓글 좋아요 취소
  deleteLike = async (postId, commentId, userId) => {
    const deleteCommentLike = await CommentLikes.destroy({
      where: {
        [Op.and]: [
          { userId: Number(userId) },
          { commentId: Number(commentId) },
        ],
      },
    });
    return deleteCommentLike;
  };
}

module.exports = CommentLikeskRepository;

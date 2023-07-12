const { CommentReport } = require('../models');
const { Op } = require("sequelize");


class CommentReportRepository {

// 1. 댓글 신고 생성
createReport = async (postId, commentId, userId, content) => {
    const createCommentReport = await  CommentReport.create({postId, commentId, reportUserId: userId, content})
    return createCommentReport;
}


// 2. 댓글 신고 취소
deleteReport = async (postId, commentId, userId) => {
    const deleteCommentReport = await CommentReport.destroy({where: { postId: postId, reportUserId: userId, commentId }});
    return deleteCommentReport;
};

}

module.exports = CommentReportRepository
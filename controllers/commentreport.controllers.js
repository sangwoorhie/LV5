const CommentReportService = require("../services/commentreport.service");

class CommentReportController {
  commentReportService = new CommentReportService();

  // 1. 댓글 신고
  createReport = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;
    const { userId } = res.locals.user;
    const { status, message } = await this.commentReportService.createReport(
      postId,
      commentId,
      userId,
      content
    );
    res.status(status).json({ message });
  };

  // 2. 댓글 신고 취소
  deleteReport = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { userId } = res.locals.user;
    const { status, message } = await this.commentReportService.deleteReport(
      postId,
      commentId,
      userId
    );
    res.status(status).json({ message });
  };
}

module.exports = CommentReportController;

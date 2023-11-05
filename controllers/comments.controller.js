const CommentService = require("../services/comments.service");

class CommentsController {
  commentService = new CommentService();

  // 1. 댓글 조회 findPostById
  getCommentById = async (req, res, next) => {
    const { postId } = req.params;
    const { status, message, comment } =
      await this.commentService.findCommentsById(postId);
    res.status(status).json({ message, comment });
  };

  // 2. 댓글 생성 createComment
  createComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { comment } = req.body;
    const { status, message } = await this.commentService.createComment(
      postId,
      userId,
      comment
    );
    res.status(status).json({ message });
  };

  // 3. 댓글 수정 updateComment
  updateComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    const { comment } = req.body;
    const { status, message } = await this.commentService.updateComment(
      userId,
      postId,
      commentId,
      comment
    );
    res.status(status).json({ message });
  };

  // 4. 댓글 삭제 deleteComment
  deleteComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    const { status, message } = await this.commentService.deleteComment(
      userId,
      commentId,
      postId
    );
    res.status(status).json({ message });
  };
}

module.exports = CommentsController;

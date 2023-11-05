const PostReportRepository = require("../repositories/postreport.repositories");
const PostRepository = require("../repositories/posts.repository");

class PostReportService {
  postReportRepository = new PostReportRepository();
  postRepository = new PostRepository();

  // 1.게시글 신고 생성
  createReport = async (postId, content, userId) => {
    if (!postId) {
      return { status: 404, message: "게시글이 존재하지 않습니다." };
    } else if (!content) {
      return { status: 412, message: "정당한 신고 사유를 기재해주세요." };
    } else if (!userId) {
      return { status: 404, message: "로그인 후 사용할 수 있는 기능입니다." };
    }

    const clickedUser = await this.postReportRepository.clickedUser(
      postId,
      userId
    );
    if (clickedUser) {
      return { status: 403, message: "이미 신고한 게시글입니다." };
    }

    await this.postReportRepository.createReport(postId, content, userId);

    return {
      status: 200,
      message: "게시글이 신고되었습니다.",
    };
  };

  // 2. 게시글 신고 취소
  deleteReport = async (postId, userId) => {
    if (!postId) {
      return { status: 404, message: "게시글이 존재하지 않습니다." };
    } else if (!userId) {
      return { status: 404, message: "로그인 후 사용할 수 있는 기능입니다." };
    }

    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) {
      return { status: 404, message: "게시글이 존재하지 않습니다." };
    }

    const clickedUser = await this.postReportRepository.clickedUser(
      postId,
      userId
    );
    if (!clickedUser) {
      return {
        status: 403,
        message: "본인이 신고한 게시글만 취소요청이 가능합니다.",
      };
    }

    await this.postReportRepository.deleteReport(postId, userId);
    return {
      status: 200,
      message: "게시글이 신고 취소되었습니다.",
    };
  };
}

module.exports = PostReportService;

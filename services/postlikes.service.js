const PostLikeRepository = require("../repositories/postlikes.repository");
const PostRepository = require("../repositories/posts.repository");

class PostLikeService {
  postLikeRepository = new PostLikeRepository();
  postRepository = new PostRepository();

  // // 1.게시글 좋아요 조회 findPostById
  // findPostById = async (postId) => {
  //     const postLike = await this.postLikeRepository.findPostById(postId)
  //     if(!postId) throw new Error('게시글이 존재하지 않습니다.');
  //     return {
  //         likedId: postLike.likedId,
  //         postId: postLike.postId,
  //         UserId: postLike.UserId,
  //         createdAt: postLike.createdAt
  //     }
  // }

  // 2. 게시글 좋아요 생성 createLike
  createLike = async (postId, userId) => {
    if (!postId) {
      return { status: 404, message: "게시글이 존재하지 않습니다." };
    }
    if (!userId) {
      return { status: 403, message: "로그인 후 이용할 수 있는 기능입니다." };
    }

    const clickedUser = await this.postLikeRepository.clickedUser(
      postId,
      userId
    );
    if (clickedUser) {
      return { status: 403, message: "이미 좋아요를 누른 게시글입니다." };
    }

    await this.postLikeRepository.createLike(postId, userId); // 좋아요 생성

    const likeCount = await this.postLikeRepository.likeCount(postId); // 좋아요 숫자

    return {
      status: 200,
      message: "게시글 좋아요를 눌렀습니다.",
    };
  };

  // 3. 게시글 좋아요 취소 deleteLike
  deleteLike = async (postId, userId) => {
    if (!postId) {
      return { status: 404, message: "게시글이 존재하지 않습니다." };
    }
    if (!userId) {
      return { status: 403, message: "로그인 후 이용할 수 있는 기능입니다." };
    }

    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) {
      return { status: 404, message: "게시글이 존재하지 않습니다." };
    }

    const clickedUser = await this.postLikeRepository.clickedUser(
      postId,
      userId
    );
    if (!clickedUser) {
      return {
        status: 403,
        message: "본인이 누른 좋아요만 취소가 가능합니다.",
      };
    }

    await this.postLikeRepository.deleteLike(postId, userId);

    return {
      status: 200,
      message: "게시글 좋아요를 취소했습니다.",
    };
  };
}

module.exports = PostLikeService;

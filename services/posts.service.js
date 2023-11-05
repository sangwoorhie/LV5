// 서비스 계층 = 비즈니스 로직 계층. 아키텍쳐의 핵심 비즈니스로직을 수행하고 클라이언트가 원하는 요구사항 구현.
// 데이터가 필요할때 저장소(Repository)에게 데이터 요청

const PostRepository = require("../repositories/posts.repository");

class PostService {
  postRepository = new PostRepository();

  // 1. 게시글 목록조회 findAllPost
  findAllPost = async () => {
    try {
      const allPost = await this.postRepository.findAllPost();
      if (!allPost) {
        return {
          status: 404,
          message: "게시글이 존재하지 않습니다.",
          data: null,
        };
      }
      if (allPost) {
        return {
          status: 200,
          message: "게시글 목록이 조회되었습니다.",
          data: allPost,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: "요청이 정상적으로 이루어지지 않았습니다.",
        data: null,
      };
    }
  };

  // allPost.sort ((a, b) => { return b.createdAt - a.createdAt});
  // return allPost.map((post) => { // 새로운배열로 만듦
  //     return {
  //         postId: post.postId,
  //         title: post.title,
  //         nickname: post.nickname,
  //         createdAt : post.createdAt,
  //         updatedAt: post.updatedAt,
  //     }}
  // )

  // 2. 게시글 상세조회 findPostById
  findPostById = async (postId) => {
    try {
      const findPost = await this.postRepository.findPostById(postId);
      if (!findPost) {
        return {
          status: 404,
          message: "게시글이 존재하지 않습니다.",
          post: null,
        };
      }
      if (findPost)
        return {
          status: 200,
          message: "게시글이 조회되었습니다.",
          post: {
            postId: findPost.postId,
            userId: findPost.userId,
            title: findPost.title,
            nickname: findPost.nickname,
            likes: findPost.likes,
            content: findPost.content,
            createdAt: findPost.createdAt,
            updatedAt: findPost.updatedAt,
          },
        };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: "요청이 정상적으로 이루어지지 않았습니다.",
        data: null,
      };
    }
  };

  // 3. 게시글 생성 createPost
  createPost = async (UserId, title, content) => {
    try {
      if (!UserId) {
        return { status: 403, message: "로그인 후 이용할 수 있는 기능입니다." };
      } else if (!title) {
        return { status: 412, message: "제목을 입력해주세요." };
      } else if (!content) {
        return { status: 412, message: "내용을 입력해주세요." };
      }

      await this.postRepository.createPost(UserId, title, content);

      return {
        status: 200,
        message: "게시글이 등록되었습니다.",
      };
    } catch (error) {
      console.log(error);
      return {
        tatus: 400,
        message: "요청이 정상적으로 이루어지지 않았습니다.",
      };
    }
  };

  // 4. 게시글 수정 updatePost
  updatePost = async (userId, postId, title, content) => {
    try {
      if (!userId) {
        return { status: 403, message: "게시글 수정 권한이 없습니다." };
      } else if (!title) {
        return { status: 412, message: "제목을 입력해주세요." };
      } else if (!content) {
        return { status: 412, message: "내용을 입력해주세요." };
      }

      const findPost = await this.postRepository.findPostById(postId);
      if (!findPost) {
        return { status: 404, message: "게시글이 존재하지 않습니다." };
      }

      await this.postRepository.updatePost(postId, title, content);
      // const updatePost = await this.postRepository.findPostById(postId);

      return {
        status: 200,
        message: "게시글이 수정되었습니다.",
      };
    } catch (error) {
      console.log(error);
      return {
        tatus: 400,
        message: "요청이 정상적으로 이루어지지 않았습니다.",
      };
    }
  };

  // 5. 게시글 삭제 deletePost
  deletePost = async (userId, postId) => {
    try {
      if (!userId) {
        return { status: 403, message: "게시글 삭제 권한이 없습니다." };
      }
      if (!postId) {
        return { status: 404, message: "게시글이 조회되지 않습니다." };
      }

      const findPost = await this.postRepository.findPostById(postId);
      if (!findPost) {
        return { status: 404, message: "게시글이 존재하지 않습니다." };
      }

      await this.postRepository.deletePost(postId);

      return {
        status: 200,
        message: "게시글이 삭제되었습니다.",
      };
    } catch (error) {
      console.log(error);
      return {
        tatus: 400,
        message: "요청이 정상적으로 이루어지지 않았습니다.",
      };
    }
  };
}

module.exports = PostService;

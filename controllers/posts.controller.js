const PostService = require("../services/posts.service.js");

// PostsController 클라이언트 요청 처리를 위해 postService를 호출한다.
// 비즈니스 로직을 수행하지 않고, 클라이언트의 요청(request)을 서비스계층에 전달한다.

// 컨트롤러 -> 서비스 -> 레포지토리 -> DB요청
// MVC = model view controller = 3레이어드 아키텍쳐

class PostsController {
  postService = new PostService();

  // 1. 게시글 목록조회  getPosts
  getPosts = async (req, res, next) => {
    const { status, message, data } = await this.postService.findAllPost();
    res.status(status).json({ message, data });
  };

  // 2. 게시글 상세조회 getPostById
  getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const { status, message, post } = await this.postService.findPostById(
      postId
    );
    res.status(status).json({ message, post });
  };

  // 3. 게시글 생성 createPost
  createPost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { title, content } = req.body;
    const { status, message } = await this.postService.createPost(
      userId,
      title,
      content
    ); // 여기서 이 인자들을 실제로 생성하는게 아니라, service로 넘겨보내주는 인자값들이다.
    res.status(status).json({ message });
  };

  // 4. 게시글 수정 updatePost
  updatePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;
    const { status, message } = await this.postService.updatePost(
      userId,
      postId,
      title,
      content
    );
    res.status(status).json({ message });
  };

  // 5. 게시글 삭제 deletePost
  deletePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { status, message } = await this.postService.deletePost(
      userId,
      postId
    );
    res.status(status).json({ message });
  };
}

module.exports = PostsController;

// 저장소 계층 (Repository Layer): Repository 클래스에서 시퀄라이즈 매소드를 이용해 데이터 조회 및 생성.

const { Posts, PostLikes, Users } = require("../models"); // DB에 접근
const sequelize = require("sequelize");

class PostRepository {
  // 1. 게시글 목록조회 findAllPost
  findAllPost = async () => {
    const posts = await Posts.findAll({
      raw: true, // 모델 인스턴스가 아닌 데이터만 반환
      attributes: ["postId", "title", "createdAt", "updatedAt"],
      include: [{ model: Users, attributes: ["nickname"], as: ["nickname"] }],
      order: [["createdAt", "DESC"]],
    });
    return posts;
  };

  // 2. 게시글 상세조회 findPostById
  findPostById = async (postId) => {
    console.log("postId2", postId);

    const post = await Posts.findOne({
      raw: true,
      attributes: [
        "postId",
        "title",
        "content",
        "createdAt",
        "updatedAt",
        [sequelize.fn("COUNT", sequelize.col("PostLikes.postId")), "likes"],
      ],
      include: [
        { model: Users, as: ["nickname"], attributes: ["nickname"] },
        { model: PostLikes, as: ["Likes"], attributes: ["postId"] },
      ],
      where: { postId },
      // group: ["Posts.postId"],
      order: [["createdAt", "DESC"]],
    });

    // const post = await Posts.findByPk(postId) // Primary Key로 찾기
    // const likes = await PostLikes.count({where: {postId: Number(postId)}});
    // post.likes = likes
    return post;
  };

  // 3. 게시글 생성 createPost
  createPost = async (title, content, UserId) => {
    const createPostData = await Posts.create({ title, content, UserId });
    return createPostData;
  };

  // 4. 게시글 수정 updatePost
  updatePost = async (postId, title, content) => {
    const updatePostData = await Posts.update(
      { title, content },
      { where: { postId } }
    );
    return updatePostData;
  };

  // 5. 게시글 삭제 deletePost
  deletePost = async (postId) => {
    const deletePostData = await Posts.destroy({ where: { postId } });
    return deletePostData;
  };
}

module.exports = PostRepository;

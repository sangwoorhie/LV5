const { Posts, PostLikes } = require('../models') // DB에 접근
const { Op } = require("sequelize");

class PostLikeRepository {


// // 1.게시글 좋아요 조회 findPostById
// findPostById = async (postId) => {
//     const post = await PostLikes.findOne({where: {postId: postId}})
//     return post;
// }

//////////////////////
// 2. 게시글 좋아요 생성 createLike

 // 게시글 좋아요 이미 누른 유저 조회
 clickedUser = async (postId, UserId) => {
    const clickedUser = await PostLikes.findOne({ where: {[Op.and]: [{postId: Number(postId)}, {UserId: Number(UserId)}]}});
    console.log("clickedUser", clickedUser)
    return clickedUser;
}

// 게시글 좋아요 생성 createLike
createLike = async (postId, UserId) => {
    const createPostLike = await PostLikes.create({postId, UserId})
    console.log("createPostLike", createPostLike)
    return createPostLike;

}

 // 게시글 좋아요 숫자
 likeCount = async (postId) => {
    const likeCount = await PostLikes.count({where: {postId: Number(postId)}});
    console.log("likeCount", likeCount)
    return likeCount;
}
//////////////////////


// 3. 게시글 좋아요 취소 deleteLike
deleteLike = async(postId, userId) => {
    const deletePostLike = await PostLikes.destroy({where: { postId, userId }});
    return deletePostLike;
}

};

module.exports = PostLikeRepository
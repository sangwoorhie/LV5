const PostLikeService = require('../services/postlikes.service')

class PostLikesController {
    postLikeService = new PostLikeService();

// // 1. 게시글 좋아요 조회 getPostLikes
// getPostLikes = async (req, res, next) => {
//     const { postId } = req.params;
//     const postLikes = await this.postLikeService.findPostById(postId);
//     res.status(200).json({data: postLikes})
// };



// 2. 게시글 좋아요 생성 createPostLikes
createPostLikes = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const {status, message} = await this.postLikeService.createLike(postId, userId)
    res.status(status).json({message})
};




// 3. 게시글 좋아요 취소 deletePostLikes
deletePostLikes = async(req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const {status, message} = await this.postLikeService.deleteLike(postId, userId)
    res.status(status).json({message})
}

};


module.exports = PostLikesController;
const PostLikeRepository = require('../repositories/postlikes.repository');
const PostRepository = require('../repositories/posts.repository')

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
        const createLike = await this.postLikeRepository.createLike(postId, userId)
        if (!userId) {throw new Error('로그인 후 이용할 수 있는 기능입니다.')};
        if (!postId) {throw new Error('게시글이 존재하지 않습니다.')};
        // if (createLike.clickedUser) {throw new Error('이미 좋아요를 누른 게시글입니다.')};

        return {
            likedId: createLike.createPostLike.likedId,
            postId: createLike.createPostLike.postId,
            UserId: createLike.createPostLike.UserId,
            createdAt: createLike.createPostLike.createdAt,
            likeCount: createLike.likeCount.likeCount
        }};

    

    // 3. 게시글 좋아요 취소 deleteLike
    deleteLike = async (postId, userId) => {
        const findPost = await this.postRepository.findPostById(postId)
        if (!findPost) throw new Error("게시글이 존재하지 않습니다.");
        if(!userId) throw new Error("좋아요 취소 권한이 없습니다.")

        await this.postLikeRepository.deleteLike(postId, userId);

        return {
            likedId: findPost.likedId,
            postId: findPost.postId,
            UserId: findPost.UserId,
            createdAt: findPost.createdAt
        }};


}

module.exports = PostLikeService;

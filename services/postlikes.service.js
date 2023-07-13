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
    createLike = async (postId, UserId) => {
    
        const clickedUser = await this.postLikeRepository.clickedUser(postId, UserId)
        if (clickedUser) {throw new Error('이미 좋아요를 누른 게시글입니다.')};
        if (!postId) {throw new Error('게시글이 존재하지 않습니다.')};
        
        const createLike = await this.postLikeRepository.createLike(postId, UserId)
        if (!UserId) {throw new Error('로그인 후 이용할 수 있는 기능입니다.')};

        const likeCount = await this.postLikeRepository.likeCount(postId)

        return {
            likedId: createLike.likedId,
            postId: createLike.postId,
            UserId: createLike.UserId,
            createdAt: createLike.createdAt,
            likeCount: likeCount.likeCount
        }};

    

    // 3. 게시글 좋아요 취소 deleteLike
    deleteLike = async (postId, userId) => {
        const findPost = await this.postRepository.findPostById(postId)
        if (!findPost) {throw new Error ("게시글이 존재하지 않습니다.")}
        if (!userId) {throw new Error ("좋아요 취소 권한이 없습니다.")}

        const clickedUser = await this.postLikeRepository.clickedUser(postId, UserId)
        if(!clickedUser) {throw new Error ("본인이 누른 좋아요만 취소가 가능합니다.")}

        await this.postLikeRepository.deleteLike(postId, userId);

        return {
            likedId: findPost.likedId,
            postId: findPost.postId,
            UserId: findPost.UserId,
            createdAt: findPost.createdAt
        }};


}

module.exports = PostLikeService;

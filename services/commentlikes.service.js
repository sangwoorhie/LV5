const CommentLikeskRepository = require('../repositories/commentlikes.repository');
const PostRepository = require('../repositories/posts.repository');
const CommentRepository = require('../repositories/comments.repository');

class CommentLikeService {
    commentLikeRepository = new CommentLikeskRepository();
    commentRepository = new CommentRepository();
    postRepository = new PostRepository();
    
    

    // // 1. 댓글 좋아요 조회 findCommentById
    // findCommentsById = async (postId) => {
    //     const findPost = await this.postRepository.findPostById(postId)
    //     const findComments = await this.commentRepository.findCommentsById(findPost.postId) // s붙음 댓글의 배열

    //     return findComments; 
    //     }; 



    // 2. 댓글 좋아요 생성 createLike
    createLike = async (postId, commentId, userId) => {
        if (!postId) {return {status:404, message: "게시글이 조회되지 않습니다."}}
        else if (!commentId) {return {status:404, message: "댓글이 조회되지 않습니다."}}
        else if (!userId) {return {status:403, message: "로그인 후 사용할 수 있는 기능입니다."}}

        const findPost = await this.postRepository.findPostById(postId)
        if(!findPost) {return {status:404, message: "게시글이 존재하지 않습니다."}}

        const findComment = await this.commentRepository.findCommentById(commentId)
        if(!findComment){return {status:404, message: "댓글이 존재하지 않습니다."}}

        const clickedUser = await this.commentLikeRepository.clickedUser(commentId, userId);
        if(clickedUser) {return {status:404, message: "이미 좋아요를 누른 댓글입니다."}}

        await this.commentLikeRepository.createLike(postId, commentId, userId)
        const likeCount = await this.commentLikeRepository.likeCount(commentId); // 좋아요 수
        // const createLike = await this.commentRepository.findCommentById(commentId)
        
        return {
            status: 200,
            message: "댓글 좋아요를 눌렀습니다."
        }}; 




    // 3. 댓글 좋아요 취소 createLike
    deleteLike = async (postId, commentId, userId) => {
        if (!postId) {return {status:404, message: "게시글이 조회되지 않습니다."}}
        else if (!commentId) {return {status:404, message: "댓글이 조회되지 않습니다."}}
        else if (!userId) {return {status:403, message: "로그인 후 사용할 수 있는 기능입니다."}}


        const findPost = await this.postRepository.findPostById(postId)
        if(!findPost) {return {status:404, message: "게시글이 존재하지 않습니다."}}

        const findComment = await this.commentRepository.findCommentById(commentId)
        if(!findComment){return {status:404, message: "댓글이 존재하지 않습니다."}}

        const clickedUser = await this.commentLikeRepository.clickedUser(commentId, userId);
        if(!clickedUser) {return {status:404, message: "본인이 누른 좋아요만 취소가 가능합니다."}}

        await this.commentLikeRepository.deleteLike(postId, commentId, userId)
        // const deleteLike = await this.commentRepository.findCommentById(commentId)
       
        
        return {
            status: 200,
            message: "댓글 좋아요를 취소했습니다."
        }}; 


}


module.exports = CommentLikeService;



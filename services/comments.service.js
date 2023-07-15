const CommentRepository = require('../repositories/comments.repository');
const PostRepository = require('../repositories/posts.repository');

class CommentService {
    commentRepository = new CommentRepository();
    postRepository = new PostRepository();


    
    // 1. 댓글 조회 findPostById
    findCommentsById = async (postId) => {
    try{
        const findPost = await this.postRepository.findPostById(postId)
        if(!findPost) {return {status:404, message: "게시글이 존재하지 않습니다.", comment: null}}
        
        const findComments = await this.commentRepository.findCommentsById(findPost.postId) // s붙음 댓글의 배열
        if(!findComments) {return {status:404, message: "댓글이 존재하지 않습니다.", comment: null}}
        
        return {
            status:200,
            message: "댓글이 조회되었습니다.",
            comment: findComments // 객체가들어있는 배열이 반환된다.
            }; 
    }catch(error){
        console.log(error);
        return {status:400, message: "요청이 정상적으로 이루어지지 않았습니다.", comment: null}
    }    
    };   
  


    // 2. 댓글 생성 createComment
    createComment = async (postId, userId, comment) => {
    try{
        if(!postId) {return {status:404, message: "게시글이 조회되지 않습니다."}}
        else if (!userId) {return {status:403, message: "로그인 후 이용해주세요."}}
        else if (!comment) {return {status:412, message: "댓글을 입력해주세요."}};


        const findPost = await this.postRepository.findPostById(postId)
        if (!findPost) {return {status:404, message: "게시글이 존재하지 않습니다."}};

        await this.commentRepository.createComment(postId, userId, comment)
     
        return {
            status: 200,
            message: "댓글이 등록되었습니다."
        }
    }catch(error){
        console.log(error);
        return {status:400, message: "요청이 정상적으로 이루어지지 않았습니다.", comment: null}
    }};



    // 3. 댓글 수정 updateComment
    updateComment = async (userId, postId, commentId, comment) => {
    try{   
        if(!postId) {return {status:404, message: "게시글이 조회되지 않습니다."}}
        else if (!userId) {return {status:403, message: "로그인 후 이용해주세요."}}
        else if (!commentId) {return {status:404, message: "댓글이 조회되지 않습니다."}}
        else if (!comment) {return {status:412, message: "수정 댓글을 입력해주세요."}};

        const findPost = await this.postRepository.findPostById(postId)
        if (!findPost) {return {status:404, message: "게시글이 존재하지 않습니다."}}
  
        const findComment = await this.commentRepository.findCommentById(commentId)
        if (!findComment) {return {status:403, message: "댓글이 존재하지 않습니다."}}
        

        await this.commentRepository.updateComment(postId, commentId, comment)
        // const updateComment = await this.commentRepository.findCommentById(commentId)
        return {
            status: 200,
            message: "댓글이 수정되었습니다."
        }
    }catch(error){
        console.log(error);
        return {status:400, message: "요청이 정상적으로 이루어지지 않았습니다.", comment: null}
    }};
    



    // 4. 댓글 삭제 deleteComment
    deleteComment = async (userId, commentId, postId) => {
    try{ 
        if(!postId) {return {status:404, message: "게시글이 조회되지 않습니다."}}
        else if (!userId) {return {status:403, message: "로그인 후 이용해주세요."}}
        else if (!commentId) {return {status:404, message: "댓글이 조회되지 않습니다."}}
        
        const findPost = await this.postRepository.findPostById(postId)
        if (!findPost) {return {status:404, message: "게시글이 존재하지 않습니다."}}
  
        const findComment = await this.commentRepository.findCommentById(commentId)
        if (!findComment) {return {status:403, message: "댓글이 존재하지 않습니다."}}
        

        await this.commentRepository.deleteComment(postId, commentId)
        // const deleteComment = await this.commentRepository.findCommentById(postId, commentId)
        return {
            status: 200,
            message: "댓글이 삭제되었습니다."
        }
    }catch(error){
        console.log(error);
        return {status:400, message: "요청이 정상적으로 이루어지지 않았습니다.", comment: null}
    }};

}


module.exports = CommentService;
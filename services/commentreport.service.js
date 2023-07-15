const CommentReportRepository = require('../repositories/commentreport.repositories'); // 댓글신고 레파지토리
const PostRepository = require('../repositories/posts.repository'); // 게시글 레파지토리
const CommentRepository = require('../repositories/comments.repository');


class CommentReportService {
    commentReportRepository = new CommentReportRepository();
    commentRepository = new CommentRepository();
    postRepository = new PostRepository();


    // 1. 댓글 신고
    createReport = async (postId, commentId, userId, content) => {
        if (!postId) {return {status:404, message: "게시글이 조회되지 않습니다."}}
        else if (!commentId) {return {status:404, message: "댓글이 조회되지 않습니다."}}
        else if (!content) {return {status:412, message: "정당한 신고 사유를 작성해주세요."}}
        else if (!userId) {return {status:403, message: "로그인 후 사용할 수 있는 기능입니다."}}

        const findPost = await this.postRepository.findPostById(postId);
        if(!findPost) {return {status:404, message: "게시글이 존재하지 않습니다."}}

        const findComment = await this.commentRepository.findCommentById(commentId)
        if (!findComment) {return {status:404, message: "댓글이 존재하지 않습니다."}}

        const clickedUser = await this.commentReportRepository.clickedUser(commentId, userId)
        if(clickedUser){return {status:403, message: "이미 신고한 댓글입니다."}}

        const createReport = await this.commentReportRepository.createReport(postId, commentId, userId, content)
        // const createReport = await this.commentRepository.findCommentById(commentId);
        return {
            status: 200,
            message: "댓글이 신고되었습니다."
        }};


    // 2. 댓글 신고 취소
    deleteReport = async (postId, commentId, userId) => {
        if (!postId) {return {status:404, message: "게시글이 조회되지 않습니다."}}
        else if (!commentId) {return {status:404, message: "댓글이 조회되지 않습니다."}}
        else if (!userId) {return {status:403, message: "로그인 후 사용할 수 있는 기능입니다."}}

        const findPost = await this.postRepository.findPostById(postId);
        if(!findPost) {return {status:404, message: "게시글이 존재하지 않습니다."}}

        const findComment = await this.commentRepository.findCommentById(commentId)
        if (!findComment) {return {status:404, message: "댓글이 존재하지 않습니다."}}
        
        const clickedUser = await this.commentReportRepository.clickedUser(commentId, userId)
        if(!clickedUser) {return {status:403, message: "본인이 신고한 댓글만 취소가 가능합니다."}}


        await this.commentReportRepository.deleteReport(postId, commentId, userId)
        // const deleteReport = await this.commentRepository.findCommentById(commentId);

        return {
            status: 200,
            message: "댓글 신고를 취소했습니다."
        }};

}

module.exports = CommentReportService;


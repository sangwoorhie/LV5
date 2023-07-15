const PostReportService = require('../services/postreport.service')

class PostReportController {
    postReportService = new PostReportService();


    // 1. 게시글 신고
    createReport = async (req, res, next) => {
        const { postId } = req.params;
        const { content } = req.body;
        const { userId } = res.locals.user;
        const {status, message} = await this.postReportService.createReport(postId, content, userId);
        res.status(status).json({message})
    };


    // 2. 게시글 신고 취소
    deleteReport = async (req, res, next) => {
        const { postId } = req.params;
        const { userId } = res.locals.user;
        const {status, message} = await this.postReportService.deleteReport(postId, userId);
        res.status(status).json({message})
    }




}

module.exports = PostReportController;
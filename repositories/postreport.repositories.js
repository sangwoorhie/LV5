const { PostReport } = require('../models')

class PostReportRepository {


    
// 1. 게시글 신고 생성
createReport = async (postId, content, userId) => {
    const createReport = await PostReport.create({PostId:postId, content, reportUserId:userId});
    return createReport;
}



// 2. 게시글 신고 취소
deleteReport = async (postId, userId) => {
    const deleteReport = await PostReport.destroy({ where: { PostId: postId, reportUserId: userId }});
    return deleteReport;
}


}

module.exports = PostReportRepository
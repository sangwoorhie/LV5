const { PostReport } = require('../models')
const { Op } = require("sequelize");

class PostReportRepository {


    
// 1. 게시글 신고 생성
createReport = async (postId, content, userId) => {
    const createReport = await PostReport.create({PostId:postId, content, reportUserId:userId});
    return createReport;
}

// 게시글 신고 이미 누른 유저
clickedUser = async (postId, userId) => {
    const clickedUser = await PostReport.findOne({ where: {[Op.and]: [{PostId: Number(postId)}, {reportUserId: Number(userId)}]}});
    return clickedUser;
}


// 2. 게시글 신고 취소
deleteReport = async (postId, userId) => {
    const deleteReport = await PostReport.destroy({ where: { PostId: postId, reportUserId: userId }});
    return deleteReport;
}


}

module.exports = PostReportRepository
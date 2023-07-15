const express = require('express');
const router = express.Router();
const Authmiddleware = require("../middlewares/auth-middleware.js") 
const cookieParser = require("cookie-parser");

router.use(cookieParser());
const CommentReportController = require('../controllers/commentreport.controllers.js');
const commentReportController = new CommentReportController();


router.post('/:postId/comments/:commentId/report', Authmiddleware, commentReportController.createReport) // 댓글 신고 생성
router.delete('/:postId/comments/:commentId/report', Authmiddleware, commentReportController.deleteReport) // 댓글 신고 취소


module.exports = router;


const express = require("express");
const cookieParser = require("cookie-parser");
const Authmiddleware = require("../middlewares/auth-middleware.js"); //사용자인증 미들웨어

const router = express.Router();
router.use(cookieParser());

const PostReportController = require("../controllers/postreport.controllers.js");
const postReportController = new PostReportController();

router.post(
  "/:postId/report",
  Authmiddleware,
  postReportController.createReport
); // 게시글 신고 생성
router.delete(
  "/:postId/report",
  Authmiddleware,
  postReportController.deleteReport
); // 게시글 신고 취소

module.exports = router;

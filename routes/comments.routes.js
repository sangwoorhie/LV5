const express = require('express');
const cookieParser = require("cookie-parser");
const Authmiddleware = require("../middlewares/auth-middleware.js") //사용자인증 미들웨어 

const router = express.Router();
router.use(cookieParser());
// 위에서 대문자C로 컨트롤러 경로를 설정하고, 아래에서 소문자c로 함수실행.
const CommentsController = require('../controllers/comments.controller.js')
const commentsController = new CommentsController();


// 소문자 c로 연결하고, 그 뒤 점찍고는 내 임의대로 씀. 그 임의대로 쓴 것은 연결된 controller 파일에서 함수식 만들때 사용됨.
// localhost:3000/api/posts/:postId/comments
router.get('/:postId/comments', commentsController.getCommentById); // 댓글 조회
router.post('/:postId/comments', Authmiddleware, commentsController.createComment); // 댓글 생성
router.put('/:postId/comments/:commentId', Authmiddleware, commentsController.updateComment); // 댓글 수정
router.delete('/:postId/comments/:commentId', Authmiddleware, commentsController.deleteComment); // 댓글 삭제

// posts/:postId/comments

module.exports = router;

const express = require('express');
const router = express.Router();
const Authmiddleware = require("../middlewares/auth-middleware.js") 
const cookieParser = require("cookie-parser");

router.use(cookieParser());
const CommentReportController = require('../controllers/commentreport.controllers.js');
const commentReportController = new CommentReportController();


router.post('/:postId/comments/:commentId/report', Authmiddleware, commentReportController.createReport)
router.delete('/:postId/comments/:commentId/report', Authmiddleware, commentReportController.deleteReport)


module.exports = router;


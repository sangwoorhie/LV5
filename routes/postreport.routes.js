const express = require('express');
const cookieParser = require("cookie-parser");
const Authmiddleware = require("../middlewares/auth-middleware.js") //사용자인증 미들웨어 

const router = express.Router();
router.use(cookieParser());

const PostReportController = require('../controllers/postreport.controllers.js')
const postReportController = new PostReportController();


router.post('/:postId/report', Authmiddleware, postReportController.createReport)
router.delete('/:postId/report', Authmiddleware, postReportController.deleteReport)


module.exports = router;
# LV5 API  : localhost:3000/api/

![image](https://github.com/sangwoorhie/LV5/assets/131964697/b93c14e8-3ace-4174-87f0-1250f96c0712)

1. Users (회원가입, 로그인, 로그아웃, 회원정보조회, 회원정보수정, 회원탈퇴)

(1). 회원가입 (POST) => /users/signup

(2). 로그인 (POST) => /users/login 

(3). 로그아웃(POST) => /users/logout

(4). 회원조회 (GET) => /users/:userId

(5). 회원정보수정 (PATCH) => /users/:userId

(6). 회원탈퇴 (DELETE) => /users/:userId




2. Posts (게시글 전체조회, 게시글 상세조회, 게시글 생성, 게시글 수정, 게시글 삭제)

(1). 게시글 전체조회 (GET) => /posts

(2). 게시글 상세조회 (GET) => /posts/:postId

(3). 게시글 생성 (POST) => /posts

(4). 게시글 수정 (PUT) => /posts/:postId

(5). 게시글 삭제 (DELETE) => /posts/:postId




3. PostLike (게시글 좋아요 생성, 게시글 좋아요 취소)

(1). 게시글 좋아요 생성 (POST) => /posts/:postId/like

(2). 게시글 좋아요 취소 (DELETE) => /posts/:postId/like




4. PostReport (게시글 신고 생성, 게시글 신고 취소)

(1). 게시글 신고 생성 (POST) => /posts/:postId/report

(2). 게시글 신고 취소 (DELETE) => /posts/:postId/report
 



5. Comments (댓글 조회, 댓글 생성, 댓글 수정, 댓글 삭제)

(1). 댓글 상세조회 (GET) => /posts/:postId/comments

(2). 댓글 생성 (POST) => /posts/:postId/comments

(3). 댓글 수정 (PUT) => /posts/:postId/comments/:commentId

(4). 댓글 삭제 (DELETE) => /posts/:postId/comments/:commentId




6. CommentLike (댓글 좋아요 생성, 댓글 좋아요 취소)

(1). 댓글 좋아요 생성 (POST) => /posts/:postId/comments/:commentId/like 

(2). 댓글 좋아요 취소 (DELETE) => /posts/:postId/comments/:commentId/like 




7. CommentReport (댓글 신고 생성, 댓글 신고 취소)

(1). 댓글 신고 생성 (POST) => /posts/:postId/comments/:commentId/report

(2). 댓글 신고 취소 (DELETE) => /posts/:postId/comments/:commentId/report



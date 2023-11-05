const UserService = require("../services/users.service");
const UsersRepository = require("../repositories/users.repository");
const JsonWebToken = require("jsonwebtoken");
const secretKey = "customized-secret-key";

class UsersController {
  userService = new UserService();
  userRepository = new UsersRepository();

  // 1. 회원가입 signupUser
  signupUser = async (req, res, next) => {
    const {
      email,
      password,
      confirmPassword,
      nickname,
      age,
      gender,
      profileImage,
    } = req.body;
    const { status, message, userInfo } = await this.userService.signupUser(
      email,
      password,
      confirmPassword,
      nickname,
      age,
      gender,
      profileImage
    );
    res.status(status).json({ userInfo: userInfo, message: message });
  };

  // 2. 로그인 loginUser
  loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const { status, message, Token } = await this.userService.loginUser(
      email,
      password
    );

    res.cookie("Authorization", `Bearer ${Token}`);
    res.status(status).json({ message });
  };

  // 3. 로그아웃
  logoutUser = async (req, res, next) => {
    try {
      res.clearCookie("Authorization");
      return res.status(200).json({ message: "로그아웃 되었습니다." });
    } catch {
      return res.status(400).json({ message: "로그아웃에 실패하였습니다." });
    }
  };

  // 3. 회원조회 getUser
  getUser = async (req, res, next) => {
    const { userId } = req.params;
    const { status, message, userInfo } = await this.userService.findUserById(
      userId
    );
    res.status(status).json({ message, userInfo });
  };

  // 4. 회원정보 수정 updateUser
  updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const {
      nickname,
      originalPassword,
      newPassword,
      confirmPassword,
      age,
      gender,
      profileImage,
    } = req.body;
    const { status, message, userInfo } = await this.userService.updateUser(
      userId,
      nickname,
      originalPassword,
      newPassword,
      confirmPassword,
      age,
      gender,
      profileImage
    );
    res.status(status).json({ message, userInfo });
  };

  // 5. 회원탈퇴 deleteUser
  deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    const { email, password } = req.body;
    const { status, message } = await this.userService.deleteUser(
      userId,
      email,
      password
    );
    res.status(status).json({ message: message });
  };
}

module.exports = UsersController;

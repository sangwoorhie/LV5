const { Users } = require("../models"); // DB에 접근

class UsersRepository {
  // 1. 회원가입 signupUser
  signupUser = async (email, password, nickname, age, gender, profileImage) => {
    const CreateUserAccount = await Users.create({
      email,
      password,
      nickname,
      age,
      gender: gender.toUpperCase(), //성별 대문자로
      profileImage,
    });
    return CreateUserAccount;
  };

  // 2. 로그인 findByEmail
  findByEmail = async (email) => {
    const user = await Users.findOne({ where: { email } });
    return user;
  };

  // 3. 회원 조회 findUserById
  findUserById = async (userId) => {
    const user = await Users.findByPk(userId); // Primary Key로 찾기
    return user;
  };

  // 4. 회원정보 수정
  updateUser = async (
    userId,
    nickname,
    newPassword,
    age,
    gender,
    profileImage
  ) => {
    const UpdateUserData = await Users.update(
      { nickname, newPassword, age, gender, profileImage },
      { where: { userId } }
    );
    return UpdateUserData;
  };

  // 5. 회원 탈퇴
  deleteUser = async (userId, email, password) => {
    const DeleteUserData = await Users.destroy({
      where: { userId, email, password },
    });
    return DeleteUserData;
  };

  // 6. 토큰 저장
  saveToken = async (RefreshToken, email) => {
    const UpdatedToken = await Users.update(
      { token: RefreshToken },
      { where: { email } }
    );
    return UpdatedToken;
  };
}

module.exports = UsersRepository;

// 컨트롤러 = 로직x
// 서비스 =
// 유효성검사 2가지로 나뉨
// 디비에 있는지 확인 => 레파지토리에서 이뤄져야함

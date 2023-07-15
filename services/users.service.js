const UsersRepository = require('../repositories/users.repository');
const bcrypt = require("bcrypt");
const JsonWebToken = require("jsonwebtoken");
const secretKey = "customized-secret-key";


    // 레파지토리에 데이터를 요청.
    class UserService {
        userRepository = new UsersRepository();


    // 1. 회원가입 signupUser
    signupUser = async (email, password, confirmPassword, nickname, age, gender, profileImage) => {
try{
    if(!email) {return {status:412, message: "이메일을 입력해주세요.", userInfo: null}}
    else if(!password) {return {status:412, message: "비밀번호를 입력해주세요.", userInfo: null}}
    else if(!confirmPassword) {return {status:412, message: "확인 비밀번호를 입력해주세요.", userInfo: null}}
    else if(!nickname) {return {status:412, message: "닉네임을 입력해주세요.", userInfo: null}}
    else if(password.includes(nickname)) {return {status:412, message: "비밀번호에 닉네임을 포함해서는 안 됩니다.", userInfo: null}}
    else if(password !== confirmPassword) {return {status:412, message: "비밀번호와 확인 비밀번호가 일치하지 않습니다.", userInfo: null}}
    else if(!age) {return {status:412, message: "나이를 입력해주세요.", userInfo: null}}
    else if(!gender) {return {status:412, message: "성별을 입력해주세요.", userInfo: null}}
    else if(!profileImage) {return {status:412, message: "프로필 이미지를 등록해주세요.", userInfo: null}}


    const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 정규식
    const passwordCheck = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;  // 비밀번호 정규식 (최소 4자 이상의 영문 대소문자 및 숫자)
   
    if (!passwordCheck.test(password)) {return {status:412, message: "비밀번호는 최소 4자 이상의 영문 대소문자 및 숫자로 이루어져야 합니다.", userInfo: null}}
    else if (!emailCheck.test(email)) {return {status:412, message: "이메일 형식이 올바르지 않습니다.", userInfo: null}}

    
    const ExistUser = await this.userRepository.findByEmail(email)
    if (ExistUser) {return {status:409, message: "이미 존재하는 회원입니다.", userInfo: null}}
    if (ExistUser && ExistUser.email === email){return {status:409, message: "이미 존재하는 이메일입니다.", userInfo: null}}
    if (ExistUser && ExistUser.nickname === nickname){return {status:409, message: "이미 존재하는 닉네임입니다.", userInfo: null}}

    const createUserData = await this.userRepository.signupUser(email, password, nickname, age, gender, profileImage);
    // if(!ExistUser)
    return {
        status: 200,
        message: "회원가입이 완료되었습니다.",
        userInfo:{
            userId: createUserData.userId,
            email: createUserData.email,
            password: createUserData.password,
            nickname: createUserData.nickname,
            age: createUserData.age,
            gender: createUserData.gender,
            profileImage: createUserData.profileImage,
            createdAt:createUserData.createdAt,
            updatedAt:createUserData.updatedAt
            }}          
}catch(error){
    console.log(error);
    return {status:412, message: "요청이 정상적으로 이루어지지 않았습니다.", userInfo: null}}
    }
    
            


        // 2. 로그인 loginUser
    loginUser = async(email, password) => {
try{ 
    if (!email) {return {status:412, message: "이메일을 입력해주세요.", Token: null}}
    else if (!password) {return {status:412, message: "비밀번호를 입력해주세요.", Token: null}}
    

    const loginData = await this.userRepository.findByEmail(email)  
    if (!loginData) {return {status:404, message: "회원정보가 존재하지 않습니다.", Token: null}}
    else if (loginData && loginData.email !== email) {return {status:409, message: "이메일이 일치하지 않습니다.", Token: null}}
    else if (loginData && loginData.password !== password) {return {status:409, message: "비밀번호가 일치하지 않습니다.", Token: null}}
        
    const user = {
        email: loginData.email,
        password: loginData.password,
        userId: loginData.userId
        }

    // 쿠키발급
    const Token = await JsonWebToken.sign({ userId: user.userId }, secretKey);
    
    return {
        status: 200,
        message: "로그인이 완료되었습니다.",
        Token: Token    
        }

}catch(error){
        console.log(error);
        return {status:400, message: "요청이 정상적으로 이루어지지 않았습니다.", Token: null}}
    }



    // 3. 회원 조회 findUserById
    findUserById = async(userId) => {
try{
    const findUser = await this.userRepository.findUserById(userId) // 레파지토리에서 userId정보를 찾음
    if(!findUser) {return {status:404, message: "회원정보가 존재하지 않습니다.", userInfo: null}};
            
    return {
        status:200,
        message:"회원정보가 조회되었습니다.",
        userInfo:{
            userId:findUser.userId,
            email:findUser.email,
            nickname:findUser.nickname,
            age:findUser.age,
            gender:findUser.gender,
            profileImage:findUser.profileImage,
            createdAt:findUser.createdAt,
            updatedAt:findUser.updatedAt
        }}
    }catch(error){
        console.log(error);
        return {status:400, message:"요청이 정상적으로 이루어지지 않았습니다.", userInfo: null};
    }
    };
    
    

    // 4. 회원정보 수정 updateUser
    updateUser = async(userId, nickname, originalPassword, newPassword, confirmPassword, age, gender, profileImage) => {
    try{    
        if(!userId) {return {status:404, message: "회원정보가 존재하지 않습니다.", userInfo: null}}
        else if(!nickname) {return {status:412, message: "닉네임을 입력해주세요.", userInfo: null}}
        else if(!originalPassword) {return {status:412, message: "기존 비밀번호를 입력해주세요.", userInfo: null}}
        else if(!newPassword) {return {status:412, message: "새로운 비밀번호를 입력해주세요.", userInfo: null}}
        else if(!confirmPassword) {return {status:412, message: "확인 비밀번호를 입력해주세요.", userInfo: null}}
        else if(newPassword !== confirmPassword) {return {status:412, message: "비밀번호와 확인 비밀번호가 일치하지 않습니다.", userInfo: null}}
        else if(newPassword.includes(nickname)) {return {status:412, message: "비밀번호에 닉네임을 포함해서는 안 됩니다.", userInfo: null}}
        else if(!age) {return {status:412, message: "나이를 입력해주세요.", userInfo: null}}
        else if(!gender) {return {status:412, message: "성별을 입력해주세요.", userInfo: null}}
        else if(!profileImage) {return {status:412, message: "프로필이미지를 업로드해주세요.", userInfo: null}};
        
        
        const findUser = await this.userRepository.findUserById(userId)
        if (!findUser) {return {status:404, message: "회원정보가 존재하지 않습니다.", userInfo: null}};


        // 비밀번호 정규식 (최소 4자 이상의 영문 대소문자 및 숫자)
        const passwordCheck = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/; 
        if (!passwordCheck.test(newPassword)) {return {status:404, message: "비밀번호는 최소 4자 이상의 영문 대소문자 및 숫자로 이루어져야 합니다.", userInfo: null}};
        
        await this.userRepository.updateUser(userId, nickname, newPassword, age, gender, profileImage)
        const updateUser = await this.userRepository.findUserById(userId);
        
        return {
            status: 200,
            message: "회원정보가 수정되었습니다.",
            userInfo: {
            userId: updateUser.userId,
            email: updateUser.email,
            nickname: updateUser.nickname,
            age: updateUser.age,
            profileImage: updateUser.profileImage,
            createdAt: updateUser.createdAt,
            updatedAt: updateUser.updatedAt
            }}
    }catch(error){
        console.log(error);
        return {status:400, message:"요청이 정상적으로 이루어지지 않았습니다.", userInfo: null};
    }};
    


    
    // 5. 회원 탈퇴 deleteUser
    deleteUser = async(userId, email, password) => {
    try{
        if(!email) {return {status:412, message: "이메일을 입력해주세요"}}
        else if(!password) {return {status:412, message: "비밀번호를 입력해주세요"}}

        
        const findUser = await this.userRepository.findUserById(userId);
        if(!findUser)  {return {status:404, message: "회원정보가 존재하지 않습니다."}}
        else if(email !== findUser.email) {return {status:403, message: "이메일이 일치하지 않습니다."}}
        else if(password !== findUser.password) {return {status:403, message: "비밀번호가 일치하지 않습니다."}}
        
            
        await this.userRepository.deleteUser(userId, email, password);
        return {status:200, message: "회원탈퇴가 완료되었습니다."}
    }catch(error){
        console.log(error);
        return {status:400, message:"요청이 정상적으로 이루어지지 않았습니다."};
    }
}
}
/////




module.exports = UserService;
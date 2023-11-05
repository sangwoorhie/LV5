"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env]; // __dirname는 최상위 디렉토리 이름
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname) // 최상위 디렉토리를 읽어서
  .filter((file) => {
    // 파일명에 필터를 걸고
    return (
      file.indexOf(".") !== 0 && // .(점)이 0번째배열, 즉 맨 첫번째에 오지 않고,
      file !== basename && // 파일이 basement가 아니고, 즉 최상위 디렉토리에 위치하고있지 않고
      file.slice(-3) === ".js" && // (인자가 음수인경우 시작점을 뒤에서부터 카운팅) 즉 파일명 뒤에서 3글자가 .js이고,
      file.indexOf(".test.js") === -1 // 파일명에서 .test.js이 존재하지 않을 경우
    );
  })

  .forEach((file) => {
    // 시퀄라이즈 데이터타입과 맞는 파일들을 db에 model.name에 model로 넣는다
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  // 이 가져온 model명은 관계를 맺어주는데 사용한다
  if (db[modelName].associate) {
    // model파일들에서 static으로 선언된 함수에서 관계 맺을때 associate 사용함
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; // db.js에서 시퀄라이즈 실행

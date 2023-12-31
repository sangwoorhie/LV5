"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 1. Users모델 - Posts모델 1:N 관계
      this.hasMany(models.Posts, {
        // 2. Posts 모델에게 1:N 관계 설정을 합니다.
        sourceKey: "userId", // 3. Users 모델의 userId 컬럼을
        foreignKey: "UserId", // 4. Posts 모델의 UserId 컬럼과 연결합니다.
      });

      // 1. Users모델 - Comments모델 1:N 관계
      this.hasMany(models.Comments, {
        // 2. Comments 모델에게 1:N 관계 설정을 합니다.
        sourceKey: "userId", // 3. Users 모델의 userId 컬럼을
        foreignKey: "UserId", // 4. Comments 모델의 UserId 컬럼과 연결합니다.
      });

      // 1. Users모델 - Comments모델 1:N 관계
      this.hasMany(models.PostLikes, {
        sourceKey: "userId",
        foreignKey: "UserId",
      });

      // 1. Users모델 - Comments모델 1:N 관계
      this.hasMany(models.CommentLikes, {
        sourceKey: "userId",
        foreignKey: "UserId",
      });
    }
  }

  Users.init(
    {
      userId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      nickname: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
        unique: true,
      },
      age: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      gender: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      profileImage: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      token: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};

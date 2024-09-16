
import { DataTypes } from 'sequelize';
import { mysql } from '../services/mySqlDb.js';

const UserLoginInfo = mysql.define('UserLoginInfo', {
  UserId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically increments
    allowNull: true
  },
  LoginUserID: {
    type: DataTypes.STRING,
    primaryKey: true, // Acts as a composite primary key with UserId
    allowNull: true
  },
  UserRegisterID: {
    type: DataTypes.STRING,
    allowNull: false // Required field
  },
  UserToken: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export { UserLoginInfo };

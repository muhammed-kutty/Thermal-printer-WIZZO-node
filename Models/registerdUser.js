import { DataTypes } from 'sequelize'; // Use DataTypes for proper type handling
import { mysql } from '../services/mySqlDb.js';

// Define the model
const RegisteredUser = mysql.define('RegisteredUser', {
    UserId: {
        type: DataTypes.INTEGER,  
        primaryKey: true,
        allowNull: false,
        autoIncrement: true 
    },
    UserRegisterID: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    EmailId: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    MobilePhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export { RegisteredUser }; // Correct the export name

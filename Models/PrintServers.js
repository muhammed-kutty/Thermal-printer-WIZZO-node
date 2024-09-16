import { DataTypes } from 'sequelize';
import { mysql } from '../services/mySqlDb.js'; 

// Define the model
const PrintServer = mysql.define('PrintServer', {
    id: { 
        type: DataTypes.INTEGER,  
        primaryKey: true,
        allowNull: false,
        autoIncrement: true 
    },
    ClentID: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    ServerID: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
});

export { PrintServer }; // Export the model

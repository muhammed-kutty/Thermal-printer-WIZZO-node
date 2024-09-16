import { DataTypes } from 'sequelize';
import { mysql } from '../services/mySqlDb.js'; 

// Define the model
const ThermalPrinter = mysql.define('ThermalPrinter', {
    id: { 
        type: DataTypes.INTEGER,  
        primaryKey: true,
        allowNull: false,
        autoIncrement: true 
    },
    companyname: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    Itemname: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    Price: { 
        type: DataTypes.STRING, 
        allowNull: true 
    } 
});

export { ThermalPrinter }; // Export the model

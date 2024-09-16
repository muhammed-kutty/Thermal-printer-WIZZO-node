import sequalize from 'sequelize'

const mysql = new sequalize('printer_backend' , 'root' , '',{
    host: 'localhost',
    dialect: 'mysql',
})


mysql.sync({ force: false })
.then(() => {
    console.log('Database synchronized');
})
.catch((error) => {
    console.error('Failed to synchronize database:', error); 
});

export {mysql}
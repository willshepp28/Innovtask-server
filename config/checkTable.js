const { sequelize } = require('../models'); // Path to your sequelize initialization

async function tableExists(tableName) {
    const result = await sequelize.queryInterface.showAllTables();
    return result.includes(tableName);
}

tableExists('Users').then(exists => {
    if (exists) {
        console.log('Users table exists.');
    } else {
        console.log('Users table does not exist.');
    }
});

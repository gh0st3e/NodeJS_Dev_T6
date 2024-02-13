const Sequelize = require('sequelize');

const globalOptions = {
    define: {
        timestamps: false, // отключение использования полей createdAt и updatedAt
        underscored: true, // использование знака подчеркивания вместо camelCase для имен столбцов
    }
};

const sequelize = new Sequelize('LDI', 'postgres', '****', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    ...globalOptions
});

sequelize.sync()
    .then(() => console.log('Tables created successfully'))
    .catch((error) => console.log('Error while creating tables: ', error));

exports.sequelize = sequelize

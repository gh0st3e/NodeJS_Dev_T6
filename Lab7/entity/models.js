const { Model, DataTypes } = require('sequelize');
const conn = require('../connect');

const Turtles = conn.sequelize.define("turtles", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT
    },
    color: {
        type: DataTypes.TEXT
    },
    weapon_id: {
        type: DataTypes.INTEGER
    },
    favorite_pizza_id: {
        type: DataTypes.INTEGER
    },
    second_favorite_pizza_id: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.TEXT
    }
})

const Pizzas = conn.sequelize.define("pizzas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.INTEGER,
    },
    calories: {
        type: DataTypes.DOUBLE
    }
})

const Weapons = conn.sequelize.define("weapons", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT
    },
    dps: {
        type: DataTypes.INTEGER
    }
})

Turtles.belongsTo(Pizzas, { as: "favorite_pizza", foreignKey: "favorite_pizza_id" });
Turtles.belongsTo(Pizzas, { as: "second_favorite_pizza", foreignKey: "second_favorite_pizza_id" });
Turtles.belongsTo(Weapons, { as: "weapon", foreignKey: "weapon_id" });


exports.Turtles = Turtles
exports.Pizzas = Pizzas
exports.Weapons = Weapons

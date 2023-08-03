const model = require("../entity/models")
const { Op } = require('sequelize');
const { sequelize } = require('../connect')

async function GetTurtles() {
    const Turtles = model.Turtles.findAll();
    return Turtles
}

async function GetTurtleById(id) {
    const Turtle = model.Turtles.findAll({
        where: {
            id: id
        }
    })
    return Turtle
}

async function GetTurtlesByPizza(pizzaId) {
    const Turtle = model.Turtles.findAll({
        where: {
            favorite_pizza_id: pizzaId
        }
    })
    return Turtle
}

async function InsertTurtle(turtle) {
    return model.Turtles.create(turtle)
}

async function UpdateTurtle(turtle) {
    return model.Turtles.update(
        {
            name: turtle.name,
            color: turtle.color,
            weapon_id: turtle.weapon_id,
            favorite_pizza_id: turtle.favorite_pizza_id,
            second_favorite_pizza_id: turtle.second_favorite_pizza_id,
            image: turtle.image
        },
        { where: { id: turtle.id } }
    )
}

async function UpdateTurtleImage(id, str) {
    return model.Turtles.update(
        {
            image: str
        },
        { where: { id: id } }
    )
}

async function UpdateFirstPizza(turtle) {
    return model.Turtles.update(
        {
            favorite_pizza_id: turtle.favorite_pizza_id
        },
        { where: { id: turtle.id } }
    )
}

async function UpdateSecondPizza(turtle) {
    return model.Turtles.update(
        {
            second_favorite_pizza_id: turtle.second_favorite_pizza_id
        },
        { where: { id: turtle.id } }
    )
}

async function UpdateWeapon(turtle) {
    return model.Turtles.update(
        {
            weapon_id: turtle.weapon_id
        },
        { where: { id: turtle.id } }
    )
}

async function UnbibdFirstPizza(turtle) {
    return model.Turtles.update(
        {
            favorite_pizza_id: null
        },
        { where: { id: turtle.id } }
    )
}

async function UnbindSecondPizza(turtle) {
    return model.Turtles.update(
        {
            second_favorite_pizza_id: null
        },
        { where: { id: turtle.id } }
    )
}

async function UnbindWeapon(turtle) {
    return model.Turtles.update(
        {
            weapon_id: null
        },
        { where: { id: turtle.id } }
    )
}

async function DeleteTurtle(turtle) {
    return model.Turtles.destroy({ where: { id: turtle.id } })
}

async function GetWeapons() {
    return model.Weapons.findAll()
}

async function GetWeaponsById(id) {
    return model.Weapons.findAll({
        where: {
            id: id
        }
    })
}

async function GetWeaponsMore(n) {
    return model.Weapons.findAll({
        where: {
            dps: {
                [Op.gt]: n
            }
        }
    });
}

async function GetWeaponsLess(n) {
    return model.Weapons.findAll({
        where: {
            dps: {
                [Op.lt]: n
            }
        }
    });
}

async function InsertWeapon(weapon) {
    return model.Weapons.create(weapon)
}

async function UpdateWeapons(weapon) {
    return model.Weapons.update(
        {
            name: weapon.name,
            dps: weapon.dps
        },
        { where: { id: weapon.id } }
    )
}

async function DeleteWeapon(weapon) {
    return model.Weapons.destroy({ where: { id: weapon.id } })
}

async function GetPizzas() {
    return model.Pizzas.findAll()
}

async function GetPizzasById(id) {
    return model.Pizzas.findAll({
        where: {
            id: id
        }
    })
}

async function GetPizzasMore(n) {
    return model.Pizzas.findAll({
        where: {
            calories: {
                [Op.gt]: n
            }
        }
    });
}

async function GetPizzasLess(n) {
    return model.Pizzas.findAll({
        where: {
            calories: {
                [Op.lt]: n
            }
        }
    });
}

async function InsertPizza(pizza) {
    return model.Pizzas.create(pizza)
}

async function UpdatePizza(pizza) {
    return model.Pizzas.update(
        {
            name: pizza.name,
            calories: pizza.calories
        },
        { where: { id: pizza.id } }
    )
}

async function DeletePizza(pizza) {
    return model.Pizzas.destroy({ where: { id: pizza.id } })
}

async function LessCalories() {
    return sequelize.transaction(async (t) => {
        // Найти все пиццы с количеством калорий больше 1500
        const pizzas = await model.Pizzas.findAll({
            where: {
                calories: { [Op.gt]: 1500 },
            },
            transaction: t, // передаем транзакцию
        });

        // Изменить количество калорий у найденных пицц
        for (let i = 0; i < pizzas.length; i++) {
            pizzas[i].calories = 1000;
            await pizzas[i].save({ transaction: t }); // сохраняем с изменением количества калорий в рамках транзакции
        }
    });
}

module.exports = {
    GetTurtles,
    GetTurtleById,
    GetTurtlesByPizza,
    GetPizzas,
    InsertTurtle,
    UpdateTurtle,
    UpdateTurtleImage,
    UpdateFirstPizza,
    UpdateSecondPizza,
    UpdateWeapon,
    UnbibdFirstPizza,
    UnbindSecondPizza,
    UnbindWeapon,
    DeleteTurtle,
    GetWeapons,
    GetWeaponsById,
    GetWeaponsLess,
    GetWeaponsMore,
    InsertWeapon,
    UpdateWeapons,
    DeleteWeapon,
    GetPizzasById,
    GetPizzasLess,
    GetPizzasMore,
    InsertPizza,
    UpdatePizza,
    DeletePizza,
    LessCalories
}

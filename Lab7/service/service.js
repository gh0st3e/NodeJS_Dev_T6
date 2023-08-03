const { Turtles } = require("../entity/models");
const repo = require("../repository/repository")
const model = require("../entity/models")

async function GetTurtles() {
    try {
        const Turtles = await repo.GetTurtles()
        return JSON.stringify(Turtles, null, 2)
    } catch (error) {
        console.error(error);
    }
}

async function GetTurtleById(id) {
    try {
        if (!isNaN(id)){
            const Turtles = await repo.GetTurtleById(id)
            return JSON.stringify(Turtles, null, 2)
        }
    } catch (error) {
        console.error(error);
    }
}

async function GetTurtlesByPizza(favoritePizza) {
    try {
        const Pizzas = await repo.GetPizzas()
        PizzasJson = JSON.stringify(Pizzas, null, 2)
        console.log(PizzasJson)

        let array = JSON.parse(PizzasJson)

        for (var i = 0; i < array.length; i++) {
            let item = array[i]
            if (item.name == favoritePizza) {
                const Turtles = await repo.GetTurtlesByPizza(item.id)
                return JSON.stringify(Turtles, null, 2)
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function GetPizzas() {
    try {
        const Pizzas = await repo.GetPizzas()
        return JSON.stringify(Pizzas, null, 2)
    } catch (error) {
        console.error(error);
    }
}

async function InsertTurtle(turtle) {
    try {
        if (turtle.id == null || turtle.name == null || turtle.color == null) {
            throw new Error("Fill the data")
        }
        const result = await repo.InsertTurtle(turtle)
        return JSON.stringify(result, null, 2)
    } catch (error) {
        return error
    }
}

async function UpdateTurtle(turtle) {
    try {
        //число
        if (turtle.id == undefined || turtle.name == undefined || turtle.color == undefined) {
            throw new Error("Fill the data")
        } else {
            const result = await repo.UpdateTurtle(turtle)
            return result
        }

    } catch (e) {

        return e
    }
}

async function UpdateTurtleImage(id, str) {
    try {
        if (id == undefined || str == undefined) {
            throw new Error("Fill The data")
        } else {
            newStr = `images/${str}`
            const result = await repo.UpdateTurtleImage(id, newStr)
            return result
        }
    } catch (e) {
        return e
    }
}

async function UpdateFirstPizza(turtle) {
    try {
        if (turtle.favorite_pizza_id == undefined) {
            throw new error("Fill the data")
        } else {
            const result = await repo.UpdateFirstPizze(turtle)
            return result
        }
    } catch (e) {
        return e
    }
}

async function UpdateSecondPizza(turtle) {
    try {
        if (turtle.second_favorite_pizza_id == undefined) {
            throw new error("Fill the data")
        } else {
            const result = await repo.UpdateSecondPizze(turtle)
            return result
        }
    } catch (e) {
        return e
    }
}

async function UpdateWeapon(turtle) {
    try {
        if (turtle.weapon_id == undefined) {
            throw new error("Fill the data")
        } else {
            const result = await repo.UpdateWeapon(turtle)
            return result
        }
    } catch (e) {
        return e
    }
}

async function UnbindFirstPizza(turtle) {
    try {
        if (turtle.id == undefined) {
            throw new error("Fill the data")
        } else {
            const result = await repo.UnbibdFirstPizze(turtle)
            return result
        }
    } catch (e) {
        return e
    }
}

async function UnbindSecondPizza(turtle) {
    try {
        if (turtle.id == undefined) {
            throw new error("Fill the data")
        } else {
            const result = await repo.UnbindSecondPizze(turtle)
            return result
        }
    } catch (e) {
        return e
    }
}

async function UnbindWeapon(turtle) {
    try {
        if (turtle.id == undefined) {
            throw new error("Fill the data")
        } else {
            const result = await repo.UnbindWeapon(turtle)
            return result
        }
    } catch (e) {
        return e
    }
}

async function DeleteTurtle(turtle) {
    try {
        if (turtle.id == undefined) {
            throw new error("Fill the data")
        } else {
            const result = await repo.DeleteTurtle(turtle)
            return result
        }
    } catch (e) {
        return e
    }
}

async function GetWeapons() {
    try {
        const Weapons = await repo.GetWeapons()
        return JSON.stringify(Weapons, null, 2)
    } catch (error) {
        console.error(error);
    }
}

async function GetWeaponsById(id) {
    try {
        const Weapons = await repo.GetWeaponsById(id)
        return JSON.stringify(Weapons, null, 2)
    } catch (error) {
        console.error(error);
    }
}

async function GetMweapons(n) {
    try {
        const Weapons = await repo.GetWeaponsMore(n)
        return JSON.stringify(Weapons, null, 2)

    } catch (error) {
        return error
    }
}

async function GetLweapons(n) {
    try {
        const Weapons = await repo.GetWeaponsLess(n)
        return JSON.stringify(Weapons, null, 2)

    } catch (error) {
        return error
    }
}

async function InsertWeapon(weapon) {
    try {
        if (weapon.id == null || weapon.name == null || weapon.dps == null) {
            throw new Error("Fill the data")
        }
        const result = await repo.InsertWeapon(weapon)
        return JSON.stringify(result, null, 2)
    } catch (error) {
        return error
    }
}

async function UpdateWeapons(weapon) {
    try {
        if (weapon.id == undefined || weapon.name == undefined || weapon.dps == undefined) {
            throw new Error("Fill the data")
        } else {
            const result = await repo.UpdateWeapons(weapon)
            return result
        }

    } catch (e) {

        return e
    }
}

async function DeleteWeapon(weapon) {
    try {
        if (weapon.id == undefined) {
            throw new error("Fill the data")
        } else {
            const result = await repo.DeleteWeapon(weapon)
            return result
        }
    } catch (e) {
        return e
    }
}

async function GetPizzass() {
    try {
        const Pizzas = await repo.GetPizzass()
        return JSON.stringify(Pizzas, null, 2)
    } catch (error) {
        console.error(error);
    }
}

async function GetPizzasById(id) {
    try {
        const Pizzas = await repo.GetPizzasById(id)
        return JSON.stringify(Pizzas, null, 2)
    } catch (error) {
        console.error(error);
    }
}

async function GetPizzasMore(n) {
    try {
        const Pizzas = await repo.GetPizzasMore(n)
        return JSON.stringify(Pizzas, null, 2)

    } catch (error) {
        return error
    }
}

async function GetPizzasLess(n) {
    try {
        const Pizzas = await repo.GetPizzasLess(n)
        return JSON.stringify(Pizzas, null, 2)

    } catch (error) {
        return error
    }
}

async function InsertPizza(pizza) {
    try {
        if (pizza.id == null || pizza.name == null || pizza.calories == null) {
            throw new Error("Fill the data")
        }
        const result = await repo.InsertPizza(pizza)
        return JSON.stringify(result, null, 2)
    } catch (error) {
        return error
    }
}

async function UpdatePizza(pizza) {
    try {
        if (pizza.id == undefined || pizza.name == undefined || pizza.calories == undefined) {
            throw new Error("Fill the data")
        } else {
            const result = await repo.UpdatePizza(pizza)
            return result
        }

    } catch (e) {

        return e
    }
}

async function DeletePizza(pizza) {
    try {
        if (pizza.id == undefined) {
            throw new error("Fill the data")
        } else {
            const result = await repo.DeletePizza(pizza)
            return result
        }
    } catch (e) {
        return e
    }
}

async function LessCalories() {
    try {
        const result = await repo.LessCalories()
        return result
    } catch (e) {
        return e
    }

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
    UnbindFirstPizza,
    UnbindSecondPizza,
    UnbindWeapon,
    DeleteTurtle,
    GetWeapons,
    GetWeaponsById,
    GetMweapons,
    GetLweapons,
    InsertWeapon,
    UpdateWeapons,
    DeleteWeapon,
    GetPizzass,
    GetPizzasById,
    GetPizzasLess,
    GetPizzasMore,
    InsertPizza,
    UpdatePizza,
    DeletePizza,
    LessCalories
}
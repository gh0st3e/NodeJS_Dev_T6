const express = require('express')
const service = require('../service/service')
const bodyParser = require("body-parser");
const fs = require("fs")
const multer = require("multer")

const page = fs.readFileSync("index.html")
const uploadPage = fs.readFileSync("upload.html")

const app = express();


app.use('/images', express.static('images'));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.text({ limit: '10mb' }));
app.use(express.raw({ limit: '10mb' }));

bodyParser.json([])
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


let filenameG = ''

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        const turtleId = req.body.turtleId; // получаем значение turtleId из формы
        const extension = file.originalname.split('.').pop(); // получаем расширение файла
        const filename = `${turtleId}.${extension}`; // формируем новое имя файла
        filenameG = filename

        cb(null, filename);
    }
});
const upload = multer({ storage: storage });
//app.use(upload.any());
const PORT = 9007

app.post("/less", (req, res) => {
    service.LessCalories()
        .then((result) => {
            res.statusCode = 200
            res.setHeader("Content-Type", "plaint/text")
            res.end(`Commited`)
        })
        .catch(e => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})

app.get("/", (req, res) => {
    res.end(page)
})

app.get("/upload", (req, res) => {
    res.end(uploadPage)
})

app.post('/upload', upload.single('image'), (req, res) => {
    const turtleId = req.body.turtleId;
    // const extension = req.file.originalname.split('.').pop(); // получаем расширение файла

    service.UpdateTurtleImage(turtleId, filenameG)
        .then((result) => {
            console.log(result)
            if (result[0]) {
                res.statusCode = 200
                res.setHeader("Content-Type", "plaint/text")
                res.end(`Updated`)
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "plaint/text")
                res.end(JSON.stringify(`User Error ${result}`))
            }

        })
        .catch((e) => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })

    console.log(`Файл ${turtleId} загружен`);

});

// GET	api/turtles
app.get("/api/turtles", (req, res) => {
    data = service.GetTurtles()
        .then((result) => {
            console.log(result)
            res.setHeader("Content-Type", "application/json")
            res.end(result)
        })
        .catch((e) => {
            res.end(e)
        })

})

// GET	api/turtles/id
app.get("/api/turtles/:id", (req, res) => {
    var id = req.params.id;
    data = service.GetTurtleById(id)
        .then((result) => {
            console.log(result)
            res.setHeader("Content-Type", "application/json")
            res.end(result)
        })
        .catch((e) => {
            res.end(e)
        })
})

// GET	api/turtles?favoritePizza=str
app.get("/api/pturtles/:favoritePizza", (req, res) => {
    var favoritePizza = req.params.favoritePizza
    data = service.GetTurtlesByPizza(favoritePizza)
        .then((result) => {
            console.log(result)
            res.end(result)
        })
        .catch((e) => {
            res.end(e)
        })
})

// POST	api/turtles
app.post("/api/turtle", (req, res) => {
    const turtle = JSON.parse(JSON.stringify(req.body));
    service.InsertTurtle(turtle)
        .then((result) => {
            console.log(result)
            res.setHeader("Content-Type", "application/json")
            res.end(result)
        })
        .catch((e) => {
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })

})

// PUT	api/turtles/
app.put("/api/turtle/:id", (req, res) => {
    const id = req.params.id
    const turtle = JSON.parse(JSON.stringify(req.body));
    turtle.id = id

    console.log(turtle.name)

    service.UpdateTurtle(turtle)
        .then((result) => {
            console.log(result)
            if (result[0]) {
                res.statusCode = 200
                res.setHeader("Content-Type", "plaint/text")
                res.end(`Updated`)
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "plaint/text")
                res.end(`User Error ${result}`)
            }

        })
        .catch((e) => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})

// PUT	api/turtles/favoritePizzaBind
app.put("/api/turtles/favoritePizzaBind", (req, res) => {
    const turtle = JSON.parse(JSON.stringify(req.body));

    service.UpdateFirstPizza(turtle)
        .then((result) => {
            console.log(result)
            if (result[0]) {
                res.statusCode = 200
                res.setHeader("Content-Type", "plaint/text")
                res.end(`Updated`)
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "plaint/text")
                res.end(`User Error ${result}`)
            }

        })
        .catch((e) => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})

// PUT	api/turtles/secondFavoritePizzaBind
app.put("/api/turtles/secondFavoritePizzaBind", (req, res) => {
    const turtle = JSON.parse(JSON.stringify(req.body));

    service.UpdateSecondPizza(turtle)
        .then((result) => {
            console.log(result)
            if (result[0]) {
                res.statusCode = 200
                res.setHeader("Content-Type", "plaint/text")
                res.end(`Updated`)
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "plaint/text")
                res.end(`User Error ${result}`)
            }

        })
        .catch((e) => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})

// PUT	api/turtles/weaponBind
app.put("/api/turtles/weaponBind", (req, res) => {
    const turtle = JSON.parse(JSON.stringify(req.body));

    service.UpdateWeapon(turtle)
        .then((result) => {
            console.log(result)
            if (result[0]) {
                res.statusCode = 200
                res.setHeader("Content-Type", "plaint/text")
                res.end(`Updated`)
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "plaint/text")
                res.end(`User Error ${result}`)
            }

        })
        .catch((e) => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})

// DELETE	api/turtles/favoritePizzaUnbind
app.delete("/api/turtles/favoritePizzaUnbind", (req, res) => {
    const turtle = JSON.parse(JSON.stringify(req.body));

    service.UnbindFirstPizza(turtle)
        .then((result) => {
            console.log(result)
            if (result[0]) {
                res.statusCode = 200
                res.setHeader("Content-Type", "plaint/text")
                res.end(`Updated`)
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "plaint/text")
                res.end(`User Error ${result}`)
            }

        })
        .catch((e) => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})

// DELETE	api/turtles/secondFavoritePizzaUnbind
app.delete("/api/turtles/secondFavoritePizzaUnbind", (req, res) => {
    const turtle = JSON.parse(JSON.stringify(req.body));

    service.UnbindSecondPizza(turtle)
        .then((result) => {
            console.log(result)
            if (result[0]) {
                res.statusCode = 200
                res.setHeader("Content-Type", "plaint/text")
                res.end(`Updated`)
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "plaint/text")
                res.end(`User Error ${result}`)
            }

        })
        .catch((e) => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})

// DELETE	api/turtles/weaponUnbind
app.delete("/api/turtles/weaponUnbind", (req, res) => {
    const turtle = JSON.parse(JSON.stringify(req.body));

    service.UnbindWeapon(turtle)
        .then((result) => {
            console.log(result)
            if (result[0]) {
                res.statusCode = 200
                res.setHeader("Content-Type", "plaint/text")
                res.end(`Updated`)
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "plaint/text")
                res.end(`User Error ${result}`)
            }

        })
        .catch((e) => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})

// DELETE	api/turtles
app.delete("/api/turtles", (req, res) => {
    const turtle = JSON.parse(JSON.stringify(req.body));

    service.DeleteTurtle(turtle)
        .then((result) => {
            console.log(result)
            if (result) {
                res.statusCode = 200
                res.setHeader("Content-Type", "plaint/text")
                res.end(`Deleted`)
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "plaint/text")
                res.end(`User Error ${result}`)
            }

        })
        .catch((e) => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})

// GET	api/weapons
app.get("/api/weapons", (req, res) => {
    data = service.GetWeapons()
        .then((result) => {
            console.log(result)
            res.end(result)
        })
        .catch((e) => {
            res.end(e)
        })
})
// GET	api/weapons/id
app.get("/api/weapons/:id", (req, res) => {
    var id = req.params.id;
    data = service.GetWeaponsById(id)
        .then((result) => {
            console.log(result)
            res.end(result)
        })
        .catch((e) => {
            res.end(e)
        })
})
// GET	api/weapons?dps=gt n
app.get("/api/weaponsm/:n", (req, res) => {
    var n = req.params.n;
    data = service.GetMweapons(n)
        .then((result) => {
            console.log(result)
            res.end(result)
        })
        .catch((e) => {
            res.end(e)
        })
})
// GET api/weapons?dps=lt n
app.get("/api/weaponsl/:n", (req, res) => {
    var n = req.params.n;
    data = service.GetLweapons(n)
        .then((result) => {
            console.log(result)
            res.end(result)
        })
        .catch((e) => {
            res.end(e)
        })
})
// POST	api/weapons
app.post("/api/weapons", (req, res) => {
    const weapon = JSON.parse(JSON.stringify(req.body));
    service.InsertWeapon(weapon)
        .then((result) => {
            console.log(result)
            res.setHeader("Content-Type", "application/json")
            res.end(result)
        })
        .catch((e) => {
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})
// PUT	api/weapons
app.put("/api/weapons/:id", (req, res) => {
    const id = req.params.id
    const weapon = JSON.parse(JSON.stringify(req.body));
    weapon.id = id

    console.log(weapon.name)
    console.log(weapon.id)
    console.log(weapon.dps)

    service.UpdateWeapons(weapon)
        .then((result) => {
            console.log(result)
            if (result[0]) {
                res.statusCode = 200
                res.setHeader("Content-Type", "plaint/text")
                res.end(`Updated`)
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "plaint/text")
                res.end(`User Error ${result}`)
            }

        })
        .catch((e) => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})
// DELETE	api/weapons
app.delete("/api/weapons", (req, res) => {
    const weapon = JSON.parse(JSON.stringify(req.body));

    service.DeleteWeapon(weapon)
        .then((result) => {
            console.log(result)
            if (result) {
                res.statusCode = 200
                res.setHeader("Content-Type", "plaint/text")
                res.end(`Deleted`)
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "plaint/text")
                res.end(`User Error ${result}`)
            }

        })
        .catch((e) => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})


// GET	api/pizzas
app.get("/api/pizzas", (req, res) => {
    data = service.GetPizzas()
        .then((result) => {
            console.log(result)
            res.end(result)
        })
        .catch((e) => {
            res.end(e)
        })
})
// GET	api/pizzas/id
app.get("/api/pizzas/:id", (req, res) => {
    var id = req.params.id;
    data = service.GetPizzasById(id)
        .then((result) => {
            console.log(result)
            res.end(result)
        })
        .catch((e) => {
            res.end(e)
        })
})
// GET	/api/pizzasm/:n
app.get("/api/pizzasm/:n", (req, res) => {
    var n = req.params.n;
    data = service.GetPizzasMore(n)
        .then((result) => {
            console.log(result)
            res.end(result)
        })
        .catch((e) => {
            res.end(e)
        })
})
// GET /api/pizzasl/:n
app.get("/api/pizzasl/:n", (req, res) => {
    var n = req.params.n;
    data = service.GetPizzasLess(n)
        .then((result) => {
            console.log(result)
            res.end(result)
        })
        .catch((e) => {
            res.end(e)
        })
})
// POST	api/pizzas
app.post("/api/pizzas", (req, res) => {
    const pizza = JSON.parse(JSON.stringify(req.body));
    service.InsertPizza(pizza)
        .then((result) => {
            console.log(result)
            res.setHeader("Content-Type", "application/json")
            res.end(result)
        })
        .catch((e) => {
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})
// PUT	api/pizzas
app.put("/api/pizzas/:id", (req, res) => {
    const id = req.params.id
    const pizza = JSON.parse(JSON.stringify(req.body));
    pizza.id = id

    console.log(pizza.name)
    console.log(pizza.id)
    console.log(pizza.dps)

    service.UpdatePizza(pizza)
        .then((result) => {
            console.log(result)
            if (result[0]) {
                res.statusCode = 200
                res.setHeader("Content-Type", "plaint/text")
                res.end(`Updated`)
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "plaint/text")
                res.end(`User Error ${result}`)
            }

        })
        .catch((e) => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})
// DELETE	api/pizza   
app.delete("/api/pizzas", (req, res) => {
    const pizza = JSON.parse(JSON.stringify(req.body));

    service.DeletePizza(pizza)
        .then((result) => {
            console.log(result)
            if (result) {
                res.statusCode = 200
                res.setHeader("Content-Type", "plaint/text")
                res.end(`Deleted`)
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "plaint/text")
                res.end(`User Error ${result}`)
            }

        })
        .catch((e) => {
            console.log(e)
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(e))
        })
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

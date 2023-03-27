function square(data) {
    return new Promise(function (resolve, reject) {
        if (isNaN(data)) {
            reject("NaN")
        } else {
            setTimeout(() => {
                resolve(data * data)
            }, 3000)

        }
    })
}

function cube(data) {
    return new Promise(function (resolve, reject) {
        if (isNaN(data)) {
            setTimeout(() => {
                reject("NaN")
            }, 500)

        } else {
            setTimeout(() => {
                resolve(data * data * data)
            }, 2000)
        }
    })
}

function fourth(data) {
    return new Promise(function (resolve, reject) {
        if (isNaN(data)) {
            reject("NaN")
        } else {
            setTimeout(() => {
                resolve(data * data * data * data)
            }, 1000)
        }
    })
}

Promise.race([square("data"), cube(2), fourth(2)])
    .then(value => console.log(value))
    .catch(error => console.log(error));

Promise.any([square(2), cube(2), fourth("data")])
    .then(value => console.log(value))
    .catch(error => console.log(error));

Promise.all([square(2), cube(2), fourth(2)])
    .then(values => {
        const [square, cube, fourth] = values;
        console.log(square, cube, fourth)

    })
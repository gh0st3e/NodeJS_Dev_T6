function square(data) {
    return new Promise(function (resolve, reject) {
        if (isNaN(data)) {
            reject("NaN")
        } else {
            resolve(data * data)
        }
    })
}

function cube(data) {
    return new Promise(function (resolve, reject) {
        if (isNaN(data)) {
            reject("NaN")
        } else {
            resolve(data * data * data)
        }
    })
}

function fourth(data) {
    return new Promise(function (resolve, reject) {
        if (isNaN(data)) {
            reject("NaN")
        } else {
            resolve(data * data * data * data)
        }
    })
}

square(3)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });
cube(4)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });
fourth("data")
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

Promise.all([square(2), cube(2), fourth(2)])
    .then(values => {
        const [square, cube, fourth] = values;
        console.log(square, cube, fourth)
    })
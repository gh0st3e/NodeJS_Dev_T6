function thirdJob(data) {
    return new Promise(function (resolve, reject) {
        if (isNaN(data)) {
            reject("error")
        } else if (data % 2 == 1) {
            setTimeout(() => {
                resolve("odd")
            }, 1000)
        } else {
            setTimeout(() => {
                resolve("even")
            }, 2000)
        }
    })
}

thirdJob("f")
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

async function getMsg() {
    try {
        const result = await thirdJob(6);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

getMsg()
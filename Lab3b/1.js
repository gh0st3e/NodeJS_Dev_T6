function firstJob() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve("Hello, World!")
        }, 2000)

    })
}

firstJob()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

async function getMsg() {
    try {
        const result = await firstJob();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

getMsg()
function secondJob() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            reject("Hello, Error!")
        }, 2000)

    })
}

secondJob()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

async function getMsg() {
    try {
        const result = await secondJob();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

getMsg()
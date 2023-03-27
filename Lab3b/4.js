function createOrder(data) {
    return new Promise(function (resolve, reject) {
        if (validateCard(data)) {
            const id = Math.floor(Math.random() * data)
            setTimeout(() => {
                resolve(id)
            }, 5000)
        } else {
            reject("Card is not valid")
        }
    })
}

function validateCard(data) {
    console.log(`CardID: ${data}`)
    if (data % 2 == 0) {
        return true
    } else {
        return false
    }
}

function proceedToPayment(orderID) {
    console.log(`OrderID: ${orderID}`);
    return new Promise(function (resolve, reject) {
        if (orderID % 2 == 0) {
            resolve("Payment Successfull")

        } else {
            reject("Payment Failed")
        }
    })
}

const data = Math.floor(Math.random() * 100)

createOrder(data)
    .then((orderID) => {
        return proceedToPayment(orderID)
    })
    .then((paymentStatus) => {
        console.log(paymentStatus);
    })
    .catch((error) => {
        console.error(error);
    });

// async function getMsg() {
//     try {
//         const orderID = await createOrder(data);
//         await proceedToPayment(orderID)

//     } catch (error) {
//         console.error(error);
//     }
// }
// getMsg()
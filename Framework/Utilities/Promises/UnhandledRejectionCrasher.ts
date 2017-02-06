const unhandledRejection = require("unhandled-rejection");


let rejectionEmitter = unhandledRejection({
    timeout: 20
});
 
rejectionEmitter.on("unhandledRejection", (error, promise) => {
    console.error(error.stack);
    process.exit();
});

export default null;
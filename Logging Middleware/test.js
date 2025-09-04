const { Log } = require('./logger');
async function runTest() {
    console.log("Testing the logger...");
    await Log(
        "backend", 
        "debug", 
        "utils", 
        "Test log from middleware."
    );
    
    console.log("Test complete.");
}

runTest();
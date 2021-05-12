const testItemDb = require("./testItem");

let testItem = {
    title: "Mr",
    description: "ABS",
    status: "Open",
    dateTime: "111"
}

testItemDb.addNewTestItem(testItem, function(err, result) {
    console.log("addNewBill():");
    if(err) {
        console.log("\tError occured: " + JSON.stringify(err));
    } else {
        console.log("\tSuccess!, result: " + JSON.stringify(result));
    }
});
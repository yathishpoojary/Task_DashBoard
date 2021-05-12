const Database = require('better-sqlite3');
const path = require('path');



module.exports.aquireConnection = function (debug) {
    let TESTING = true;
    var dbPath = "true";
    if(TESTING) {
        dbPath = "C:/Users/mesum/Desktop/ClouldAssignment/mean-angular-assignment/data/CLOUD_DB.db";
    } else {

        dbPath = path.join("./../data/", "CLOUD_DB.db");
    }

    console.log("DB PAth " + dbPath);
    
    return new Database(dbPath, { verbose: console.log });
}
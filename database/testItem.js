const db = require("./db");

function addNewTestItem(testItemInfo, done) {
    const connection = db.aquireConnection();
    try {
        let row = [
            testItemInfo.title,
            testItemInfo.description,
            testItemInfo.status,
            testItemInfo.dateTime
        ];
        console.log("Row - " + row);
        let sqlQuery = "INSERT INTO TestItem(title, description, status, dateTime) VALUES (?, ?, ?, ?);";
        const stmt = connection.prepare(sqlQuery);
        const result = stmt.run(row);
        if(result && result.lastInsertRowid >0 ) {
            done(null, {success: true, data: testItemInfo});
        } else {
            done(null, null);
        }
    } catch(err) {
        console.log(err);
        done(err, null);
    } finally {
        connection.close();
    }
}

function updateTaskItem(testItemInfo, done) {
    const connection = db.aquireConnection();
    try {
        let row = [
            testItemInfo.status,
            testItemInfo.ID
        ];
        let sqlQuery = "UPDATE TestItem set status = ? WHERE ID = ? ;";
        const stmt = connection.prepare(sqlQuery);
        const result = stmt.run(row);
        if(result && result.changes >0 ) {
            done(null, {success: true, data: testItemInfo});
        } else {
            done(null, null);
        }
    } catch(err) {
        console.log(err);
        done(err, null);
    } finally {
        connection.close();
    }
}

function getAllTestList(status, done) {
    const connection = db.aquireConnection();
    try {
        row = [status];
        let sqlQuery = "SELECT * FROM TestItem WHERE status = ?";
        const stmt = connection.prepare(sqlQuery);
        const result = stmt.all(row);
        if(result && result.length > 0) {
            done(null, {success: true, data: result});
        }
    } catch(err) {
        console.log(err);
        done(err, null);
    } finally {
        connection.close();
    }
}

module.exports = {
    addNewTestItem,
    getAllTestList,
    updateTaskItem
}
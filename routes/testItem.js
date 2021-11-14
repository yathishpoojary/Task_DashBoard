const express = require("express");
const router = express.Router();
const testItemDb = require("./../database/testItem")

router.post("/addTask",  function(req, resp, next) { // add task 
    let testItem = req.body;
    if(!testItem) {
        resp.status(400).send({error: "invalid Data"});
    }
    testItemDb.addNewTestItem(testItem, function(err, result) {
            if(err) {
                resp.status(400).send(err);
            } else {
                resp.status(200).send(result);
            }
        });
});

router.post("/updateTask",  function(req, resp, next) { // update task
    let testItem = req.body;
    if(!testItem) {
        resp.status(400).send({error: "invalid Data"});
    }
    testItemDb.updateTaskItem(testItem, function(err, result) {
            if(err) {
                resp.status(400).send(err);
            } else {
                resp.status(200).send(result);
            }
        });
});

router.get("/getTask/:status",  function(req, resp, next) {
    let status = req.params.status;
    if(!status) {
        resp.status(400).send({error: "invalid Data"});
    }
    testItemDb.getAllTestList(status, function(err, result) {
            if(err) {
                resp.status(400).send(err);
            } else {
                resp.status(200).send(result);
            }
        });
});

module.exports = router;
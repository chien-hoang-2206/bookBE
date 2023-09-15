const express = require("express");

//controller function
const rdfController = require("../controllers/rdf.controller");
const router = express.Router();

//Create 1 new review
// router.get("/getdata");
router.get("/getdata", rdfController.getAllData);
router.post("/searchone", rdfController.searchOne);

module.exports = router;

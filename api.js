// setup database
var sqlite3 = require("sqlite3").verbose();
var bodyParser = require("body-parser");
var db = new sqlite3.Database(":memory:"); // database will be stored in RAM only
db.serialize(function () {
    db.run(
        "CREATE TABLE IF NOT EXISTS phone_book (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, number TEXT)"
    );
    db.run(
        "INSERT INTO phone_book (first_name, last_name, number) VALUES (?, ?, ?)",
        "Bob",
        "Smith",
        "+381641234567"
    );
    db.run(
        "INSERT INTO phone_book (first_name, last_name, number) VALUES (?, ?, ?)",
        "Alice",
        "Johnson",
        "+38163122333"
    );
    db.run(
        "INSERT INTO phone_book (first_name, last_name, number) VALUES (?, ?, ?)",
        "Lee",
        "Brown",
        "+381628000111"
    );
});

// define api object
const express = require("express");
const api = express();
var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })


// define API endpoints

// list all entries
api.get("/", (req, res) => {
    db.all("SELECT * FROM phone_book", function (err, row) {
        if (!err) {
            res.json(row);
        } else {
            throw err;
        }
    });
});

//add new entry
api.post("/", jsonParser, (req, res) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const number = req.body.number;
    db.run(
        "INSERT INTO phone_book (first_name, last_name, number) VALUES (?, ?, ?)",
        firstName,
        lastName,
        number
    );
    res.end();
});

// listing of all the records that match search criteria for “Last Name”
api.get("/:lastname", (req, res) => {
    const lastName = req.params["lastname"];
    db.get("SELECT number FROM phone_book WHERE last_name=(?)", lastName, function (
        err,
        row
    ) {
        res.json({ number: row.number });
    });
});

// run server
api.listen(3000, () => console.log("Listening on port 3000..."));

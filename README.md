# phone-book-app-server

A simple phone book app server written in Express.js which uses SQLite DB. Following routes are available:

-   `/` with GET request - lists all of the entries currently in the database

-   `/` with POST request - adds new entry to the DB. It expects JSON to be in the following format (all fields are mandatory):

```
    {
        "first_name": "John",
        "last_name": "Lennon",
        "number": "+38162800787"
    }
```

-   `/search/:lastname` with GET request - search the database with the `lastname` parameter and returns all rows with that lastname.

-   `/delete` with GET request - deletes all data from the table

-   `*` - 404 route

## Instructions

```
npm install
npm start
```

Server listens on `http://localhost:3000`

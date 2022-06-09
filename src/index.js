"use strict";
const express = require('express');
const app = express();
const port = 5000;
app.get('/', (req, res) => {
    let a = +req.query.a;
    let b = Number(req.query.b);
    let sum = a + b;
    console.log(sum);
    res.send(sum);
}); // инкапсуляция
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

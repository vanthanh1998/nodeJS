import express from "express";
import configViewEngine from "./configs/viewEngine";
require('dotenv').config();

const app = express()
const port = process.env.PORT || 8080; // connect db
console.log('>>>port:',port);

configViewEngine(app);

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/about', (req, res) => {
    res.send(`I'm thanhrain`)
})

app.listen(port, () => {
  console.log(`Thanhrain port ${port}`)
})
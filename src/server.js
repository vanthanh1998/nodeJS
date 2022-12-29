import express from "express";
import configViewEngine from "./configs/viewEngine";

const app = express()
const port = 8080

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
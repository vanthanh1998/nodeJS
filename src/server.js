import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initApiRoute from './route/api';
var morgan = require('morgan');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 8080;

app.use(morgan('combined'))
// hỗ trợ gửi data từ client lên phía server và get data từ db
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup view engine
configViewEngine(app);

// init web route
initWebRoute(app);

// init api route
initApiRoute(app);

// handle middleware
app.use( (req, res) => {
    return res.render('404.ejs');
})

app.listen(port, () => {
  console.log(`Thanhrain port ${port}`)
})
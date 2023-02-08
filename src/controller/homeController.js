import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    // await pool.execute('SELECT * FROM `users`');  // code javascript destructuring => trả ra 2 tham số
    // let a, b, rest;
    // [a, b] = [10, 20];
    // console.log(a); => 10
    // console.log(b); =>: 20

    return res.render('home/index.ejs', { dataUser: rows, test: 'thanhrain' })
}

let getDetailPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('select * FROM users where id = ?', [id])
    console.log(JSON.stringify(user)); // convert qua kiểu string
    return res.send(JSON.stringify(user));
}

module.exports = {
    getHomePage, getDetailPage
}
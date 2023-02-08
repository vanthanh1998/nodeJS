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

let addUser = async (req, res) => {
    // console.log('>> check req: ', req.body); // >> check req:  { first_name: '', last_name: '', email: '', address: '' }
    // let firstName = req.body.first_name; => cách lưu data beginer
    // let lastName = req.body.last_name; => cách lưu data beginer
    // let email = req.body.email; => cách lưu data beginer
    // let address = req.body.address; => cách lưu data beginer
    let {first_name, last_name, email, address } = req.body;   // code javascript destructuring => tối ưu code
    
    try{
        await pool.execute(
            "INSERT INTO users (first_name, last_name, email, address) VALUES (?,?,?,?)",
            [first_name, last_name, email, address],
          );
        return res.redirect('/');
      } catch (error) { 
        console.log(">>> error: ",error);
    };
}

module.exports = {
    getHomePage, getDetailPage, addUser
}
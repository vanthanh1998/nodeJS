import pool from "../configs/connectDB"; 
import multer from 'multer';

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
            'INSERT INTO users (first_name, last_name, email, address) VALUES (?,?,?,?)',
            [first_name, last_name, email, address]
          );
        return res.redirect('/');
      } catch (error) { 
        console.log(">>> error: ",error);
    };
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    console.log("user_id:", userId);
    try{
        await pool.execute(
            'DELETE FROM users WHERE `id` = ?', [userId],
          );
        return res.redirect('/');
      } catch (error) { 
        console.log(">>> error: ",error);
    };
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('select * FROM users where id = ?', [id]) // trả ra array
    console.log(JSON.stringify(user)); // convert qua kiểu string
    return res.render('home/update.ejs', { dataUser: user[0]})
}

let postUpdateUser = async (req, res) => {
    console.log('check request >>', req.body);
    let {first_name, last_name, email, address, userId } = req.body;  // userId get từ input hidden file view ejs
    try{
        await pool.execute(
            'UPDATE users SET first_name = ?, last_name = ?, email = ?, address = ? WHERE id = ?',
            [first_name, last_name, email, address, userId]   // userId get từ input hidden file view ejs
          );
        return res.redirect('/');
      } catch (error) { 
        console.log('>> error: ',error);
    };
}

let getUploadFilePage = async (req, res) => {
    return res.render('home/uploadFile.ejs')
}

let handleUploadFile = async (req, res) => {

  if (req.fileValidationError) {

      return res.send(req.fileValidationError);
  }
  else if (!req.file) {
      return res.send('Please select an image to upload');
  }

  // Display uploaded image for user validation
  res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
  // });
}

module.exports = {
    getHomePage, 
    getDetailPage, 
    addUser, 
    deleteUser, 
    getEditPage, 
    postUpdateUser,
    getUploadFilePage,
    handleUploadFile
}
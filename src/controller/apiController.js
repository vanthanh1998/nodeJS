import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createUser = async (req, res) => {
    let {first_name, last_name, email, address } = req.body;   // code javascript destructuring => tối ưu code
    if(!first_name || !last_name || !email || !address){
        return res.status(200).json({
            message: 'required field',
        })
    }
    await pool.execute(
        'INSERT INTO users (first_name, last_name, email, address) VALUES (?,?,?,?)',
        [first_name, last_name, email, address]
      );
    return res.status(200).json({
        message: 'create ok',
    })
}

let updateUser = async (req, res) => {
    let {first_name, last_name, email, address, id } = req.body;   // code javascript destructuring => tối ưu code
    if(!first_name || !last_name || !email || !address || !id){
        return res.status(200).json({
            message: 'required field',
        })
    }
    await pool.execute(
        'UPDATE users SET first_name = ?, last_name = ?, email = ?, address = ? WHERE id = ?',
        [first_name, last_name, email, address, id] 
      );
    return res.status(200).json({
        message: 'update ok',
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if(!userId){
        return res.status(200).json({
            message: 'required field',
        })
    }
    await pool.execute(
        'DELETE FROM users WHERE `id` = ?', [userId],
      );
    return res.status(200).json({
        message: 'delete ok',
    })
}

module.exports = {
    getAllUsers, createUser, updateUser, deleteUser
}
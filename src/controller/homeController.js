import connection from "../configs/connectDB";

let getHomePage = (req, res) => {
    // logic
    let data = [];
    connection.query(
        'SELECT * FROM `users` ',
        function(err, results, fields) {
            data = results;
            return res.render('home/index.ejs', { dataUser: data })
        }
    );
}

module.exports = {
    getHomePage
}
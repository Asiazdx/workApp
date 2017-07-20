var mysql=require("mysql");
var connection = mysql.createConnection({
    host     : 'sqld.duapp.com',
    port     :  4050,
    user     : '863e0d415d20478a980a93204cf4b0cf',
    password : 'b4b5f74e09554a00977710a0e4e72040',
    database : 'tJikoQSvQGlNxmMGGlCu'
    //host     : 'localhost',
    //port     :  3306,
    //user     : 'root',
    //password : '',
    //database : 'workapp'
});
connection.connect();
module.exports=connection;

var express = require('express');
var router = express.Router();
var mysql=require("../comm/mysql");
var crypto=require("crypto");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("admin/login.ejs");
});
router.use('/selectWorker',function(req,res,next){
    var username=req.body.username;
    mysql.query("select * from user where username="+username,function(error,rows){
        if(rows[0].state==0){
            res.send('noPromise');
        }
    })
})
router.use('/check', function(req, res, next) {
    var username=req.body.username;
    var password=req.body.password;
    var md5 = crypto.createHash('md5');
     md5.update(password);
     password=md5.digest('hex');
    var flag=true;
    mysql.query("select * from user",function(error,rows){
        if(rows) {
            rows.forEach(function (result, index) {
                if (result.username == username) {
                    if (result.password == password) {
                        flag = false;
                        req.session.login = "yes";
                        req.session.username = username;
                        req.session.state = result.state;
                        res.render('admin/index');
                    }
                }
            })
        }else{
            console.log(error)
        }
        if(flag){
            res.redirect("/login");
        }
    })
});
module.exports = router;

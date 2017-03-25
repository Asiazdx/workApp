var express=require('express');
var router=express.Router();
var mysql=require("../comm/mysql");
var crypto=require("crypto");
router.use('/check', function(req, res, next) {
    var name=req.body.name;
    var pass=req.body.pass;
    var cookieData=req.body.cookieData;
    var md5 = crypto.createHash('md5');
    md5.update(pass);
    pass=md5.digest('hex');
    var flag=true;
    mysql.query("select * from user",function(error,rows){
        for(var i=0;i<rows.length;i++) {
            if (rows[i].username == name) {
                if (rows[i].password == pass) {
                    flag = false;
                    req.session.indexLogin = "yes";
                    if (cookieData == 'yes') {
                        res.cookie("account", {username: name, password: pass}, {maxAge: 900000});
                    }
                    req.session.id = name;
                    res.redirect('/')
                }
                if (flag) {
                    //res.render('index/login');
                    res.sendFile(rootPath + "/views/index/login.html");
                }
            }
        }
    })
});
module .exports=router;
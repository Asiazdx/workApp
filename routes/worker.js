/*员工信息管理*/
var express=require('express');
var router=express.Router();
var mysql=require('../comm/mysql');
var crypto=require('crypto');
router.use('/addWorker',function(req,res,next){
    var state=req.session.state;
    res.render('admin/addWorker',{sessionData:state});
});
//添加用户
router.use('/addWorkerTodb',function(req,res,next){
    var username=req.body.username;
    var password="000000";
    var md5 = crypto.createHash('md5');
    md5.update(password);
    password=md5.digest('hex');
    var workername=req.body.workername;
    var email=req.body.email;
    var phone=req.body.phone;
    var state=req.body.state;
    var sql='insert into user(username ,password,workername,email,phone,state) valuse("'+username+'","'+password+'","'+workername+'","'+email+'","'+phone+'","'+state+'")';
    mysql.query(sql,function(error,result){
        if(result){
            res.send("<script>alert('添加员工信息成功');history.go(-1)</script>");
        }
    });
});
//查询用户
router.use('/selectWorker',function(req,res,next){
    mysql.query("select * from user",function(error,rows){
        if(!error){
            var userArr=[];
            rows.forEach(function(obj,index){
                userArr.push(obj.username);
            })
            res.send(userArr);
        }
    })
})
/*编辑用户信息*/
router.use('/edit',function(req,res,next){
    mysql.query('select * from user', function (error,rows) {
        if(rows){
            res.render('admin/edit',{data:rows});
        }
    })
})
router.use('/updateUser',function(req,res,next){
    var username=req.body.username;
    var workername=req.body.workername;
    var phone=req.body.phone;
    var email=req.body.email;
    mysql.query('update user set workername="'+workername+'",phone="'+phone+'",email="'+email+'" where username="'+username+'"',function(error,result){
        if(result){
            res.send('ok');
        }else{
            console.log(error);
        }
    })
})
router.use('/resetPass',function(req,res,next){
    var username=req.body.username;
    var password="000000";
    mysql.query('update user set password="'+password+'" where username="'+username+'"',function(error,result){
        if(result){
            res.send('ok');
        }else{
            console.log(error);
        }
    })
})
router.use('/del', function (req,res,next) {
    var username=req.body.username;
    mysql.query('delete from user where username="'+username+'"',function(error,result){
        if(result){
            res.send('ok');
        }
    })
})
module.exports=router;

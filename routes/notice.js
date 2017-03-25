var express=require('express');
var mysql=require('../comm/mysql.js');
var router=express.Router();
router.use('/addNotice',function(req,res,next){
    res.render('admin/addNotice');
});
router.use('/addNoticeTodb',function(req,res,next){
    var title=req.body.title;
    var con=req.body.con;
    mysql.query('insert into notice(title,con) values("'+title+'","'+con+'") ', function (error,result) {
       if(result){
           res.send('<script>alert("添加公告成功")</script>');
       }
    })
})
//编辑公告
router.use('/editNotice',function(req,res,next){
    mysql.query('select * from notice',function(error,rows){
            if(rows) {
                res.render('admin/editNotice', data = rows);
            }
    })
})
//删除公告
router.use('/del',function(req,res,next){
    var id=req.body.id;
    mysql.query('delete from notice where id='+id,function(error,result){
        if(result){
            res.send('ok');
        }
    })
})
//修改公告
router.use('/updateNotice',function(req,res,next){
    var id=req.body.id;
    var title=req.body.title;
    var con=req.body.con;
    mysql.query('update notice set title="'+title+'",con="'+con+'" where id='+id,function(error,result){
        if(result){
            res.send('ok');
        }
    })
})
module.exports=router;

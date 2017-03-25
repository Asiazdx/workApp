var express = require('express');
var mysql=require("../comm/mysql");
var router = express.Router();
/*
   GET home page.

   index.html   服务器->

*
* */
router.get('/', function(req, res, next) {
    res.sendFile(rootPath+"/views/index/index.html");
});
router.get('/tpl/:name', function(req, res, next) {
    res.sendFile(rootPath+"/public/tpl/"+req.params.name);
});
router.use('/ajaxNewsLunbo', function(req, res, next) {
    mysql.query("select * from artical where pos=1 limit 3",function(error,rows){
        if(!error){
            res.send(JSON.stringify(rows));
        }else{
            console.log(error);
        }
    })
})
router.use('/ajaxNewsList',function(req,res,nest){
    mysql.query("select * from artical where pos=0 limit 6",function(error,rows){
        if(!error){
            res.send(JSON.stringify(rows));
        }else{
            console.log(error);
        }
    })
})
router.get('/ajaxNewsCon', function(req, res, next) {
    var id=req.query.id;
    mysql.query("select * from artical where id="+id,function(error,rows){
        if(rows){
            res.send(JSON.stringify(rows));
        }
    })
});
/*获取通讯录信息*/
router.get('/ajaxPhone', function(req, res, next) {
    mysql.query("select * from user",function(error,rows){
        res.send(JSON.stringify(rows));
    })
});
/*获取员工的详情信息*/
router.use('/ajaxWorker',function(req,res,next){
    var id=req.query.id.substr(1);
    mysql.query("select * from user where id="+id,function(error,rows){
        res.send('l');
    })
})
/*获取新闻信息*/
router.use('/ajaxNews',function(req,res,next){
    mysql.query('select * from artical where pos=1',function(error,rows){
        if(!error){
            res.send(JSON.stringify(rows));
        }else{
            console.log(error);
        }
    })
})
/*获取新闻详情*/
router.use('/ajaxNewsCon:id',function(req,res,next){
    var id=req.query.id;
    mysql.query('select * from artical where id='+id,function(error,rows){
        if(!error){
        }else{
            console.log(error);
        }
    })
})
router.use('/ajaxNotice',function(req,res,next){
    mysql.query('select * from notice',function(error,rows){
        if(!error){
            res.send(JSON.stringify(rows));
            //res.send(rows.length);
        }else{
            console.log(error)
        }
    })
})
//获取公告内容
router.use('/ajaxNoticeCon',function(req,res,next){
    mysql.query('select * from notice order by time desc',function(error,rows){
        if(!error){
            res.send(JSON.stringify(rows));
        }else{
            console.log(error);
        }
    })

})
module.exports = router;

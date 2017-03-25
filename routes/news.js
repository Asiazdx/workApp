var express=require('express');
var mysql=require('../comm/mysql.js');
var router=express.Router();
router.use('/addNews',function(req,res,next){
    res.render('admin/addNews');
});
router.use('/addNewsTodb',function(req,res,next){
    var title=req.body.title;
    var con=req.body.con;
    var pos=req.body.pos;
    var imgUrl=req.body.imgUrl;
    var sql='insert into artical(title,con,imgUrl,pos) values("'+title+'","'+con+'","'+imgUrl+'",'+pos+')';
    mysql.query(sql,function(error,result){
        if(!error){
            res.send('<script>alert("添加文章成功");location.href="/news/addNews"</script>')
        }else{
            console.log(error);
        }
    })

})
router.use('/loadImg',function(req,res,next){
    var imgUrl=req.body.imgUrl;
    console.log(imgUrl);
    res.send('ok');
})
module.exports=router;
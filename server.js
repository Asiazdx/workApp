var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var crypto=require("crypto");
//var child=require("child_process");//引进进程模块
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var indexLogin=require("./routes/indexLogin");
var worker=require('./routes/worker');
var notice=require('./routes/notice');
var news=require('./routes/news');
var ejs=require('ejs');
/*var paObj=child.fork('pachong.js')//开启一个分支
 paObj.on("message",function(info){
 console.log(info);
 });*/
var app = express();
app.use(session({ secret: 'keyboard cat', name:"abc",cookie: {  }}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
global.rootPath=__dirname;

/*后台路由*/
app.use("/login",login);
app.use('/indexLogin',indexLogin);
app.use('/admin',function(req,res,next){
    if(req.session.login=="yes"){
        next();
    }else{
        res.redirect("/login");
    }
} ,users);
app.use('/worker',worker);
app.use('/notice',notice);
app.use('/news',news);
/*前台登陆*/
app.use('/',function(req,res,next){
    if(req.session.indexLogin=="yes"){
        //判断是否已经登录了
        next();
    }else{
        //判断cookie中的account是否存在
        if(req.cookies.account){
            //存在，直接跳到首页
            next();
        }else {
            //不存在，跳到登录页
            res.sendFile(rootPath + "/views/index/login.html");
        }
    }
} ,index);
/*var server = require('http').createServer(app);
//服务器  客户端
var io = require('socket.io')(server);
var clients={
};
var infos={
};
io.on('connection', function(client){
    client.on("event",function(data){
        console.log(data.id);
        clients[data.id]=client;
        infos[data.id]={name:data.name,id:data.id}
        client.emit("event",infos);
    });
    client.on("one",function(data){
        var id=data.id;
        var text=data.text;
        var self=data.self;
        console.log(id);
        /!*
         * self  txt
         * *!/
        clients[id].emit("one",{self:self,text:text})
    })
});*/
app.listen(18080);


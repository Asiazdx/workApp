var socket;
angular.module("controllers",["services"])
.controller("index",["$scope","$http",function($scope,$http) {
    $http({url:"/ajaxNewsLunbo"}).then(function (result) {
        $scope.lunbo = result.data;
        var mySwiper = new Swiper('#lunbo', {
            pagination: '.swiper-pagination',
            paginationElement: 'li',
            paginationClickable: true,
            autoplay: 1000,
            autoplayDisableOnInteraction: false
            //loop:true
        })
    });
    $http({url:"/ajaxNewsList"}).then(function (result) {
        $scope.list = result.data;
    });
    $http({url:"/ajaxNotice"}).then(function(result){
        var sum=result.data.length;
        if(!localStorage.num&&localStorage!=0){//初次登陆
            localStorage.num=0;
        }
        localStorage.num=sum-localStorage.num;
        $scope.noticeNum=localStorage.num;
    })

}])
.controller("notice",["$scope","$http",function($scope,$http){
    $http({url:"/ajaxNoticeCon"}).then(function(result){
        $scope.notice=result.data;
        for(var i=0;i<$scope.notice.length;i++){
            $scope.notice[i].time=$scope.notice[i].time.substr(0,10);
        }
    })
}])
.controller("show",["$scope","$http","$routeParams",function($scope,$http,$routeParams){
    var id=$routeParams.id.substr(1,1);
    $scope.showBack=function(){
        alert('11');
        history.go(-1);
    }
    $http({url:"/ajaxNewsCon?id="+id}).then(function(result){
        $scope.con=result.data[0].con;
        $scope.title=result.data[0].title;
        $scope.time=result.data[0].time.substr(0,10);
        $scope.imgUrl=result.data[0].imgUrl;
    });

}]).controller("phone",["$scope","$http","$filter",function($scope,$http,$filter){
    $http({url:"/ajaxPhone"}).then(function(result){
        var data=result.data;
        var arr=[];
        var enArr=[];
        for(var i=0;i<data.length;i++){
            var current=[];
            for(var j=0;j<data.length;j++){
                if((data[i].en==data[j].en)&&!data[j].flag){
                    data[j].flag=true;
                    current.push(data[j]);
                    current.en=data[i].en;
                }
            }
            if(current.length>0) {
                arr.push(current);
                enArr.push(current.en);
                arr=$filter("orderBy")(arr,"en");
            }
        }
        $scope.data=arr;
        $scope.workers=data;
        $scope.type="";
        //返回顶部
        $scope.top=function(){
            $('#phoneCon').css({
                top:0
            })
        }
        $scope.filter=function(en){
            var enName=document.getElementsByClassName('enName');
            var phoneCon=$('#phoneCon');
            setTimeout(function(){
                for(var i=0;i<enName.length;i++){
                    if(enName[i].innerHTML==en){
                        phoneCon.css({
                            Top:-enName[i].offsetTop
                        })
                    }
                }
            },10);
        }
        $scope.show=function(){
            $scope.type="";
        }
        var placeholder = document.querySelector(".mui-placeholder");
        var input = document.querySelector(".mui-input-clear");
        placeholder.onclick = function () {
            this.style.width = "20px";
            input.focus();
        }
        input.onblur = function () {
            placeholder.style.width = "100%";
        }
    })/*在多个页面当中共享数据  serevices*/
}]).controller("showWorker",["$scope","$http","$routeParams",function($scope,$http,$routeParams){
    var id=$routeParams.id;
    $http({url:"/ajaxWorker?id="+id}).then(function(result){
        var data=result.data;
        $scope.phone=data[0].phone;
        $scope.email=data[0].email;
    })
}]).controller("todo",["$scope","todoData",function($scope,todoData){
    //console.log($("#todoList").length);
    $scope.data=todoData;
    setTimeout(function(){
        for(var i=0;i<$scope.data.length;i++){
            var listObj=$(".list"+$scope.data[i].id);
            var spanObj=$("#span"+$scope.data[i].id);
            var colorObj=spanObj.text();
            listObj.css({
                borderLeft:"8px solid "+colorObj
            })
        }
    },1000);
    $scope.dataNum=$scope.data.length;
    //显示
    $scope.del=function(id){
        for(var i=0;i< $scope.data.length;i++){
            if($scope.data[i].id==id){
                $scope.data.splice(i,1);
            }
        }
        localStorage.todo=JSON.stringify($scope.data);
    }
    //后退
    $scope.back=function(){
        history.go(-1);
    }
    //导航
    var showflag=true;
        $scope.navShow=function(){
            var navl=$("#navLists");
            if(showflag){
                navl.show();
                showflag=false;
            }else {
                navl.hide();
                showflag = true;
            }
            /*var navLists=document.getElementById("navLists");
             navLists.style.display="block";*/
        }
    //删除所有便签
    $scope.delAll=function(){
        $scope.data.splice(0,$scope.data.length);
    }
    //按分类排序
    $scope.catePai=function(){

    }
}]).controller("todoadd",["$scope","todoData",function($scope,todoData){
    //分类显示
    var flist=$("#fenlei-list");
    var flistFlag=true;
    $scope.flistShow=function(){
        if(flistFlag){
            flist.show();
            flistFlag=false;
        }else{
            flist.hide();
            flistFlag=true;
        }
    }
    //选择分类
    var fenlei="";
    $scope.select1=function(){//未分类
        fenlei="#ccc";
        flist.hide();
    }
    $scope.select2=function(){//分类2(工作)
        fenlei="#FE0000";
        flist.hide();
    }
    $scope.select3=function(){//分类3(学习)
       fenlei="#F4EB42";
        flist.hide();
    }
    $scope.select4=function(){//分类4(个人)
        fenlei="#01FDB3";
        flist.hide();
    }
    $scope.select5=function(){//分类5(家庭)
        fenlei="#1BA8D8";
        flist.hide();
    }
    $scope.data=todoData;
        //todo保存
        $scope.save=function(){
         var con=document.querySelector(".todocon").innerHTML.replace(/\s*/g,"");
            if(!con){
                alert("内容为空不能保存");
                return;
            }
            var time=getNowFormatDate();
         var conObj={con:con,id:getMaxId($scope.data)+1,time:time,fenlei:fenlei};
            $scope.data.unshift(conObj);
         localStorage.todo=JSON.stringify($scope.data);
         location.href="#!/todo"
        }
       //todo关闭
        $scope.close=function(){
            var con=document.querySelector(".todocon").innerHTML.replace(/\s*/g,"");
            var yes=window.confirm("确认关闭吗?");
            if(yes){
                location.href="#!/todo"
            }
        }
    //获取当前时间
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes();
        return currentdate;
    }
        function getMaxId(con){
            return con.length>0?con.sort(function(a,b){
                    return a.id>b.id;
                })[con.length-1].id:0;
        }
    }]).controller("edit",["$scope","todoData","$routeParams",function($scope,todoData,$routeParams){
    //修改todo
    var id=$routeParams.id;
    $scope.data=todoData;
    for(var i=0;i<$scope.data.length;i++){
        if($scope.data[i].id==id){
          $scope.current=$scope.data[i];
        }
    }
    $scope.save=function(){
        var con=document.querySelector(".todocon").innerHTML.replace(/\s*/g,"");
        //修改为空
        if(!con){
            for(var i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    $scope.data.splice(i,1);
                }
            }
        }else{//不为空
            for(var i=0;i<$scope.data.length;i++){
                if($scope.data[i].id==id){
                    $scope.data[i].con=con;
                }
            }
        }
        localStorage.todo=JSON.stringify($scope.data);
        location.href="#!/todo"
    }
    //todo关闭
    $scope.close=function(){
        var con=document.querySelector(".todocon").innerHTML.replace(/\s*/g,"");
        var yes=window.confirm("确认关闭吗?");
        if(yes){
            location.href="#!/todo"
        }
    }
}])
//    .controller("liaotian",["$scope","$http","$filter",function($scope,$http){
//    socket = io('http://localhost:8080');
//    var name,id;
//    socket.on('connect', function(){
//        socket.emit("event",{name:name,id:id})
//    });
//    socket.on("event",function(data){
//        for(var i in data){
//            for(var j=1;j<$scope.data.length;j++){
//                if(($scope.data[j].flag)){
//                    continue;
//                }
//                if((data[i].id==$scope.data[j].id)){
//                    $scope.data[j].flag=true
//                    $scope.data[j].flag1=true;
//                    $scope.data[j].url="#!/liao/"+data[i].id;
//                }else{
//                    $scope.data[j].url="javascript:;"
//                }
//
//            }
//        }
//        $scope.$apply(function(){
//
//        })
//        console.log($scope.data);
//    });
//}])
    //.controller("liao",function($scope,$routeParams){
//    var id=$routeParams.id;
//    var text=document.querySelector("textarea");
//    var history=document.querySelector(".history");
//    $scope.message=[];
//    $scope.click=function(){
//        $scope.message.push({text:text.value,self:socket.name});
//        socket.emit("one",{text:text.value,id:id,self:socket.name});
//    }
//    socket.on("one",function(data){
//        console.log(11111);
//        $scope.$apply(function(){
//            $scope.message.push({text:data.text,self:data.self});
//        })
//    })
//})
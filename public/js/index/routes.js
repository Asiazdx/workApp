angular.module("routes",["ngRoute"])
    .config(["$routeProvider",function($routeProvider){
        $routeProvider.when("/",{
            templateUrl:"/tpl/index.html",
            controller:"index"
        }).when("/notice",{
            templateUrl:"/tpl/notice.html",
            controller:"notice"
        }).when("/show/:id",{
            templateUrl:"/tpl/show.html",
            controller:"show"
        }).when("/phone",{
                templateUrl:"/tpl/phone.html",
                controller:"phone"
       }).when("/worker/:id",{
            templateUrl:"/tpl/worker.html",
            controller:"showWorker"
        })
            .when("/todo",{
                templateUrl:"/tpl/todo.html",
                controller:"todo"
        }).when("/todo/add",{
            templateUrl:"/tpl/todoadd.html",
            controller:"todoadd"
        }).when("/edit/:id",{
            templateUrl:"/tpl/edit.html",
            controller:"edit"
        }).when("/liaotian",{
            templateUrl:"/tpl/liaotian.html",
            controller:"liaotian"
        }).when("/liao/:id",{
            templateUrl:"/tpl/liao.html",
            controller:"liao"
        })

    }])
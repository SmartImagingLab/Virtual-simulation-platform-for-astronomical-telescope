



function parseURL(url) {
	var url = url.split("?")[1];
    if (url === undefined || url === "") return;
	var para = url.split("&");
	var len = para.length;
	var res = {};
	var arr = [];
	for (var i = 0; i < len; i++) {
		arr = para[i].split("=");
		res[arr[0]] = arr[1];
	}
	return res;
}


function test() {
 var name;
	 

	var url = window.location.href;
 	

 if (url.split("?")[1] == undefined || url.split("?")[1] == ""){
  $("#userName").html('游客');
}
else
{ 
var UrlName = url.split("?")[1];
	var param=UrlName.split("&")
	var tokenName = param[0].split("=")[1];
 
   //返回登录信息相对路径 
    $.ajax({
        type: "GET",
        url: "http://101.201.36.205/ashx/parseUserInfo.ashx?token=" + encodeURIComponent(parseURL(url)["token"]),

        async: false,
        success: function (res) {
 
            sbname = res.data.un;
            name = res.data.dis;

            $("#userName").html(name);
        },
        error: function (event) {
 
            console.log(event.status);
        }
    }); 
}
}






function changeFrameHeight() {
    var ifm = document.getElementById("iframe");
    var headNav = $("#main .headNav").outerHeight(true);

    ifm.height = document.documentElement.clientHeight - headNav - 5;
}

function autoWidth() {
    var bodyW = $("body").width();
    if (bodyW <= 1200) {
        $("#app").addClass("mt0").addClass("closed");
    } else {
        $("#app").removeClass("mt0").removeClass("closed");
    }
}



var search=window.location.search;
var tok = GetRequest();     
function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串  
            var re = url.substring(7);
            return re;
        } 
 

function addrecordHandlerexe1() {
  
    var url1 = location.search; //获取url中"?"符后的字串    
  //  if (tok === null || tok === "" || tok === undefined) {
    //    window.open("http://172.17.41.219/Default.aspx", "_blank");
   // } else {
        $.ajax({
            type: "POST",
            url: "http://101.201.36.205/webapi/api/Main/GetToken",
            data: {
                Token: tok
            },
            success: function (data) {
                
                if (data.Info) {
                    
                    window.open("JinanDaxueHaibinYewai:~iIqJgoqFiYOKhoqGR4eJiYU=~"+data.Message, "_self");
                }
            },
            error: function (data) {
               
                alert(data.Message);
            }
        })
  //  }
}





$(window).resize(function() {
    test();
    changeFrameHeight();
});

var Main = {
    data() {
        return {
            name: "",
            num: "",
            menuList: [{
                    name: '统计数据',
                    hrefText: "./iframeSrc/DataStatistics.html",
                },
                {
                    name: '仿真实验操作记录',
                    hrefText: "./iframeSrc/record.html",
                },
                {
                    name: '仿真实验成绩',
                    hrefText: "./iframeSrc/grade.html",
                },
                {
                    name: '查看评价',
                    hrefText: "./iframeSrc/evaluate.html",
                }
            ],
            iframeSrc: "",
            selectedElementIndex: 0,
            imgArr:[
                {imgSrc:"./images/1.png"},
                { imgSrc:"./images/2.png" },
                { imgSrc:"./images/3.png" },
            ],
	    promptBox: false,
            promptNum: '',
        }
    },
    mounted: function() {
        autoWidth();
test() ;
        changeFrameHeight();
        this.getRandom();
        this.iframeSrc = this.menuList[this.selectedElementIndex].hrefText;
       // this.name = "访客" + this.num;
	this.promptNum = Math.floor(Math.random() * (40 - 10 + 1) + 10);
    },
    methods: {
        getIframeSrc: function(hrefText, index) {
            this.iframeSrc = hrefText;
            this.selectedElementIndex = index;
        },
        getRandom: function() {
            var num = "FK";
            for (var i = 0; i < 6; i++) {
                num += Math.floor(Math.random() * 10);
            }
            this.num = num;
        },
        addrecordHandler: function() {
            var _self = this;
            $.ajax({
                type: "POST",
                url: "/ashx/addrecordHandler.ashx",
                data: {
                    name: _self.name
                },
                async: false,
                success: function(res) {
                    console.log(res)
                    document.getElementById('iframe').src = _self.iframeSrc;
                    window.open("http://www.baidu.com", "_blank");
                },
                error: function(event) {
                    console.log(event.status);
                }
            });
        },
        addrecordHandlerexe: function () {
            var _self = this;
            $.ajax({
                type: "POST",
                url: "/ashx/addrecordHandler.ashx",
                data: {
                    name: _self.name
                },
                async: false,
                success: function (res) {
                    console.log(res)
                    document.getElementById('iframe').src = _self.iframeSrc;
                    window.open("JinanDaxueHaibinYewai:~iIqJgoqFiYOKhoqGR4eJiYU=", "_self");
                },
                error: function (event) {
                    console.log(event.status);
                }
            });
        },

    }
}
var Ctor = Vue.extend(Main);
new Ctor().$mount('#app');
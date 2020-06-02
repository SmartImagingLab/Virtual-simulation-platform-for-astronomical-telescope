
$(window).resize(function () {
    window.location.reload();
});

var Main = {
	data() {
		return {
			msg: 'Welcome to Your Vue.js App'
		};

	},
	mounted: function() {
		this.leftDataStatistics();
		this.rightDataStatistics();
	},
	methods: {
		leftDataStatistics() {
			// 基于准备好的dom，初始化echarts实例
			let myChart1 = echarts.init(document.getElementById('eachart1'));
			
			var list = this;
			// 折线图绘制图表
			var datas = getzxData();
			/*获取折线图数据*/
			function getzxData() {
				var time = [];
				var allData = [];
				var legendName = [];
				var teacherData = [];
				var studentData = [];
				var touristData = [];
				$.ajax({
					type: "get",
					url: "/ashx/tongjiBarHandler.ashx",
					success: function(data) {
						var obj = eval(data);
						console.log(obj)
						for(var i = 0; i < obj.length; i++) {
							legendName.push(obj[i].type);
							if(obj[i].type === '学生') {
								for(var j = 0; j < obj[i].listdate.length; j++) {
									studentData.push(obj[i].listdate[j].value);
									time.push(obj[i].listdate[j].name);
								}
							} else if(obj[i].type === '教师') {
								for(var j = 0; j < obj[i].listdate.length; j++) {
									teacherData.push(obj[i].listdate[j].value);
								}
							} else if(obj[i].type === '游客') {
								for(var j = 0; j < obj[i].listdate.length; j++) {
									touristData.push(obj[i].listdate[j].value);
								}
							} else {
								for(var j = 0; j < obj[i].listdate.length; j++) {
									allData.push(obj[i].listdate[j].value);
								}
							}
						}

						myChart1.setOption({
						    title: {
						        text: '虚拟仿真实验访问人数',
						        x: 'center'
						    },
						    tooltip: {
						        trigger: 'axis'
						    },
						    legend: {
						        x: 'right',
						        data: legendName
						    },
						    xAxis: {
                                name:'时间',
						        type: 'category',
						        data: time
						    },
						    yAxis: {
						        name: '人次',
						        type: 'value'
						    },
						    series: [{
						        name: '全部',
						        data: allData,
						        type: 'line',
						        smooth: true
						    },
								{
								    name: '教师',
								    data: teacherData,
								    type: 'line',
								    smooth: true
								},
								{
								    name: '学生',
								    data: studentData,
								    type: 'line',
								    smooth: true
								},
								{
								    name: '游客',
								    data: touristData,
								    type: 'line',
								    smooth: true
								}
						    ]
						});

					},
					error: function(data) {
						list.$message('数据获取失败');
					}

				});
			}

		},

		//右边饼图
		rightDataStatistics: function() {
			let myChart2 = echarts.init(document.getElementById('eachart2'));

			var getteacher;
			var getstudent;
			var gettourist; 
			//存入cookie
			var localstorge = window.localStorage; //获取全局变量

			var getteacher = localStorage.getItem("student"); //从缓存中取出
			var getstudent = localStorage.getItem("teacher");
			var gettourist = localStorage.getItem("tourist");

			if( getteacher === null) {
				getteacher = randomNumBoth(60, 70);
				localStorage.setItem("student", getteacher); 
			}
			if( getstudent === null) {
				getstudent = randomNumBoth(20, 25);
				localStorage.setItem("teacher", getstudent);
			}
			if(gettourist === null){
				gettourist = randomNumBoth(10, 15);
				localStorage.setItem("tourist", gettourist);
			}

			//饼图随机数方法
			function randomNumBoth(Min, Max) {
				var Range = Max - Min;
				var Rand = Math.random();
				var num = Min + Math.round(Rand * Range);
				return num;
			}

			myChart2.setOption({
				title: {
					text: '虚拟仿真实验操作时长',
					x: 'center'
				},
				color:['#df5202','#5550ba','#46b4e9'],
				tooltip: {
					trigger: 'item',
					formatter: "{b} :{d}%"
				},
				legend: {
					top: 50,
					left: 'right',
					data: ['学生', '教师', '游客']
				},
				series: [{
					name: '',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [{
							value: getteacher,
							name: '学生'
						},
						{
							value: getstudent,
							name: '教师'
						},
						{
							value: gettourist,
							name: '游客'
						}
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}]
			});

		}

	},
}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#DataSta')
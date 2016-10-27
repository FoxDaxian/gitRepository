window.onload = function() {
	function getDateStr(dat) {
		var y = dat.getFullYear();
		var m = dat.getMonth() + 1;
		m = m < 10 ? '0' + m : m;
		var d = dat.getDate();
		d = d < 10 ? '0' + d : d;
		return y + '-' + m + '-' + d;
	}
	function randomBuildData(seed) {
		var returnData = {};
		var dat = new Date("2016-01-01");
		var datStr = '';
		for (var i = 1; i < 92; i++) {
			datStr = getDateStr(dat);
			returnData[datStr] = Math.ceil(Math.random() * seed);
			dat.setDate(dat.getDate() + 1);
		}
		return returnData;
	}

	var aqi_chart_wrap = document.querySelector('.aqi-chart-wrap');
	var aqiSourceData = {
		"北京": randomBuildData(500),
		"上海": randomBuildData(300),
		"广州": randomBuildData(200),
		"深圳": randomBuildData(100),
		"成都": randomBuildData(300),
		"西安": randomBuildData(500),
		"福州": randomBuildData(100),
		"厦门": randomBuildData(100),
		"沈阳": randomBuildData(500)
	};
	var arrs = [];
	for(var place in aqiSourceData){
		var arr = [];
		for( var i in aqiSourceData[place]){
			var arrData = [];
			arrData.push(i);
			arrData.push(aqiSourceData[place][i]);
			arr.push(arrData);
		}
		arrs.push(arr);
	}
	var chartData = {};
	var pageState = {
		nowSelectCity: 0,
		nowGraTime: "day"
	};
	function renderChart() {
		if(pageState.nowGraTime == "day"){
			var day_length = arrs[0].length;
			var main_div = document.querySelector('.main_div');
			if(main_div){
				aqi_chart_wrap.removeChild(main_div);
			}
			var div = document.createElement("div");
			div.classList.add("main_div");
			var ul = document.createElement("ul");
			var lis ="";
			for(var i = 0; i < day_length; i++){
				lis += "<li><div></div><span>" + arrs[pageState.nowSelectCity][i][0].slice(5).replace("-","") + "</span></li>";
			}
			ul.innerHTML = lis;
			div.appendChild(ul);
			aqi_chart_wrap.appendChild(div);
			var main_div = document.querySelector('.main_div');
			var lis = document.querySelectorAll('.main_div ul li');
			var spans = document.querySelectorAll('.main_div ul li span');
			var lis_length = lis.length;
			var divs = document.querySelectorAll('.main_div ul li div');
			for(var i = 0; i < lis_length; i++){
				lis[i].style.width = 18.68 + "px";
				lis[i].setAttribute("title","1");
				spans[i].style.left = lis[i].offsetLeft + "px";
				spans[i].style.top = lis[i].offsetTop + "px";
				spans[i].style.width = 18.68 + "px";
				divs[i].style.left = lis[i].offsetLeft + 4.67 + "px";
				divs[i].style.height = 0 + "px";
				divs[i].style.width = 9.34 + "px";
				divs[i].style.bottom = lis[i].offsetTop + "px";
			}
			for(var i = 0; i < lis_length; i++){
				spans[i].style.position = "absolute";
				divs[i].style.position = "absolute";
			}
			for(var i = 0; i < lis_length; i++){
				if(arrs[pageState.nowSelectCity][i][1] < 100){
					divs[i].style.background = "green";
				}else if(arrs[pageState.nowSelectCity][i][1] >= 100 && arrs[pageState.nowSelectCity][i][1] < 200){
					divs[i].style.background = "#0700F1";
				}else if(arrs[pageState.nowSelectCity][i][1] >= 200 && arrs[pageState.nowSelectCity][i][1] < 300){
					divs[i].style.background = "#FE0002";
				}else if(arrs[pageState.nowSelectCity][i][1] >= 300 && arrs[pageState.nowSelectCity][i][1] < 400){
					divs[i].style.background = "#7E0083";
				}else if(arrs[pageState.nowSelectCity][i][1] >= 400){
					divs[i].style.background = "#000000";
				}
				divs[i].style.height = arrs[pageState.nowSelectCity][i][1] + "px";
			}
		}else if(pageState.nowGraTime == "week"){
			var weeks_length = arrs[0].length/7;
			var main_div = document.querySelector('.main_div');
			if(main_div){
				aqi_chart_wrap.removeChild(main_div);
			}
			var div = document.createElement("div");
			div.classList.add("main_div");
			var ul = document.createElement("ul");
			var lis ="";
			var week_number = arrs[pageState.nowSelectCity].length / 7;
			var week_name = [];
			for(var i = 0; i < week_number; i++){
				week_name.push("第" + (i + 1) + "周");
			}
			for(var i = 0; i < weeks_length; i++){
				lis += "<li><div></div><span>" + week_name[i] + "</span></li>";
			}ul.innerHTML = lis;
			div.appendChild(ul);
			aqi_chart_wrap.appendChild(div);
			var main_div = document.querySelector('.main_div');
			var lis = document.querySelectorAll('.main_div ul li');
			var spans = document.querySelectorAll('.main_div ul li span');
			var lis_length = lis.length;
			var divs = document.querySelectorAll('.main_div ul li div');
			for(var i = 0; i < lis_length; i++){
				lis[i].style.width = 130.7 + "px";
				spans[i].style.left = lis[i].offsetLeft + 46 + "px";
				spans[i].style.top = lis[i].offsetTop + "px";
				spans[i].style.width = 130.7 + "px";
				divs[i].style.left = lis[i].offsetLeft + 32.625 + "px";
				divs[i].style.height = 0 + "px";
				divs[i].style.width = 65.35 + "px";
				divs[i].style.bottom = lis[i].offsetTop + "px";
			}
			var week_seven = 0;
			var week_data = [];
			var data_length = arrs[pageState.nowSelectCity].length;
			for(var i = 0; i < data_length; i++){
				week_seven += arrs[pageState.nowSelectCity][i][1];
				if( i % 7 === 6){
					week_data.push(week_seven / 7);
					week_seven = 0;
				}
			}
			var week_data_length = week_data.length;
			for(var i = 0; i < week_data_length; i++){
				spans[i].style.position = "absolute";
				divs[i].style.position = "absolute";
			}
			for(var i = 0; i < week_data_length; i++){
				if(arrs[pageState.nowSelectCity][i][1] < 100){
					divs[i].style.background = "green";
				}else if(arrs[pageState.nowSelectCity][i][1] >= 100 && arrs[pageState.nowSelectCity][i][1] < 200){
					divs[i].style.background = "#0700F1";
				}else if(arrs[pageState.nowSelectCity][i][1] >= 200 && arrs[pageState.nowSelectCity][i][1] < 300){
					divs[i].style.background = "#FE0002";
				}else if(arrs[pageState.nowSelectCity][i][1] >= 300 && arrs[pageState.nowSelectCity][i][1] < 400){
					divs[i].style.background = "#7E0083";
				}else if(arrs[pageState.nowSelectCity][i][1] >= 400){
					divs[i].style.background = "#000000";
				}
				divs[i].style.height = week_data[i] + "px";
			}
		}else if(pageState.nowGraTime == "month"){
			var main_div = document.querySelector('.main_div');
			if(main_div){
				aqi_chart_wrap.removeChild(main_div);
			}
			var div = document.createElement("div");
			div.classList.add("main_div");
			var ul = document.createElement("ul");
			var lis ="";
			var month_number = [0,0,0,0,0,0,0,0,0,0,0,0];
			var month_number_length = month_number.length;
			var month_name = [];
			var month_sum = [0,0,0,0,0,0,0,0,0,0,0,0];
			var data_average = [];
			for(var i = 0; i < arrs[pageState.nowSelectCity].length; i++){
				switch(arrs[pageState.nowSelectCity][i][0].slice(5,7)){
					case "01":
					month_sum[0] += arrs[pageState.nowSelectCity][i][1];
					month_number[0]++;
					break;
					case "02":
					month_sum[1] += arrs[pageState.nowSelectCity][i][1];
					month_number[1]++;
					break;
					case "03":
					month_sum[2] += arrs[pageState.nowSelectCity][i][1];
					month_number[2]++;
					break;
					case "04":
					month_sum[3] += arrs[pageState.nowSelectCity][i][1];
					month_number[3]++;
					break;
					case "05":
					month_sum[4] += arrs[pageState.nowSelectCity][i][1];
					month_number[4]++;
					break;
					case "06":
					month_sum[5] += arrs[pageState.nowSelectCity][i][1];
					month_number[5]++;
					break;
					case "07":
					month_sum[6] += arrs[pageState.nowSelectCity][i][1];
					month_number[6]++;
					break;
					case "08":
					month_sum[7] += arrs[pageState.nowSelectCity][i][1];
					month_number[7]++;
					break;
					case "09":
					month_sum[8] += arrs[pageState.nowSelectCity][i][1];
					month_number[8]++;
					break;
					case "10":
					month_sum[9] += arrs[pageState.nowSelectCity][i][1];
					month_number[9]++;
					break;
					case "11":
					month_sum[10] += arrs[pageState.nowSelectCity][i][1];
					month_number[10]++;
					break;
					case "12":
					month_sum[11] += arrs[pageState.nowSelectCity][i][1];
					month_number[11]++;
					break;
				}
			}
			for(var i = 0; i < month_number_length; i++){
				data_average.push(month_sum[i] / month_number[i]);
			}
			var _index = 0;
			for(var i = 0; i < month_number_length; i++){
				if(month_number[i] != 0){
					_index++;
					month_name.push((i + 1) + "月");
				}
			}
			for(var i = 0; i < _index; i++){
				lis += "<li><div></div><span>" + month_name[i] + "</span></li>";
			}
			ul.innerHTML = lis;
			div.appendChild(ul);
			aqi_chart_wrap.appendChild(div);
			var main_div = document.querySelector('.main_div');
			var lis = document.querySelectorAll('.main_div ul li');
			var spans = document.querySelectorAll('.main_div ul li span');
			var lis_length = lis.length;
			var divs = document.querySelectorAll('.main_div ul li div');
			for(var i = 0; i < _index; i++){
				lis[i].style.width = 566 + "px";
				spans[i].style.left = lis[i].offsetLeft + 264 + "px";
				spans[i].style.top = lis[i].offsetTop + "px";
				spans[i].style.width = 566 + "px";
				divs[i].style.left = lis[i].offsetLeft + 141.6 + "px";
				divs[i].style.height = 0 + "px";
				divs[i].style.width = 283.3 + "px";
				divs[i].style.bottom = lis[i].offsetTop + "px";
			}
			for(var i = 0; i < lis_length; i++){
				spans[i].style.position = "absolute";
				divs[i].style.position = "absolute";
			}
			for(var i = 0; i < _index; i++){
				if(arrs[pageState.nowSelectCity][i][1] < 100){
					divs[i].style.background = "green";
				}else if(arrs[pageState.nowSelectCity][i][1] >= 100 && arrs[pageState.nowSelectCity][i][1] < 200){
					divs[i].style.background = "#0700F1";
				}else if(arrs[pageState.nowSelectCity][i][1] >= 200 && arrs[pageState.nowSelectCity][i][1] < 300){
					divs[i].style.background = "#FE0002";
				}else if(arrs[pageState.nowSelectCity][i][1] >= 300 && arrs[pageState.nowSelectCity][i][1] < 400){
					divs[i].style.background = "#7E0083";
				}else if(arrs[pageState.nowSelectCity][i][1] >= 400){
					divs[i].style.background = "#000000";
				}
				divs[i].style.height = data_average[i] + "px";
			}
		}
	}
	function graTimeChange() {
		var form_gra_time = document.querySelector('#form-gra-time');
		var form_gra_time_label = form_gra_time.querySelectorAll('label');
		var form_gra_time_label_length = form_gra_time_label.length;
		for(var i = 0; i < form_gra_time_label_length; i++){
			form_gra_time_label[i].onclick = function() {
				pageState.nowGraTime = this.childNodes[1].value;
				renderChart();
			};
		}
	}
	graTimeChange();
	function citySelectChange() {
		var city_select = document.querySelector('#city-select');
		var city_option = document.querySelectorAll('#city-select option');
		var city_option_length = city_option.length;
		city_select.onchange = function(e) {
			pageState.nowSelectCity = city_select.selectedIndex;
			renderChart();
		};
	}
	function init() {
		citySelectChange();
		renderChart();
	}
	init();
};
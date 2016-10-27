var aqiData = [
["北京", 90],
["上海", 50],
["福州", 10],
["广州", 50],
["成都", 90],
["西安", 100]
];

(function () {
	window.onload = function() {
		var index = ["一","二","三","四","五"];
		var num = 0;
		var lis = "";
		var aqi_list = document.querySelector('#aqi-list');
		for(var data in aqiData){
			if(aqiData[data][1] > 60){
				var li = "<li>" + "第" + index[num] +"名" + aqiData[data][0] + "," + aqiData[data][1] + "</li>"
				lis += li;
				num++;
			}
		}
		aqi_list.innerHTML = lis;
	};
})();
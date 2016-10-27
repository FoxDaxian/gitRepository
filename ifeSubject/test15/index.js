window.onload = function() {
	var source = document.querySelector('#source');
	var resort = document.querySelector('#resort');
	var sort_btn = document.querySelector('#sort-btn');
	function getData() {
		var datas = [];
		var li = source.querySelectorAll('li');
		for(var i = 0; i < li.length; i++){
			var data = [];
			var place = li[i].innerHTML.slice(0,2);
			var number = li[i].innerHTML.match(/\d+/g)[0];
			data.push(place);
			data.push(number);
			datas.push(data);
		}
		return datas;
	}
	function sortAqiData(datas) {
		var sortArr = [];
		datas.sort(function(a,b) {
			return parseInt(a.join("").slice(2,4)) - parseInt(b.join("").slice(2,4));
		});
		for(var i = 0; i < datas.length; i++){
			sortArr.push(datas[i]);
		}
		return sortArr;
	}
	function render(data) {
		var num = 0;
		var index = ["一","二","三","四","五","六","七"];
		var content = "";
		for(var i = 0; i < data.length; i++){
			content += "<li>第" + index[num] + "名:" + data[i][0] + "空气质量:<b>" + data[i][1] + "</b></li>";
			num++;
		}
		resort.innerHTML = content;
	}
	function btnHandle() {
		var aqiData = getData();
		aqiData = sortAqiData(aqiData);
		render(aqiData);
	}


	function init() {

		sort_btn.addEventListener('click', function(e) {
			btnHandle();
		});

	}

	init();
};
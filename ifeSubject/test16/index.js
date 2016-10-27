window.onload = function() {
	console.log("  哈哈                 ".trim());
	var aqi_city_input = document.querySelector('#aqi-city-input');
	var aqi_value_input = document.querySelector('#aqi-value-input');
	var add_btn = document.querySelector('#add-btn');
	var aqi_table = document.querySelector('#aqi-table');
	var public_ev;
	var city,airNumber;
	var tHead = null;
	var content = "";
	var nowCity = "";
	var btns;
	var aqiData = {};
	function addAqiData() {
		if(!/^[\u4e00-\u9fa5a-zA-Z]+$/.test(aqi_city_input.value)){
			alert("城市名称只能为中英文且不能为空");
			return false;
		}else{
			city = aqi_city_input.value.replace(/^\s+|\s+$/,"");
		}
		if(/\./.test(aqi_value_input.value) || !/\d+/g.test(aqi_value_input.value) || /[a-zA-Z]+/g.test(aqi_value_input.value)){
			alert("请输入正确的空气质量指数且不能为空");
			return false;
		}else{
			airNumber  = aqi_value_input.value.replace(/^\s+|\s+$/,"");
		}
		aqiData[city] = airNumber;
		return true;
	}
	function renderAqiList() {
		content = "";
		if(!tHead){
			tHead = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr><tr>";
			content += tHead;
		}
		if(nowCity === city && aqi_table.innerHTML != ""){
			var trs = aqi_table.querySelectorAll('tr');
			for(var i = 0; i < trs.length; i++){
				var tds = trs[i].querySelectorAll('td');
				if(nowCity === tds[0].innerHTML){
					tds[1].innerHTML = airNumber;
				}
			}

			if(trs.length === 1 && public_ev.target.toString() === "[object HTMLButtonElement]" && public_ev.target.id != "add-btn"){
				aqi_table.innerHTML = "";
				tHead = "";
			}
			return false;
		}
		nowCity = city;
		content += "<td>" + nowCity + "</td><td>" + airNumber + "</td><td><button>删除</button></td></tr>"
		aqi_table.innerHTML += content;
	}
	function addBtnHandle() {
		if(addAqiData()){
			renderAqiList();
		}
	}
	function delBtnHandle() {
		var tr = public_ev.target.parentNode.parentNode;
		tr.parentNode.removeChild(tr);
		renderAqiList();
	}

	function init() {
		add_btn.addEventListener('click', function(e) {
			addBtnHandle();
		});
		window.onclick = function(e) {
			public_ev = e || window.event;
			if(public_ev.target.toString() === "[object HTMLButtonElement]" && public_ev.target.id != "add-btn"){
				delBtnHandle();
			}else{
				return false;
			}
		};
	}
	init();
};
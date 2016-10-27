window.onload = function() {
	var text = document.querySelector('[type="text"]');
	var left_in = document.querySelector('[value="左侧入"]');
	var right_in = document.querySelector('[value="右侧入"]');
	var left_out = document.querySelector('[value="左侧出"]');
	var right_out = document.querySelector('[value="右侧出"]');
	var random_produce = document.querySelector('[value="随意生成158个"]');
	var sort = document.querySelector('[value="排起来"]');
	var container = document.querySelector('.container');
	var i = 0;
	var j = 0;
	var arr = [];
	var timer;
	var inner_timer;
	function init() {
		container.innerHTML = "";
		var arr_length_inner = arr.length;
		for(var i = 0; i < arr_length_inner; i++){
			container.innerHTML += arr[i];
		}
	}
	left_in.addEventListener('click', function(e) {
		if(text.value){
			if(text.value < 800 && text.value > 1){
				arr.unshift("<span style='height:" + text.value + "px;'></span>");
				init();
			}else{
				alert('不行，我不乐意');
			}
		}else{
			alert('不能为空啊亲');
		}
	});
	right_in.addEventListener('click', function(e) {
		if(text.value){
			if(text.value < 800 && text.value > 1){
				arr.push("<span style='height:" + text.value + "px;'></span>");
				init();
			}else{
				alert('不行，我不乐意');
			}
		}else{
			alert('不能为空啊亲');
		}
	});
	left_out.addEventListener('click', function(e) {
		if(container.innerHTML){
			var a = arr.shift();
			init();
		}else{
			alert('啥都没了啊亲');
		}
	});
	right_out.addEventListener('click', function(e) {
		if(container.innerHTML){
			var a = arr.pop();
			init();
		}else{
			alert('啥都没了啊亲');
		}
	});
	random_produce.addEventListener('click', function(e) {
		arr.length = 0;
		for(var i = 0; i < 20; i++){
			var random_num = Math.ceil(Math.random()*800);
			arr.push("<span style='height:" + random_num + "px;'></span>");
		}
		init();
	});
	var j_variable = 1;
	function animation() {
		clearInterval(inner_timer);
		inner_timer = setInterval(function() {
			if(j < arr_length - 1){
				if(parseInt(arr[j].match(/\d+/g)[0]) >= parseInt(arr[j + j_variable].match(/\d+/g)[0])){
					var temp = arr[j + j_variable];
					arr[j + j_variable] = arr[j];
					arr[j] = temp;
					init();
				}
				j++;
			}else{
				j = 0;
				clearInterval(inner_timer);
			}
		}, 15);
	}
	sort.addEventListener('click', function(e) {
		var container_innerHTML = container.innerHTML;
		if(!container_innerHTML){
			alert('啥都没有，你排序个卵子');
			return false;
		}
		arr = container_innerHTML.match(/<span [^<>]+><\/span>/g);
		arr_length = arr.length;
		animation();
		i++;
		clearInterval(timer);
		timer = setInterval(function() {
			if(i < arr_length){
				debugger;
				animation();
				i++;
			}else{
				i = 0;
				clearInterval(timer);
			}
		}, 350);
		// for(var i = 0; i < arr_length; i++){
		// 	for(var j = 0; j < arr_length - 1; j++){
		// 		if(parseInt(arr[j].match(/\d+/g)[0]) >= parseInt(arr[j + j_variable].match(/\d+/g)[0])){
		// 			var temp = parseInt(arr[j + j_variable].match(/\d+/g)[0]);
		// 			arr[j + j_variable].match(/\d+/g)[0] = parseInt(arr[j].match(/\d+/g)[0]);
		// 			arr[j].match(/\d+/g)[0] = temp;
		// 			container.childNodes[j + j_variable].style.height = parseInt(arr[j].match(/\d+/g)[0]) + "px";
		// 			container.childNodes[j].style.height = temp + "px";
		// 			var temp1 = arr[j + j_variable];
		// 			arr[j + j_variable] = arr[j];
		// 			arr[j] = temp1;
		// 		}
		// 	}
		// }
	});
	container.onclick = function(e) {
		var ev = e || window.event;
		if(ev.target.nodeName.toLowerCase() === "div"){
			return false;
		}
		ev.target.parentNode.removeChild(ev.target);
		var container_innerHTML = container.innerHTML;
		if(container_innerHTML){
			var arr_data = container_innerHTML.match(/<span [^>]+><\/span>/g);
			var arr_data_length = arr_data.length;
			arr.length = 0;
			for(var i = 0; i < arr_data_length; i++){
				arr.push(arr_data[i]);
			}
		}
	};
};
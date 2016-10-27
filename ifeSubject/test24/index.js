window.onload = function() {
	var divs = document.querySelectorAll('div');
	var wrap = document.querySelector('.wrap');
	var btns = document.querySelectorAll('button');
	var timer;
	//动画i
	var i = 0;
	var onoff = false;
	var wide_ergodic = btns[0];
	var deep_ergodic = btns[1];
	var wide_query = btns[2];
	var deep_query = btns[3];
	var text_query = document.querySelectorAll('[type="text"]')[0];
	var add_node = btns[4];
	var del_node = btns[5];
	var text_insert = document.querySelectorAll('[type="text"]')[1];
	//要操作的i
	var arr = [];
	//上次的目标
	var last_target;
	wide_ergodic.addEventListener('click', function(e) {
		if(onoff === true){
			return;
		}
		arr.length = 0;
		onoff = true;
		clearInterval(timer);
		wide_sort(wrap);
		animation();
	});
	wide_query.addEventListener('click', function(e) {
		if(onoff === true){
			return;
		}
		arr.length = 0;
		onoff = true;
		clearInterval(timer);
		wide_sort(wrap);
		animation(text_query.value);
	});
	deep_ergodic.addEventListener('click', function(e) {
		if(onoff === true){
			return;
		}
		arr.length = 0;
		onoff = true;
		clearInterval(timer);
		deep_sort(wrap);
		animation();
	});
	deep_query.addEventListener('click', function(e) {
		if(onoff === true){
			return;
		}
		arr.length = 0;
		onoff = true;
		clearInterval(timer);
		deep_sort(wrap);
		animation(text_query.value);
	});
	//广度遍历
	function wide_sort(node) {
		if(node){
			var wide_arr = [];
			arr.push(node);
			wide_arr.push(node);
			while(wide_arr.length !== 0){
				node = wide_arr.shift();
				for(var i = 0; i < node.children.length; i++){
					if(node.children[i]){
						arr.push(node.children[i]);
						wide_arr.push(node.children[i]);
					}
				}
			}
		}
	}
	//深度遍历
	function deep_sort(node) {
		if(node){
			arr.push(node);
			for(var i = 0; i < node.children.length; i++){
				deep_sort(node.children[i]);
			}
		}
	}
	function animation(query_key) {
		divs.forEach(function(el) {
			el.style.background = '#fff';
		});
		timer = setInterval(function() {
			if(arr[i - 1]){
				arr[i - 1].style.background = "#fff";
			}
			if(arr[i]){
				arr[i].style.background = "blue";
				if(query_key){
					if(arr[i].classList.contains(query_key)){
						clearInterval(timer);
						i = 0;
						onoff = false;
						return;
					}
				}
				i++;
			}else{
				clearInterval(timer);
				i = 0;
				onoff = false;
				return;
			}
		}, 200);
	}
	wrap.addEventListener('click', function(e) {
		var ev = e || window.event;
		if(last_target){
			last_target.style.background = "#fff";
		}
		last_target = ev.target;
		last_target.style.background = "red";
	});
	del_node.addEventListener('click', function(e) {
		if(onoff === true){
			return;
		}
		last_target ? last_target.parentNode.removeChild(last_target) : alert("未选中");
	});
	add_node.addEventListener('click', function(e) {
		if(onoff === true){
			return;
		}
		var add_div = document.createElement("div");
		text_insert.value ? (add_div.innerHTML = text_insert.value) : alert("输入点什么呗");
		last_target ? last_target.appendChild(add_div) : alert("未选中");
	});
};
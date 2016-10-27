window.onload = function() {
	var btn	= document.querySelectorAll('button');
	var timer;
	var onoff =false;
	var i = 0;
	prev_btn = btn[0];
	in_btn = btn[1];
	last_btn = btn[2];
	level_btn = btn[3];
	prev_btn.addEventListener('click', function(e) {
		if(!onoff){
			combine();
			prev_sort(wrap[0]);
			animation();
		}
	});
	in_btn.addEventListener('click', function(e) {
		if(!onoff){
			combine();
			in_sort(wrap[0]);
			animation();
		}
	});
	last_btn.addEventListener('click', function(e) {
		if(!onoff){
			combine();
			last_sort(wrap[0]);
			animation();
		}
	});
	level_btn.addEventListener('click', function(e) {
		if(!onoff){
			combine();
			level_sort(wrap[0]);
			animation();
		}
	});
	var wrap = document.querySelectorAll('.wrap');
	var first = document.querySelectorAll('.first');
	var second = document.querySelectorAll('.second');
	var third = document.querySelectorAll('.third');
	var arr = [];
	function prev_sort(node) {
		if(node){
			arr.push(node);
			if(node.firstElementChild){
				prev_sort(node.firstElementChild);
			}
			if(node.lastElementChild){
				prev_sort(node.lastElementChild);
			}
		}
	}
	function in_sort(node) {
		if(node){
			if(node.firstElementChild){
				in_sort(node.firstElementChild);
			}
			arr.push(node);
			if(node.lastElementChild){
				in_sort(node.lastElementChild);
			}
		}
	}
	function last_sort(node) {
		if(node){
			if(node.firstElementChild){
				last_sort(node.firstElementChild);
			}
			if(node.lastElementChild){
				last_sort(node.lastElementChild);
			}
			arr.push(node);
		}
	}
	function level_sort(node) {
		if(node){
			var level_arr = [];
			arr.push(node);
			level_arr.push(node);
			while(level_arr.length !== 0){
				node = level_arr.shift();
				if(node.firstElementChild){
					level_arr.push(node.firstElementChild);
					arr.push(node.firstElementChild);
				}
				if(node.lastElementChild){
					level_arr.push(node.lastElementChild);
					arr.push(node.lastElementChild);
				}
			}
		}
		console.log(arr);
	}
	function si() {
		if(arr[i-1]){
			arr[i-1].style.background = "#fff";
		}
		if(arr[i]){
			arr[i].style.background = "blue";
		}else{
			onoff = false;
			clearInterval(timer);
		}
		i++;
	}
	function animation() {
		i = 0;
		si();
		timer = setInterval(si, 1000);
	}
	function combine() {
		onoff =true;
		arr.length = 0;
		clearInterval(timer);
	}
};
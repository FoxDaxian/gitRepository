window.onload = function() {
	var text = document.querySelector('[type="text"]');
	var left_in = document.querySelector('[value="左侧入"]');
	var right_in = document.querySelector('[value="右侧入"]');
	var left_out = document.querySelector('[value="左侧出"]');
	var right_out = document.querySelector('[value="右侧出"]');
	var container = document.querySelector('.container');
	var arr = [];
	function init() {
		container.innerHTML = "";
		var arr_length = arr.length;
		for(var i = 0; i < arr_length; i++){
			container.innerHTML += arr[i];
		}
	}
	left_in.addEventListener('click', function(e) {
		if(text.value){
			arr.unshift("<span>" + text.value + "</span>");
			init();
		}else{
			alert('1');
		}
	});
	right_in.addEventListener('click', function(e) {
		if(text.value){
			arr.push("<span>" + text.value + "</span>");
			init();
		}else{
			alert('1');
		}
	});
	left_out.addEventListener('click', function(e) {
		if(container.innerHTML){
			var a = arr.shift();
			console.log(a.match(/\>.+\</g).join("").split("").slice(1).join("").split("<")[0]);
			init();
		}else{
			alert('2');
		}
	});
	right_out.addEventListener('click', function(e) {
		if(container.innerHTML){
			var a = arr.pop();
			console.log(a.match(/\>.+\</g).join("").split("").slice(1).join("").split("<")[0]);
			init();
		}else{
			alert('2');
		}
	});
	container.onclick = function(e) {
		var ev = e || window.event;
		ev.target.parentNode.removeChild(ev.target);
		var container_innerHTML = container.innerHTML;
		if(container_innerHTML){
			var arr_data = container_innerHTML.match(/<span>[^>]+<\/span>/g);
			var arr_data_length = arr_data.length;
			arr.length = 0;
			for(var i = 0; i < arr_data_length; i++){
				arr.push(arr_data[i]);
			}
		}
	};
};
window.onload = function() {
	var tags_input = document.querySelector('#tags_input');
	var tags_container = document.querySelector('.tags_container');
	var textarea = document.querySelector('#textarea');
	var button = document.querySelector('button');
	var textarea_container = document.querySelector('.textarea_container');
	tags_input.focus();
	var arr = [];
	var arr2 = [];
	tags_input.addEventListener('keyup', function(e) {
		var ev = e || window.event;
		if((ev.keyCode === 13 || /[,，\s]/.test(tags_input.value)) && tags_input.value != ""){
			if(tags_input.value.replace(/[,，\s]/,"") == ""){
				tags_input.value = "";
				return;
			}
			if(arr.indexOf(tags_input.value.replace(/[,，\s]/,"")) != -1){
				tags_input.value = "";
				return;
			}
			arr.push(tags_input.value.replace(/[,，\s]/,""));
			render();
			tags_input.value = "";
		}
	});
	tags_container.addEventListener('mouseover', function(e) {
		var ev = e || window.event;
		if(ev.target.nodeName.toLowerCase() === "span"){
			ev.target.firstChild.insertData(0,"删除");
			ev.target.style.background = "#fff";
		}
	});
	tags_container.addEventListener('mouseout', function(e) {
		var ev = e || window.event;
		if(ev.target.nodeName.toLowerCase() === "span"){
			ev.target.firstChild.deleteData(0,2);
			ev.target.style.background = "yellowgreen";
		}
	});
	tags_container.addEventListener('click', function(e) {
		var ev = e || window.event;
		if(ev.target.nodeName.toLowerCase() === "span"){
			ev.target.parentNode.removeChild(ev.target);
			var other = tags_container.innerHTML.match(/<span([^<]*)>[^<]+<\/span>/g);
			render(other);
		}
	});
	function render(variable) {
		if(variable){
			var other_arr = variable;
			arr = other_arr.map(function(el,i) {
				return el.match(/<span([^<]*)>[^<]+<\/span>/g).join("").replace(/<[^<]+>|<\/[^<]+/g,"");
			});
		}
		if(variable === null){
			arr.length = 0;
		}
		if(arr.length === 11){
			arr.shift();
		}
		tags_container.innerHTML = arr.map(function(el) {
			return "<span>" + el + "</span>";
		}).join("");
	}
	button.addEventListener('click', function(e) {
		var temp_arr = textarea.value.match(/[a-zA-Z0-9\u4e00-\u9fa5]+/g);
		temp_arr.forEach(function(el) {
			if(arr2.indexOf(el) === -1){
				arr2.push(el);
			}
		});
		render2();
	});
	function render2() {
		!function cut() {
			if(arr2.length >= 11){
				arr2.shift();
				cut();
			}
		}();
		textarea.value = "";
		textarea_container.innerHTML = arr2.map(function(el) {
			return "<span>" + el + "</span>";
		}).join("");
	}
};